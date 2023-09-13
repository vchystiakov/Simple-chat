import React from "react";
//axios - library for making http requests from node.js
import axios from "axios";

const JoinBlock = ({ onLogin }) => {
  //useState for inputs
  const [roomId, setRoomId] = React.useState("");
  //useState for setting UsersName
  const [userName, setUserName] = React.useState("");
  //useState for loading
  const [isLoading, setIsLoading] = React.useState(false);

  //function which make post request with payload data after press enter button and make user logged
  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert("Enter your room-id and username");
    }
    const obj = {
      roomId,
      userName,
    };
    setIsLoading(true);
    await axios.post("/rooms", obj);
    onLogin(obj); // after authorizating and creating data in rooms makes user logged
  };
  return (
    <div class="join-block">
      <input
        type="text"
        placeholder="Room-ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      <button disabled={isLoading} onClick={onEnter} className="enter">
        {isLoading ? "Entering..." : "Enter"}
      </button>
    </div>
  );
};

export default JoinBlock;
