<script>
    import { cart } from "$lib/stores/cartStore";
    export let film;

    $: count = $cart.find(f => f.id === film.id)?.count || 0;
    function countChanged(id) {
        cart.editCount(id, Number(count));
    }
</script>

<div>
    <h3>{film.title} ({film.genre})</h3>
    <span>
          {#each Array(film.bewertung) as _}
            ⭐
          {/each}
        </span>
    <p>{film.beschreibung}</p>
    <input type="number" bind:value={count} on:change={() => countChanged(film.id)} />
    <button on:click={() => cart.remove(film.id) }>entfernen</button>
</div>

<style>

</style>