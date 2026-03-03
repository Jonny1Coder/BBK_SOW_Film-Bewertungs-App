<script>
  import { filme, durchschnittsBewertung, genreStats, topFilme, genres } from './stores/filmStore.js';

  import FilmForm from "./components/FilmForm.svelte";

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

  function setActive(genre) {
    selectedGenre = genre;
  }
  function clearFilm() {
    filme.clear();
  }
</script>

<main>
  <FilmForm />

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
  select,button{
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