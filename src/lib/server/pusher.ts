import Pusher from 'pusher'

const pusher = new Pusher({
        appId: "1577639",
        key: "9f8fa613096874482055",
        secret: "5b6435a93825ee8440bb",
        cluster: "eu",
        useTLS: true
        })

export const pusherMessage = (eventName : string ,message : object) => {

    pusher.trigger("my-channel", eventName, message)

}
