import express from 'express';
import { config } from '@repo/config';
import morgan from 'morgan';
import apiV1Route from './routes/api/v1/index.js';
import { Logger } from '@repo/lib';
import { prismaClient } from '@repo/db';
import color from 'colors/safe.js';

const app = express();

const PORT = config.port || 3001;


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", apiV1Route);



const start = async () => {
  try {
    await prismaClient.$connect();
    console.log(color.bgYellow("Connected to DB"));

    //starting the server on port 
    app.listen(PORT, (err) => {
      if (err) {
        console.error(color.bgRed(`Failed to start server: ${err}`));
        process.exit(1);
      }
      console.log(color.bgGreen(`Server is running on port ${PORT}`));
    });

  } catch (error) {
    console.error(color.bgRed(`Failed to connect with DB : ${error}`));
    process.exit(1);
  }
}

start();
