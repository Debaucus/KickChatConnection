console.log("Launching KickBot Chat Moderator...");

// WS - websocker opened to read chat messages.
import ws from "ws";

// Pusher is the service used for chatting.
const chat = new ws(
  "wss://ws-us2.pusher.com/app/eb1d5f283081a78b932c?protocol=7&client=js&version=7.4.0&flash=false"
);
//Kick.com channels to join and monitor.
const chatroomList = [15751, 19535];

chatroomList.forEach((chatroomNumber) => {
  // Open websocket to each streamer.
  chat.on("open", function open() {
    chat.send(
      JSON.stringify({
        event: "pusher:subscribe",
        data: { auth: "", channel: `chatrooms.${chatroomNumber}` },
      })
    );
    console.log(
      "\x1b[33m%s\x1b[0m",
      "Connected to Kick.com Streamer Chat: " + chatroomNumber
    );
  });
});

chat.on("message", function message(data) {
  try {
    // Order to get things.
    // decode message to get components needed.
    let dataString = data.toString();
    //console.log(JSON.parse(dataString));

    let jsonData = JSON.parse(dataString);
    //console.log(jsonData.data);

    let jsonDataSub = JSON.parse(jsonData.data);
    //console.log(jsonMessageFull);

    // Values - id (of message), message, created_at, type, chatroom_id, role
    let jsonMessage = jsonDataSub.message;
    // Values - username, name, role, id (of user)
    let jsonUser = jsonDataSub.user;

    // Log the message in console for tracker purposes.
    console.log(
      new Date().toLocaleTimeString() +
        " - " +
        jsonMessage.chatroom_id +
        " - " +
        jsonMessage.id +
        " - " +
        jsonUser.username +
        " - " +
        jsonMessage.message
    );
  } catch (error) {
    //console.log(error);
  }
});
