import express from "express";
import { createServer } from 'https';
import fs from 'fs';
import cors from 'cors';
import { Server } from 'socket.io';
import { socketRouter } from "./routes/socketRoutes";

const app = express();
app.use(express.json());
app.use(cors());

const CREDENTIALS = {
  key: fs.readFileSync(`${__dirname}/../ssl_cert/server.pem`),
  cert: fs.readFileSync(`${__dirname}/../ssl_cert/server.crt`)
};

const OPTIONS = {
  cors: { origin: '*'}
};

const SECURE_PORT = 8443;

const httpsServer = createServer(CREDENTIALS, app);
const io = new Server(httpsServer, OPTIONS);

const SOLO_SERVER_ROOMS = {

};

const DUO_SERVER_ROOMS = {};

// {
//     leader,
//     gameType,
//     players,
//     waiting,
// }

app.get("/", (req, res) => {
  res.send("NO-U");
});

io.on("connection", socketRouter);

app.listen(SECURE_PORT, () => {
  console.log(`Express server listening on https port: ${SECURE_PORT}`)
});