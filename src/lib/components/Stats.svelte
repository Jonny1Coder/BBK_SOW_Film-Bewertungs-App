<script>
    import { durchschnittsBewertung, genreStats, topFilme, genres } from '../stores/filmStore.js';
</script>

<div>
    <h2>Statistiken</h2>
    Durchschnittsbewertung:
    {#each Array(Math.round(Number($durchschnittsBewertung))) as _}
        ⭐
    {/each}
    <br>
    Anzahl Filme pro Genre
    <div>
        {#each genres as genre}
            {genre}: {($genreStats[genre] ?? 0)}<br>
        {/each}
    </div>
    <br>
    Top 3 Filme:
    <div>
        {#each $topFilme as film }
            {film.titel} ({film.genre})<br>
        {/each}
    </div>
</div>

<style>

</style>