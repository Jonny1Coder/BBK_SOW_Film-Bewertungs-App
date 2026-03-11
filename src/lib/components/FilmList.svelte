<script>
    import FilmCard from "./FilmCard.svelte";
    import {filme} from "../stores/filmStore.js";

    export let films;

    function clearFilm() {
        filme.clear();
    }
</script>

<div id="filme">
    {#each films as film}
        <FilmCard {film} />
    {/each}
</div>
<button on:click={ () => clearFilm()}>Alle Löschen</button>

<style>

</style>