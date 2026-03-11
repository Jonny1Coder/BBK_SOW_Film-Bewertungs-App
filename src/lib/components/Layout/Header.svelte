<script>
    import { filme } from '../../stores/filmStore.js';
    export let lastUpdate;
    export let pathToLogo = null;
    export let titel = null;

    $: filmCount = $filme.length;
</script>

<div>
    {#if pathToLogo !== null}
        <img src="{pathToLogo}" alt="Logo">
    {/if}
    {#if titel !== null}
        <h3>{titel}</h3>
    {/if}
    <span>
        {lastUpdate.toLocaleString()}
    </span>
    <span>
        Anzahl Filme: {filmCount}
    </span>
</div>

<style>
    *{
        margin: 0;
    }
    div{
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 5em;
        flex-direction: row;
    }
</style>