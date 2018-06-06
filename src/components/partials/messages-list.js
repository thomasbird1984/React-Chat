import React, { Component } from "react";
import * as moment from "moment";

import Api from "../../services/Api";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: []
    };

    this.api = new Api();
  }

  componentDidMount() {
    this.api.get(`/messages`).then((chats) => {
      this.setState({ chats: chats });
    })
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
          <div key={i} className={"message-bubble"}>
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