<script>
  import { filme, genres } from './stores/filmStore.js';
  import { onMount, onDestroy } from 'svelte';

  import FilmForm from "./components/FilmForm.svelte";
  import FilmList from "./components/FilmList.svelte";
  import Stats from "./components/Stats.svelte";

  let lastUpdate = new Date();
  let interval;

  onMount(() => {
    // get init Data
    loadFilmeFromLocalStorage();

    interval = setInterval(() => {
      lastUpdate = new Date();
      console.log(lastUpdate);
      loadFilmeFromLocalStorage();
    }, 60000);

    return filme.subscribe(current => {
      try {
        window.localStorage.setItem('filme', JSON.stringify(current));
      } catch (e) {
        console.error('Failed to save filme to localStorage', e);
      }
    });
  });

  onDestroy(() => {
    clearInterval(interval);
  });

  function loadFilmeFromLocalStorage() {
    try {
      const filmeFromLocalStorage = window.localStorage.getItem("filme");
      if (filmeFromLocalStorage !== null) {
        const parsed = JSON.parse(filmeFromLocalStorage);
        if (Array.isArray(parsed)) {
          filme.set(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to read filme from localStorage', e);
    }
  }

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

  <FilmList films={sortedFilme} />
  <hr>
  <Stats />
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