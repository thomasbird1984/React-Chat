// require dependencies
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");

// import the Routers
const ChatRouter = require("./src/routes/ChatRouter");
const UserRouter = require("./src/routes/UserRouter");

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
    socket.on("message-sent", (msg) => {
      console.log(`New message: ${msg}`);
      // emit the event
      io.sockets.emit("message-received", {
        text: msg,
        date: new Date()
      });
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