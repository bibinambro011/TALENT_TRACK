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
import connection from '../backend/src/database/connection';

dotenv.config();

const app: Application = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS options
const io = new SocketIOServer(server, {
  pingTimeout:10000,
  cors: {
    origin: "https://talent-track-frontend-one.vercel.app",
  },
});

// Middleware
app.use(express.json());
app.use(cors({ origin: 'https://talent-track-frontend-one.vercel.app' }));
app.use('/image', express.static(path.join(__dirname, 'image')));
app.use(errorHandlingMiddleware);

// Routes
app.use('/users', router);
app.use('/agents', agentRouter);
app.use('/admin', adminRouter);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on("newMessage",(data)=>{
    io.emit("messageReceived", data);
  })
  {

  }

  
});


// Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Database connection
connectToDatabase();
