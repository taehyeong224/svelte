<script>
	import Header from './header/index.svelte';

	export let name;
	export let items = [{name: 'hi', qty: 4}, {name: 'hi2', qty: 5} , {name: 'hi3', qty: 6}]
	export function addItem(target) {
		items = [...items, {name: target, qty: items[items.length - 1].qty + 1}]
	}
	export const addItem2 = target => {items = [...items, {name: target, qty: items[items.length - 1].qty + 1}]}
</script>

<Header/>
<main>
	
	<h1>kth {name}!</h1>
	<input bind:value={name}/>
	{#if name === '42'}
		<p>what was the question?</p>
	{/if}

	<h1>Shopping list</h1>
	<ul>
		{#each items as item}
			<li>{item.name} x {item.qty}</li>
		{/each}
	</ul>
	<button on:click={addItem2(name)}>add</button>
</main>

<style>
</style>