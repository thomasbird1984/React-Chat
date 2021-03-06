# React Chat App
React Chat app is a simple prototype I am building as a proof of concept and to learn a couple new technologies in addition to learning how they can also work in conjunction with each other to create a modern, flexible and responsive ui system that supports realtime interaction.

### Install & Startup

| Run the following commands:   | Description                                               |
|-------------------------------|-----------------------------------------------------------|
| `npm install`                 | Install packages                                          |
| `node server.js`              | Spin up socket by running the following command           |
| `npm start`                   | Spin up the react localhost                               |
| `mongod`                      | Spin up mongodb locally                                   |
| `mongo`                       | Open a connection via terminal to the running instance    |
| `use react-chat`              | Tell mongo to use react-chat                              |


### Socket.io Interaction
Sockets are very simple easy to use realtime tools. At the base there are events, that are emitted to notify the server or the client that something has happened. With those events data can be passed usually information to explain what happened. In the instance of this app, the most common event is `message-received` this signifies that a user has typed a message and clicked send. This event passes a message object that holds the timestamp the message was created, the message and userId for display in the template.

**A simple exampe of emitting an event:**
```
io.sockets.emit("message-received", {
    text: msg,
    date: new Date()
});
```

**Here is an example of listening for that event:**
```
this.socket.on("message-received", (msg) => {
    const previous = this.state.messages;
    previous.unshift(msg);
    this.setState({
        messages: previous
    });
});
```

### Server
The server is a simple implementation of ExpressJS on top of NodeJS, it will utilize eventually utilize MongoDB to store chat data so that it can be persisted later on. It will also be used to store user information.

### Technologies Used

| Technology                        | Description                                                                                                                                                           |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [ReactJS][react-site]             | An easy to use javascript framework for building responsive ui's                                                                                                      |
| [ReactRouter][react-router-site]  | A dynamic easy to use routing system                                                                                                                                  |
| [NodeJS][node-site]               | Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.                                                                         |
| [ExpressJS][express-site]         | Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.                           |
| [SocketIO][socket-site]           | Socket.IO enables real-time bidirectional event-based communication. It works on every platform, browser or device, focusing equally on reliability and speed.        |
| [MomentJS][moment-site]           | Parse, validate, manipulate, and display dates and times in JavaScript.                                                                                               |

### Changelog
1. Add tabs for different chats in the top of the main content area
2. Add ability to login/logout
3. Add ability to signup
4. Build on current message to contain better information
5. Integrate backend with routes and mongo

### Directory Structure
Most of the directory structure follows ReactJS, in fact this structure was generated by the React cli using the this command: `create-react-app <appName>`. I like my components to be slightly more organized so I like to put sub folders in the a components directory inside of the main source directory for different types of components. Which is why you'll see a `forms`, `partials`, etc directories inside the components directory.

```
/
    /node_modules
    /public
    /src
        /components
            /forms
                message-send.js
            /partials
                messages-list.js
            /structural
                sidebar.js
            /views
                About.js
                Home.js
            App.css
            App.js
            index.css
            index.js
            registerServiceWorker.js
        .gitignore
        package.json
        README.md
        server.js

```

[react-site]: <https://reactjs.org/>
[react-router-site]: <https://reacttraining.com/react-router/web/guides/philosophy>
[node-site]: <https://nodejs.org/en/>
[express-site]: <https://expressjs.com/>
[socket-site]: <https://socket.io/>
[moment-site]: <https://momentjs.com/>