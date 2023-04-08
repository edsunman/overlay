
import type { PrismaClient } from "@prisma/client";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {


	/// <reference types="@sveltejs/kit" />
	declare namespace App {
		interface Locals {
			auth: import('lucia-auth').AuthRequest;
		}
	}
	// eslint-disable-next-line no-var
	var prisma : PrismaClient

	declare namespace Lucia {
		type Auth = import("@lib/server/lucia").Auth
		type UserAttributes = {
			username: string
			name: string
			created: Date
		}
	}



}

export {};