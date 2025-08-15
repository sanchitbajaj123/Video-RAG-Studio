const mon=require("mongoose");
const Vedioschema= new mon.Schema({
    hashcode:String,
    vediourl:String,
    Users:[],
    transcript:String,
    summary:String
},{timestamps:true})

const Vedio=mon.model("Vedios",Vedioschema)
module.exports=Vedio;