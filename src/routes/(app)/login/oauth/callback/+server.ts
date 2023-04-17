import { auth, githubAuth } from "$lib/server/lucia";
import { redirect, error } from "@sveltejs/kit";

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies, url, locals }) => {
	// get code and state params from url
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");

	// get stored state from cookies
	const storedState = cookies.get("github_oauth_state");

	// validate state
	if (state !== storedState) {
        console.log('invalid state')
        throw redirect(302, "/");
    }

    if (!code) {
        console.log('no code')
        throw redirect(302, "/");
    }

	try {
		const { existingUser, providerUser, createUser } = await githubAuth.validateCallback(code);

		const getUser = async () => {
			if (existingUser) return existingUser;
			// create a new user if the user does not exist
			return await createUser({
				// attributes
				username: providerUser.login,
                name: 'github',
                created: new Date()
			});
		}

		const user = await getUser();
		const session = await auth.createSession(user.userId);
		locals.auth.setSession(session);

	} catch (e) {
        console.error(e);
        throw error(403, { message: 'Error' });
	}
	throw redirect(302, "/");
};