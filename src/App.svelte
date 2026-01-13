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
    bewertung: 5
  },
  {
    titel: 'Der Pate',
    beschreibung: 'Der alternde Patriarch einer organisierten Kriminaldynastie überträgt die Kontrolle über sein geheimes Imperium an seinen widerspenstigen Sohn.',
    genre: genres[1],
    bewertung: 5
  }];
  
  let neuerFilm = {
    titel: '',
    beschreibung: '',
    genre: genres[0],
    bewertung: null
  };

  function addFilm() {
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
    <input type="number" placeholder="Bewertung" bind:value={neuerFilm.bewertung}><br>
    <button on:click|preventDefault={addFilm}>Film hinzufügen</button>
  </form>

  {#each filme as film}
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
</style>