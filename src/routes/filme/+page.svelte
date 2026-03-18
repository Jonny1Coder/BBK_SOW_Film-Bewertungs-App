<script>
    import FilmCard from "$lib/components/FilmCard.svelte";
    import FilmList from "$lib/components/FilmList.svelte";
    import { filme, genres } from "$lib/stores/filmStore.js";

    let selectedGenre = 'Alle';
    let sortBy = 'title';

    $: filteredFilme = selectedGenre === 'Alle'
        ? $filme
        : $filme.filter(f => f.genre === selectedGenre);

    $: sortedFilme = [...filteredFilme].sort((a, b) => {
        if (sortBy === 'bewertung') return (Number(b?.bewertung) || 0) - (Number(a?.bewertung) || 0);
        const at = (a?.title ?? '').toString();
        const bt = (b?.title ?? '').toString();
        return at.localeCompare(bt);
    });

    function setActive(genre) {
        selectedGenre = genre;
    }

</script>

<main>
    <h1 class="text-2xl">Alle Filme</h1>

    <nav class="flex gap-2">
        <button class:active={selectedGenre === "Alle"} on:click={() => setActive("Alle")}>Alle</button>
        {#each genres as genre}
            <button class:active={selectedGenre === genre} on:click={() => setActive(genre)}>{genre}</button>
        {/each}
        <select bind:value={sortBy}>
            <option value="title">by title</option>
            <option value="bewertung">Nach Bewertung</option>
        </select>
    </nav>

    {#if filteredFilme.length === 0}
        <span class="error">Keine Filme gefunden</span>
    {/if}

    <FilmList films={sortedFilme} />

</main>

<style>
    button{
        @apply flex-1;
    }
</style>
