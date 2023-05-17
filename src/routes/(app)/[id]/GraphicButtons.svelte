<script lang="ts" >

    import { eventStore } from '$lib/client/stores'
    import { overlayFetch } from '$lib/client/overlay'

    let addingNewGraphic = false
    let newGraphicInput = ''

    function showAddNewGraphic() {
        addingNewGraphic = !addingNewGraphic;       
    }

    function forgetNewGraphic() {
        addingNewGraphic = false
        newGraphicInput = ''
    }

    async function changeVisible(graphicId : number) {
        const f = $eventStore.graphic.findIndex(x => x.id == graphicId)
        if(!$eventStore.graphic[f].editing) {
            $eventStore.graphic[f].visible = !$eventStore.graphic[f].visible
            await overlayFetch('/graphic', 'PUT', {
                'visible': $eventStore.graphic[f].visible,
                'event_id': $eventStore.id,
                'graphic_id': graphicId
            });         
        }
    }

    async function changeGraphicData(graphicId : number, e : any) {
        const data = e.srcElement[0].value;
        const graphic = await overlayFetch('/graphic','PATCH',{
            'data': data,
            'event_id': $eventStore.id,
            'graphic_id': graphicId
        })
        if (graphic.id) {
            const f = $eventStore.graphic.findIndex(x => x.id == graphic.id)
            $eventStore.graphic[f].editing = false
            $eventStore.graphic[f].data = graphic.data
        }
    }

    async function deleteGraphic(graphicId: number) {
        const graphic = await overlayFetch('/graphic', 'DELETE',{
               'event_id': $eventStore.id,
               'graphic_id': graphicId
        })
    }

    async function editGraphic(graphicId: number) {
        const f = $eventStore.graphic.findIndex(x => x.id == graphicId)
        $eventStore.graphic[f].editing = !$eventStore.graphic[f].editing
    }

    async function addNewGraphic() {
        const graphic = await overlayFetch('/graphic', 'POST',{
                'data': newGraphicInput,
                'event_id': $eventStore.id
        })
        forgetNewGraphic()
    }

</script>

{#each $eventStore.graphic as graphic, i}
    {#if graphic.type==='title'}
        <div>
            <button class="transition-all duration-100 ease-linear relative w-full flex justify-center px-4 py-2 mb-5 rounded-xl border-solid border-2                        
                {graphic.visible ? 'text-neutral-900 border-neutral-200 bg-neutral-200' :
                    'hover:text-neutral-400 hover:border-neutral-400 text-neutral-500 border-neutral-800 '}
                " on:click={() => changeVisible(graphic.id)} >
                {$eventStore.name}
            </button>
        </div>
    {/if}
{/each}

<div class="mb-6 border-t-2 border-neutral-800"></div>

{#each $eventStore.graphic as graphic, i}
    {#if graphic.type==='lower_third'}
        <div class="relative  {$eventStore.edit_mode && !graphic.visible ? ' pr-10' : ''}">
            <button class="whitespace-nowrap overflow-hidden transition-all duration-100 ease-linear relative w-full
                justify-center px-4 py-2 mb-5 rounded-xl border-solid border-2
                {graphic.editing ? ' text-neutral-400 border-neutral-400 cursor-default' : ''}
                {graphic.visible ? 'text-neutral-900 border-neutral-200 bg-neutral-200' :
                    'hover:text-neutral-400 hover:border-neutral-400 text-neutral-500 border-neutral-800 '}
                " on:click={() => changeVisible(graphic.id)} >
                {#if graphic.editing}
                    <form on:submit|preventDefault={e => changeGraphicData(graphic.id, e)}>
                        <!-- svelte-ignore a11y-autofocus -->
                        <input type="text" value="{graphic.data}" autofocus 
                            class=" outline-none text-center relative w-full flex justify-center mb-5  border-0 bg-neutral-900">
                        </form>
                    <div><button class="hover:text-rose-500 text-rose-800" on:click={() => deleteGraphic(graphic.id)}>delete</button></div>
                {:else}
                    {graphic.data}
                {/if}
            </button>
            <button on:click={() => editGraphic(graphic.id)}
            class="{$eventStore.edit_mode && !graphic.visible ? '' : 'hidden'} {graphic.editing ? 'text-neutral-200' : 'hover:text-neutral-400'}
                    transition-all duration-100 text-neutral-500 absolute right-0 top-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5"  class=" w-5 h-5">
                    <path d="m19 20.25c0-.402-.356-.75-.75-.75-2.561 0-11.939 0-14.5 0-.394 0-.75.348-.75.75s.356.75.75.75h14.5c.394 0 .75-.348.75-.75zm-12.023-7.083c-1.334 3.916-1.48 4.232-1.48 4.587 0 .527.46.749.749.749.352 0 .668-.137 4.574-1.493zm1.06-1.061 3.846 3.846 8.824-8.814c.195-.195.293-.451.293-.707 0-.255-.098-.511-.293-.706-.692-.691-1.742-1.741-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z" fill-rule="nonzero"/>
                </svg>
            </button>
        </div>
    {/if}
{/each}

<div>
    {#if 1==1 }
        {#if !addingNewGraphic }
            <button on:click={showAddNewGraphic} class="transition-all duration-100 ease-linear relative w-full flex justify-center
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
    {/if}
</div>