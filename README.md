# File Uploader

A full-stack file management application built with Node.js, Express, Prisma, and Passport.js. This project is part of The Odin Project curriculum and replicates core features of cloud storage platforms like Google Drive.

## Features

### Authentication

* Session-based authentication using Passport.js
* Persistent sessions stored in the database (Prisma session store)

### Folder Management

* Create, read, update, and delete folders
* Organize files inside folders

### File Details

* View file metadata (name, size, upload date)
* Download files

### Cloud Storage

* Upload files to Supabase
* Store file URLs in the database

## Tech Stack

* Backend: Node.js, Express
* Database ORM: Prisma
* Authentication: Passport.js
* Session Storage: Prisma Session Store
* File Uploads: Multer
* Database: PostgreSQL
* Cloud Storage: Supabase

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/file-uploader.git
cd file-uploader
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Copy the .env.example to .env

```env
cp .env.example .env
```

4. Set up the database:

```bash
npx prisma migrate dev
```

5. Start the server:

```bash
node --watch app.js
```

6. Open in browser:

```
http://localhost:3000
```

## Project Structure

```
├── prisma/           # Prisma schema and migrations
├── routes/           # Express routes
├── controllers/      # Route logic
├── middleware/       # Authentication & upload middleware
├── views/            # EJS templates
├── public/           # Static files (CSS, JS)
├── config/           # Config files for passport.js and supabase
└── app.js            # Entry point
```

## Authentication Flow

* Users register and log in using Passport.js
* Sessions are stored in the database
* Protected routes require authentication

## Future Improvements

* Drag and drop file uploads
* File preview (images, PDFs)
* User storage limits
* Role-based access control
* Improved UI/UX

## What I Learned

* Handling file uploads with Multer
* Managing sessions with Passport.js
* Structuring a full-stack Express application
* Using Prisma for database management

## Acknowledgements

* The Odin Project for the curriculum and guidance
* Open-source libraries and documentation

