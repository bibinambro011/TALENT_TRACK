import express, { Request, Response, Application } from 'express';
import http from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectToDatabase from '../backend/src/database/connection';
import router from '../backend/src/database/modules/controllers/routes/userRoute';
import agentRouter from '../backend/src/database/modules/controllers/routes/agentRoute';
import adminRouter from '../backend/src/database/modules/controllers/routes/adminRoute';
import errorHandlingMiddleware from './midlewares/errorhandling';

dotenv.config();

const app: Application = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS options
const io = new SocketIOServer(server, {
  pingTimeout:10000,
  cors: {
    origin: "http://localhost:4200",
  },
});

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use('/image', express.static(path.join(__dirname, 'image')));
app.use(errorHandlingMiddleware);

// Routes
app.use('/users', router);
app.use('/agents', agentRouter);
app.use('/admin', adminRouter);

// Socket.io connection handling
// io.on('connection', (socket: Socket) => {
//   console.log('A user connected');

  // socket.on('message', (message:any) => {

  //   io.emit("message", message);
  // });

  // Add your socket.io event listeners here

  
  // socket.on("setup",(userdata:any)=>{
  //   socket.join(userdata.userId)
  //   console.log('socket user id is==>',userdata.userId)
  //   socket.emit("connected")
  // })
  // socket.on("join chat",(room:any)=>{
  //   socket.join(room)
  //   console.log("user joined room ", room)
  // })
// });

// Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Database connection
connectToDatabase();
