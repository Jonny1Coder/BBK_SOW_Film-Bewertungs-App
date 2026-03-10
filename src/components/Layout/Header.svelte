<script>
    import { filme } from '../../stores/filmStore.js';
    export let lastUpdate;

    $: filmCount = $filme.length;
</script>

<div>
    <span>
        {lastUpdate.toLocaleString()}
    </span>
    <span>
        Anzahl Filme: {filmCount}
    </span>
</div>

<style>
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