import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from "mongoose";
import morgan from 'morgan';
import router from './router/route.js';
const app = express();

/** middlewares */
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack

const PORT = 8081;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});


/** api routes */
app.use('/api', router)


/** start server only when we have valid connection */
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true,useUnifiedTopology:true,})
.then(() => {
    console.log('mongoose connected')
})
.catch((err) => console.log(err));
app.listen(PORT, ()=>{
    console.log("server is at http://localhost:" + PORT);
})