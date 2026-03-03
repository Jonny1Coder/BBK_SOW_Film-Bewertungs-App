<script>
    export let film;
</script>

<div>
    <h3>{film.titel} ({film.genre})</h3>
    <span>
          {#each Array(film.bewertung) as _}
            ⭐
          {/each}
        </span>
    <p>{film.beschreibung}</p>
</div>

<style>

</style>