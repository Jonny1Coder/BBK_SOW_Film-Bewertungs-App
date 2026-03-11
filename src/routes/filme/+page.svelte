<script>
    import Nav from "$lib/components/Layout/Nav.svelte";
    import FilmCard from "$lib/components/FilmCard.svelte";
    import { filme } from "$lib/stores/filmStore.js";

</script>
<Nav />
<main>
    <h1 class="text-2xl">Alle Filme</h1>
    <div class="filme">
        {#each $filme as film}
            <FilmCard film="{film}"/>
        {/each}
    </div>

</main>

<style>
    .filme{
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }
</style>
