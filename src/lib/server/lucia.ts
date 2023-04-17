import lucia from 'lucia-auth';
import { github } from "@lucia-auth/oauth/providers";
import prismaAdapter from '@lucia-auth/adapter-prisma'
import { dev } from '$app/environment'
import { prisma } from '$lib/server/prisma'
import { sveltekit } from "lucia-auth/middleware";

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
		clientId:'984f2d6fb95be6eed591',
		clientSecret:'0cd70aa7b2887faae18fd0d359d29913e501f163'
	}

export const githubAuth = github(auth, config);

export type Auth = typeof auth