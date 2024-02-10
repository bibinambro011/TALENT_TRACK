
import connectToDatabase from "../backend/src/database/connection"
import express, {  Request, Response , Application, } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import router from  "../backend/src/database/modules/controllers/routes/userRoute"
import agentRouter from "../backend/src/database/modules/controllers/routes/agentRoute"
import adminRouter from "../backend/./src/database/modules/controllers/routes/adminRoute"
dotenv.config()


const app:Application=express()
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}))
app.use('/users', router);
app.use("/agents",agentRouter);
app.use("/admin",adminRouter)
const PORT = process.env.PORT || 3000;
connectToDatabase();
app.listen(PORT, () => {
  console.log("port is running at port number 3000");
});
