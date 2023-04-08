import Pusher from 'pusher'
import { prisma } from "$lib/server/prisma"

const pusher = new Pusher({
        appId: "1577639",
        key: "9f8fa613096874482055",
        secret: "5b6435a93825ee8440bb",
        cluster: "eu",
        useTLS: true
        })

export const pusherMessage = async (eventName : string ,message : object) => {

    await pusher.trigger("my-channel", eventName, message)

    //const error = res.status + res.url
    //console.log(error)

    //await prisma.error.create({ data: { error : error } });

}
