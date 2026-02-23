import express from 'express';
import { config } from '@repo/config';
import morgan from 'morgan';
import apiV1Route from './routes/api/v1/index.js';
import { Logger } from '@repo/lib';
import { prismaClient } from '@repo/db';

const app = express();

const PORT = config.port || 3001;


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", apiV1Route);



const start = async () => {
  try {
    await prismaClient.$connect();
    Logger.info("Connected to DB");

    //starting the server on port 
    app.listen(PORT, (err) => {
      if (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
      }
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    Logger.error("Failed to connect with DB", error);
    process.exit(1);
  }
}

start();
