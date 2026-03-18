<script>
    import { cart } from "$lib/stores/cartStore";
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
    <button on:click={() => cart.add(film.id) }>Zum Warenkorb hinzufügen</button>
</div>

<style>

</style>