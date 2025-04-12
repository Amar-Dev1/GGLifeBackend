import dotenv from "dotenv";
import app from "./app";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

dotenv.config();

const PORT = process.env.PORT || 3000;

app.delete('/dd', async (req, res)=>{
await prisma.user.deleteMany()
res.send('deleted')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
