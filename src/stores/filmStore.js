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