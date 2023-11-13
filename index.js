import dotenv from 'dotenv';
import { config } from 'dotenv';
import express from 'express';
import {createProxyMiddleware} from 'http-proxy-middleware';
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



app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));
// { origin: '*' ,
// methods:"GET,POST,PUT,DELETE,PATCH",
// credentials:true}
app.get('/a1/b1/:linkId',(req,res)=>{
    let linkId = req.params.linkId;
    res.redirect(`http://localhost:3000/Linkhub/screen/${linkId}`)
});


app.use('/', router);


app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})