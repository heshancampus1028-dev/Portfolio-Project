# Heshan Madhuwantha — Portfolio (MERN Stack)

Practical Guide 09 submission: a personal portfolio website with a Home, About,
Projects, and Admin page. Project data is stored in MongoDB and managed
through a simple admin dashboard, using the exact layout/design from the
practical guide.

## Project structure

```
portfolio-project/
├── server/      Express + MongoDB (Mongoose) REST API
└── client/      React (Vite) frontend
```

## Prerequisites

- Node.js 18+
- MongoDB running locally (`mongod`) or a MongoDB Atlas connection string

## 1. Backend setup

```bash
cd server
npm install
cp .env.example .env      # then edit MONGO_URI if needed
npm run dev                # starts on http://localhost:5000
```

Optional — pre-fill the database with the three sample projects shown in the
mockup (Portfolio Website, Task Manager, Weather Dashboard):

```bash
node seed.js
```

### API endpoints

| Method | Endpoint            | Description          |
|--------|---------------------|-----------------------|
| GET    | /api/projects       | List all projects     |
| GET    | /api/projects/:id   | Get one project       |
| POST   | /api/projects       | Create a project       |
| PUT    | /api/projects/:id   | Update a project       |
| DELETE | /api/projects/:id   | Delete a project       |

## 2. Frontend setup

Open a second terminal:

```bash
cd client
npm install
npm run dev                 # starts on http://localhost:5173
```

The Vite dev server proxies `/api/*` requests to `http://localhost:5000`
(see `client/vite.config.js`), so keep the backend running while you use the
site.

Visit **http://localhost:5173** and you'll see:

- **Home** — intro card with your name, role, and bio
- **About** — About Me, Education, Skills, and Contact
- **Projects** — cards pulled live from MongoDB via the API
- **Admin** — add, edit, and delete projects; changes are saved to MongoDB
  and immediately reflected on the Projects page

## Notes for the report / submission

- Take screenshots of each of the 4 pages plus the Admin add/edit/delete flow.
- The `technologies` field in the Admin form accepts a comma-separated list
  (e.g. `React, MongoDB, Express`) and is stored as an array in MongoDB.
- The "Project Link" field is optional — if left blank, "View project" simply
  won't render on that project's card, per the requirements.
