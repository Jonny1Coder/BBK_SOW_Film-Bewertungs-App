## 🎬 Projekt-Aufgabe: Film-Bewertungs-App - Teil 1 (40 Minuten)

**Ab jetzt bauen wir über mehrere Kurse eine Film-Bewertungs-App auf!**

In diesem Kurs: Grundgerüst mit Events und Bindings

**Anforderungen**:
1. Erstelle ein neues Projekt `film-app`
2. Formular zum Hinzufügen von Filmen:
   - Input: Filmtitel (bind:value)
   - Textarea: Beschreibung
   - Select: Genre (Action, Komödie, Drama, Sci-Fi, Horror)
   - Input type="number": Bewertung (1-10)
   - Button "Film hinzufügen"

3. Zeige alle hinzugefügten Filme in einer Liste:
   - Titel (als Überschrift)
   - Genre in Klammern
   - Bewertung als Sterne (⭐)
   - Beschreibung

4. Funktionen:
   - `addFilm()` - Fügt Film zum Array hinzu
   - Leert das Formular nach dem Hinzufügen

**Hinweise**:
```javascript
let filme = [];
let neuerFilm = {
  titel: '',
  beschreibung: '',
  genre: 'Action',
  bewertung: 5
};

function addFilm() {
  filme = [...filme, {...neuerFilm}];
  // Formular zurücksetzen
}
```

**Erwartetes Ergebnis**:
- Formular zum Film-Hinzufügen
- Liste mit allen Filmen
- Sauberes Styling

**Weiterführung**: In Kurs 04 werden wir Conditionals und Loops nutzen, um die App zu erweitern!

---

## Tipps

**Two-Way Binding**:
```html
<input bind:value={variable}>
```

**Event Handler**:
```html
<button on:click={functionName}>Click</button>
<button on:click={() => count++}>Inline</button>
```

**Keyboard Events**:
```html
<input on:keydown={(e) => {
  if (e.key === 'Enter') submitForm();
}}>
```
## 🎬 Projekt-Aufgabe: Film-Bewertungs-App - Teil 2 (55 Minuten)

**Weiterführung aus Kurs 03**

Erweitere deine Film-App mit Conditionals und Loops:

### Neue Features:

1. **Filter-Funktionen**:
   - Buttons: "Alle", "Action", "Komödie", "Drama", "Sci-Fi", "Horror"
   - Zeige nur Filme des ausgewählten Genres
   - Nutze `{#if filteredFilme.length === 0}` für "Keine Filme gefunden"

2. **Bewertungs-Anzeige**:
   - Zeige Sterne mit Loop:
   ```javascript
   {#each Array(film.bewertung) as _, i}
     ⭐
   {/each}
   ```
   - Zeige Durchschnittsbewertung aller Filme

3. **Sortierung**:
   - Dropdown: "Nach Titel", "Nach Bewertung"
   - Sortiere Filme entsprechend

4. **Empty State**:
   - Wenn keine Filme vorhanden: Zeige Hinweis mit Icon

**Code-Struktur**:
```javascript
let filme = [];
let selectedGenre = 'Alle';
let sortBy = 'titel';

$: filteredFilme = selectedGenre === 'Alle' 
  ? filme 
  : filme.filter(f => f.genre === selectedGenre);

$: sortedFilme = [...filteredFilme].sort((a, b) => {
  if (sortBy === 'bewertung') return b.bewertung - a.bewertung;
  return a.titel.localeCompare(b.titel);
});

$: durchschnitt = filme.length > 0
  ? (filme.reduce((sum, f) => sum + f.bewertung, 0) / filme.length).toFixed(1)
  : 0;
```

**Erwartetes Ergebnis**:
- Filter nach Genre funktioniert
- Sortierung funktioniert
- Durchschnittsbewertung wird berechnet
- Empty State wird angezeigt

**Weiterführung**: In Kurs 05 (Stores) werden wir die Film-Daten in einen Store auslagern!

---

## Tipps

**Each mit Index**:
```html
{#each items as item, index}
  <p>{index + 1}. {item}</p>
{/each}
```

**Each mit Key**:
```html
{#each items as item (item.id)}
  <div>{item.name}</div>
{/each}
```

**Reactive Statements**:
```javascript
$: filtered = items.filter(i => i.active);
```

## 🎬 Projekt-Aufgabe: Film-Bewertungs-App - Teil 3 (45 Minuten)

**Weiterführung aus Kurs 04**

Lagere die Film-Daten in Stores aus:

### Neue Datei: `src/stores/filmStore.js`

```javascript
import { writable, derived } from 'svelte/store';

function createFilmStore() {
  const { subscribe, set, update } = writable([]);
  
  return {
    subscribe,
    add: (film) => update(filme => [...filme, { 
      ...film, 
      id: Date.now() 
    }]),
    remove: (id) => update(filme => filme.filter(f => f.id !== id)),
    update: (id, updatedFilm) => update(filme => 
      filme.map(f => f.id === id ? { ...f, ...updatedFilm } : f)
    ),
    clear: () => set([])
  };
}

export const filme = createFilmStore();

// Derived Stores
export const durchschnittsBewertung = derived(filme, $filme => {
  if ($filme.length === 0) return 0;
  const sum = $filme.reduce((acc, f) => acc + f.bewertung, 0);
  return (sum / $filme.length).toFixed(1);
});

export const genreStats = derived(filme, $filme => {
  const stats = {};
  $filme.forEach(f => {
    stats[f.genre] = (stats[f.genre] || 0) + 1;
  });
  return stats;
});

export const topFilme = derived(filme, $filme => 
  [...$filme]
    .sort((a, b) => b.bewertung - a.bewertung)
    .slice(0, 3)
);
```

### Neue Features:

1. **Store Integration**:
   - Ersetze das lokale `filme` Array durch `$filme` Store
   - Nutze `filme.add()` statt direkter Array-Manipulation
   - Nutze `filme.remove()` für Lösch-Funktion

2. **Statistik-Dashboard**:
   - Zeige Durchschnittsbewertung: `{$durchschnittsBewertung}⭐`
   - Zeige Anzahl Filme pro Genre
   - Zeige Top 3 Filme

3. **Bearbeiten-Funktion**:
   - Button "Bearbeiten" bei jedem Film
   - Formular wird mit Film-Daten gefüllt
   - Beim Speichern: `filme.update(id, updatedData)`

4. **Löschen-Funktion**:
   - Button "Löschen" bei jedem Film
   - Bestätigungs-Dialog (window.confirm)

**Komponenten-Struktur**:
```
src/
├── App.svelte (Hauptkomponente)
├── stores/
│   └── filmStore.js
└── components/
    ├── FilmForm.svelte (Formular)
    ├── FilmList.svelte (Liste)
    ├── FilmCard.svelte (Einzelner Film)
    └── Stats.svelte (Statistiken)
```

**Erwartetes Ergebnis**:
- Filme werden im Store verwaltet
- Statistiken werden automatisch berechnet
- Bearbeiten und Löschen funktioniert
- Code ist modular und wartbar

**Weiterführung**: In Kurs 06 (Lifecycle & Slots) werden wir LocalStorage Integration hinzufügen!

---

## Tipps

**Store nutzen**:
```javascript
import { myStore } from './stores.js';

// Lesen
$: value = $myStore;

// Schreiben
myStore.set(newValue);
myStore.update(old => old + 1);
```

**Derived Store**:
```javascript
export const doubled = derived(count, $count => $count * 2);
```
