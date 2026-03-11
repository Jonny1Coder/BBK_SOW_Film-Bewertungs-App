<script>
    export let film;
</script>

<div>
    <h3>{film.title} ({film.genre})</h3>
    <span>
          {#each Array(film.bewertung) as _}
            ⭐
          {/each}
        </span>
    <p>{film.beschreibung}</p>
</div>

<style>
    div {
        border: 1px solid black;
        padding: 10px;
        margin: 10px;
        width: 20em;
    }
</style>