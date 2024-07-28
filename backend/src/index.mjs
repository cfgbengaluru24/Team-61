import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || '3000';

//const allowedOrigins = [];

const corsOptions = {
  origin:"*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 202,
};

//middleware
app.use(cors(corsOptions));
app.use(express.json());

// routes

app.get("/gg", (_, res) => {
  return res.json({ statusCode: 200, body: { message: "Hello world!" } });
});

app.listen(port, () => {
  console.log(`[server]: http://localhost:${port}`);
});


