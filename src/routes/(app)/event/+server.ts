import crypto from 'crypto';
import { json, error } from '@sveltejs/kit';
import { prisma } from "$lib/server/prisma";
import { sendMessage } from '$lib/server/wsServer';


export const POST = (async({ locals , request })=>{

    const session = await locals.auth.validate()

    if (!session) {
        return json('error: not autherised');
    }

    const id = crypto.randomBytes(3).toString('hex');

    try {

        const { name } = await request.json();
   
        await prisma.event.create({ data: { id: id , user_id : session.userId, name : name}})

        await prisma.graphic.create({ data: { event_id: id , type : 'title' , data:''}})

        return json(id);

    } catch (err) {
        
        console.error(err);
        return json('error: db update failed');
    }
});

export const PATCH = (async({ request, locals }) => { 

    const session = await locals.auth.validate()

    if (!session) {
        return json('error: not autherised');
    }


    try {

        const jsonEvent : { event_id : string, colour : string } = await request.json();

        if (!jsonEvent.event_id) {
            throw error(403, {
                message: 'no event id'
            })
        }

        const event = await prisma.event.findFirst({ where : {
            id: jsonEvent.event_id,
            user_id: session.userId
        }});

        await sendMessage( jsonEvent.event_id , "update" , JSON.stringify({ "colour" : jsonEvent.colour }));

        await prisma.event.update({
            where : {
                id : jsonEvent.event_id
            },
            data : {
                colour : jsonEvent.colour
            }
        });

        return json(event);

     } catch (err : unknown) {

        console.error(err);
        throw error(403, { message: 'Error' });
    }


});