import { AddressInfo } from "net";
import dotenv from 'dotenv';
import express from "express";
import cors from "cors"
import { billRouter } from './router/bill-router'

dotenv.config();
const app = express();
app.use(cors({ origin: true }));

app.use(express.json());

app.use("/api/v1/bills", billRouter);

export const server = app.listen(3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running: http://localhost:${address.port}`);
  } else {
    console.error(`Server running failed`);
  }
});
