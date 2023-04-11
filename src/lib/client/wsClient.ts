import { PUBLIC_WS_URL } from '$env/static/public';

type onMessageFunction = (socketEvent: MessageEvent) => void;

export function wsConnect(onMessage : onMessageFunction){

    const ws = new WebSocket(PUBLIC_WS_URL);

    ws.onopen = () => { ws.send("ping"); };

    ws.onmessage = onMessage;
    
    
    setInterval(() => { ws.send('ping') },5000);

    return ws;
}