# Translatoverse

**Translatoverse** is a multilingual translation web platform that provides seamless translation services across a variety of formats, including PDF, images, handwritten text, voice, and more. Users can easily translate and interact with content in different languages, save bookmarks for quick access, and track their translation history. The app also supports features like download options in various formats (PDF, image, MP3), copying, sharing, and managing a personalized translation history. It utilizes Clerk for authentication, Flask for the backend, and Next.js for the frontend.

## Features

- **Translate Text**: Translate text between different languages quickly and accurately.
- **Translate PDF & Images**: Upload and translate PDF files and images with embedded text.
- **Handwritten Text Translation**: Capture and translate handwritten text using advanced recognition algorithms.
- **Voice Translation**: Upload audio files to translate spoken language into text.
- **Download Translations**: Download translated content in PDF, image, and MP3 formats.
- **Copy, Share, and Bookmark**: Copy translated text, share the translations, and save bookmarks for easy access to frequent translations.
- **History Tracking**: Keep track of all translations in your history for future reference.
- **Authentication**: Secure login and registration through Clerk authentication.
- **Backend**: Flask-based API for processing translations, managing bookmarks, and handling user authentication.
- **Frontend**: Next.js for the responsive and dynamic frontend interface.

## 🚀 Tech Stack

- **Frontend**: 
  - **Next.js** for server-side rendering, routing, and dynamic components.
  - **React** for building user interfaces.
  - **Tailwind CSS** for responsive and utility-first styling.

- **Backend**:
  - **Flask** for handling API requests and managing backend logic.
  - **MongoDB** for storing user data, translation history, and bookmarks.
  - **Mongoose** for data modeling with MongoDB.

- **Authentication**: 
  - **Clerk** for secure user authentication and session management.

## Setup Instructions

### Prerequisites

- **Node.js** (>=14.x)
- **npm** or **yarn** for package management
- **Python** (>=3.7)
- **MongoDB** (local or cloud-based like MongoDB Atlas)
- **Clerk Account** for authentication setup

## Frontend Setup (Next.js)

1. **Navigate to the frontend directory:**

    ```bash
    cd translatoverse/client
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Create a `.env.local` file and add your Clerk API keys and other necessary environment variables:**

    ```env
    NEXT_PUBLIC_CLERK_FRONTEND_API=<Your Clerk Frontend API>
    CLERK_API_KEY=<Your Clerk API Key>
    ```

4. **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Your app will be available at [http://localhost:3000](http://localhost:3000).

---

## Backend Setup (Flask)

1. **Navigate to the backend directory:**

    ```bash
    cd translatoverse/server
    ```

2. **Set up a virtual environment and activate it:**

    ```bash
    python -m venv venv
    # On Windows:
    venv\Scripts\activate
    # On macOS/Linux:
    source venv/bin/activate
    ```

3. **Install backend dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Create a `.env` file and add your MongoDB URI and Clerk API credentials:**

    ```env
    MONGO_URI=<Your MongoDB URI>
    CLERK_API_KEY=<Your Clerk API Key>
    ```

5. **Start the Flask server:**

    ```bash
    flask run
    ```

    The API will be available at [http://localhost:5000](http://localhost:5000).

---

## MongoDB Setup

Ensure MongoDB is running (locally or on a cloud service like MongoDB Atlas). Set up the database connection in the backend `.env` file.

---

## Clerk Authentication

Create a Clerk account and obtain your API keys. Update the `.env.local` and `.env` files with your Clerk credentials for the frontend and backend respectively.

---
