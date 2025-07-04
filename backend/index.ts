// Load environment variables as early as possible
import dotenv from 'dotenv';
dotenv.config(); // ✅ Ensure env vars are available before any other imports

// Core & third-party modules
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Custom modules (which might rely on env vars)
import { connectDB } from './config/dbConnect';
import { corsOptions } from './config/corsOption';
import courseRoute from './routes/courseRoute';
import { registerRoute } from './routes/registerRoute';
import { authRoute } from './routes/authRoute';
import { getMeRoute } from './routes/getMeRoute';
import { refreshRoute } from './routes/refreshRoute';

import { purchaseRoute } from './routes/purchaseRoute';
import { myCourseRoute } from './routes/myCoursesRoute';
import { linkRoute } from './routes/linkRoute';
import siteConfigRouter from './routes/siteSettingRouter';
import { contactRoute } from './routes/contactRoute';
import notesRouter from './routes/notesRoute';
import { userRouter } from './routes/userRoute';

const app = express();
const PORT = process.env.PORT || 3000;



// Middleware configuration
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Ensure DB is connected before starting the server
connectDB().then(() => {
  // Routes
  app.get('/', (req, res) => {
    res.send({ message: "✅ App is running healthy" });
  });

  app.use('/login', authRoute)
  app.use('/register', registerRoute )
  app.use('/me', getMeRoute);
  app.use('/refresh', refreshRoute)

  app.use('/api/courses',  courseRoute)
  app.use('/api/purchase', purchaseRoute)
  app.use('/api/links', linkRoute);

  app.use('/api/site-config', siteConfigRouter);
  app.use('/api/student/my-courses', myCourseRoute)
  app.use('/api/contact', contactRoute);
  app.use('/api/notes', notesRouter); 

  app.use('/api/user', userRouter);
  // Catch-all route for undefined routes

  app.use((req, res) => {
    res.status(404).send({ message: "❌ Route not found" });
  });


  // Start server 
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on PORT: ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Failed to connect to database", err);
  process.exit(1); // Exit if DB connection fails
});


