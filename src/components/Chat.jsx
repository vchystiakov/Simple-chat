import React from "react";
//import socket
import socket from "../socket";

function Chat({ users, messages, userName, roomId, onAddMessage }) {
  //useState hook for input
  const [messageValue, setMessageValue] = React.useState("");
  //useRef hook for saving messages block during whole life cycle of component
  const messagesRef = React.useRef(null);

  //function that will send message by click
  const onSendMessage = () => {
    socket.emit("ROOM:NEW_MESSAGE", {
      userName,
      roomId,
      text: messageValue,
    });
    onAddMessage({ userName, text: messageValue });
    setMessageValue("");
  };

  //adding scroll to messages block
  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat-users">
        Room: <b>{roomId}</b>
        <hr />
        <ul>
          {users.map((name, index) => (
            <li key={name + index}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div ref={messagesRef} className="messages">
          {messages.map((message) => (
            <div className="message">
              <p>{message.text}</p>
              <div>
                <span>{message.userName}</span>
              </div>
            </div>
          ))}
        </div>
        <form>
          <textarea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            className="form-control"
            rows="3"
          ></textarea>
          <button
            onClick={onSendMessage}
            type="button"
            className="btn btn-primary"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
