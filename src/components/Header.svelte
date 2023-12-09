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
	<h1 class="font-hedvig">Salvatore Stampone</h1>
	<div class="hidden items-center gap-4 sm:flex">
		{#each tabs as tab, i}
			<a href={tab.link} class="font-freshwost transition-colors hover:text-blue-400">{tab.name}</a>
		{/each}
	</div>
	<a
		href="#"
		target="_blank"
		class="group relative overflow-hidden rounded-full bg-white px-5 py-2 text-slate-950"
	>
		<div
			class="absolute right-full top-0 z-0 h-full w-full bg-blue-400 opacity-20 duration-200 group-hover:translate-x-full"
		/>
		<h4 class="relative z-[9]">Get in touch</h4>
	</a>
</header>
