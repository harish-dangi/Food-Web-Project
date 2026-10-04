import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser'
import Router from './routes/auth.routes.js';
import Routeritems from './routes/items.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import RouterCart from './routes/cart.routes.js';
import orderRouter from './routes/order.routes.js';
// import cors from 'cors';
const app = express();

//MIDDLEWARE

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5173",
  "https://food-web-project-pi.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)


//PREFIX/ROUTES
app.use('/api/auth', Router);
app.use('/upload', express.static(path.join(__dirname, 'upload')))
app.use('/api/items', Routeritems)
app.use('/api/cart', RouterCart)
app.use('/api/order', orderRouter)
export default app


