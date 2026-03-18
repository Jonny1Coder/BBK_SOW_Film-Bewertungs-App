<script>
    export let lastUpdate;
</script>

<nav class="flex m-2 bg-primary p-2 rounded-xl">
    <div class="flex-1 flex gap-4">
        <img src="/src/lib/assets/favicon.webp" alt="Logo" class="w-10 grayscale">
        <a href="./" class="content-center">Home</a>
        <a href="/filme" class="content-center">Alle Filme</a>
        <a href="/cart" class="content-center">Warenkorb</a>
        <a href="/stats" class="content-center">Stats</a>
    </div>
    <div class="shrink flex gap-4">
            <span class="content-center ">
        Letzte Aktualisierung: {lastUpdate.toLocaleString()}
    </span>
    </div>

</nav>

<style>

</style>