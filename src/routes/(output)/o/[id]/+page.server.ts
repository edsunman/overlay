import { error } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";

export const load = async ({ params }) => {

    const id = params.id;

    if (!id) {
        throw error(404, {
            message: 'Event id required'
        })
    }

    const data = await prisma.event.findFirst({
        where : {
            id : id
        },
        include: {
            graphic: true,
        },
    })

    if (!data) {
        throw error(404, {
            message: 'Not found'
        })
    }

    return {
        event: data
    }
} 