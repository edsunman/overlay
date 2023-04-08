import { redirect, error } from "@sveltejs/kit"
import { prisma } from "$lib/server/prisma"


export const load = async ({ locals, params }) => {

    const { user, session } = await locals.auth.validateUser()

    if (!( user && session )) {
        throw redirect(302, "/login")
    }

    const id = params.id

    if (!id) {
        throw error(404, {
            message: 'Id required'
        })
    }

    const data = await prisma.event.findFirst({
        where : {
            id : id,
            user_id : session.userId
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