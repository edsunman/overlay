<script lang="ts">

    export let data

    const { events } = data

</script>

{#each events as event}

    <a href="/{event.id}">{event.name}</a><br/>

{/each}
