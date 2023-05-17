<script lang="ts" >

    import { eventStore } from '$lib/client/stores'
    import { overlayFetch } from '$lib/client/overlay'

    async function editTheme() {
        await overlayFetch('/event', 'PATCH', {
            'colour': $eventStore.colour,
            'rounded': $eventStore.rounded,
            'event_id': $eventStore.id           
        })
    }

    function changeRounded(r: number){
        $eventStore.rounded = r
        console.log($eventStore.rounded)
        editTheme()
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
                <input class="h-full w-full opacity-0 cursor-pointer" type="color" on:change={() => editTheme()} bind:value="{$eventStore.colour}">
            </div>
    </div>
    <div class="flex-none px-4 py-4 text-center justify-center">
        <span class="font-mono text-neutral-500">{$eventStore.colour}</span>
    </div>
    <div class="flex-none px-4 py-4 text-center justify-center text-[0px]">
        <button on:click={() => changeRounded(0)} class="
        relative w-12 h-12 border-2 rounded-l-xl
        {$eventStore.rounded === 0 ? 'bg-neutral-200 border-neutral-200 text-neutral-800' :
        'hover:border-neutral-400 border-neutral-700 bg-neutral-900 text-neutral-700 hover:text-neutral-400 border-r-0'}
        ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"  viewBox="0 0 100 100" stroke-width="1.5" 
                class=" pointer-events-none absolute w-4 h-4 top-0 bottom-0 right-0 left-0 m-auto">
                <rect width="100" height="23.53"/><rect x="76.47" width="23.53" height="100"/>
               
        </svg>
        </button>
        <button on:click={() => changeRounded(1)} class="
        relative w-12 h-12 border-2 rounded-r-xl 
         {$eventStore.rounded === 1 ? 'bg-neutral-200 border-neutral-200 text-neutral-800' :
        'hover:border-neutral-400 border-neutral-700 bg-neutral-900 text-neutral-700 hover:text-neutral-400 border-l-0'}
        ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"  viewBox="0 0 100 100" stroke-width="1.5" 
                class=" pointer-events-none absolute w-4 h-4 top-0 bottom-0 right-0 left-0 m-auto">
                 <path d="m32.35,0H0v23.53h32.35c25.98,0,44.12,18.14,44.12,44.12v32.35h23.53v-32.35C100,28.45,71.55,0,32.35,0Z"/>
        </svg></button>
    </div>
    {/if}
</div>
