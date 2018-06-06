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
    console.log(id);
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