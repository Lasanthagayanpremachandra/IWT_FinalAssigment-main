# WMT SE2020 Final Assignment: Velora Events

Velora Events is an event-booking application with an Expo frontend and an Express API backed by MongoDB Atlas.

## Live Application

- Frontend: [https://frontend-delta-six-33.vercel.app](https://frontend-delta-six-33.vercel.app)
- Backend API: [https://backend-nine-flame-29.vercel.app](https://backend-nine-flame-29.vercel.app)
- Events endpoint: [https://backend-nine-flame-29.vercel.app/api/events](https://backend-nine-flame-29.vercel.app/api/events)

## Project Structure

- `frontend/` - Expo and React Native application, also exported for web.
- `backend/` - Express API, authentication, events, bookings, and MongoDB integration.

## Run Locally

Use Node.js and npm. Install and start the backend in one terminal:

```sh
cd backend
npm install
cp .env.example .env
```

Set `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in `backend/.env`, then run:

```sh
npm run dev
```

Install and start the frontend in a second terminal:

```sh
cd frontend
npm install
npx expo start
```

Press `w` in the Expo terminal to open the web app. Web development defaults to `http://localhost:5001/api`; set `EXPO_PUBLIC_API_URL` before starting Expo to use another API URL.

## Deployment

The frontend and backend are separate Vercel projects. Their production URLs are listed above. The frontend uses `EXPO_PUBLIC_API_URL` to reach the backend.

Configure these variables in the Vercel **backend** project:

- `MONGO_URI` - MongoDB Atlas connection string.
- `JWT_SECRET` - long, randomly generated signing secret.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` - production administrator credentials; keep the password sensitive.

Configure this variable in the Vercel **frontend** project:

- `EXPO_PUBLIC_API_URL=https://backend-nine-flame-29.vercel.app/api`

Event images are stored in MongoDB GridFS rather than Vercel's temporary filesystem. Image uploads are limited to 5 MB.

## Network Access

MongoDB Atlas currently allows access from `0.0.0.0/0` so Vercel's serverless backend can connect. This permits connections from any IP. Restrict this to fixed Vercel egress IPs if available for the account; Vercel Advanced Networking requires a paid plan.