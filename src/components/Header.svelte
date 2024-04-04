<script>
	import classNames from 'classnames';
	export let y;

	let tabs = [
		{ name: 'Projects.', link: '#projects' },
		{ name: 'Blog.', link: 'https://buildthestairs.substack.com/', target: '_blank' },
		{ name: 'About.', link: '#about' }
	];
</script>

<header
	class={classNames(
		'sticky top-0 z-10 grid place-items-center duration-200',
		y > 0
			? 'bg-slate-950/90 py-4 supports-[backdrop-filter]:bg-slate-950/80 supports-[backdrop-filter]:saturate-[180%] supports-[backdrop-filter]:backdrop-blur-md'
			: 'bg-transparent py-6'
	)}
>
	<div class="flex w-full max-w-7xl items-center justify-between px-6">
		<h1>Salvatore Stampone</h1>
		<div class="ml-auto hidden items-center gap-4 pr-4 sm:flex">
			{#each tabs as tab, i}
				<a
					href={tab.link}
					class="font-freshwost transition-colors hover:text-blue-400"
					target={tab.target ?? '_self'}>{tab.name}</a
				>
			{/each}
		</div>
		<a
			href="mailto:stampone.salvatore@gmail.com"
			target="_blank"
			class="group relative overflow-hidden rounded-full bg-white px-5 py-2 text-slate-950"
		>
			<div
				class="absolute right-full top-0 z-0 h-full w-full bg-blue-400 opacity-20 duration-200 group-hover:translate-x-full"
			/>
			<h4 class="relative z-[9]">Get in touch</h4>
		</a>
	</div>
</header>
