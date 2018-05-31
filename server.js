const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");

const ChatRouter = require("./src/routes/ChatRouter");
const UserRouter = require("./src/routes/UserRouter");

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
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/messages", ChatRouter);
app.use("/api/users", UserRouter);

server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});