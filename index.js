import dotenv from 'dotenv';
import { config } from 'dotenv';
import express from 'express';
import httpProxy from 'http-proxy';
const proxy = httpProxy.createServer({});
import path from 'path';
import knex from 'knex';
import cors from 'cors';
const app = express();
import router from './routes/index.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

dotenv.config();
const PORT = 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



const corsOptions = {
    origin: ['http://178.16.138.73:3000', 'http://178.16.138.73:5000'],
    optionsSuccessStatus: 200,
  };
  
  app.options("*", cors(corsOptions));
  
  app.use(cors(corsOptions));
// { origin: '*' ,
// methods:"GET,POST,PUT,DELETE,PATCH",
// credentials:true} 178.16.138.73
// Serve the main HTML file for all routes
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../LinkhubFrontend/build/index.html'));
//   });
app.get('/a1/b1/:linkId',(req,res)=>{
    let linkId = req.params.linkId;
   res.redirect(`http://178.16.138.73:3000/Linkhub/screen/${linkId}`);
   
});


app.use('/', router);


app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})