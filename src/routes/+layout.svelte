<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import Nav from "$lib/components/Layout/Nav.svelte";
    import { filme } from '$lib/stores/filmStore.js';
    import { cart } from '$lib/stores/cartStore.js';
    import {onDestroy, onMount} from "svelte";

    let lastUpdate = new Date();
    let interval;

    onMount(() => {
        // get init Data
        loadFilmeFromLocalStorage();
        loadCartFromLocalStorage();

        interval = setInterval(() => {
            lastUpdate = new Date();
            console.log(lastUpdate);
            loadFilmeFromLocalStorage();
            loadCartFromLocalStorage();
        }, 60000);

        let unsubscribeFilme = filme.subscribe(current => {
            try {
                window.localStorage.setItem('filme', JSON.stringify(current));
            } catch (e) {
                console.error('Failed to save filme to localStorage', e);
            }
        });

        let unsubscribeCart = cart.subscribe(current => {
            try {
                window.localStorage.setItem('cart', JSON.stringify(current));
            } catch (e) {
                console.error('Failed to save cart to localStorage', e);
            }
        });

        return () => {
            clearInterval(interval);
            unsubscribeFilme?.();
            unsubscribeCart?.();
        };
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

    function loadCartFromLocalStorage() {
        try {
            const cartFromLocalStorage = window.localStorage.getItem("cart");
            if (cartFromLocalStorage !== null) {
                const parsed = JSON.parse(cartFromLocalStorage);
                if (Array.isArray(parsed)) {
                    cart.set(parsed);
                }
            }
        } catch (e) {
            console.error('Failed to read cart from localStorage', e);
        }
    }

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Nav />
{@render children()}
