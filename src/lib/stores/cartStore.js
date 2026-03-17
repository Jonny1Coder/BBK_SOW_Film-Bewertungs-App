import { writable } from 'svelte/store';

function createCartStore() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        add: (num) => update(shoppingcart => {
            if (num === undefined) return shoppingcart;
            if (shoppingcart.some(item => item.id === num)) {
                shoppingcart = shoppingcart.map(n => {
                    if(n.id === num){
                        console.log(n.count);
                        n.count = n.count + 1;
                        return n;
                    }
                    else { return n }
                });
            }else {
                shoppingcart.push( {id: num, count: 1} );
            }
            return shoppingcart;
        }),

        remove: (num) => update(shoppingcart => shoppingcart.filter(n => n !== num)),

        reset: () => set([])
    };
}

export const cart = createCartStore();