import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import roleChangeRoutes from './routes/rolechange.routes.js';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin:"*",credentials:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/admin', roleChangeRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



const start=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    }catch(error){
       console.log(error);
    }

}

start();