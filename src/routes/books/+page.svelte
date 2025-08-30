<script>
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';
	import { gsap } from 'gsap';

	// State for the number of columns in the grid view
	let gridColumns = 3;
	let elementsToAnimate = [];
	let prefersReducedMotion = false;

	// Tooltip state
	let tooltipVisible = false;
	let tooltipContent = '';
	let tooltipX = 0;
	let tooltipY = 0;
	let isMobile = false;

	// Function to change the grid view and save to localStorage
	function changeGridView(columns) {
		gridColumns = columns;
		// Save preference to localStorage
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('bookGridColumns', columns.toString());
		}
	}

	// Function to check if the user prefers reduced motion
	function checkReducedMotion() {
		if (typeof window !== 'undefined') {
			return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		}
		return false;
	}

	// Function to check if device is mobile
	function checkIsMobile() {
		if (typeof window !== 'undefined') {
			return window.innerWidth < 768; // md breakpoint in Tailwind
		}
		return false;
	}

	// Tooltip functions
	function showTooltip(event, description) {
		if (isMobile) return; // Don't show tooltip on mobile

		tooltipContent = description;
		tooltipX = event.clientX + 10;
		tooltipY = event.clientY + 10;
		tooltipVisible = true;
	}

	function hideTooltip() {
		tooltipVisible = false;
	}

	function updateTooltipPosition(event) {
		if (!tooltipVisible || isMobile) return;

		tooltipX = event.clientX + 10;
		tooltipY = event.clientY + 10;
	}

	// Load preference from localStorage on mount
	onMount(() => {
		// Check reduced motion preference
		prefersReducedMotion = checkReducedMotion();

		// Check if device is mobile
		isMobile = checkIsMobile();

		// Add resize listener to update mobile state
		const handleResize = () => {
			isMobile = checkIsMobile();
			if (isMobile && tooltipVisible) {
				hideTooltip(); // Hide tooltip if switching to mobile
			}
		};

		window.addEventListener('resize', handleResize);

		// Dynamically import ScrollTrigger only in the browser
		import('gsap/ScrollTrigger').then((module) => {
			const ScrollTrigger = module.ScrollTrigger;
			// Register GSAP plugin
			gsap.registerPlugin(ScrollTrigger);

			// Collect all elements to animate
			elementsToAnimate = [...document.querySelectorAll('.animate-on-scroll')];

			// If user prefers reduced motion, show all elements immediately
			if (prefersReducedMotion) {
				elementsToAnimate.forEach((element) => {
					gsap.set(element, {
						opacity: 1,
						y: 0 // Remove any position offset
					});
				});
			} else {
				// Set up normal animations
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

		if (typeof localStorage !== 'undefined') {
			const savedColumns = localStorage.getItem('bookGridColumns');
			if (savedColumns) {
				gridColumns = parseInt(savedColumns, 10);
			}
		}

		// Cleanup function
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	// Array of years from most recent (2025) to oldest (2016)
	const years = Array.from({ length: 10 }, (_, i) => 2025 - i);

	// Favorite books by year
	const booksByYear = {
		'2016': [
			{
				id: '2016-1',
				title: 'We',
				author: 'Yevgeny Zamyatin',
				coverUrl: 'https://m.media-amazon.com/images/I/81VK0rQFUTL.jpg',
				description:
					"A dystopian novel considered a precursor to '1984' and 'Brave New World', depicting a totalitarian society where individuality is suppressed in favor of the collective."
			}
		],
		'2017': [],
		'2018': [
			{
				id: '2018-1',
				title: 'Se questo è un uomo',
				author: 'Primo Levi',
				coverUrl: 'https://www.ibs.it/images/9788806219352_804501618_0_0_0_75.jpg',
				description:
					"A powerful autobiographical testimony of the author's experience in the Auschwitz concentration camp, exploring the human condition in the face of horror."
			},
			{
				id: '2018-2',
				title: 'Niente di nuovo sul fronte occidentale',
				author: 'Erich Maria Remarque',
				coverUrl:
					'https://images-eu.ssl-images-amazon.com/images/I/81RWHoypVZL._AC_UL600_SR600,600_.jpg',
				description:
					'A classic of anti-war literature recounting the experience of German soldiers during World War I, highlighting the brutality and senselessness of war.'
			},
			{
				id: '2018-3',
				title: 'Uno psicologo nei lager',
				author: 'Viktor E. Frankl',
				coverUrl: 'https://static.francoangeli.it/fa-libri-copertine/1000/1400_1_1.jpg',
				description:
					'A work that combines personal memoir and psychology, in which the author develops his theory of logotherapy based on his experiences in Nazi concentration camps.'
			}
		],
		'2019': [
			{
				id: '2019-1',
				title: "Un anno sull'altipiano",
				author: 'Emilio Lussu',
				coverUrl: 'https://www.ibs.it/images/9788806219178_823630329_0_0_0_75.jpg',
				description:
					"A World War I memoir recounting the author's experience on the Asiago Plateau front, offering a raw and realistic testimony of life in the trenches."
			},
			{
				id: '2019-2',
				title: 'La banalità del male',
				author: 'Hannah Arendt',
				coverUrl:
					'https://www.feltrinellieditore.it/media/copertina/quarta/74/9788807892974_quarta.jpg.800x800_q75.jpg',
				description:
					"A philosophical analysis of the trial of Adolf Eichmann in Jerusalem, introducing the concept of the 'banality of evil' to explain how ordinary people can commit atrocities in totalitarian systems."
			},
			{
				id: '2019-3',
				title: 'The Picture of Dorian Gray',
				author: 'Oscar Wilde',
				coverUrl: 'https://images.penguinrandomhouse.com/cover/9780141442464',
				description:
					'A novel exploring themes of aesthetics, morality, and corruption through the story of a young man whose portrait ages while he remains young.'
			}
		],
		'2020': [
			{
				id: '2020-1',
				title: 'I dolori del giovane Werther',
				author: 'Johann Wolfgang von Goethe',
				coverUrl: 'https://www.lafeltrinelli.it/images/9788858415467_0_0_536_0_75.jpg',
				description:
					'An epistolary novel telling the story of a sensitive young artist who falls in love with a woman already promised, exploring romantic themes such as unrequited love and emotional torment.'
			}
		],
		'2021': [
			{
				id: '2021-1',
				title: '1984',
				author: 'George Orwell',
				coverUrl: 'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg',
				description:
					"A dystopian novel describing a totalitarian regime where surveillance is omnipresent and individual thought is controlled, introducing concepts like 'Big Brother' and 'Newspeak'."
			}
		],
		'2022': [
			{
				id: '2022-1',
				title: 'Tonio Kröger',
				author: 'Thomas Mann',
				coverUrl: 'https://m.media-amazon.com/images/I/71OyUmYeWpL._AC_UF1000,1000_QL80_.jpg',
				description:
					'A semi-autobiographical novella exploring the conflict between art and ordinary life through the story of a young writer torn between his bourgeois roots and artistic aspirations.'
			},
			{
				id: '2022-2',
				title: 'Le notti bianche',
				author: 'Fëdor Dostoevskij',
				coverUrl: 'https://www.lafeltrinelli.it/images/9788807901874_0_0_536_0_75.jpg',
				description:
					"A short sentimental novel set in St. Petersburg during the summer 'white nights', telling the story of a lonely dreamer and a young woman waiting for her beloved's return."
			},
			{
				id: '2022-3',
				title: 'La macchina del vento',
				author: 'Wu Ming 1',
				coverUrl: 'https://www.einaudi.it/content/uploads/2019/04/978880624080HIG.JPG',
				description:
					'A historical novel set during fascism, telling the story of an anti-fascist exiled on the island of Ventotene and his experiences of political and human resistance.'
			},
			{
				id: '2022-4',
				title: 'La settima croce',
				author: 'Anna Seghers',
				coverUrl: 'https://neripozza.it/spool/i__id8454_mw600__1x.jpg',
				description:
					'A novel narrating the escape of seven prisoners from a concentration camp in Nazi Germany, focusing on the manhunt and human solidarity in times of oppression.'
			},
			{
				id: '2022-5',
				title: 'Digital Minimalism',
				author: 'Cal Newport',
				coverUrl: 'https://m.media-amazon.com/images/I/61xdhZU7FlL.jpg',
				description:
					'An essay proposing a philosophy to reduce dependence on digital technology and regain a more intentional and meaningful use of tech tools in daily life.'
			}
		],
		'2023': [
			{
				id: '2023-1',
				title: 'Show Your Work!',
				author: 'Austin Kleon',
				coverUrl: 'https://m.media-amazon.com/images/I/71MTgEEjNVL._AC_UF1000,1000_QL80_.jpg',
				description:
					'A practical guide encouraging you to share your creative process and work in progress, offering strategies to get noticed in the digital age without aggressive self-promotion.'
			},
			{
				id: '2023-2',
				title: 'The Psychology of Money',
				author: 'Morgan Housel',
				coverUrl: 'https://m.media-amazon.com/images/I/81wZXiu4OiL._AC_UF1000,1000_QL80_.jpg',
				description:
					'A collection of essays exploring how people think about money and how our personal background, ego, pride, and odd ways of thinking influence financial decisions.'
			},
			{
				id: '2023-3',
				title: 'Il monte analogo',
				author: 'René Daumal',
				coverUrl: 'https://www.adelphi.it/spool/i__id9030_mw600__1x.jpg',
				description:
					'An unfinished allegorical novel about an expedition searching for an invisible mountain that connects heaven and earth, symbolizing spiritual quest and transcendence.'
			},
			{
				id: '2023-4',
				title: 'The Pathless Path',
				author: 'Paul Millerd',
				coverUrl: 'https://m.media-amazon.com/images/I/61aZhXSli3L._UF1000,1000_QL80_.jpg',
				description:
					'A book exploring alternatives to traditional career paths, encouraging you to build personal paths more aligned with your values instead of following already traced routes.'
			},
			{
				id: '2023-5',
				title: 'Atomic Habits',
				author: 'James Clear',
				coverUrl: 'https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg',
				description:
					'A practical guide to building good habits and eliminating bad ones, based on scientific discoveries and case studies of Olympic athletes, artists, and successful leaders.'
			},
			{
				id: '2023-6',
				title: 'The Almanack of Naval Ravikant',
				author: 'Eric Jorgenson',
				coverUrl: 'https://m.media-amazon.com/images/I/61+NT5yiNlL._AC_UF1000,1000_QL80_.jpg',
				description:
					'A collection of wisdom and advice from entrepreneur and investor Naval Ravikant on topics like creating wealth, finding happiness, developing judgment, and making better decisions.'
			}
		],
		'2024': [
			{
				id: '2024-1',
				title: 'Never Let Me Go',
				author: 'Kazuo Ishiguro',
				coverUrl: 'https://m.media-amazon.com/images/I/716qHj8vH7L._AC_UF1000,1000_QL80_.jpg',
				description:
					'A dystopian novel following the lives of three friends raised in an English boarding school, gradually discovering their unique fate in an alternate world that raises deep ethical questions.'
			},
			{
				id: '2024-2',
				title: 'Uno, nessuno, centomila',
				author: 'Luigi Pirandello',
				coverUrl: 'https://www.oscarmondadori.it/content/uploads/2016/05/978880466800HIG.webp',
				description:
					"A novel exploring the protagonist's identity crisis when he discovers that his self-image is different from how others see him, reflecting on themes of identity and perception."
			},
			{
				id: '2024-3',
				title: 'Creative Dysregulation',
				author: 'Kelly Wilde Miller',
				coverUrl: 'https://m.media-amazon.com/images/I/81uPyEozMPL._UF1000,1000_QL80_.jpg',
				description:
					'An exploration of how creativity can emerge from emotional chaos and instability, offering perspectives on transforming dysfunctional experiences into creative opportunities.'
			},
			{
				id: '2024-4',
				title: 'The Anthropocene Reviewed',
				author: 'John Green',
				coverUrl:
					'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1616514130l/55145261.jpg',
				description:
					'A collection of personal essays reviewing various aspects of contemporary human experience, from the existential to the mundane, in the era of the Anthropocene, on a 1 to 5 star scale.'
			},
			{
				id: '2024-5',
				title: 'The Will to Change',
				author: 'bell hooks',
				coverUrl: 'https://m.media-amazon.com/images/I/71lhiY1JWCL.jpg',
				description:
					'An analysis of how patriarchy harms men, limiting their emotional capacity and creating toxic masculinity models, offering a vision for healthier love and relationships.'
			},
			{
				id: '2024-6',
				title: 'Tomorrow, and Tomorrow, and Tomorrow',
				author: 'Gabrielle Zevin',
				coverUrl: 'https://m.media-amazon.com/images/I/91HY8gaU8pL._AC_UF1000,1000_QL80_.jpg',
				description:
					'A novel following the friendship and professional collaboration of two video game developers over thirty years, exploring themes of creativity, identity, and human connection.'
			},
			{
				id: '2024-7',
				title: 'Same as Ever',
				author: 'Morgan Housel',
				coverUrl: 'https://m.media-amazon.com/images/I/71znMAUESWL.jpg',
				description:
					'A collection of reflections on how, despite technological and social changes, certain aspects of human nature and psychology remain constant, influencing our decisions.'
			},
			{
				id: '2024-8',
				title: 'I pesci non esistono',
				author: 'Lulu Miller',
				coverUrl: 'https://www.ibs.it/images/9788867832804_0_0_0_0_0.jpg',
				description:
					'A work intertwining biography, science, and personal memoir, telling the story of a 19th-century ichthyologist and reflecting on the concept of order and chaos in life and science.'
			},
			{
				id: '2024-9',
				title: 'Frankenstein',
				author: 'Mary Shelley',
				coverUrl: 'https://m.media-amazon.com/images/I/71UR8nhbYML._AC_UF1000,1000_QL80_.jpg',
				description:
					'A classic gothic novel exploring themes of creation, scientific responsibility, and alienation through the story of a scientist who brings a creature to life and then abandons it.'
			},
			{
				id: '2024-10',
				title: 'Piranesi',
				author: 'Susanna Clarke',
				coverUrl: 'https://fazieditore.it/wp-content/uploads/2021/01/piranesi.jpg',
				description:
					'A novel telling the story of a man living in an endless labyrinth of halls filled with statues, exploring themes of identity, memory, and reality through a dreamlike and mysterious atmosphere.'
			},
			{
				id: '2024-11',
				title: 'Astrofisica per ansiosi',
				author: 'Licia Troisi',
				coverUrl:
					'https://universi.inaf.it/wp-content/uploads/2024/06/cover_libro_troisi-scaled.jpg',
				description:
					'A collection of short scientific reflections offering a cosmic perspective on human problems, presenting complex astrophysical concepts in an accessible and reassuring way.'
			},
			{
				id: '2024-12',
				title: 'Buchi bianchi',
				author: 'Carlo Rovelli',
				coverUrl: 'https://www.adelphi.it/spool/og__id13027_w800_t1676628805__1x.jpg',
				description:
					'An essay exploring the theory of white holes as a possible answer to the mystery of black holes, combining theoretical physics and cosmology with philosophical reflections on time and the universe.'
			},
			{
				id: '2024-13',
				title: 'Klara e il sole',
				author: 'Kazuo Ishiguro',
				coverUrl: 'https://www.ibs.it/images/9788806253561_0_0_536_0_75.jpg',
				description:
					'A novel narrated from the point of view of an Artificial Friend observing the human world, exploring themes of love, loyalty, and what it means to be human in a technologically advanced future.'
			},
			{
				id: '2024-14',
				title: 'Creative Doing',
				author: 'Herbert Lui',
				coverUrl: 'https://m.media-amazon.com/images/I/61GI17NRsRL._AC_UF1000,1000_QL80_.jpg',
				description:
					'A practical guide offering exercises and strategies to overcome creative blocks and develop a regular, sustainable creative practice, regardless of the chosen expressive medium.'
			},
			{
				id: '2024-15',
				title: 'La morte della Pizia',
				author: 'Friedrich Dürrenmatt',
				coverUrl: 'https://www.adelphi.it/spool/i__id2421_mw1000__1x.jpg',
				description:
					'An ironic and subversive reinterpretation of Greek myths and the Oracle of Delphi, exploring the theme of fate and human freedom through a narrative that mixes myth and modernity.'
			}
		],
		'2025': [
			{
				id: '2025-1',
				title: 'Nella quiete del tempo',
				author: 'Olga Tokarczuk',
				coverUrl: 'https://dbtitoli.giunti.it/api/media/image/getImage?cm=B0646A&type=P',
				description:
					'A novel by the Nobel laureate weaving together multiple stories across different historical periods, exploring the relationship between humans and nature and the search for meaning in existence.'
			},
			{
				id: '2025-2',
				title: 'Tuesdays with Morrie',
				author: 'Mitch Albom',
				coverUrl: 'https://m.media-amazon.com/images/I/91JGbl7K1OL.jpg',
				description:
					"A touching memoir recounting the author's weekly meetings with his old, terminally ill professor, sharing profound lessons on life, love, forgiveness, and death."
			},
			{
				id: '2025-3',
				title: "So Good They Can't Ignore You",
				author: 'Cal Newport',
				coverUrl: 'https://m.media-amazon.com/images/I/71KLTWMGdrL.jpg',
				description:
					"An essay challenging the concept of 'following your passion', instead proposing to develop rare and valuable skills as a strategy to build a satisfying and meaningful career."
			}
		]
	};
</script>

<main class="flex flex-1 flex-col gap-24 p-4 py-20">
	<section class="flex flex-col gap-8">
		<div class="animate-on-scroll flex flex-col gap-2 text-center">
			<h6 class="text-lg sm:text-xl md:text-2xl">Personal Library</h6>
			<h3 class="text-3xl sm:text-4xl md:text-5xl">
				My <span class="text-blue-400">best books</span> by year
			</h3>
		</div>

		<div class="animate-on-scroll mx-auto mb-8 hidden justify-center gap-4 lg:flex">
			<button
				class={`rounded-md px-3 py-1 transition-colors ${
					gridColumns === 3
						? 'bg-blue-400 text-white'
						: 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
				}`}
				on:click={() => changeGridView(3)}
			>
				3 per row
			</button>
			<button
				class={`rounded-md px-3 py-1 transition-colors ${
					gridColumns === 4
						? 'bg-blue-400 text-white'
						: 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
				}`}
				on:click={() => changeGridView(4)}
			>
				4 per row
			</button>
			<button
				class={`hidden rounded-md px-3 py-1 transition-colors xl:block ${
					gridColumns === 5
						? 'bg-blue-400 text-white'
						: 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
				}`}
				on:click={() => changeGridView(5)}
			>
				5 per row
			</button>
		</div>

		<div class="mx-auto w-full max-w-5xl">
			{#each years as year}
				{#if booksByYear[year] && booksByYear[year].length > 0}
					<div class="animate-on-scroll mb-16">
						<h4 class="mb-6 inline-block border-b-2 border-blue-400 pb-2 text-2xl font-bold">
							{year}
						</h4>

						<div
							class={`animate-on-scroll grid grid-cols-1 gap-6 sm:grid-cols-2 ${
								gridColumns === 3
									? 'md:grid-cols-3'
									: gridColumns === 4
										? 'md:grid-cols-3 lg:grid-cols-4'
										: 'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
							}`}
						>
							{#each booksByYear[year] as book}
								<div
									class="group flex flex-col overflow-hidden rounded-lg bg-slate-200/50 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900/50 dark:shadow-none dark:hover:bg-slate-900/70"
								>
									<div
										class="aspect-[2/3] w-full overflow-hidden bg-slate-300/50 dark:bg-slate-800/50"
									>
										<img
											src={book.coverUrl}
											alt={book.title}
											class="h-full w-full object-cover transition-all group-hover:scale-105"
										/>
									</div>
									<div class="flex flex-1 flex-col gap-2 p-4">
										<h5 class={`text-lg font-medium ${gridColumns >= 4 ? 'line-clamp-1' : ''}`}>
											{book.title}
										</h5>
										<p class="text-sm text-slate-600 dark:text-slate-400">{book.author}</p>
										<p
											class={`mt-2 text-sm text-slate-700 dark:text-slate-300 ${
												gridColumns >= 4 && !isMobile ? 'line-clamp-3' : ''
											}`}
											on:mouseenter={(e) => showTooltip(e, book.description)}
											on:mouseleave={hideTooltip}
											on:mousemove={updateTooltipPosition}
										>
											{book.description}
										</p>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</section>
</main>

<!-- Tooltip -->
{#if tooltipVisible && !isMobile}
	<div
		class="pointer-events-none fixed z-50 max-w-xs rounded-lg bg-slate-800 p-3 text-sm text-white shadow-lg dark:bg-slate-200 dark:text-slate-800"
		style="left: {tooltipX}px; top: {tooltipY}px;"
	>
		{tooltipContent}
	</div>
{/if}

<style>
	/* Animation for image loading */
	img {
		opacity: 0;
		animation: fadeIn 0.5s ease-in forwards;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	/* Style for animated elements */
	:global(.animate-on-scroll) {
		opacity: 0;
		transform: translateY(30px);
	}

	/* Line clamp utilities */
	.line-clamp-1 {
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Disable transitions for users who prefer reduced motion */
	@media (prefers-reduced-motion: reduce) {
		:global(.animate-on-scroll) {
			opacity: 1;
			transform: none;
		}

		img {
			opacity: 1;
			animation: none;
		}

		/* Disable all transitions */
		* {
			transition: none !important;
			animation: none !important;
		}
	}
</style>
