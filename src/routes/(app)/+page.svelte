<script lang="ts">

    export let data

    const { events } = data

    let addingNewEvent = false;
    let newEventInput = '';
   
    function showAddNewEvent () {
        addingNewEvent = !addingNewEvent;
    }

    async function addNewEvent () {
        const response = await fetch('/event', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
                },
            body: JSON.stringify({
                'name': newEventInput
            })
        })
        const eventId = await response.json();
        location.href = '/' + eventId;
    }

     function forgetNewEvent () {
        addingNewEvent = false;
        newEventInput = '';
    }

</script>

<div class="container mx-auto max-w-md md:pt-24 pt-10 p-5">
    <h2 class="md:text-8xl text-4xl md:pb-20 pb-10 text-center text-neutral-300">overlay</h2>

    {#each events as event}
        <div class="md:pb-5 pb-2 overflow-hidden whitespace-nowrap ">
            <button class="md:text-4xl text-2xl">
                <a data-sveltekit-preload-data="hover" 
                class="transition-all duration-100 ease-linear text-neutral-300 hover:text-white" href="/{event.id}">{event.name}</a>
            </button>
        </div>
    {/each}

    <div class="md:pb-5 pb-2">
    {#if addingNewEvent===false }
        <button on:click={showAddNewEvent} class="
            transition-all duration-100 ease-linear md:text-4xl text-2xl text-neutral-700 hover:text-neutral-400">+ new</button>  
    {:else}
        <form on:submit|preventDefault={addNewEvent} >
            <!-- svelte-ignore a11y-autofocus -->   
            <input bind:value={newEventInput} on:blur={forgetNewEvent} type="text" autofocus class="
                text-neutral-300 outline-none relative w-full flex border-0 bg-neutral-900 md:text-4xl text-2xl " />
        </form>
    {/if}
    </div> 
   
</div>
