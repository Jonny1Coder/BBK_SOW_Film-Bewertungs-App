<script>
    import { filme, durchschnittsBewertung, genreStats, topFilme, genres } from '../stores/filmStore.js';

    let neuerFilm = {
        id: $filme.length,
        title: '',
        beschreibung: '',
        genre: genres[0],
        bewertung: null
    };

    function resetNewFilmForm() {
        neuerFilm.title = "";
        neuerFilm.beschreibung = "";
        neuerFilm.genre = genres[0];
        neuerFilm.bewertung = null;
    }

    function addFilm() {
        if (neuerFilm.bewertung < 1 || neuerFilm.bewertung > 10 || !Number.isInteger(neuerFilm.bewertung)) {
            alert("Bitte geben Sie eine Ganzzahl zwischen 1 und 10 ein.");
            return;
        }

        filme.add(neuerFilm);
        resetNewFilmForm();
        console.log($filme);
    }
</script>

<div>
    <h2>Neuen Film anlegen</h2>
    <form>
        <input type="text" placeholder="film title" bind:value={neuerFilm.title}><br>
        <textarea placeholder="Beschreibung" bind:value={neuerFilm.beschreibung}></textarea><br>
        <select bind:value={neuerFilm.genre}>
            {#each genres as genre}
                <option value="{genre}">{genre}</option>
            {/each}
        </select><br>
        <input type="number" placeholder="Bewertung (1-10)" bind:value={neuerFilm.bewertung}><br>
        <button on:click|preventDefault={addFilm}>Film hinzufügen</button>
    </form>
</div>

<style>
    textarea,input,select,button{
        width: 15em;
        margin: 0;
        padding: 0;
    }
</style>