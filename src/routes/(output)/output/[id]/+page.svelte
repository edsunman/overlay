<script lang="ts">

    import { onMount } from 'svelte';
    import { wipe, slideUp } from '$lib/client/transitions';
    import { wsConnect } from '$lib/client/wsClient';
    
    export let data;
    let { event } = data;

    onMount(async () => {  

      function onMessage(message : { event_id : string, message_type : string, message : string }) {

            //let message = JSON.parse(socketEvent.data)

            if(message.message_type==="add") {

                const m = JSON.parse(message.message);               
                event.graphic = [...event.graphic, m];

            } else if (message.message_type==="update") {

                const m = JSON.parse(message.message);
                const f = event.graphic.findIndex(x => x.id == m.graphic_id);
                event.graphic[f].visible = m.visible;
                
            } else if (message.message_type==="delete") {

                const m = JSON.parse(message.message);
                event.graphic = event.graphic.filter(e => e.id !== m.id)
            }
        };

        wsConnect(onMessage, event.id);
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