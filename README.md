Video-RAG-Studio Backend
A Node.js backend API that processes video URLs to create a Retrieval-Augmented Generation (RAG) system. This application uses a multi-step process to transcribe, summarize, and answer questions about video content.

✨ Features
Video Processing: Accepts a Firebase video URL for processing.

Hash-based Caching: Checks for existing videos using a unique hash to prevent reprocessing, improving efficiency.

Audio Transcription: Integrates with AssemblyAI to convert video audio into text transcripts.

Contextual Summarization: Leverages the Google Gemini API (gemini-1.5-flash) to generate concise summaries from the full transcript.

Semantic Question Answering: Uses the Gemini API to answer natural language queries based on the video's transcript and summary.

Data Persistence: Stores video transcripts, summaries, and associated user data in a MongoDB database.

⚙️ Technologies Used
Node.js: The JavaScript runtime environment.

Express.js: A web framework for building the API endpoints.

Mongoose: An ODM (Object Data Modeling) library for MongoDB.

Axios: A promise-based HTTP client for making API requests.

AssemblyAI: For video transcription.

Google Gemini API: For text summarization and question answering.

dotenv: For managing environment variables.

CORS: For handling Cross-Origin Resource Sharing.

🚀 Getting Started
Prerequisites
Node.js (v14 or higher)

npm (Node Package Manager)

Configuration
Create a .env file in the root directory of the project.

Add the following environment variables, which are required for the application to function:

Mongourl=<your_mongodb_connection_string>
ASSEMBLY_API_KEY=<your_assemblyai_api_key>
GEMINI_API_KEY=<your_google_gemini_api_key>

Running the Server
Start the server using the following command:

node <your_entry_file>.js

(Note: If your entry file is app.js or server.js, replace <your_entry_file>.js accordingly.)

🖥️ API Endpoints
1. POST /checkhash
Checks if a video with a given hash already exists in the database. If it does, it associates a new user with the video.

Request Body:

{
  "hash": "string",
  "user": "string"
}

Responses:

200 OK: Video found. Returns the existing video document.

205 Reset Content: Video not found.

500 Internal Server Error: An error occurred.

2. POST /vedioupload
Initiates the video processing pipeline. It transcribes the video, summarizes it, and saves the data to the database.

Request Body:

{
  "firebaseUrl": "string",
  "hash": "string",
  "user": "string"
}

Responses:

200 OK: Video successfully processed and saved. Returns the new video document.

400 Bad Request: Missing firebaseUrl or hash.

500 Internal Server Error: An error occurred during processing.

3. POST /askquery
Generates an answer to a user's question based on a stored video's transcript and summary.

Request Body:

{
  "hash": "string",
  "query": "string"
}

Responses:

200 OK: The query was processed. Returns the generated answer as a string.Video-RAG-Studio Backend
A Node.js backend API that processes video URLs to create a Retrieval-Augmented Generation (RAG) system. This application uses a multi-step process to transcribe, summarize, and answer questions about video content.

✨ Features
Video Processing: Accepts a Firebase video URL for processing.

Hash-based Caching: Checks for existing videos using a unique hash to prevent reprocessing, improving efficiency.

Audio Transcription: Integrates with AssemblyAI to convert video audio into text transcripts.

Contextual Summarization: Leverages the Google Gemini API (gemini-1.5-flash) to generate concise summaries from the full transcript.

Semantic Question Answering: Uses the Gemini API to answer natural language queries based on the video's transcript and summary.

Data Persistence: Stores video transcripts, summaries, and associated user data in a MongoDB database.

⚙️ Technologies Used
Node.js: The JavaScript runtime environment.

Express.js: A web framework for building the API endpoints.

Mongoose: An ODM (Object Data Modeling) library for MongoDB.

Axios: A promise-based HTTP client for making API requests.

AssemblyAI: For video transcription.

Google Gemini API: For text summarization and question answering.

dotenv: For managing environment variables.

CORS: For handling Cross-Origin Resource Sharing.

🚀 Getting Started
Prerequisites
Node.js (v14 or higher)

npm (Node Package Manager)

Configuration
Create a .env file in the root directory of the project.

Add the following environment variables, which are required for the application to function:

Mongourl=<your_mongodb_connection_string>
ASSEMBLY_API_KEY=<your_assemblyai_api_key>
GEMINI_API_KEY=<your_google_gemini_api_key>

Running the Server
Start the server using the following command:

node <your_entry_file>.js

(Note: If your entry file is app.js or server.js, replace <your_entry_file>.js accordingly.)

🖥️ API Endpoints
1. POST /checkhash
Checks if a video with a given hash already exists in the database. If it does, it associates a new user with the video.

Request Body:

{
  "hash": "string",
  "user": "string"
}

Responses:

200 OK: Video found. Returns the existing video document.

205 Reset Content: Video not found.

500 Internal Server Error: An error occurred.

2. POST /vedioupload
Initiates the video processing pipeline. It transcribes the video, summarizes it, and saves the data to the database.

Request Body:

{
  "firebaseUrl": "string",
  "hash": "string",
  "user": "string"
}

Responses:

200 OK: Video successfully processed and saved. Returns the new video document.

400 Bad Request: Missing firebaseUrl or hash.

500 Internal Server Error: An error occurred during processing.

3. POST /askquery
Generates an answer to a user's question based on a stored video's transcript and summary.

Request Body:

{
  "hash": "string",
  "query": "string"
}

Responses:

200 OK: The query was processed. Returns the generated answer as a string.
