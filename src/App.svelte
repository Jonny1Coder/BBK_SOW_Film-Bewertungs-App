<script>
  let genres = [
    "Action",
    "Komödie",
    "Drama",
    "Sci-Fi",
    "Horror",
  ];

  let filme = [{
    titel: 'Inception',
    beschreibung: 'Ein Dieb, der Firmengeheimnisse durch den Einsatz von Traum-Sharing-Technologie stiehlt, erhält die umgekehrte Aufgabe, eine Idee in das Unterbewusstsein eines CEO zu pflanzen.',
    genre: genres[0],
    bewertung: 4
  },
  {
    titel: 'Der Pate',
    beschreibung: 'Der alternde Patriarch einer organisierten Kriminaldynastie überträgt die Kontrolle über sein geheimes Imperium an seinen widerspenstigen Sohn.',
    genre: genres[1],
    bewertung: 6
  }];
  $: filteredFilme = [...filme];
  let activeGenre = "Alle";
  let averageEvaluation = filme.reduce((acc, val) => acc + val.bewertung, 0) / filme.length;

  let neuerFilm = {
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

    filme = [...filme, {...neuerFilm}];
    resetNewFilmForm();
    console.log(filme);
  }
  function resetNewFilmForm() {
    neuerFilm.titel = "";
    neuerFilm.beschreibung = "";
    neuerFilm.genre = "";
    neuerFilm.bewertung = null;
  }
  function setActive(genre) {
    activeGenre = genre;
    if (activeGenre === "Alle") {
      filteredFilme = [...filme];
    } else {
      filteredFilme = filme.filter(f => f.genre == activeGenre);
    }
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
  Durchschnittsbewertung aller Filme: {averageEvaluation}

  <nav>
    <button class:active={activeGenre === "Alle"} on:click={() => setActive("Alle")}>Alle</button>
    {#each genres as genre}
      <button class:active={activeGenre === genre} on:click={() => setActive(genre)}>{genre}</button>
    {/each}
  </nav>

  {#if filteredFilme.length === 0}
  <span class="error">Keine Filme gefunden</span>
  {/if}

  {#each filteredFilme as film}
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