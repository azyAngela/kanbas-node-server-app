import express from 'express';
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import "dotenv/config";
import UserRoutes from "./users/routes.js";
import mongoose from "mongoose";
import session from "express-session";
import "dotenv/config";
// const CONNECTION_STRING = "mongodb+srv://giuseppi:supersecretpassword@cluster0.p7nv51b.mongodb.net/?retryWrites=true&w=majority";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING);
const app = express()
app.use(cors(
    {
        credentials: true,
        // origin: "http://localhost:3000",
        // origin: process.env.FRONTEND_URL,
        origin: 'https://a6--celadon-cocada-27f202.netlify.app/',
    }
));
// const sessionOptions = {
//     secret: "any string",
//     resave: false,
//     saveUninitialized: false,
//   };
//   app.use(
//     session(sessionOptions)
//   );
  
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
app.use(session(sessionOptions));
  
app.use(express.json());
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Hello(app)
Lab5(app);
app.listen(process.env.PORT || 4000);