<script lang="ts">

    import { onMount } from 'svelte'
    import { wipe, slideUp, fullScreenWipeIn, fullScreenWipeOut } from '$lib/client/transitions'
    import { wsConnect } from '$lib/client/wsClient'
    
    export let data;
    let { event } = data;

    onMount(async () => {  

      function onMessage(message : { event_id : string, message_type : string, message : string }) {
            const m = JSON.parse(message.message)
            if (message.message_type==="add") {
                event.graphic = [...event.graphic, m]
            } else if (message.message_type==="update") {
                if(typeof m.visible !== 'undefined'){
                    const f = event.graphic.findIndex(x => x.id == m.graphic_id)
                    event.graphic[f].visible = m.visible;
                } else if (m.data) {
                    const f = event.graphic.findIndex(x => x.id == m.graphic_id)
                    event.graphic[f].data = m.data
                } else {
                    event.colour = m.colour;
                    event.rounded = m.rounded;
                }
            } else if (message.message_type==="delete") {
                event.graphic = event.graphic.filter(e => e.id !== m.id)
            }
        }
        wsConnect(onMessage, event.id);
    })

   
</script>


{#each event.graphic as graphic, i}
    {#if graphic.visible && graphic.type==='title'}
        <div class="z-10 whitespace-nowrap overflow-hidden absolute right-0 left-0 top-0 bottom-0 h-[15%] m-auto text-center">
            <h2 class="2xl:text-[9rem] 2xl:pb-2 2xl:pl-8 2xl:pr-8 text-6xl font-bold pb-1 pl-4 pr-4 "
            in:slideUp="{{delay: 200, duration: 500}}"  out:slideUp="{{delay: 0, duration: 500}}" 
            >{event.name}</h2>
        </div>
        <div style="background-color:{event.colour}" in:fullScreenWipeIn="{{duration: 500}}"  out:fullScreenWipeOut="{{duration: 500, delay:300}}"
            class="h-full absolute w-full top-0 z-0">
        </div>
        
    {/if}
    {#if graphic.visible && graphic.type==='lower_third'}
        <div in:wipe="{{duration: 500}}" out:wipe="{{duration: 500 , delay:150 }}" 
            style="background-color:{event.colour};"
            class="{event.rounded===0? 'rounded0':'rounded1'}
            z-[-10] whitespace-nowrap overflow-hidden absolute bottom-[15%] left-[10%] h-[15%] flex content-center flex-wrap">
            <!-- w-[50%]-->
            <h2 class="2xl:text-8xl 2xl:pb-2 2xl:pl-8 2xl:pr-8 text-4xl font-bold pb-1 pl-4 pr-4"
            in:slideUp="{{delay: 150, duration: 500}}" out:slideUp="{{duration: 500}}"
            >{graphic.data}</h2>

        </div>
    {/if}
{/each}

<style>
    .rounded0 {
        border-radius: 0px;
    }

    .rounded1 {
        border-radius: 10px;
    }

    @media (min-width: 1536px){
        .rounded1 {
            border-radius: 25px;
        }
    }
</style>