import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { pusherMessage } from '$lib/server/pusher';
import { prisma } from "$lib/server/prisma";


export const POST = ( async (request) => {

    const body = await request.request.json()

    // console.log(body.visible)

    pusherMessage('event-'+body.eventId, { visible : body.visible, graphicId : body.graphicId })

    await prisma.graphic.update({
        where: {
            id: body.graphicId
        },
        data: {
            visible: body.visible
        }
    })

    return json("");

} ) as RequestHandler