import { PUBLIC_WS_URL } from '$env/static/public';
import { io } from "socket.io-client";



type onMessageFunction = ( message: { event_id : string, message_type : string, message : string }) => void;

export function wsConnect(onMessage : onMessageFunction, eventId: string){

    const socket = io(PUBLIC_WS_URL,{  query: { 'event_id': eventId } /* , transports: ["websocket"] */});

    socket.on('some event', onMessage );


}