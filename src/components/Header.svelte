<script>
	import classNames from 'classnames';
	import { theme, toggleTheme } from '$lib/stores/theme';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	export let y;

	let isMenuOpen = false;
	let pendingScroll = null;

	let tabs = [
		{
			name: 'Projects.',
			link: $page.url.pathname === '/' ? '#projects' : '/#projects',
			isExternal: false
		},
		{
			name: 'About.',
			link: $page.url.pathname === '/' ? '#about' : '/#about',
			isExternal: false
		},
		{
			name: 'CV.',
			link: '/cv',
			isExternal: false
		},
		{
			name: 'Books.',
			link: '/books',
			isExternal: false
		},
		{
			name: 'YouTube.',
			link: 'https://www.youtube.com/@slavarote',
			isExternal: true
		},
		{
			name: 'Blog.',
			link: 'https://buildthestairs.substack.com/',
			isExternal: true
		}
	];

	onMount(() => {
		if (pendingScroll) {
			const element = document.querySelector(pendingScroll);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
				pendingScroll = null;
			}
		}
	});

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	function handleThemeToggle() {
		toggleTheme();
	}

	async function handleNavigation(e, link) {
		if (!link.isExternal && link.link.startsWith('#')) {
			e.preventDefault();
			const element = document.querySelector(link.link);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
				closeMenu();
			} else {
				pendingScroll = link.link;
				await goto('/');
				setTimeout(() => {
					const targetElement = document.querySelector(pendingScroll);
					if (targetElement) {
						targetElement.scrollIntoView({ behavior: 'smooth' });
						pendingScroll = null;
					}
				}, 100);
			}
		}
	}
</script>

<header
	class={classNames(
		'sticky top-0 z-[100] grid place-items-center px-4 duration-200',
		y > 0
			? 'bg-slate-200/90 py-4 supports-[backdrop-filter]:bg-slate-200/80 supports-[backdrop-filter]:saturate-[180%] supports-[backdrop-filter]:backdrop-blur-md dark:bg-slate-950/90 supports-[backdrop-filter]:dark:bg-slate-950/80'
			: 'bg-transparent py-6'
	)}
>
	<div class="flex w-full max-w-7xl items-center justify-between">
		<a
			href="/"
			class="text-xl text-slate-950 transition-colors hover:text-blue-400 dark:text-slate-200 hover:dark:text-blue-400"
		>
			<h1>Salvatore Stampone</h1>
		</a>
		<div class="ml-auto hidden items-center gap-4 pr-4 sm:flex">
			{#each tabs as tab}
				<a
					href={tab.link}
					class="font-freshwost text-slate-950 transition-colors hover:text-blue-400 dark:text-slate-200 hover:dark:text-blue-400"
					target={tab.isExternal ? '_blank' : undefined}
					rel={tab.isExternal ? 'noopener noreferrer' : undefined}
					on:click={(e) => handleNavigation(e, tab)}
				>
					{tab.name}
				</a>
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
			<button
				on:click={handleThemeToggle}
				class="hidden rounded-lg p-2 transition-colors hover:text-blue-400 sm:block"
				aria-label="Toggle theme"
			>
				{#if $theme === 'dark'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
						/>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
						/>
					</svg>
				{/if}
			</button>
			<a
				href="mailto:salvatorestampone@icloud.com"
				target="_blank"
				class="group relative hidden overflow-hidden rounded-full bg-slate-950 px-5 py-2 text-slate-200 dark:bg-slate-200 dark:text-slate-950 sm:block"
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
			'fixed left-0 top-0 z-[200] flex h-[100dvh] w-full flex-col items-center justify-center gap-8 bg-slate-200/95 text-slate-950 transition-transform duration-300 dark:bg-slate-950/95 dark:text-slate-200 sm:hidden',
			isMenuOpen ? 'translate-y-0' : '-translate-y-full'
		)}
	>
		<button class="absolute right-6 top-6 text-2xl" on:click={closeMenu} aria-label="Close menu">
			<i class="fa-solid fa-xmark" />
		</button>
		{#each tabs as tab}
			<a
				href={tab.link}
				class="font-freshwost text-xl transition-colors hover:text-blue-400"
				target={tab.isExternal ? '_blank' : undefined}
				rel={tab.isExternal ? 'noopener noreferrer' : undefined}
				on:click={(e) => {
					handleNavigation(e, tab);
					closeMenu();
				}}
			>
				{tab.name}
			</a>
		{/each}
		<button
			on:click={handleThemeToggle}
			class="text-xl transition-colors hover:text-blue-400"
			aria-label="Toggle theme"
		>
			{#if $theme === 'dark'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
					/>
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
					/>
				</svg>
			{/if}
		</button>
		<a
			href="mailto:salvatorestampone@icloud.com"
			target="_blank"
			class="group relative mt-4 overflow-hidden rounded-full bg-slate-950 px-5 py-2 text-xl text-slate-200 dark:bg-slate-200 dark:text-slate-950"
		>
			<div
				class="absolute right-full top-0 z-0 h-full w-full bg-blue-400 opacity-20 duration-200 group-hover:translate-x-full"
			/>
			<h4 class="relative z-[9]">Get in touch</h4>
		</a>
	</div>
</header>
