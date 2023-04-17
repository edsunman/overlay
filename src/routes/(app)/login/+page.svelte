<div class="container mx-auto max-w-md md:pt-24 pt-10 p-5">

	<form method="POST">
		<hgroup>
			<h2 class="md:text-8xl text-4xl text-center md:pb-20 pb-8 text-neutral-300">overlay</h2>
		</hgroup>
        <a href="/login/oauth" class="relative block w-full rounded-xl bg-neutral-900 p-3 text-center transition-all duration-100 mb-5
            border-solid border-2 hover:text-white hover:bg-rose-600 hover:border-rose-600 text-neutral-400 border-neutral-800
        ">Sign in with Github
        <svg
                class="h-6 absolute right-5 top-0 bottom-0 my-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                fill="currentColor"
                aria-hidden="true"
            >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
        </svg>
        </a>
        <div class="md:my-12 my-4 border-t-2 border-neutral-800"></div>
		<label for="username" class="block mb-3 text-neutral-500">Username</label>
		<input type="text" id="username" name="username" required class="block w-full rounded-xl bg-neutral-800 mb-3 p-3" />

		<label for="password" class="block mb-3 text-neutral-500">Password</label>
		<input type="password" id="password" name="password" required class="block w-full rounded-xl bg-neutral-800 autofill:bg-neutral-500 mb-6 p-3" />
		<div class="text-right">
			<button type="submit" class="inline-flex justify-center rounded-xl bg-neutral-900 border-neutral-800 py-3 px-4 text-sm
                hover: text-neutral-400 hover:text-white hover:bg-rose-600 border-solid border-2"  
            >Sign in</button>
		</div>
	</form>


</div>