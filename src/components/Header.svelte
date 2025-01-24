<script>
	import classNames from 'classnames';
	export let y;

	let isMenuOpen = false;

	let tabs = [
		{ name: 'Projects.', link: '#projects' },
		{ name: 'Blog.', link: 'https://buildthestairs.substack.com/', target: '_blank' },
		{ name: 'About.', link: '#about' }
	];

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<header
	class={classNames(
		'sticky top-0 z-[100] grid place-items-center duration-200',
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
		<div class="flex items-center gap-4">
			<button
				class={classNames(
					'text-2xl sm:hidden',
					isMenuOpen ? 'pointer-events-none opacity-0' : 'opacity-100'
				)}
				on:click={toggleMenu}
				aria-label="Toggle menu"
			>
				<i class="fa-solid fa-bars-staggered" />
			</button>
			<a
				href="mailto:stampone.salvatore@gmail.com"
				target="_blank"
				class="group relative hidden overflow-hidden rounded-full bg-white px-5 py-2 text-slate-950 sm:block"
			>
				<div
					class="absolute right-full top-0 z-0 h-full w-full bg-blue-400 opacity-20 duration-200 group-hover:translate-x-full"
				/>
				<h4 class="relative z-[9]">Get in touch</h4>
			</a>
		</div>
	</div>

	<!-- Menu mobile -->
	<div
		class={classNames(
			'fixed left-0 top-0 z-[200] flex h-[100dvh] w-full flex-col items-center justify-center gap-8 bg-slate-950/95 transition-transform duration-300 sm:hidden',
			isMenuOpen ? 'translate-y-0' : '-translate-y-full'
		)}
	>
		<button class="absolute right-6 top-6 text-2xl" on:click={closeMenu} aria-label="Close menu">
			<i class="fa-solid fa-xmark" />
		</button>
		{#each tabs as tab}
			<a
				href={tab.link}
				class="font-freshwost text-2xl transition-colors hover:text-blue-400"
				target={tab.target ?? '_self'}
				on:click={closeMenu}
			>
				{tab.name}
			</a>
		{/each}
		<a
			href="mailto:stampone.salvatore@gmail.com"
			target="_blank"
			class="group relative mt-4 overflow-hidden rounded-full bg-white px-5 py-2 text-slate-950"
		>
			<div
				class="absolute right-full top-0 z-0 h-full w-full bg-blue-400 opacity-20 duration-200 group-hover:translate-x-full"
			/>
			<h4 class="relative z-[9]">Get in touch</h4>
		</a>
	</div>
</header>
