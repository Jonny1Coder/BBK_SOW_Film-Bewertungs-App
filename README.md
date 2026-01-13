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
