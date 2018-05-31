import React, { Component } from "react";

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
            {message.text}<br/>
            <span>{message.date}</span>
          </div>
        )}
      </div>
    );
  }
}

export default MessageList;