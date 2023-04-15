<script lang="ts" >
     
    import { onMount } from 'svelte';
	import OutputLink from './OutputLink.svelte';
    import { wsConnect } from '$lib/client/wsClient';

    export let data;
    let { event } = data;

    let addingNewGraphic = false;
    let newGraphicInput = '';

    async function changeColour (event: any) {
        const response = await fetch('/event', {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
                },
            body: JSON.stringify({
                'colour': event.colour,
                'event_id': event.id
            })
        });
        const e = await response.json();
    }
   
    function showAddNewGraphic () {
        addingNewGraphic = !addingNewGraphic;
        
    }
  

    async function addNewGraphic () {
        const response = await fetch('/graphic', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
                },
            body: JSON.stringify({
                'data': newGraphicInput,
                'event_id': event.id
            })
        })
        const graphic = await response.json();

        forgetNewGraphic();
    }

    function forgetNewGraphic () {
        addingNewGraphic = false;
        newGraphicInput = '';
    }

    async function changeVisible(graphicId : number) {

        const f = event.graphic.findIndex(x => x.id == graphicId);
        event.graphic[f].visible = !event.graphic[f].visible;
 
        const response = await fetch('/graphic', {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
                },
            body: JSON.stringify({
                'visible': event.graphic[f].visible,
                'event_id': event.id,
                'graphic_id': graphicId
            })
        })

        return await response.json();
    }
    let change_count = 0;
	let input_count = 0;

    onMount(async () => {  

        function onMessage(message: { event_id : string, message_type : string, message : string }) {

            const m = JSON.parse(message.message);

            if(message.message_type==="add") {
       
                event.graphic = [...event.graphic, m];

            } else if (message.message_type==="update") {

                if(m.graphic_id){

                    const f = event.graphic.findIndex(x => x.id == m.graphic_id);
                    event.graphic[f].visible = m.visible;

                } else {

                    event.colour = m.colour;
                }

            } else if (message.message_type==="delete") {

                event.graphic = event.graphic.filter(e => e.id !== m.id)
            }
        };

        wsConnect(onMessage, event.id);
    })

</script>

<div class="p-6 py-12">
    <h2 class="text-5xl"><small
        class="transition-all duration-100 ease-linear hover:text-neutral-200 text-xl text-neutral-500 sm:inline hidden">
        <a href="/"  data-sveltekit-preload-data="hover"  >overlay/</a>
    </small> {event.name}</h2>
</div>

<div class="flex flex-row">
<!--<p>{event.name}</p> -->
    <div class="lg:w-[350px] flex-none w-full p-6">
        {#each event.graphic as graphic, i}
            {#if graphic.type==='title'}
                <div>
                    <button class="transition-all duration-200 ease-linear relative w-full flex justify-center px-4 py-2 mb-5 rounded-xl border-solid border-2
                    
                        {event.graphic[i].visible ? 'text-neutral-900 border-neutral-200 bg-neutral-200' :
                            'hover:text-neutral-400 hover:border-neutral-400 text-neutral-500 border-neutral-800 '}
                        " on:click={() => changeVisible(graphic.id)} >
                       {event.name}
                    </button>
                </div>
            {/if}
        {/each}
        <div class="mb-6 border-t-2 border-neutral-800"></div>
        {#each event.graphic as graphic, i}
            {#if graphic.type==='lower_third'}
                <div>
                    <button class="transition-all duration-200 ease-linear relative w-full flex justify-center px-4 py-2 mb-5 rounded-xl border-solid border-2
                    
                        {event.graphic[i].visible ? 'text-neutral-900 border-neutral-200 bg-neutral-200' :
                            'hover:text-neutral-400 hover:border-neutral-400 text-neutral-500 border-neutral-800 '}
                        " on:click={() => changeVisible(graphic.id)} >
                        {graphic.data}
                    </button>
                </div>
            {/if}
        {/each}
        <div>
            {#if addingNewGraphic===false }
                <button on:click={showAddNewGraphic} class="transition-all duration-200 ease-linear relative w-full flex justify-center
                    px-4 py-2 mb-5 rounded-xl border-dashed border-2                    
                    {1 > 2 ? 'text-neutral-100 border-neutral-100 bg-neutral-700' :
                            'hover:text-neutral-400 hover:border-neutral-400 text-neutral-500 border-neutral-800 '}
                    " >
                    + new
                </button>
            {:else}
            <form on:submit|preventDefault={addNewGraphic}>
                <!-- svelte-ignore a11y-autofocus -->
                <input bind:value={newGraphicInput} on:blur={forgetNewGraphic} type="text" autofocus 
                    class="text-center relative w-full flex justify-center px-4 py-2 mb-5 rounded-xl border-solid border-2 bg-neutral-900" />
            </form>

            {/if}
        </div>
    </div >
    <div class="flex-1 p-6 lg:block hidden">
          
        <iframe src="/output/{event.id}" title="Output" 
            class="w-full aspect-video mx-auto bg-[size:50px_50px] 
            bg-[linear-gradient(45deg,_#101010_25%,transparent_25%,transparent_50%,#101010_50%,#101010_75%,transparent_75%,transparent)]"></iframe>
      <OutputLink id="{event.id}" />
        <input type="color" on:change={() => changeColour(event)} bind:value="{event.colour}">{event.colour}


    </div>
</div>
