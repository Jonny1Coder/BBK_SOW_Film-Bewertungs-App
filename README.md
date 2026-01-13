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