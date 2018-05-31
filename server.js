const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");

const ChatRouter = require("./src/routes/ChatRouter");

const port = 4500;

const app = express();

const server = http.createServer(app);

/**
 * Socket io
 * @type {Server}
 */
const io = socketIO(server);

io.on("connection", socket => {
    console.log("Connected");

    socket.on("message-sent", (msg) => {
      console.log(`New message: ${msg}`);

      io.sockets.emit("message-received", {
        text: msg,
        date: new Date()
      });
    });

    socket.on("disconnect", () => {
        console.log("Disconnected");
    });
});

/**
 * Express
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/messages", ChatRouter);

server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});