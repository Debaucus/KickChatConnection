console.log("Launching KickBot Chat Connection...");

// WS - websocker opened to read chat messages.
import WebSocket from "ws";
//Kick.com channels to join and monitor. Array of values.
//To get a channel ID, load a pop-up chat of the channel you wish to monitor.
//Check that request labeled `101` and use that channel number listed there.
const chatroomList = [4598];

chatroomList.forEach((chatroomNumber) => {
  // Open websocket to each streamer.

  // Pusher is the service used for chatting.
  const chat = new WebSocket(
    "wss://ws-us2.pusher.com/app/eb1d5f283081a78b932c?protocol=7&client=js&version=7.6.0&flash=false"
  );

  chat.on("open", function open() {
    chat.send(
      JSON.stringify({
        event: "pusher:subscribe",
        data: { auth: "", channel: `chatrooms.${chatroomNumber}.v2` },
      })
    );

    console.log(
      "\x1b[33m%s\x1b[0m",
      "Connected to Kick.com Streamer Chat: " + chatroomNumber
    );
  });

  chat.on("error", console.error);

  chat.on("close", function close() {
    console.log("Connection closed for chatroom: " + chatroomNumber);
  });

  chat.on("message", function message(data) {
    try {
      // Order to get things.
      // decode message to get components needed.
      const dataString = data.toString();
      //console.log(JSON.parse(dataString));

      const jsonData = JSON.parse(dataString);
      //console.log(jsonData.data);

      const jsonDataSub = JSON.parse(jsonData.data);

      // Log the message in console for tracker purposes.
      console.log(
        new Date().toLocaleTimeString() +
          " - " +
          jsonDataSub.chatroom_id +
          " - " +
          jsonDataSub.sender.username +
          " - " +
          jsonDataSub.content
      );
    } catch (error) {
      //console.log(error);
    }
  });
});
