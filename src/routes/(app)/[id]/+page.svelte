<script lang="ts" >
     
    import { onMount } from 'svelte';
    import { wsConnect } from '$lib/client/wsClient';
    import { eventStore } from '$lib/client/stores'
    import OutputLink from './OutputLink.svelte';
    import ThemeControls from './ThemeControls.svelte';
    import GraphicButtons from './GraphicButtons.svelte';
	import MobileLockButton from './MobileLockButton.svelte';

    export let data;
    let { event } = data;
    $eventStore = event;

    $: if ($eventStore.edit_mode === false) {
        $eventStore.graphic.forEach((graphic) => { graphic.editing = false })
        
    }

    onMount(async () => {  

        function onMessage(message: { event_id : string, message_type : string, message : string }) {

            const m = JSON.parse(message.message);

            if(message.message_type==="add") {
       
                $eventStore.graphic = [...event.graphic, m];

            } else if (message.message_type==="update") {

                if(typeof m.visible !== 'undefined'){

                    const f = $eventStore.graphic.findIndex(x => x.id == m.graphic_id);
                    $eventStore.graphic[f].visible = m.visible;

                } else if (m.data) {

                    const f = $eventStore.graphic.findIndex(x => x.id == m.graphic_id);
                    $eventStore.graphic[f].data = m.data;

                } else {

                    $eventStore.colour = m.colour;
                }

            } else if (message.message_type==="delete") {

                $eventStore.graphic = $eventStore.graphic.filter(e => e.id !== m.id)
            }
        };

        wsConnect(onMessage, $eventStore.id);
    })

</script>

<div class="sm:p-6 sm:py-12 p-6 pb-0">
    <h2 class="text-2xl sm:text-5xl"><small
        class="transition-all duration-100 ease-linear hover:text-neutral-200 text-xl text-neutral-500 sm:inline hidden">
        <a href="/"  data-sveltekit-preload-data="hover"  >overlay/</a>
    </small> {$eventStore.name}</h2>
</div>

<div class="flex flex-row">
<!--<p>{event.name}</p> -->
    <div class="lg:w-[350px] flex-none w-full p-6">
        <GraphicButtons />
        <MobileLockButton />
    </div >
    <div class="flex-1 p-6 pt-0 lg:block hidden">
        <OutputLink id="{event.id}" />
        <iframe src="/o/{event.id}" title="Output" 
            class="w-full aspect-video mx-auto bg-[size:50px_50px] 
            bg-[linear-gradient(45deg,_#101010_25%,transparent_25%,transparent_50%,#101010_50%,#101010_75%,transparent_75%,transparent)]"></iframe>
        <ThemeControls />
    </div>
</div>
