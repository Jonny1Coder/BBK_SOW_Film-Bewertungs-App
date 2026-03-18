<script>
    import { filme } from '../../stores/filmStore.js';
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

    </span>
    <span>
        Anzahl Filme: {filmCount}
    </span>
</div>

<style>

</style>