<script>
    import { cart } from "$lib/stores/cartStore";
    export let film;

    $: count = $cart.find(f => f.id === film.id)?.count || 0;
</script>

<div>
    <h3>{film.title} ({film.genre})</h3>
    <span>
          {#each Array(film.bewertung) as _}
            ⭐
          {/each}
        </span>
    <p>{film.beschreibung}</p>
    <span>{ count }</span>
    <button on:click={() => cart.remove(film.id) }>entfernen</button>
</div>

<style>
    div {
        border: 1px solid black;
        padding: 10px;
        margin: 10px;
        width: 20em;
    }
    button{
        background-color: #ccc;
        border-radius: 1em;
        border: solid;
        padding: 0.5em;
        cursor: pointer;
    }
</style>