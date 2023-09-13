import React from "react";
//import JoinBlock component
import JoinBlock from "./components/JoinBlock";
//import Chat component
import Chat from "./components/Chat";
//import reducer
import reducer from "./reducer";
//import sockets
import socket from "./socket";
//import axios for making http requests from node js
import axios from "axios";

//main App component
function App() {
  //useReducer - will change state depending on action type that come in reducer
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  //function that will dispatch action JOINED and check if user is authorized
  const onLogin = async (obj) => {
    dispatch({
      type: "JOINED",
      payload: obj,
    });
    //emit() - sends socket request on back end and giving to it username and roomid data
    socket.emit("ROOM:JOIN", obj);
    //taking from request obj and puttin it in data
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    dispatch({
      type: "SET_DATA",
      payload: data,
    });
  };
  //function that will dispatch action type SET_USERS
  const setUsers = (users) => {
    dispatch({
      type: "SET_USERS",
      payload: users,
    });
  };

  //function that will dispatch action type ADD_MESSAGE
  const addMessage = (message) => {
    dispatch({
      type: "NEW_MESSAGE",
      payload: message,
    });
  };

  //using UseEffect hook to rerender page with changes that have been made by socket's data
  React.useEffect(() => {
    socket.on("ROOM:SET_USERS", setUsers);
    socket.on("ROOM:NEW_MESSAGE", addMessage);
  }, []);

  window.socket = socket;

  return (
    <div className="App">
      {/* Throwing onLogin function through props,! - if user is not authorized he will get login form - in other case he will go to the chat */}
      {!state.joined ? (
        <JoinBlock onLogin={onLogin} />
      ) : (
        <Chat {...state} onAddMessage={addMessage} />
      )}
    </div>
  );
}
export default App;
