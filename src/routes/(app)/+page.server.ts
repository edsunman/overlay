import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";

export const load = async ({ locals }) => {

    const { user, session } = await locals.auth.validateUser();

    if (!(user && session)) {
        throw redirect(302, "/login");
    }

    const data = await prisma.event.findMany({
        where: {
            user_id : session.userId
        }
    });

    return {
        events : data
    }

} 