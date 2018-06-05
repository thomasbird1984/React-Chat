// require dependencies
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");

// import the Routers
const ChatRouter = require("./src/routes/ChatRouter");
const UserRouter = require("./src/routes/UserRouter");

// import controllers
const ChatController = require("./src/controllers/ChatController");
const chat = new ChatController();

// define the port to be used
const port = 4500;

// instantiate express
const app = express();

// create the server instance
const server = http.createServer(app);

/**
 * Socket io
 * @type {Server}
 */
const io = socketIO(server);

// establish socket connection
io.on("connection", socket => {
    console.log("Connected");

    // Receive an event
    socket.on("message-sent", (data) => {
      const returnMsg = chat.addMessage(data);

      // emit the event
      if(returnMsg) {
        io.sockets.emit("message-received", returnMsg);
      } else {
        io.sockets.emit("message-failed", { errors: true });
      }
    });

    // disconnect from the socket
    socket.on("disconnect", () => {
        console.log("Disconnected");
    });
});

/**
 * Express
 */
// set cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// configure parser for post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/api/messages", ChatRouter);
app.use("/api/users", UserRouter);

// start listening
server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});