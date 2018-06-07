import React, { Component } from "react";
import * as moment from "moment";

import Api from "../../services/Api";
import Storage from "../../services/Storage";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.api = new Api();
    this.store = new Storage();

    this.state = {
      chats: [],
      user: this.store.get("user")
    };
  }

  componentDidMount() {
    this.api.get(`/messages`).then((chats) => {
      this.setState({ chats: chats });
      console.log("chats", chats, this.state.user);
    });
  }

  messageDelete(id) {
    this.api.get(`/messages/delete/${id}`).then((res) => {
      console.log("Delete message response: ", res);

      if(!res.errors) {
        // todo: expose api that will send up deleted message id to be removed
        this.props.handleMessageDeleted(id);
      }
    }).catch(e => console.log("Error: ", e));
  }

  render() {
    return (
      <div className={"message-list"}>
        {this.props.messages.map((message, i) =>
          <div key={i} className={message.userId === this.state.user._id ? "message-bubble message-mine" : "message-bubble message-other"}>
            <b>Message: </b>{message.text}<br/>
            <span><b>Posted</b> {moment.unix(message.created).format("YYYY-MM-DD HH:mm:ss")}</span>
            <span onClick={() => {
              this.messageDelete(message._id)
            }}>Delete</span>
          </div>
        )}
      </div>
    );
  }
}

export default MessageList;