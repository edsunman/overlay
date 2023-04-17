import { auth } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types";

export const load : PageServerLoad = async ({ locals }) => {

    const session = await locals.auth.validate()

    if (session) {
        throw redirect(302, "/")
    }
}

export const actions : Actions = {

    default: async ({ request }) => {

        // TODO : impliment properly

        /*const { name, username, password } = Object.fromEntries(    
            await request.formData()
        ) as Record<string,string>

        try { 
            await auth.createUser({
                primaryKey : {
                    providerId: 'username',
                    providerUserId: username,
                    password
                },
                attributes : {
                    name,
                    username,
                    created: new Date()
                }
            })
        } catch (err) {
            console.error(err)
            return fail(400, {message: 'Could not register user'})
        }*/

        throw redirect(302, '/login')
    } 
}