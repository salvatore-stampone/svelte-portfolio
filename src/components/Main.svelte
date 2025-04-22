<script>
	import Step from './Step.svelte';
	import { theme } from '$lib/stores/theme';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';

	// Stato per indicare se disponibile o meno per lavoro
	let isAvailable = false;

	// Riferimenti agli elementi da animare
	let introSection;
	let projectsSection;
	let aboutSection;
	let elementsToAnimate = [];
	let prefersReducedMotion = false;

	// Funzione per verificare se l'utente preferisce ridurre le animazioni
	function checkReducedMotion() {
		if (typeof window !== 'undefined') {
			return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		}
		return false;
	}

	onMount(() => {
		// Verifica preferenze di riduzione animazioni
		prefersReducedMotion = checkReducedMotion();

		// Importa ScrollTrigger dinamicamente solo nel browser
		import('gsap/ScrollTrigger').then((module) => {
			const ScrollTrigger = module.ScrollTrigger;
			// Registrazione del plugin GSAP
			gsap.registerPlugin(ScrollTrigger);

			// Raccogliamo tutti gli elementi da animare
			elementsToAnimate = [...document.querySelectorAll('.animate-on-scroll')];

			// Se l'utente preferisce ridurre le animazioni, mostriamo subito gli elementi
			if (prefersReducedMotion) {
				// Mostra subito tutti gli elementi senza animazione
				elementsToAnimate.forEach((element) => {
					gsap.set(element, { opacity: 1 });
				});
			} else {
				// Configuriamo le animazioni normali quando le animazioni sono permesse
				elementsToAnimate.forEach((element) => {
					gsap.fromTo(
						element,
						{
							opacity: 0
						},
						{
							opacity: 1,
							duration: 0.7,
							ease: 'none',
							scrollTrigger: {
								trigger: element,
								start: 'top 85%',
								toggleActions: 'play none none none'
							}
						}
					);
				});
			}
		});
	});

	const steps = [
		{
			name: 'Keeo',
			icon: 'fa-solid fa-music',
			desc: '<p>Explore Keeo, a website built with <strong class="text-blue-400">Next.js, TypeScript, and TailwindCSS.</strong> Sign up to try our revolutionary mobile app.</p>',
			href: 'https://www.keeo.io/'
		},
		{
			name: 'Otello',
			icon: 'fa-solid fa-hotel',
			desc: 'Otello is a software platform that unifies all hotel messaging channels with an AI assistant to enhance guest experience. Built with <strong class="text-blue-400">Vue.js, TailwindCSS, Ruby on Rails and Python</strong>, it automates routine tasks and increases conversions through faster response times.',
			href: 'https://www.otello.ai/'
		},
		{
			name: 'SpeedService Lucera',
			icon: 'fa-solid fa-truck-fast',
			desc: '<p>Experience seamless shipping solutions with SpeedService Lucera. This <strong class="text-blue-400">Next.js and Tailwind CSS</strong> powered website allows you to effortlessly generate shipping quotes and schedule convenient home pickups.</p>',
			href: 'https://www.speedservicelucera.com/'
		}
	];

	const qualities = [
		{
			name: 'a self taught developer',
			desc: `I have been teaching myself how to code <strong class="text-blue-400">everyday</strong> using the internet and my thirst for knowledge. The <strong class="text-blue-400">creative thinking</strong> and doing it requires, within the boundaries it sets, is what I love most. From <strong class="text-blue-400">JS, HTML and CSS</strong>, my expertise has evolved to include <strong class="text-blue-400">JS frameworks, UI design, the backend, and DB's</strong>. I also love using <strong class="text-blue-400">AI</strong> to help me with my work. I find it accelerates my output, learning and creativity.`
		},
		{
			name: 'a passionate YouTuber and writer',
			desc: `Reading <strong class="text-blue-400">fiction and self-improvement books</strong> is one of my favorite hobbies. <strong class="text-blue-400">Every two weeks</strong> I publish a blog post and every now and then I publish a YouTube video with interesting insights on what I read, learn and like. Check out the YouTube channel `,
			href: 'https://www.youtube.com/@slavarote',
			link: 'here',
			desc_1: ' and the blog ',
			href_1: 'https://buildthestairs.substack.com/',
			link_1: 'here',
			desc_2: '.'
		},
		{
			name: 'a graduate in foreign languages',
			desc: `I have a degree in <strong class="text-blue-400">Foreign Languages and Literatures</strong> and I'm fond of the <strong class="text-blue-400">German language</strong>, which makes me an unusual programmer. My <strong class="text-blue-400">literary passion</strong> vouches for my dedication to coding, seen the radical change it has required.`
		},
		{
			name: 'a self-driven team player',
			desc: `I deeply enjoy <strong class="text-blue-400">learning in and of itself</strong> and playing videogames and football, which makes me a good candidate for team projects. I am also <strong class="text-blue-400">thoroughly organized</strong>, which makes it particularly easy to work on my own, as well.`
		}
	];

	const levelColors = {
		master: 'from-purple-500 to-purple-700 dark:from-purple-600 dark:to-purple-800',
		expert: 'from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800',
		intermediate: 'from-green-500 to-green-700 dark:from-green-600 dark:to-green-800'
	};
