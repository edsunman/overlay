import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';
import { prisma } from "$lib/server/prisma";
import { sendMessage } from '$lib/server/wsServer';


export const POST = (async({ locals, request })=>{

    const session = await locals.auth.validate()

    if (!session) {
        return json('error: not autherised');
    }

    try {
        const jsonGraphic : { event_id : string, data : string } = await request.json();

        if (!jsonGraphic.event_id) {
            throw error(403, {
                message: 'no event id'
            })
        }

        const data = await prisma.event.findFirst({
            where : {
                id : jsonGraphic.event_id,
                user_id : session.userId
            }
        })

        if (!data) {
            throw error(403, {
                message: 'event does not exist'
            })
        }

        const graphic = await prisma.graphic.create({ data: {
            event_id : jsonGraphic.event_id,
            data : jsonGraphic.data,
            type : 'lower_third',
            visible: false
        }});

        await sendMessage( jsonGraphic.event_id , "add" , JSON.stringify(graphic));

        return json(graphic);

    } catch (err : unknown) {

        console.error(err);

        throw error(403, { message: 'Error' });
    }

}) as RequestHandler;


export const PATCH = (async({ locals, request })=>{ 

    // TODO: add validation here? May not need it if event id routes messages on server...

    try {
        const jsonGraphic : { event_id : string, graphic_id : string, visible : boolean } = await request.json();

        if (!jsonGraphic.event_id) {
            throw error(403, {
                message: 'no event id'
            })
        }

        await sendMessage( jsonGraphic.event_id , "update" , JSON.stringify({
            "graphic_id" : jsonGraphic.graphic_id , "visible" : jsonGraphic.visible
        }));

        // TODO: check graphic id belongs to event befor updating?

        await prisma.graphic.update({
            where: {
                id: Number(jsonGraphic.graphic_id)
            },
            data: {
                visible: jsonGraphic.visible
            }
        })
        
        return json({ "graphic_id" : jsonGraphic.graphic_id });

    } catch (err : unknown) {

        console.error(err);

        throw error(403, { message: 'Error' });
    }

})  as RequestHandler



export const DELETE = (async({ locals, request })=>{ 

    const session = await locals.auth.validate()

    if (!session) {
        return json('error: not autherised');
    }

    try {

        const jsonGraphic : { graphic_id : number } = await request.json();

        if (!jsonGraphic.graphic_id) {
            throw error(403, {
                message: 'no graphic id'
            })
        }
        const graphic = await prisma.graphic.findFirst({ where : {
            id: jsonGraphic.graphic_id
        }});

        if (!graphic) {
            throw error(403, {
                message: 'graphic does not exist'
            })
        }

        const event = await prisma.event.findFirst({
            where : {
                id : graphic.event_id,
                user_id : session.userId
            }
        });

        if (!event) {
            throw error(403, {
                message: 'event does not exist'
            })
        }

        const deleteGraphic = await prisma.graphic.delete({ where: {
            id: jsonGraphic.graphic_id
        }});

        await sendMessage( event.id , "delete" , JSON.stringify(graphic));

        return json(deleteGraphic);

    } catch (err : unknown) {

        console.error(err);

        throw error(403, { message: 'Error' });
    }

}) as RequestHandler