import React, { Component } from "react";
import socketClient from "socket.io-client";
import Storage from "../../services/Storage";

class MessageSend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            msg: "",
            endpoint: "http://localhost:4500"
        };

        this.store = new Storage();
        this.socket = socketClient(this.state.endpoint);
    }

    send() {
        if(this.state.msg !== "") {
          const token = this.store.get("token");

          this.socket.emit("message-sent", {
            msg: this.state.msg,
            token: token
          });
          this.setState({ msg: "" });
        }
    }

    handleChange(e) {
        this.setState({ msg: e.target.value });
    }

    render() {
        return (
            <div className={"message-input"}>
                <input
                    type={"text"}
                    value={this.state.msg}
                    placeholder={"Enter message..."}
                    onChange={(e) => {
                        this.handleChange(e);
                    }}
                />
                <button
                    type={"button"}
                    onClick={() => {
                        this.send();
                    }}>
                    Send
                </button>
            </div>
        );
    }
}

export default MessageSend;