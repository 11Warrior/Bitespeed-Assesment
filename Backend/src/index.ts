import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import { router } from './routes/route';
import { prisma } from './db/prisma';


const app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL
}))

const PORT = process.env.PORT || 3000

app.use('/api/v1', router)

app.listen(PORT, async () => {
    try {
        await prisma.$connect();
    } catch (error) {
        console.log("Error connecting with the database.");
    }
    console.log('Server is live on port ' + PORT);
})