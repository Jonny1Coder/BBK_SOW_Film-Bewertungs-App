<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import Nav from "$lib/components/Layout/Nav.svelte";
    import { filme } from '$lib/stores/filmStore.js';
    import {onDestroy, onMount} from "svelte";

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
                console.log("Temp",parsed);
                if (Array.isArray(parsed)) {
                    filme.set(parsed);
                }
            }
        } catch (e) {
            console.error('Failed to read filme from localStorage', e);
        }
        console.log("Filme", $filme);
    }

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Nav />
{@render children()}
