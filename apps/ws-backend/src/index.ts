import { WebSocketServer } from "ws";
import * as jwt from 'jsonwebtoken';
import {config} from "@repo/config";

const wss = new WebSocketServer({ port: 8080 });
type userId = string;

wss.on("connection", function connection(ws, request) {
  ws.on("error", console.error);

  //get token from query params to authenticate users on ws connection
  const url = request.url;
  if(!url){
    return;
  }

  const params = new URLSearchParams(url.split('?')[1]);
  const token = params.get('token');

  if (!token) {
    ws.close(1008, 'Unauthorized: No token provided');
    return;
  }
  const decodedToken = jwt.verify(token, config.jwtSecret) as { userId: userId };
  if (!decodedToken || !decodedToken.userId) {
    ws.close(1008, 'Unauthorized: Invalid token');
    return;
  }



  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.send("something");
});
