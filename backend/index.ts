
import connectToDatabase from "../backend/src/database/connection"
import express, {  Request, Response , Application, } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import router from  "../backend/src/database/modules/controllers/routes/userRoute"
import agentRouter from "../backend/src/database/modules/controllers/routes/agentRoute"
import adminRouter from "../backend/./src/database/modules/controllers/routes/adminRoute"
import * as path from 'path';
import errorHandlingMidleware from "./midlewares/errorhandling";

dotenv.config()


const app:Application=express()
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}))
app.use('/image', express.static(path.join(__dirname, 'image')));
app.use(errorHandlingMidleware)
app.use('/users', router);
app.use("/agents",agentRouter);
app.use("/admin",adminRouter)
const PORT = process.env.PORT || 4000;
connectToDatabase();
app.listen(PORT, () => {
  console.log(`port is running at port number ${PORT}`);
});