</script>

<main class="flex flex-1 flex-col p-4">
	<section
		bind:this={introSection}
		id="intro"
		class="grid grid-cols-1 gap-10 py-8 sm:py-14 lg:grid-cols-2"
	>
		<div class="flex flex-col gap-6 text-center md:gap-8 lg:justify-center lg:text-start">
			<div class="flex flex-col items-center lg:items-start">
				<div class="animate-on-scroll mx-auto flex items-center gap-2 lg:mx-0">
					{#if isAvailable}
						<!-- Stato "Available" -->
						<span class="relative flex h-3 w-3">
							<span
								class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
							></span>
							<span class="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
						</span>
						<span class="text-sm font-medium text-green-500 sm:text-base">Available for hire</span>
					{:else}
						<!-- Stato "Not Available" -->
						<span class="relative flex h-3 w-3">
							<span class="relative inline-flex h-3 w-3 rounded-full bg-gray-400"></span>
						</span>
						<span class="text-sm font-medium text-gray-400 sm:text-base"
							>Not available for hire</span
						>
					{/if}
				</div>
				<h2 class="animate-on-scroll text-4xl sm:text-5xl lg:min-w-[700px] lg:text-6xl">
					Hi! I'm <span class="text-blue-400">Salvatore</span> Stampone<br />Full Stack
					<span class="text-blue-400">Developer</span>,<br />
					<span class="text-blue-400">YouTuber</span> & <span class="text-blue-400">Writer</span>
				</h2>
			</div>
			<p class="animate-on-scroll sm:text-lg md:text-xl">
				The frontend is where my main interests are but I'm versitile: my <span
					class="text-blue-400">most proficient tech</span
				> includes JavaScript (Next.js, Vue.js, SvelteKit), TailwindCSS, Express.js, Ruby on Rails, Python,
				and PostgreSQL!
			</p>
			<p class="animate-on-scroll sm:text-lg md:text-xl">
				I also have a <a
					href="https://www.youtube.com/@slavarote"
					target="_blank"
					class="text-blue-400 underline transition-colors hover:text-blue-500 hover:no-underline sm:text-lg md:text-xl"
					>YouTube channel</a
				>
				(in Italian 🇮🇹) and a
				<a
					href="https://buildthestairs.substack.com/"
					target="_blank"
					class="text-blue-400 underline transition-colors hover:text-blue-500 hover:no-underline sm:text-lg md:text-xl"
					>blog</a
				> (in English 🇬🇧) where I share my learnings and interests in a fun and engaging way.
			</p>
			<a
				href="mailto:salvatorestampone@icloud.com"
				class="animate-on-scroll group relative cursor-pointer self-center overflow-hidden rounded-full bg-slate-950 px-6 py-3 text-slate-200 dark:bg-slate-200 dark:text-slate-950 sm:text-lg md:text-xl lg:self-start"
			>
				<div
					class="absolute right-full top-0 z-0 h-full w-full bg-blue-400 opacity-20 duration-200 group-hover:translate-x-full"
				/>
				<h4 class="relative z-[9]">Get in touch &rarr;</h4>
			</a>
		</div>
		<div class="animate-on-scroll relative grid place-items-center">
			<img
				src={$theme === 'dark' ? 'images/profile.png' : 'images/profile-no-outline.png'}
				alt="Profile"
				class="z-[2] max-h-[70vh] object-cover [mask-image:linear-gradient(to_top,transparent_2%,black_30%)]"
			/>
		</div>
	</section>

	<section bind:this={projectsSection} id="projects" class="flex flex-col gap-24 py-20 lg:py-32">
		<div class="animate-on-scroll flex flex-col gap-2 text-center">
			<h6 class="text-lg sm:text-xl md:text-2xl">A few of my creative endeavors.</h6>
			<h3 class="text-3xl sm:text-4xl md:text-5xl">
				Curious to <span class="text-blue-400">see</span> my work?
			</h3>
		</div>
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-10">
			{#each steps as step, index}
				<a
					href={step.href}
					target="_blank"
					class="animate-on-scroll group flex cursor-pointer flex-col gap-4 rounded-lg border border-solid border-blue-700 bg-slate-200 p-4 text-center duration-200 hover:border-blue-400 hover:shadow-lg dark:bg-slate-950 dark:hover:shadow-none sm:p-6 md:p-8 {index ===
					1
						? 'lg:-translate-y-6 lg:scale-110 lg:shadow-xl dark:lg:bg-slate-900/80 dark:lg:shadow-none'
						: ''}"
				>
					<i class:text-4xl={true} class:text-blue-400={true} class={step.icon} />
					<h4 class="text-2xl sm:text-3xl md:text-4xl">{step.name}</h4>
					<p class="text-sm sm:text-base md:text-lg">{@html step.desc}</p>
				</a>
			{/each}
		</div>
	</section>

	<section
		bind:this={aboutSection}
		id="about"
		class="relative flex flex-col gap-16 py-20 pt-10 sm:gap-20 md:gap-24 lg:py-32 lg:pt-10"
	>
		<div
			class="animate-on-scroll relative flex flex-col gap-2 py-4 text-center before:absolute before:left-0 before:top-0 before:h-1.5 before:w-2/3 before:bg-blue-700 after:absolute after:bottom-0 after:right-0 after:h-1.5 after:w-2/3 after:bg-blue-700"
		>
			<h6 class="text-lg sm:text-xl md:text-2xl">Want to know more?</h6>
			<h3 class="text-3xl sm:text-4xl md:text-5xl">
				A bit <span class="text-blue-400">about</span> me.
			</h3>
		</div>
		<p class="animate-on-scroll mx-auto text-lg sm:text-xl md:text-2xl">I am . . .</p>
		<div class="mx-auto flex w-full max-w-[800px] flex-col gap-20">
			{#each qualities as quality, index}
				<div class="animate-on-scroll flex gap-6 sm:gap-8">
					<p class="text-4xl text-slate-400 dark:text-slate-500 sm:text-5xl md:text-6xl">
						0{index + 1}
					</p>
					<div class="flex flex-col gap-6 sm:gap-8">
						<h3 class="text-2xl sm:text-3xl md:text-5xl">{quality.name}</h3>
						{#if quality.href}
							<p class="sm:text-lg md:text-xl">
								{@html quality.desc}<a
									href={quality.href}
									class="text-blue-400 underline transition-colors hover:text-blue-500 hover:no-underline"
									target="_blank">{quality.link}</a
								>{quality.desc_1}
								{#if quality.href_1}
									<a
										href={quality.href_1}
										class="text-blue-400 underline transition-colors hover:text-blue-500 hover:no-underline"
										target="_blank">{quality.link_1}</a
									>{quality.desc_2}
								{/if}
							</p>
						{:else}
							<p class="sm:text-lg md:text-xl">{@html quality.desc}</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</section>
</main>

<style>
	/* Gli elementi con questa classe iniziano nascosti */
	:global(.animate-on-scroll) {
		opacity: 0;
		will-change: opacity;
	}

	/* Disattiva transizioni per utenti che preferiscono ridurre le animazioni */
	@media (prefers-reduced-motion: reduce) {
		:global(.animate-on-scroll) {
			opacity: 1;
		}

		/* Disattiva tutte le transizioni */
		* {
			transition: none !important;
			animation: none !important;
		}
	}
</style>
