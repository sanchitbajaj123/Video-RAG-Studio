const exp=require("express")
const cors=require("cors")
const mon=require("mongoose")
const Vedio=require("./schema")
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const app=exp()

app.use(exp.json())
app.use(cors())

mon.connect(process.env.Mongourl)
.then(()=>{console.log("MONGO CONNECTED")})

const ASSEMBLY_API_KEY= process.env.ASSEMBLY_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

app.post("/checkhash",async (req,res)=>{
    const {hash,user}=req.body;
    try{
        const result=await Vedio.findOne({hashcode:hash})
        if(result){
             result.Users.push(user)
             await result.save();
            res.status(200).send(result);
            return;
        }
        res.status(205).send("available");
        return;
    }
    catch(err){
        res.status(500).send(err);
    }
})

app.post("/vedioupload", async (req, res) => {
  const { firebaseUrl, hash ,user} = req.body;

  if (!firebaseUrl || !hash) {
    return res.status(400).json({ error: "Missing firebaseUrl or hashcode" });
  }

  try {

    const transcriptInit = await axios.post(
      "https://api.assemblyai.com/v2/transcript",
      { audio_url: firebaseUrl },
      { headers: { authorization: ASSEMBLY_API_KEY, "content-type": "application/json" } }
    );

    const transcriptId = transcriptInit.data.id;

    let transcriptData;
    while (true) {
      await new Promise(resolve => setTimeout(resolve, 3000))
      const pollingResp = await axios.get(
        `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
        { headers: { authorization: ASSEMBLY_API_KEY } }
      );
      transcriptData = pollingResp.data;

      if (transcriptData.status === "completed") break;
      if (transcriptData.status === "error") throw new Error(`Transcription error: ${transcriptData.error}`);
    }

    const transcript = transcriptData.text;


    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Summarize the following transcript into clear, concise key points:\n\n${transcript}`;
    const result = await model.generateContent(prompt);
    const summary = result.response.text();

  
    const newVedio = new Vedio({
      hashcode: hash,
      vediourl: firebaseUrl,
      transcript,
      summary,
      Users: [user]
    });

    await newVedio.save();
    res.status(200).send(newVedio);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error processing video" });
  }
});

app.post("/askquery",async(req,res)=>{
  const {hash,query}=req.body;
  const data=await Vedio.findOne({hashcode:hash});
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `
    Here is the video transcript and summary:
    Transcript: ${data.transcript}
    Summary: ${data.summary}

    User question: ${query}
    Answer in a clear, concise manner:
    `;
  const result = await model.generateContent(prompt);
  const ans = result.response.text();
  res.status(200).send(ans)
})
app.listen(3001,()=>{
    console.log("server running")
})

