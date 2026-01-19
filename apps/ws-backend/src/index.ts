import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws, request) {
  ws.on("error", console.error);

  //get token from query params to authenticate users on ws connection
  const url = request.url;
  if(!url){
    return;
  }

  const params = new URLSearchParams(url.split('?')[1]);
  const token = params.get('token');

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.send("something");
});
