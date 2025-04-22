<script>
	import classNames from 'classnames';
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
	import { theme } from '$lib/stores/theme';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';

	let y;
	let innerHeight = 0;
	let innerWidth = 0;
	let elementsToAnimate = [];
	let prefersReducedMotion = false;

	function goTop() {
		document.body.scrollIntoView();
	}

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

			// Configurazione per inizializzare animazioni globali
			function initAnimations() {
				// Raccogliamo tutti gli elementi da animare
				elementsToAnimate = [...document.querySelectorAll('.animate-on-scroll')];

				// Se l'utente preferisce ridurre le animazioni, mostriamo subito gli elementi
				if (prefersReducedMotion) {
					// Mostra subito tutti gli elementi senza animazione
					elementsToAnimate.forEach((element) => {
						gsap.set(element, { opacity: 1 });
					});
				} else {
					// Configuriamo le animazioni normali
					elementsToAnimate.forEach((element) => {
						gsap.fromTo(
							element,
							{
								opacity: 0
							},
							{
								opacity: 1,
								duration: 0.7,
								ease: 'none', // Easing lineare per evitare qualsiasi effetto snap
								scrollTrigger: {
									trigger: element,
									start: 'top 85%',
									toggleActions: 'play none none none'
								}
							}
						);
					});
				}
			}

			// Inizializza subito e ogni volta che la pagina cambia
			initAnimations();

			// Aggiungi un listener per il cambio di pagina in SvelteKit
			document.addEventListener('sveltekit:navigation-end', () => {
				// Rimuovi i trigger precedenti per evitare conflitti
				ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

				// Dà un po' di tempo al DOM per aggiornare completamente
				setTimeout(initAnimations, 100);
			});
		});
	});
</script>

<div class="min-h-screen text-slate-950 transition-colors dark:text-slate-200">
	<Header {y} />

	<div
		class="relative mx-auto flex min-h-screen w-full max-w-[1280px] flex-col text-sm sm:text-base"
	>
		<div
			class={classNames(
				'fixed bottom-0 z-10 flex w-full p-10 duration-200',
				y > 0 ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
			)}
		>
			<button
				on:click={goTop}
				class="ml-auto grid aspect-square cursor-pointer place-items-center rounded-full bg-slate-200 px-4 text-blue-400 shadow-lg duration-200 hover:bg-slate-300 dark:bg-slate-900 dark:text-blue-400 dark:shadow-none dark:hover:bg-slate-800"
			>
				<i class="fa-solid fa-arrow-up"></i>
			</button>
		</div>
		<slot />
	</div>

	<Footer />
</div>

<svelte:window bind:scrollY={y} bind:innerHeight bind:innerWidth />

<style>
	/* Stile per gli elementi animati - solo opacity */
	:global(.animate-on-scroll) {
		opacity: 0;
		will-change: opacity;
	}

	/* Disattiva transizioni per utenti che preferiscono ridurre le animazioni */
	@media (prefers-reduced-motion: reduce) {
		:global(.animate-on-scroll) {
			opacity: 1 !important;
			transform: none !important;
		}

		:global(button),
		:global(a),
		:global(.transition),
		:global([class*='duration-']) {
			transition: none !important;
		}

		:global([class*='animate-']) {
			animation: none !important;
		}
	}
</style>
