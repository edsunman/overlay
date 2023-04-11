import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { prisma } from "$lib/server/prisma";


export const POST = (async({ locals })=>{

    const session = await locals.auth.validate()

    if (!session) {
        return json('error: not autherised');
    }

    const id = (Math.random() + 1).toString(36).substring(8)

    try {
        await prisma.event.create({ data: { id: id , user_id : session.userId, name : 'new event'}})

    } catch (err) {
        console.error(err);
        return json('error: db update failed');
    }

    return json(id);


}) satisfies RequestHandler