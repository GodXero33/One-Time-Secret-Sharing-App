# One-Time Secret Sharing App

Share sensitive information **once** and never worry again.  
This full-stack web app lets users securely share secrets with password protection and one-time view functionality.

---

## Features

- One-time secret sharing
- Password protection
- Access logging
- User authentication (Sign up / Login)
- React frontend with Bootstrap UI
- Express REST API backend (Node.js + TypeScript)

---

## Tech Stack

| Frontend | Backend         | Database |
|----------|------------------|----------|
| React    | Node.js + Express | MySQL    |
| TypeScript | TypeScript     |          |
| React Bootstrap | Nodemon (dev) |        |

---

## Project Structure

```

One-Time-Secret-Sharing-App/
├── docs/                          # Documentation and database schema
│   ├── db.sql
│   └── Full-Stack Task.pdf
├── One-Time-Secret-Sharing-App-Backend/  # Express backend
│   ├── src/
│   │   ├── db.ts
│   │   └── index.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
├── One-Time-Secret-Sharing-App-Frontend/ # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── index.html
│   └── vite.config.ts
├── .gitignore
└── README.md

````

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/One-Time-Secret-Sharing-App.git
cd One-Time-Secret-Sharing-App
````

---

### 2. Backend Setup

```bash
cd One-Time-Secret-Sharing-App-Backend
npm install
```

#### Create `.env` file

```env
DB_NAME=secret_app

DB_HOST=127.0.0.1
DB_USER=root
DB_PASS=yourpassword
DB_NAME=one_time_secret_sharing_app
JWT_SECRET=secret_app
PORT=8080
```

> Replace DB values based on your MySQL config.

#### Run Backend

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd ../One-Time-Secret-Sharing-App-Frontend
npm install
```

#### Start Frontend Dev Server

```bash
npm run dev
```

---

## Database Setup

1. Open your MySQL client.
2. Run the SQL schema in `docs/db.sql`.

---

##  Author

**GodXero (Sathish Shan)**

---

## License

MIT License
