<script lang="ts">

    import { page } from '$app/stores';  

    export let id: string;

    const outputUrl : string = $page.url.origin + '/o/' + id;

    async function copyOutputUrl() {

        await navigator.clipboard.writeText(outputUrl);
    }



</script>


<div class="font-mono text-sm mb-2 relative mr-10 text-right">
            <a href="{outputUrl}" target="_blank" class=" text-neutral-600 hover:text-neutral-200  transition-all duration-100">{outputUrl}</a>
            <button on:click={copyOutputUrl} class="absolute ml-2 text-neutral-600 hover:text-neutral-200  active:text-white transition-all duration-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"  class="w-5 h-5">
                   
                        <path d="m22 7c0-.478-.379-1-1-1h-14c-.62 0-1 .519-1 1v14c0 .621.52 1 1 1h14c.478 0 1-.379 1-1zm-20 8v2c0 .621.52 1 1 1h2v-1.5h-1.5v-1.5zm1.5-4.363v3.363h-1.5v-3.363zm0-4.637v3.637h-1.5v-3.637zm11.5-4v1.5h1.5v1.5h1.5v-2c0-.478-.379-1-1-1zm-10 0h-2c-.62 0-1 .519-1 1v2h1.5v-1.5h1.5zm4.5 1.5h-3.5v-1.5h3.5zm4.5 0h-3.5v-1.5h3.5z" fill-rule="nonzero"/>

                </svg>
            </button>
</div>