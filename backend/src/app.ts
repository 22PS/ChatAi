import express from 'express';
import { config } from 'dotenv';
config();
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
const app = express();
import cors from 'cors';
//middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
/*
// app.get('/hello', (req, res, next) => {
//   return res.send('Hello');
// });

// app.post('/hello', (req, res, next) => {
//   console.log(req.body.name);
//   return res.send('Hello');
// });

// app.put('/hello', (req, res, next) => {
//   console.log(req.body.name);
//   return res.send('Hello');
// });

// app.delete('/hello', (req, res, next) => {
//   console.log(req.body.name);
//   return res.send('Hello');
// });

app.delete('/user/:id', (req, res, next) => {
  console.log(req.params.id);
  return res.send('Hello');
}); // dynamic route
*/

// remove it from production
app.use(morgan('dev'));
app.use('/api/v1', appRouter);

export default app;
