<script lang="ts">

    import { bind } from '$lib/client/pusherClient'
    import { onMount } from 'svelte';
    import { wipe, slideUp } from '$lib/client/transitions';
    
    export let data;
    const { event } = data;

    onMount(async () => {  

        bind('event-'+event.id, function(data: any) {

            const f = event.graphic.findIndex(x => x.id == data.graphicId);
            event.graphic[f].visible = data.visible;
        })
    })

   
</script>


{#each event.graphic as graphic, i}
    {#if event.graphic[i].visible}
        <div in:wipe="{{duration: 500}}" out:wipe="{{duration: 500 , delay:150 }}" 
            class="whitespace-nowrap overflow-hidden absolute bottom-[15%] left-[10%] h-[15%] w-[50%] bg-rose-500 flex content-center flex-wrap">

            <h2 class="2xl:text-8xl 2xl:pb-2 2xl:pl-8 text-4xl font-bold pb-1 pl-4"
            in:slideUp="{{delay: 150, duration: 500}}" out:slideUp="{{duration: 500}}"
            >{graphic.data}</h2>

        </div>
    {/if}
{/each}