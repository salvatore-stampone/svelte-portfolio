<script>
	import classNames from 'classnames';
	export let y;

	let tabs = [
		{ name: 'Projects', link: '#projects' },
		{ name: 'About Me', link: '#about' }
	];
</script>

<header
	class={classNames(
		'sticky top-0 z-10 flex items-center justify-between border border-solid px-6 duration-200',
		y > 0 ? 'border-blue-950 bg-slate-950 py-4' : 'border-transparent bg-transparent py-6'
	)}
>
	<h1>
		<strong>Salvatore</strong> Stampone
	</h1>
	<div class="hidden items-center gap-4 sm:flex">
		{#each tabs as tab, i}
			<a href={tab.link} class="font-freshwost transition-colors hover:text-blue-400">{tab.name}</a>
		{/each}
	</div>
</header>
