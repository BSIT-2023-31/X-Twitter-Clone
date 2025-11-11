import express from 'express';
import authRoutes from './routes/auth-Routes.js';
import dotenv from 'dotenv';
import mongooseConnections from './config/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




app.use('/api/auth', authRoutes);

// Connect to MongoDB first, then start the server
mongooseConnections().then(() => {
  app.listen(3000, () => {
    console.log("Server is started in Port http://localhost:3000");
  });
}).catch(err => {
  console.error("Failed to connect to MongoDB:", err);
});