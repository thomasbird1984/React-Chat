import React, { Component } from "react";
import * as moment from "moment";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={"message-list"}>
        {this.props.messages.map((message, i) =>
          <div key={i} className={"message-bubble"}>
            <b>Message: </b>{message.text}<br/>
            <span><b>Posted</b> {moment(message.date).format("YYYY-MM-DD HH:mm:ss")}</span>
          </div>
        )}
      </div>
    );
  }
}

export default MessageList;