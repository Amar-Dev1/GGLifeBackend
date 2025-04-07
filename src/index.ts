import express from "express";
import routes from "./routes/index";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
