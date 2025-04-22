<script>
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';
	import { gsap } from 'gsap';

	// Stato per il numero di colonne nella visualizzazione
	let gridColumns = 3;
	let elementsToAnimate = [];
	let prefersReducedMotion = false;

	// Funzione per cambiare la visualizzazione e salvare nel localStorage
	function changeGridView(columns) {
		gridColumns = columns;
		// Salva la preferenza nel localStorage
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('bookGridColumns', columns.toString());
		}
	}

	// Funzione per verificare se l'utente preferisce ridurre le animazioni
	function checkReducedMotion() {
		if (typeof window !== 'undefined') {
			return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		}
		return false;
	}

	// Carica la preferenza dal localStorage all'avvio
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
					gsap.set(element, {
						opacity: 1,
						y: 0 // Rimuove qualsiasi offset di posizione
					});
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
	});

	// Array di anni dal più recente (2025) al più vecchio (2016)
	const years = Array.from({ length: 10 }, (_, i) => 2025 - i);

	// Libri preferiti per ogni anno
	const booksByYear = {
		'2016': [
			{
				id: '2016-1',
				title: 'We',
				author: 'Yevgeny Zamyatin',
				coverUrl: 'https://m.media-amazon.com/images/I/81VK0rQFUTL.jpg',
				description:
					"Un romanzo distopico considerato precursore di '1984' e 'Brave New World', che descrive una società totalitaria dove l'individualità è soppressa a favore della collettività."
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
					"Una potente testimonianza autobiografica dell'esperienza dell'autore nel campo di concentramento di Auschwitz, che esplora la condizione umana di fronte all'orrore."
			},
			{
				id: '2018-2',
				title: 'Niente di nuovo sul fronte occidentale',
				author: 'Erich Maria Remarque',
				coverUrl:
					'https://images-eu.ssl-images-amazon.com/images/I/81RWHoypVZL._AC_UL600_SR600,600_.jpg',
				description:
					"Un classico della letteratura antimilitarista che racconta l'esperienza dei soldati tedeschi durante la Prima Guerra Mondiale, evidenziando la brutalità e l'insensatezza della guerra."
			},
			{
				id: '2018-3',
				title: 'Uno psicologo nei lager',
				author: 'Viktor E. Frankl',
				coverUrl: 'https://static.francoangeli.it/fa-libri-copertine/1000/1400_1_1.jpg',
				description:
					"Un'opera che combina memoria personale e psicologia, in cui l'autore elabora la sua teoria della logoterapia basata sulle esperienze vissute nei campi di concentramento nazisti."
			}
		],
		'2019': [
			{
				id: '2019-1',
				title: "Un anno sull'altipiano",
				author: 'Emilio Lussu',
				coverUrl: 'https://www.ibs.it/images/9788806219178_823630329_0_0_0_75.jpg',
				description:
					"Memoir sulla Prima Guerra Mondiale che racconta l'esperienza dell'autore sul fronte dell'Altipiano di Asiago, offrendo una testimonianza cruda e realistica sulla vita in trincea."
			},
			{
				id: '2019-2',
				title: 'La banalità del male',
				author: 'Hannah Arendt',
				coverUrl:
					'https://www.feltrinellieditore.it/media/copertina/quarta/74/9788807892974_quarta.jpg.800x800_q75.jpg',
				description:
					"Un'analisi filosofica del processo a Adolf Eichmann a Gerusalemme, che introduce il concetto di 'banalità del male' per spiegare come persone ordinarie possano compiere atrocità in sistemi totalitari."
			},
			{
				id: '2019-3',
				title: 'The Picture of Dorian Gray',
				author: 'Oscar Wilde',
				coverUrl: 'https://images.penguinrandomhouse.com/cover/9780141442464',
				description:
					"Un romanzo che esplora i temi dell'estetica, della moralità e della corruzione attraverso la storia di un giovane la cui immagine in un ritratto invecchia mentre lui mantiene un aspetto giovane."
			}
		],
		'2020': [
			{
				id: '2020-1',
				title: 'I dolori del giovane Werther',
				author: 'Johann Wolfgang von Goethe',
				coverUrl: 'https://www.lafeltrinelli.it/images/9788858415467_0_0_536_0_75.jpg',
				description:
					"Un romanzo epistolare che racconta la storia di un giovane artista sensibile che si innamora di una donna già promessa, esplorando temi romantici come l'amore non corrisposto e il tormento emotivo."
			}
		],
		'2021': [
			{
				id: '2021-1',
				title: '1984',
				author: 'George Orwell',
				coverUrl: 'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg',
				description:
					"Un romanzo distopico che descrive un regime totalitario dove la sorveglianza è onnipresente e il pensiero individuale è controllato, introducendo concetti come il 'Grande Fratello' e la 'neolingua'."
			}
		],
		'2022': [
			{
				id: '2022-1',
				title: 'Tonio Kröger',
				author: 'Thomas Mann',
				coverUrl: 'https://m.media-amazon.com/images/I/71OyUmYeWpL._AC_UF1000,1000_QL80_.jpg',
				description:
					"Una novella semi-autobiografica che esplora il conflitto tra l'arte e la vita ordinaria attraverso la storia di un giovane scrittore diviso tra le sue radici borghesi e le sue aspirazioni artistiche."
			},
			{
				id: '2022-2',
				title: 'Le notti bianche',
				author: 'Fëdor Dostoevskij',
				coverUrl: 'https://www.lafeltrinelli.it/images/9788807901874_0_0_536_0_75.jpg',
				description:
					"Un breve romanzo sentimentale ambientato a San Pietroburgo durante le 'notti bianche' estive, che racconta l'incontro tra un sognatore solitario e una giovane donna in attesa del ritorno del suo amato."
			},
			{
				id: '2022-3',
				title: 'La macchina del vento',
				author: 'Wu Ming 1',
				coverUrl: 'https://www.einaudi.it/content/uploads/2019/04/978880624080HIG.JPG',
				description:
					"Un romanzo storico ambientato durante il fascismo, che racconta la storia di un antifascista confinato sull'isola di Ventotene e le sue esperienze di resistenza politica e umana."
			},
			{
				id: '2022-4',
				title: 'La settima croce',
				author: 'Anna Seghers',
				coverUrl: 'https://neripozza.it/spool/i__id8454_mw600__1x.jpg',
				description:
					"Un romanzo che narra la fuga di sette prigionieri da un campo di concentramento nella Germania nazista, focalizzandosi sulla caccia all'uomo e sulla solidarietà umana in tempi di oppressione."
			},
			{
				id: '2022-5',
				title: 'Digital Minimalism',
				author: 'Cal Newport',
				coverUrl: 'https://m.media-amazon.com/images/I/61xdhZU7FlL.jpg',
				description:
					'Un saggio che propone una filosofia per ridurre la dipendenza dalla tecnologia digitale e ritrovare un uso più intenzionale e significativo degli strumenti tecnologici nella vita quotidiana.'
			}
		],
		'2023': [
			{
				id: '2023-1',
				title: 'Show Your Work!',
				author: 'Austin Kleon',
				coverUrl: 'https://m.media-amazon.com/images/I/71MTgEEjNVL._AC_UF1000,1000_QL80_.jpg',
				description:
					"Una guida pratica che incoraggia a condividere il proprio processo creativo e il proprio lavoro in corso, offrendo strategie per farsi notare nell'era digitale senza auto-promozione aggressiva."
			},
			{
				id: '2023-2',
				title: 'The Psychology of Money',
				author: 'Morgan Housel',
				coverUrl: 'https://m.media-amazon.com/images/I/81wZXiu4OiL._AC_UF1000,1000_QL80_.jpg',
				description:
					'Una raccolta di saggi che esplorano come le persone pensano al denaro e come il nostro background personale, ego, orgoglio e strani modi di pensare influenzano le decisioni finanziarie.'
			},
			{
				id: '2023-3',
				title: 'Il monte analogo',
				author: 'René Daumal',
				coverUrl: 'https://www.adelphi.it/spool/i__id9030_mw600__1x.jpg',
				description:
					'Un romanzo allegorico incompiuto che narra di una spedizione alla ricerca di una montagna invisibile che unisce cielo e terra, simbolo della ricerca spirituale e della trascendenza.'
			},
			{
				id: '2023-4',
				title: 'The Pathless Path',
				author: 'Paul Millerd',
				coverUrl: 'https://m.media-amazon.com/images/I/61aZhXSli3L._UF1000,1000_QL80_.jpg',
				description:
					'Un libro che esplora alternative alle tradizionali carriere lavorative, incoraggiando a costruire percorsi personali più allineati con i propri valori invece di seguire sentieri già tracciati.'
			},
			{
				id: '2023-5',
				title: 'Atomic Habits',
				author: 'James Clear',
				coverUrl: 'https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg',
				description:
					'Una guida pratica per costruire buone abitudini ed eliminare quelle negative, basata su scoperte scientifiche e casi di studio di atleti olimpionici, artisti e leader di successo.'
			},
			{
				id: '2023-6',
				title: 'The Almanack of Naval Ravikant',
				author: 'Eric Jorgenson',
				coverUrl: 'https://m.media-amazon.com/images/I/61+NT5yiNlL._AC_UF1000,1000_QL80_.jpg',
				description:
					"Una raccolta di saggezza e consigli dell'imprenditore e investitore Naval Ravikant su temi come creare ricchezza, trovare felicità, sviluppare giudizio e prendere decisioni migliori."
			}
		],
		'2024': [
			{
				id: '2024-1',
				title: 'Never Let Me Go',
				author: 'Kazuo Ishiguro',
				coverUrl: 'https://m.media-amazon.com/images/I/716qHj8vH7L._AC_UF1000,1000_QL80_.jpg',
				description:
					'Un romanzo distopico che segue la vita di tre amici cresciuti in un collegio inglese, scoprendo gradualmente il loro destino particolare in un mondo alternativo che solleva questioni etiche profonde.'
			},
			{
				id: '2024-2',
				title: 'Uno, nessuno, centomila',
				author: 'Luigi Pirandello',
				coverUrl: 'https://www.oscarmondadori.it/content/uploads/2016/05/978880466800HIG.webp',
				description:
					"Un romanzo che esplora la crisi d'identità del protagonista quando scopre che l'immagine che ha di sé è diversa da come lo vedono gli altri, riflettendo sui temi dell'identità e della percezione."
			},
			{
				id: '2024-3',
				title: 'Creative Dysregulation',
				author: 'Kelly Wilde Miller',
				coverUrl: 'https://m.media-amazon.com/images/I/81uPyEozMPL._UF1000,1000_QL80_.jpg',
				description:
					"Un'esplorazione di come la creatività possa emergere dal caos emotivo e dall'instabilità, offrendo prospettive su come trasformare esperienze di disfunzione in opportunità creative."
			},
			{
				id: '2024-4',
				title: 'The Anthropocene Reviewed',
				author: 'John Green',
				coverUrl:
					'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1616514130l/55145261.jpg',
				description:
					"Una raccolta di saggi personali che recensiscono su una scala da 1 a 5 stelle diversi aspetti dell'esperienza umana contemporanea, dall'esistenziale al banale, nell'era dell'Antropocene."
			},
			{
				id: '2024-5',
				title: 'The Will to Change',
				author: 'bell hooks',
				coverUrl: 'https://m.media-amazon.com/images/I/71lhiY1JWCL.jpg',
				description:
					"Un'analisi di come il patriarcato danneggi gli uomini, limitando la loro capacità emotiva e creando modelli di mascolinità tossica, offrendo una visione per un amore e relazioni più sane."
			},
			{
				id: '2024-6',
				title: 'Tomorrow, and Tomorrow, and Tomorrow',
				author: 'Gabrielle Zevin',
				coverUrl: 'https://m.media-amazon.com/images/I/91HY8gaU8pL._AC_UF1000,1000_QL80_.jpg',
				description:
					"Un romanzo che segue l'amicizia e la collaborazione professionale di due sviluppatori di videogiochi nell'arco di trent'anni, esplorando temi di creatività, identità e connessione umana."
			},
			{
				id: '2024-7',
				title: 'Same as Ever',
				author: 'Morgan Housel',
				coverUrl: 'https://m.media-amazon.com/images/I/71znMAUESWL.jpg',
				description:
					'Una raccolta di riflessioni su come, nonostante i cambiamenti tecnologici e sociali, certi aspetti della natura umana e della psicologia rimangono costanti, influenzando le nostre decisioni.'
			},
			{
				id: '2024-8',
				title: 'I pesci non esistono',
				author: 'Lulu Miller',
				coverUrl: 'https://www.ibs.it/images/9788867832804_0_0_0_0_0.jpg',
				description:
					"Un'opera che intreccia biografia, scienza e memoir personale, raccontando la storia di un ittiologo del XIX secolo e riflettendo sul concetto di ordine e caos nella vita e nella scienza."
			},
			{
				id: '2024-9',
				title: 'Frankenstein',
				author: 'Mary Shelley',
				coverUrl: 'https://m.media-amazon.com/images/I/71UR8nhbYML._AC_UF1000,1000_QL80_.jpg',
				description:
					'Un classico gothic novel che esplora temi di creazione, responsabilità scientifica e alienazione attraverso la storia di uno scienziato che dà vita a una creatura per poi abbandonarla.'
			},
			{
				id: '2024-10',
				title: 'Piranesi',
				author: 'Susanna Clarke',
				coverUrl: 'https://fazieditore.it/wp-content/uploads/2021/01/piranesi.jpg',
				description:
					"Un romanzo che racconta la storia di un uomo che vive in un labirinto infinito di sale piene di statue, esplorando temi di identità, memoria e realtà attraverso un'atmosfera onirica e misteriosa."
			},
			{
				id: '2024-11',
				title: 'Astrofisica per ansiosi',
				author: 'Licia Troisi',
				coverUrl:
					'https://universi.inaf.it/wp-content/uploads/2024/06/cover_libro_troisi-scaled.jpg',
				description:
					'Una raccolta di brevi riflessioni scientifiche che offrono una prospettiva cosmica sui problemi umani, presentando concetti astrofisici complessi in modo accessibile e rassicurante.'
			},
			{
				id: '2024-12',
				title: 'Buchi bianchi',
				author: 'Carlo Rovelli',
				coverUrl: 'https://www.adelphi.it/spool/og__id13027_w800_t1676628805__1x.jpg',
				description:
					"Un saggio che esplora la teoria dei buchi bianchi come possibile risposta al mistero dei buchi neri, combinando fisica teorica e cosmologia con riflessioni filosofiche sul tempo e l'universo."
			},
			{
				id: '2024-13',
				title: 'Klara e il sole',
				author: 'Kazuo Ishiguro',
				coverUrl: 'https://www.ibs.it/images/9788806253561_0_0_536_0_75.jpg',
				description:
					"Un romanzo narrato dal punto di vista di un'Amica Artificiale che osserva il mondo umano, esplorando temi di amore, lealtà e cosa significhi essere umani in un futuro tecnologicamente avanzato."
			},
			{
				id: '2024-14',
				title: 'Creative Doing',
				author: 'Herbert Lui',
				coverUrl: 'https://m.media-amazon.com/images/I/61GI17NRsRL._AC_UF1000,1000_QL80_.jpg',
				description:
					'Una guida pratica che offre esercizi e strategie per superare i blocchi creativi e sviluppare una pratica creativa regolare e sostenibile, indipendentemente dal mezzo espressivo scelto.'
			},
			{
				id: '2024-15',
				title: 'La morte della Pizia',
				author: 'Friedrich Dürrenmatt',
				coverUrl: 'https://www.adelphi.it/spool/i__id2421_mw1000__1x.jpg',
				description:
					"Una reinterpretazione ironica e sovversiva dei miti greci e dell'oracolo di Delfi, che esplora il tema del destino e della libertà umana attraverso una narrazione che mescola mito e modernità."
			}
		],
		'2025': [
			{
				id: '2025-1',
				title: 'Nella quiete del tempo',
				author: 'Olga Tokarczuk',
				coverUrl: 'https://dbtitoli.giunti.it/api/media/image/getImage?cm=B0646A&type=P',
				description:
					"Un romanzo della premio Nobel che intreccia molteplici storie attraverso diversi periodi storici, esplorando il rapporto tra l'uomo e la natura e la ricerca di significato nell'esistenza."
			},
			{
				id: '2025-2',
				title: 'Tuesdays with Morrie',
				author: 'Mitch Albom',
				coverUrl: 'https://m.media-amazon.com/images/I/91JGbl7K1OL.jpg',
				description:
					"Un memoir toccante che racconta gli incontri settimanali dell'autore con il suo vecchio professore malato terminale, condividendo lezioni profonde sulla vita, l'amore, il perdono e la morte."
			},
			{
				id: '2025-3',
				title: "So Good They Can't Ignore You",
				author: 'Cal Newport',
				coverUrl: 'https://m.media-amazon.com/images/I/71KLTWMGdrL.jpg',
				description:
					"Un saggio che sfida il concetto di 'seguire la propria passione', proponendo invece di sviluppare competenze rare e preziose come strategia per costruire una carriera soddisfacente e significativa."
			}
		]
	};
