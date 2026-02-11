<script>
  import { filme, durchschnittsBewertung, genreStats, topFilme } from './stores/filmStore.js';
  let genres = [
    "Action",
    "Komödie",
    "Drama",
    "Sci-Fi",
    "Horror",
  ];

  filme.add({
    id: $filme.length,
    titel: 'Inception',
    beschreibung: 'Ein Dieb, der Firmengeheimnisse durch den Einsatz von Traum-Sharing-Technologie stiehlt, erhält die umgekehrte Aufgabe, eine Idee in das Unterbewusstsein eines CEO zu pflanzen.',
    genre: genres[0],
    bewertung: 4
  });
  filme.add({
    id: $filme.length,
    titel: 'Der Pate',
    beschreibung: 'Der alternde Patriarch einer organisierten Kriminaldynastie überträgt die Kontrolle über sein geheimes Imperium an seinen widerspenstigen Sohn.',
    genre: genres[1],
    bewertung: 6
  });

  let selectedGenre = 'Alle';
  let sortBy = 'titel';

  $: filteredFilme = selectedGenre === 'Alle'
    ? $filme
    : $filme.filter(f => f.genre === selectedGenre);

  $: sortedFilme = [...filteredFilme].sort((a, b) => {
    if (sortBy === 'bewertung') return (Number(b?.bewertung) || 0) - (Number(a?.bewertung) || 0);
    const at = (a?.titel ?? '').toString();
    const bt = (b?.titel ?? '').toString();
    return at.localeCompare(bt);
  });

  let neuerFilm = {
    id: $filme.length,
    titel: '',
    beschreibung: '',
    genre: genres[0],
    bewertung: null
  };

  function addFilm() {
    if (neuerFilm.bewertung < 1 || neuerFilm.bewertung > 10 || !Number.isInteger(neuerFilm.bewertung)) {
      alert("Bitte geben Sie eine Ganzzahl zwischen 1 und 10 ein.");
      return;
    }

    filme.add(neuerFilm);
    resetNewFilmForm();
    console.log($filme);
  }
  function resetNewFilmForm() {
    neuerFilm.titel = "";
    neuerFilm.beschreibung = "";
    neuerFilm.genre = genres[0];
    neuerFilm.bewertung = null;
  }
  function setActive(genre) {
    selectedGenre = genre;
  }
  function clearFilm() {
    filme.clear();
  }
</script>

<main>
  <h2>Neuen Film anlegen</h2>
  <form>
    <input type="text" placeholder="Film Titel" bind:value={neuerFilm.titel}><br>
    <textarea placeholder="Beschreibung" bind:value={neuerFilm.beschreibung}></textarea><br>
    <select bind:value={neuerFilm.genre}>
      {#each genres as genre}
        <option value="{genre}">{genre}</option>
      {/each}
    </select><br>
    <input type="number" placeholder="Bewertung (1-10)" bind:value={neuerFilm.bewertung}><br>
    <button on:click|preventDefault={addFilm}>Film hinzufügen</button>
  </form>

  <nav>
    <button class:active={selectedGenre === "Alle"} on:click={() => setActive("Alle")}>Alle</button>
    {#each genres as genre}
      <button class:active={selectedGenre === genre} on:click={() => setActive(genre)}>{genre}</button>
    {/each}
    <select bind:value={sortBy}>
      <option value="titel">Nach Titel</option>
      <option value="bewertung">Nach Bewertung</option>
    </select>
  </nav>

  {#if filteredFilme.length === 0}
  <span class="error">Keine Filme gefunden</span>
  {/if}

  <div id="filme">
    {#each sortedFilme as film}
      <div>
        <h3>{film.titel} ({film.genre})</h3>
        <span>
          {#each Array(film.bewertung) as _}
            ⭐
          {/each}
        </span>
        <p>{film.beschreibung}</p>
      </div>
    {/each}
  </div>
  <button on:click={ () => clearFilm()}>Alle Löschen</button>
  <hr>
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

</main>

<style>
  :root {
    --accent-color: #845ec2;
  }
  textarea,input,select,button{
    width: 15em;
    margin: 0;
    padding: 0;
  }
  h3{
    margin-bottom: 0;
  }
  p{
    max-width: 50em;
  }
  nav{
    margin: 1em;
  }
  nav button{
    width: 8em;
    padding: 0.2em;
    margin: 0.1em;
  }
  nav button.active {
    background-color: var(--accent-color);
    color: white;
    border-color: white;
    font-weight: bold;
  }
  .error{
    color: red;
  }
</style>