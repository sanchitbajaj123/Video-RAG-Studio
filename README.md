# 🎥 Video-RAG-Studio Backend

A **Node.js backend API** that processes video URLs to create a **Retrieval-Augmented Generation (RAG)** system.  
This application uses a **multi-step process** to transcribe, summarize, and answer questions about video content.

---

## ✨ Features

- **Video Processing**: Accepts a Firebase video URL for processing.  
- **Hash-based Caching**: Checks for existing videos using a unique hash to prevent reprocessing, improving efficiency.  
- **Audio Transcription**: Integrates with [AssemblyAI](https://www.assemblyai.com/) to convert video audio into text transcripts.  
- **Contextual Summarization**: Leverages the **Google Gemini API** (`gemini-1.5-flash`) to generate concise summaries from the full transcript.  
- **Semantic Question Answering**: Uses the Gemini API to answer natural language queries based on the video's transcript and summary.  
- **Data Persistence**: Stores video transcripts, summaries, and associated user data in a **MongoDB** database.

---

## ⚙️ Technologies Used

- **Node.js** – JavaScript runtime environment  
- **Express.js** – Web framework for building API endpoints  
- **Mongoose** – ODM library for MongoDB  
- **Axios** – HTTP client for API requests  
- **AssemblyAI** – Video transcription  
- **Google Gemini API** – Text summarization & Q&A  
- **dotenv** – Manage environment variables  
- **CORS** – Handle cross-origin requests

---


