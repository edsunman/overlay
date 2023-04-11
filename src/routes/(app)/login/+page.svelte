<div class="container mx-auto max-w-md md:pt-24 pt-10 p-5">

	<form method="POST">
		<hgroup>
			<h2 class="md:text-8xl text-4xl text-center md:pb-24 pb-10">overlay</h2>
		</hgroup>
		<label for="username" class="block mb-3 text-neutral-300">Username</label>
		<input type="text" id="username" name="username" required class="block w-full rounded-sm bg-neutral-800 mb-3 p-3" />

		<label for="password" class="block mb-3 text-neutral-300">Password</label>
		<input type="password" id="password" name="password" required class="block w-full rounded-sm bg-neutral-800 autofill:bg-neutral-500 mb-6 p-3" />
		<div class="text-right">
			<button type="submit" class="inline-flex justify-center rounded-sm bg-neutral-800 py-2 px-3 text-sm hover: text-neutral-300 hover:text-white hover:bg-rose-500" >Sign in</button>
		</div>
	</form>


</div>