<script lang="ts" >
     
    import { onMount } from 'svelte';
    import { bind } from '$lib/client/pusherClient'
	import OutputLink from './OutputLink.svelte';

    export let data;
    const { event } = data;
   

    async function changeVisible(graphicId : number) {

        const f = event.graphic.findIndex(x => x.id == graphicId);

        event.graphic[f].visible = !event.graphic[f].visible;
 
        const response = await fetch('/message', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
                },
            body: JSON.stringify({
                'visible': event.graphic[f].visible,
                'eventId': event.id,
                'graphicId': graphicId
            })
        })

        return await response.json();
    }

    onMount(async () => {  

        bind('event-'+event.id, function(data: any) {

            const f = event.graphic.findIndex(x => x.id == data.graphicId);
            event.graphic[f].visible = data.visible;
        })
    })

</script>

<div class="p-6 py-12">
    <h2 class="text-5xl"><small class="text-xl text-neutral-500">overlay/</small> {event.name}</h2>
</div>

<div class="flex flex-row">
<!--<p>{event.name}</p> -->
    <div class="basis-1/4 p-6">
        {#each event.graphic as graphic, i}
            <div>
                <button class="transition-all duration-200 ease-linear relative w-full flex justify-center px-4 py-2 mb-5 rounded-xl border-solid border-2
                   
                    {event.graphic[i].visible ? 'text-neutral-900 border-neutral-200 bg-neutral-200' :
                         'hover:text-neutral-400 hover:border-neutral-400 text-neutral-500 border-neutral-500 '}
                    " on:click={() => changeVisible(graphic.id)} >
                   <!-- <input type="checkbox" bind:checked={event.graphic[i].visible} on:change={() => changeVisible(graphic.id)}>-->
                    {graphic.data}
                </button>
            </div>
        {/each}
        <div>
            <button class="transition-all duration-200 ease-linear relative w-full flex justify-center px-4 py-2 mb-5 rounded-xl border-dashed border-2
                
                {1 > 2 ? 'text-neutral-100 border-neutral-100 bg-neutral-700' :
                        'hover:text-neutral-400 hover:border-neutral-400 text-neutral-500 border-neutral-500 '}
                " >
                <!-- <input type="checkbox" bind:checked={event.graphic[i].visible} on:change={() => changeVisible(graphic.id)}>-->
                + new
            </button>
        </div>
    </div >
    <div class="basis-3/4 p-6">
        <iframe src="/output/{event.id}" title="Output" class="h-[450px] aspect-video mx-auto bg-[size:50px_50px] bg-[linear-gradient(45deg,_#101010_25%,transparent_25%,transparent_50%,#101010_50%,#101010_75%,transparent_75%,transparent)]"></iframe>
        <OutputLink id="{event.id}" />
    </div>
</div>
