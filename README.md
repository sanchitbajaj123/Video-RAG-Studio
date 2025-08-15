<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Video-RAG-Studio README</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f3f4f6;
        }
    </style>
</head>
<body class="p-4 sm:p-8">
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10 border border-gray-200">

        <!-- Title -->
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Video-RAG-Studio Backend</h1>
        <p class="text-gray-600 mb-8 leading-relaxed">
            A Node.js backend API that processes video URLs to create a Retrieval-Augmented Generation (RAG) system. This application uses a multi-step process to transcribe, summarize, and answer questions about video content.
        </p>

        <!-- Features Section -->
        <div class="space-y-6">
            <h2 class="text-2xl sm:text-3xl font-semibold text-gray-700 mb-4">✨ Features</h2>
            <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li><b class="font-semibold text-gray-800">Video Processing</b>: Accepts a Firebase video URL for processing.</li>
                <li><b class="font-semibold text-gray-800">Hash-based Caching</b>: Checks for existing videos using a unique hash to prevent reprocessing, improving efficiency.</li>
                <li><b class="font-semibold text-gray-800">Audio Transcription</b>: Integrates with <b>AssemblyAI</b> to convert video audio into text transcripts.</li>
                <li><b class="font-semibold text-gray-800">Contextual Summarization</b>: Leverages the <b>Google Gemini API</b> (`gemini-1.5-flash`) to generate concise summaries from the full transcript.</li>
                <li><b class="font-semibold text-gray-800">Semantic Question Answering</b>: Uses the Gemini API to answer natural language queries based on the video's transcript and summary.</li>
                <li><b class="font-semibold text-gray-800">Data Persistence</b>: Stores video transcripts, summaries, and associated user data in a <b>MongoDB</b> database.</li>
            </ul>
        </div>
        <hr class="my-8 border-gray-300">

        <!-- Technologies Section -->
        <div class="space-y-6">
            <h2 class="text-2xl sm:text-3xl font-semibold text-gray-700 mb-4">⚙️ Technologies Used</h2>
            <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li><b class="font-semibold text-gray-800">Node.js</b>: The JavaScript runtime environment.</li>
                <li><b class="font-semibold text-gray-800">Express.js</b>: A web framework for building the API endpoints.</li>
                <li><b class="font-semibold text-gray-800">Mongoose</b>: An ODM (Object Data Modeling) library for MongoDB.</li>
                <li><b class="font-semibold text-gray-800">Axios</b>: A promise-based HTTP client for making API requests.</li>
                <li><b class="font-semibold text-gray-800">AssemblyAI</b>: For video transcription.</li>
                <li><b class="font-semibold text-gray-800">Google Gemini API</b>: For text summarization and question answering.</li>
                <li><b class="font-semibold text-gray-800">`dotenv`</b>: For managing environment variables.</li>
                <li><b class="font-semibold text-gray-800">CORS</b>: For handling Cross-Origin Resource Sharing.</li>
            </ul>
        </div>
        <hr class="my-8 border-gray-300">

        <!-- Getting Started Section -->
        <div class="space-y-6">
            <h2 class="text-2xl sm:text-3xl font-semibold text-gray-700 mb-4">🚀 Getting Started</h2>
            
            <h3 class="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">Prerequisites</h3>
            <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li>Node.js (v14 or higher)</li>
                <li>npm (Node Package Manager)</li>
            </ul>

            <h3 class="text-xl sm:text-2xl font-semibold text-gray-700 mt-6 mb-2">Configuration</h3>
            <ol class="list-decimal list-inside space-y-2 text-gray-600">
                <li>Create a <code class="bg-gray-100 px-1 py-0.5 rounded text-sm text-gray-800">.env</code> file in the root directory of the project.</li>
                <li>Add the following environment variables, which are required for the application to function:
                    <pre class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto mt-2"><code>Mongourl=&lt;your_mongodb_connection_string&gt;
ASSEMBLY_API_KEY=&lt;your_assemblyai_api_key&gt;
GEMINI_API_KEY=&lt;your_google_gemini_api_key&gt;
</code></pre>
                </li>
            </ol>
        </div>
        <hr class="my-8 border-gray-300">

        <!-- API Endpoints Section -->
        <div class="space-y-6">
            <h2 class="text-2xl sm:text-3xl font-semibold text-gray-700 mb-4">🖥️ API Endpoints</h2>
            
            <!-- /checkhash -->
            <h3 class="text-xl sm:text-2xl font-semibold text-gray-700 mt-6 mb-2">1. <code class="bg-gray-100 px-1 py-0.5 rounded text-sm text-gray-800">POST /checkhash</code></h3>
            <p class="text-gray-600">Checks if a video with a given hash already exists in the database. If it does, it associates a new user with the video.</p>
            <b class="font-semibold text-gray-800 block mt-4">Request Body:</b>
            <pre class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto mt-2"><code>{
  "hash": "string",
  "user": "string"
}</code></pre>
            <b class="font-semibold text-gray-800 block mt-4">Responses:</b>
            <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li><b>200 OK</b>: Video found. Returns the existing video document.</li>
                <li><b>205 Reset Content</b>: Video not found.</li>
                <li><b>500 Internal Server Error</b>: An error occurred.</li>
            </ul>

            <!-- /vedioupload -->
            <h3 class="text-xl sm:text-2xl font-semibold text-gray-700 mt-6 mb-2">2. <code class="bg-gray-100 px-1 py-0.5 rounded text-sm text-gray-800">POST /vedioupload</code></h3>
            <p class="text-gray-600">Initiates the video processing pipeline. It transcribes the video, summarizes it, and saves the data to the database.</p>
            <b class="font-semibold text-gray-800 block mt-4">Request Body:</b>
            <pre class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto mt-2"><code>{
  "firebaseUrl": "string",
  "hash": "string",
  "user": "string"
}</code></pre>
            <b class="font-semibold text-gray-800 block mt-4">Responses:</b>
            <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li><b>200 OK</b>: Video successfully processed and saved. Returns the new video document.</li>
                <li><b>400 Bad Request</b>: Missing <code class="bg-gray-100 px-1 py-0.5 rounded text-sm text-gray-800">firebaseUrl</code> or <code class="bg-gray-100 px-1 py-0.5 rounded text-sm text-gray-800">hash</code>.</li>
                <li><b>500 Internal Server Error</b>: An error occurred during processing.</li>
            </ul>

            <!-- /askquery -->
            <h3 class="text-xl sm:text-2xl font-semibold text-gray-700 mt-6 mb-2">3. <code class="bg-gray-100 px-1 py-0.5 rounded text-sm text-gray-800">POST /askquery</code></h3>
            <p class="text-gray-600">Generates an answer to a user's question based on a stored video's transcript and summary.</p>
            <b class="font-semibold text-gray-800 block mt-4">Request Body:</b>
            <pre class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto mt-2"><code>{
  "hash": "string",
  "query": "string"
}</code></pre>
            <b class="font-semibold text-gray-800 block mt-4">Responses:</b>
            <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li><b>200 OK</b>: The query was processed. Returns the generated answer as a string.</li>
            </ul>
        </div>
        
    </div>
</body>
</html>
