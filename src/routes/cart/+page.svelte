<script>

import FilmInCart from "$lib/components/FilmInCart.svelte";

import { filme } from "$lib/stores/filmStore.js";
import { cart } from "$lib/stores/cartStore.js";

let filterdFilms = $filme.filter(f => $cart.some(c => c.id === f.id));
</script>

<main>
    <div class="filme">
        {#each filterdFilms as film}
            <FilmInCart {film} />
        {/each}
    </div>
</main>

<style>

</style>