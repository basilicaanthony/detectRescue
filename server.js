import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { WebSocket, WebSocketServer } from 'ws'; // Import WebSocket and WebSocketServer from 'ws'
import { MongoClient } from 'mongodb';

// routers
import readingRouter from './routes/readingRoutes.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

// middleware
import { authenticateUser } from './middleware/authMiddleware.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './public')));

// Set up middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Route definitions
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' });
});
app.use('/api/v1/reading', authenticateUser, readingRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});
app.use(errorHandlerMiddleware);



// Set up HTTP server
const port = process.env.PORT || 5100;
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// Set up WebSocket server
const wss = new WebSocketServer({ server });

wss.on('connection', ws => {
  console.log('Client connected');

  ws.on('message', message => {
    console.log(`Received message: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// MongoDB connection
// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  const client = new MongoClient(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect(err => {
    if (err) {
      console.error('Failed to connect to MongoDB:', err);
      return;
    }
    console.log('Connected to MongoDB');

    const db = client.db('DetectRescue');
    const collection = db.collection('readings');

    // Create a cursor with an increased batch size
    const cursor = collection.find({}).batchSize(100);

    // Set up change stream on the cursor
    const changeStream = cursor.watch();

    changeStream.on('change', change => {
      if (change.operationType === 'insert') {
        const insertedDocument = change.fullDocument;

        // Notify clients via WebSocket
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'newInput', data: insertedDocument }));
          }
        });
      }
    });

    // Optional: Handle errors
    changeStream.on('error', error => {
      console.error('Change stream error:', error);
    });

    // Optional: Handle client connection errors
    wss.on('error', error => {
      console.error('WebSocket server error:', error);
    });
  });
})
.catch(error => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});
