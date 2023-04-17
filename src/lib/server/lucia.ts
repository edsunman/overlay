import lucia from 'lucia-auth';
import { github } from "@lucia-auth/oauth/providers";
import prismaAdapter from '@lucia-auth/adapter-prisma'
import { dev } from '$app/environment'
import { prisma } from '$lib/server/prisma'
import { sveltekit } from "lucia-auth/middleware";
import { GITHUB_SECRET, GITHUB_CLIENT } from '$env/static/private';

export const auth = lucia({
    middleware: sveltekit(),
    adapter : prismaAdapter(prisma),
    env : dev ? "DEV" : "PROD",
    transformUserData : (userData:any) => {
        return {
            userId : userData.id,
            username : userData.username,
            name : userData.name
        }
    }
})

const config = {
		clientId:GITHUB_CLIENT,
		clientSecret:GITHUB_SECRET
	}

export const githubAuth = github(auth, config);

export type Auth = typeof auth