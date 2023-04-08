import Pusher from 'pusher-js';

export function bind(eventId : string , callBack : (data : string) => void) {

    if (process.env.NODE_ENV === "developent") {
        Pusher.logToConsole = true;
    }

    const pusher = new Pusher('9f8fa613096874482055', { cluster: 'eu' });
    const channel = pusher.subscribe('my-channel');

    channel.bind(eventId , callBack )
}