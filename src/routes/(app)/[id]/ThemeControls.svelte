<script lang="ts" >

    import { eventStore } from '$lib/client/stores';
    import { overlayFetch } from '$lib/client/overlay';

    async function changeColour() {

        await overlayFetch('/event', 'PATCH', {
            'colour': $eventStore.colour,
            'event_id': $eventStore.id           
        });        
    }

</script>

<div class="flex">
    <div class="flex-none px-4 py-4 pl-0">
        <div class="relative w-12 h-12  {!$eventStore.edit_mode ? 'text-neutral-700 hover:text-neutral-400' : 'text-neutral-800'}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"  viewBox="0 0 24 24" stroke-width="1.5" 
                class=" pointer-events-none absolute w-8 h-8 top-0 bottom-0 right-0 left-0 m-auto">
                {#if !$eventStore.edit_mode}
                    <path d="M17 9.761v-4.761c0-2.761-2.238-5-5-5-2.763 0-5 2.239-5 5v4.761c-1.827 1.466-3 3.714-3 6.239 0 4.418 3.582 8 8 8s8-3.582 8-8c0-2.525-1.173-4.773-3-6.239zm-8-4.761c0-1.654 1.346-3 3-3s3 1.346 3 3v3.587c-.927-.376-1.938-.587-3-.587s-2.073.211-3 .587v-3.587zm3 17c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zm2-7c0 .738-.404 1.376-1 1.723v2.277h-2v-2.277c-.596-.347-1-.984-1-1.723 0-1.104.896-2 2-2s2 .896 2 2z"/>
                {:else}
                    <path d="M12 18c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2zm0-10c-1.062 0-2.073.211-3 .587v-3.587c0-1.654 1.346-3 3-3s3 1.346 3 3v1h2v-1c0-2.761-2.238-5-5-5-2.763 0-5 2.239-5 5v4.761c-1.827 1.466-3 3.714-3 6.239 0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8zm0 14c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6z"/>
                {/if}
            </svg>

            <input class=" border-2 appearance-none rounded-xl w-12 h-12 cursor-pointer
            {$eventStore.edit_mode ? 'bg-neutral-200 border-neutral-200' :'hover:border-neutral-400 border-neutral-700 bg-neutral-900'}"
            type="checkbox" bind:checked={$eventStore.edit_mode} />
        </div>
    </div>
    {#if $eventStore.edit_mode}
    <div class="flex-none px-4 py-4 text-center">
        
            <div class="relative w-12 h-12 rounded-lg my-0 mx-auto"  style="background-color:{$eventStore.colour}" >                    
                <input class="h-full w-full opacity-0 cursor-pointer" type="color" on:change={() => changeColour()} bind:value="{$eventStore.colour}">
            </div>
            
        
    </div>
    <div class="flex-none px-4 py-4 text-center justify-center">
        <span class="font-mono text-neutral-500">{$eventStore.colour}</span>
    </div>
    {/if}
</div>