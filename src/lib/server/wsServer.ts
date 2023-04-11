import { WS_URL } from '$env/static/private';


export async function sendMessage( eventId : string, messageType : string, message : string ) {

    const res = await fetch(WS_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({ "event_id" : eventId , "message_type" : messageType, "message" : message })
        });

    return res;

}