</script>

<main class="flex flex-1 flex-col gap-24 p-4 py-20">
	<section class="flex flex-col gap-8">
		<div class="animate-on-scroll flex flex-col gap-2 text-center">
			<h6 class="text-lg sm:text-xl md:text-2xl">Libreria Personale</h6>
			<h3 class="text-3xl sm:text-4xl md:text-5xl">
				I miei <span class="text-blue-400">migliori libri</span> per anno
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
				3 per riga
			</button>
			<button
				class={`rounded-md px-3 py-1 transition-colors ${
					gridColumns === 4
						? 'bg-blue-400 text-white'
						: 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
				}`}
				on:click={() => changeGridView(4)}
			>
				4 per riga
			</button>
			<button
				class={`hidden rounded-md px-3 py-1 transition-colors xl:block ${
					gridColumns === 5
						? 'bg-blue-400 text-white'
						: 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
				}`}
				on:click={() => changeGridView(5)}
			>
				5 per riga
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
							class={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${
								gridColumns === 3
									? 'md:grid-cols-3'
									: gridColumns === 4
									  ? 'md:grid-cols-3 lg:grid-cols-4'
									  : 'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
							}`}
						>
							{#each booksByYear[year] as book}
								<div
									class="animate-on-scroll group flex flex-col overflow-hidden rounded-lg bg-slate-200/50 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900/50 dark:shadow-none dark:hover:bg-slate-900/70"
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
												gridColumns >= 4 ? 'line-clamp-3' : ''
											}`}
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

<style>
	/* Animazione per il caricamento delle immagini */
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

	/* Stile per gli elementi animati */
	:global(.animate-on-scroll) {
		opacity: 0;
		transform: translateY(30px);
	}

	/* Disattiva transizioni per utenti che preferiscono ridurre le animazioni */
	@media (prefers-reduced-motion: reduce) {
		:global(.animate-on-scroll) {
			opacity: 1;
			transform: none;
		}

		img {
			opacity: 1;
			animation: none;
		}

		/* Disattiva tutte le transizioni */
		* {
			transition: none !important;
			animation: none !important;
		}
	}
</style>
