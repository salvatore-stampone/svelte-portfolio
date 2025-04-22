<script>
	import { onMount } from 'svelte';
	import SvelteHeatmap from 'svelte-heatmap';
	import SkillNode from '../../components/SkillNode.svelte';
	import CompanyLogoPlaceholder from '../../components/CompanyLogoPlaceholder.svelte';
	import { theme } from '$lib/stores/theme';
	import { gsap } from 'gsap';

	const experiences = [
		{
			period: '2024 — Today',
			company: 'Otello AI',
			logo: '/images/logos/otello.jpeg',
			technologies: [
				{ name: 'Vue.js', icon: 'fa-brands fa-vuejs' },
				{ name: 'Node.js', icon: 'fa-brands fa-node-js' },
				{ name: 'Express.js', icon: 'fa-solid fa-server' },
				{ name: 'PostgreSQL', icon: 'fa-solid fa-database' },
				{ name: 'GCP', icon: 'fa-brands fa-google' },
				{ name: 'Ruby', icon: 'fa-solid fa-gem' },
				{ name: 'Ruby on Rails', icon: 'fa-solid fa-train' },
				{ name: 'Python', icon: 'fa-brands fa-python' },
				{
					name: 'TailwindCSS',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
						<path fill="none" stroke="currentColor" stroke-width="1.2" d="M22.105,7.553c-0.224,0.448 -0.523,0.723 -0.914,0.838c-0.614,0.183 -1.343,-0.052 -1.685,-0.253c-0.451,-0.265 -0.974,-0.667 -1.527,-1.092c-1.765,-1.358 -3.961,-3.046 -6.979,-3.046c-2.414,0 -3.654,1.239 -5.707,3.293l1.407,1.421c0.546,-0.425 4.031,-0.015 5.552,1.194c2.259,1.795 3.89,3.092 5.748,3.092c2.659,0 4.879,-1.741 5.94,-4.658zM16.192,15.391c-0.613,0.18 -1.343,-0.052 -1.685,-0.253c-0.451,-0.265 -0.974,-0.667 -1.527,-1.092c-1.766,-1.358 -3.962,-3.046 -6.98,-3.046c-2.414,0 -3.654,1.239 -5.707,3.293l1.407,1.421c0.545,-0.427 4.032,-0.014 5.552,1.194c2.259,1.795 3.89,3.092 5.748,3.092c2.659,0 4.879,-1.741 5.94,-4.658l-1.834,-0.789c-0.225,0.448 -0.523,0.722 -0.914,0.838z"/>
					</svg>`
				}
			],
			description:
				'Otello is a software platform that unifies all hotel messaging channels and features an AI assistant designed to enhance the guest experience.<br><br>By automating routine tasks and handling inquiries, the AI frees up staff from repetitive, low-value work. It also helps increase customer conversions with faster response times while ensuring consistent and high-quality communication.',
			link: 'https://www.otello.ai/'
		},
		{
			period: '2022 - Today',
			company: 'Brots Lab',
			logo: '/images/logos/brots.jpeg',
			technologies: [
				{ name: 'Next.js', icon: 'fa-solid fa-n' },
				{ name: 'Node.js', icon: 'fa-brands fa-node-js' },
				{ name: 'Express.js', icon: 'fa-solid fa-server' },
				{ name: 'PostgreSQL', icon: 'fa-solid fa-database' },
				{ name: 'GCP', icon: 'fa-brands fa-google' },
				{ name: 'React', icon: 'fa-brands fa-react' },
				{
					name: 'TailwindCSS',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
						<path fill="none" stroke="currentColor" stroke-width="1.2" d="M22.105,7.553c-0.224,0.448 -0.523,0.723 -0.914,0.838c-0.614,0.183 -1.343,-0.052 -1.685,-0.253c-0.451,-0.265 -0.974,-0.667 -1.527,-1.092c-1.765,-1.358 -3.961,-3.046 -6.979,-3.046c-2.414,0 -3.654,1.239 -5.707,3.293l1.407,1.421c0.546,-0.425 4.031,-0.015 5.552,1.194c2.259,1.795 3.89,3.092 5.748,3.092c2.659,0 4.879,-1.741 5.94,-4.658zM16.192,15.391c-0.613,0.18 -1.343,-0.052 -1.685,-0.253c-0.451,-0.265 -0.974,-0.667 -1.527,-1.092c-1.766,-1.358 -3.962,-3.046 -6.98,-3.046c-2.414,0 -3.654,1.239 -5.707,3.293l1.407,1.421c0.545,-0.427 4.032,-0.014 5.552,1.194c2.259,1.795 3.89,3.092 5.748,3.092c2.659,0 4.879,-1.741 5.94,-4.658l-1.834,-0.789c-0.225,0.448 -0.523,0.722 -0.914,0.838z"/>
					</svg>`
				}
			],
			description:
				'Brots develops innovative software for the music industry, focusing on practical solutions that enhance <span class="text-blue-400">creativity</span> and streamline industry processes.<br><br>Explore the future of music tech with us.',
			link: 'https://www.brotslab.com/'
		},
		{
			period: '2024',
			company: 'Wolico',
			logo: '/images/logos/wolico.jpeg',
			technologies: [
				{ name: 'Next.js', icon: 'fa-solid fa-n' },
				{ name: 'Node.js', icon: 'fa-brands fa-node-js' },
				{ name: 'Express.js', icon: 'fa-solid fa-server' },
				{ name: 'Redux', icon: 'fa-solid fa-layer-group' },
				{ name: 'Axios', icon: 'fa-solid fa-a' },
				{ name: 'Shadcn', icon: 'fa-solid fa-palette' },
				{
					name: 'TailwindCSS',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
						<path fill="none" stroke="currentColor" stroke-width="1.2" d="M22.105,7.553c-0.224,0.448 -0.523,0.723 -0.914,0.838c-0.614,0.183 -1.343,-0.052 -1.685,-0.253c-0.451,-0.265 -0.974,-0.667 -1.527,-1.092c-1.765,-1.358 -3.961,-3.046 -6.979,-3.046c-2.414,0 -3.654,1.239 -5.707,3.293l1.407,1.421c0.546,-0.425 4.031,-0.015 5.552,1.194c2.259,1.795 3.89,3.092 5.748,3.092c2.659,0 4.879,-1.741 5.94,-4.658zM16.192,15.391c-0.613,0.18 -1.343,-0.052 -1.685,-0.253c-0.451,-0.265 -0.974,-0.667 -1.527,-1.092c-1.766,-1.358 -3.962,-3.046 -6.98,-3.046c-2.414,0 -3.654,1.239 -5.707,3.293l1.407,1.421c0.545,-0.427 4.032,-0.014 5.552,1.194c2.259,1.795 3.89,3.092 5.748,3.092c2.659,0 4.879,-1.741 5.94,-4.658l-1.834,-0.789c-0.225,0.448 -0.523,0.722 -0.914,0.838z"/>
					</svg>`
				}
			],
			description:
				'The project involved the application of Lega Calcio, which includes <span class="text-blue-400">Lega Serie A</span>, <span class="text-blue-400">Lega Serie B</span> and <span class="text-blue-400">AIA</span> (refereeing).<br><br>Among other things, I was mainly responsible for:<br>✅ managing and implementing the creation of the <span class="text-blue-400">front-end</span> based on the UI developed in Figma, bringing freshness, modernity and useful features to the application thanks to <span class="text-blue-400">Next.js</span>, <span class="text-blue-400">Shadcn</span> and <span class="text-blue-400">TailwindCSS</span>;<br>✅ managing and implementing the <span class="text-blue-400">back-end</span> in <span class="text-blue-400">Express.js</span>;<br>✅ connecting the back-end to the front-end through <span class="text-blue-400">Redux</span> and <span class="text-blue-400">Axios</span>.',
			link: 'https://about.wolico.com/'
		},
		{
			period: '2024',
			company: 'Keeo',
			logo: '/images/logos/keeo.webp',
			technologies: [
				{
					name: 'Dart',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48">
						<path fill="none" stroke="currentColor" d="M 25.697266 0.99414062 C 25.465673 0.99505538 25.23335 1.0081379 25.001953 1.0351562 C 24.384896 1.1072053 23.771818 1.2719448 23.185547 1.5351562 L 8.6464844 8.0625 A 1.0001 1.0001 0 0 0 8.0878906 8.5898438 A 1.0001 1.0001 0 0 0 8.0644531 8.6445312 L 1.5351562 23.185547 C 0.48255086 25.531285 0.99014837 28.292121 2.8085938 30.109375 L 9.7480469 37.046875 C 9.7500028 37.048838 9.7519474 37.050773 9.7539062 37.052734 L 20.390625 47.707031 A 1.0001 1.0001 0 0 0 21.097656 48 L 38 48 A 1.0001 1.0001 0 0 0 39 47 L 39 39 L 47 39 A 1.0001 1.0001 0 0 0 48 38 L 48 21.097656 A 1.0001 1.0001 0 0 0 47.707031 20.390625 L 37.052734 9.7539062 C 37.050773 9.7519474 37.048838 9.7500028 37.046875 9.7480469 L 30.109375 2.8085938 C 28.9167 1.6151376 27.318411 0.98773734 25.697266 0.99414062 z M 25.863281 2.9921875 C 26.90675 3.026668 27.923693 3.4505312 28.695312 4.2226562 L 32.470703 8 L 13.667969 8 L 24.003906 3.359375 C 24.60125 3.0911923 25.2372 2.9714992 25.863281 2.9921875 z M 11.412109 10 L 32.8125 10 C 33.872846 10 34.889035 10.421085 35.638672 11.169922 L 36.296875 11.828125 L 44.666016 20.199219 L 44.673828 20.191406 L 46 21.513672 L 46 37 L 38.275391 37 L 11.412109 10 z M 10 11.417969 L 35.455078 37 L 12.53125 37 L 11.464844 35.933594 L 11.169922 35.638672 C 10.421085 34.889035 10 33.872846 10 32.8125 L 10 11.417969 z M 8 13.667969 L 8 32.470703 L 4.2226562 28.695312 C 2.9871016 27.460567 2.6459336 25.598168 3.3613281 24.003906 L 3.359375 24.003906 L 8 13.667969 z M 14.533203 39 L 37 39 L 37 46 L 21.513672 46 L 20.189453 44.673828 L 20.199219 44.664062 L 14.533203 39 z"/>
					</svg>`
				},
				{
					name: 'Flutter',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48">
						<path fill="none" stroke="currentColor" d="M27,3c-0.2652,0.00005 -0.51952,0.10543 -0.70703,0.29297l-21,21c-0.39037,0.39053 -0.39037,1.02353 0,1.41406l6,6c0.39053,0.39037 1.02353,0.39037 1.41406,0l27,-27c0.28583,-0.28603 0.37129,-0.71604 0.21656,-1.08963c-0.15474,-0.37359 -0.51922,-0.61724 -0.92359,-0.6174zM27.41406,5h9.17188l-24.58594,24.58594l-4.58594,-4.58594zM28,22c-0.2652,0.00005 -0.51952,0.10543 -0.70703,0.29297l-12,12c-0.39037,0.39053 -0.39037,1.02353 0,1.41406l6,6l6,6c0.18751,0.18754 0.44183,0.29292 0.70703,0.29297h12c0.40437,-0.00016 0.76885,-0.24381 0.92359,-0.6174c0.15474,-0.37359 0.06927,-0.8036 -0.21656,-1.08963l-11.29297,-11.29297l11.29297,-11.29297c0.28583,-0.28603 0.37129,-0.71604 0.21656,-1.08963c-0.15474,-0.37359 -0.51922,-0.61724 -0.92359,-0.6174zM28.41406,24h9.17188l-15.58594,15.58594l-4.58594,-4.58594zM28,36.41406l9.58594,9.58594h-9.17188l-5,-5z"/>
					</svg>`
				},
				{ name: 'Node.js', icon: 'fa-brands fa-node-js' },
				{ name: 'Express.js', icon: 'fa-solid fa-server' },
				{ name: 'PostgreSQL', icon: 'fa-solid fa-database' },
				{ name: 'GCP', icon: 'fa-brands fa-google' },
				{ name: 'React', icon: 'fa-brands fa-react' },
				{
					name: 'TailwindCSS',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
						<path fill="none" stroke="currentColor" stroke-width="1.2" d="M22.105,7.553c-0.224,0.448 -0.523,0.723 -0.914,0.838c-0.614,0.183 -1.343,-0.052 -1.685,-0.253c-0.451,-0.265 -0.974,-0.667 -1.527,-1.092c-1.765,-1.358 -3.961,-3.046 -6.979,-3.046c-2.414,0 -3.654,1.239 -5.707,3.293l1.407,1.421c0.546,-0.425 4.031,-0.015 5.552,1.194c2.259,1.795 3.89,3.092 5.748,3.092c2.659,0 4.879,-1.741 5.94,-4.658zM16.192,15.391c-0.613,0.18 -1.343,-0.052 -1.685,-0.253c-0.451,-0.265 -0.974,-0.667 -1.527,-1.092c-1.766,-1.358 -3.962,-3.046 -6.98,-3.046c-2.414,0 -3.654,1.239 -5.707,3.293l1.407,1.421c0.545,-0.427 4.032,-0.014 5.552,1.194c2.259,1.795 3.89,3.092 5.748,3.092c2.659,0 4.879,-1.741 5.94,-4.658l-1.834,-0.789c-0.225,0.448 -0.523,0.722 -0.914,0.838z"/>
					</svg>`
				}
			],
			description:
				'Keeo is a new streaming platform that adopts a <span class="text-blue-400">pay-per-stream</span> model for users to listen to music.<br><br>Unlike traditional subscription models that require monthly fees, Keeo allows users to add funds to their accounts and charges them a fixed price for each stream that lasts over 30 seconds, offering a premium experience.',
			link: 'https://www.keeo.io/'
		}
	];

	let heatmapContainer;
	let contributionsCount = 0;
	let loading = true;
	let heatmapInstance;
	let elementsToAnimate = [];
	let languageCircles = [];
	let prefersReducedMotion = false;

	// Definiamo i colori per i temi
	const themeColors = {
		dark: {
			colors: ['#0D4429', '#006D32', '#26A641', '#39D353'],
			fontColor: '#8B949E',
			emptyColor: '#161B22'
		},
		light: {
			colors: ['#9BE9A8', '#40C463', '#30A14E', '#216E39'],
			fontColor: '#57606A',
			emptyColor: '#D3D7DC'
		}
	};

	async function fetchGithubData() {
		try {
			// Nota: Sostituisci TOKEN con il tuo GitHub Personal Access Token
			const response = await fetch('https://api.github.com/graphql', {
				method: 'POST',
				headers: {
					Authorization: `bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: `
						query {
							user(login: "S-Memento") {
								contributionsCollection {
									contributionCalendar {
										totalContributions
										weeks {
											contributionDays {
												contributionCount
												date
											}
										}
									}
								}
							}
						}
					`
				})
			});

			const { data } = await response.json();
			const calendar = data.user.contributionsCollection.contributionCalendar;

			// Aggiorna il conteggio totale
			contributionsCount = calendar.totalContributions;

			// Trasforma i dati nel formato richiesto da svelte-heatmap
			const contributionsData = calendar.weeks.flatMap((week) =>
				week.contributionDays.map((day) => ({
					date: day.date,
					value: day.contributionCount
				}))
			);

			return contributionsData;
		} catch (error) {
			console.error('Error fetching GitHub data:', error);
			return [];
		} finally {
			loading = false;
		}
	}

	// Funzione per aggiornare i colori del heatmap
	function updateHeatmapColors(isDark) {
		if (heatmapInstance) {
			const colors = isDark ? themeColors.dark : themeColors.light;
			heatmapInstance.$set(colors);
		}
	}

	// Funzione per verificare se l'utente preferisce ridurre le animazioni
	function checkReducedMotion() {
		if (typeof window !== 'undefined') {
			return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		}
		return false;
	}

	onMount(async () => {
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

				// Imposta subito i cerchi delle lingue alla percentuale finale
				languageCircles = [...document.querySelectorAll('.language-circle')];
				languageCircles.forEach((circle) => {
					const percent = parseFloat(circle.getAttribute('data-percent')) || 0;
					const circumference = 2 * Math.PI * 54;
					const offset = circumference - (percent / 100) * circumference;

					gsap.set(circle, {
						strokeDasharray: `${circumference} ${circumference}`,
						strokeDashoffset: offset
					});
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

				// Configuriamo l'animazione per i cerchi delle lingue
				languageCircles = [...document.querySelectorAll('.language-circle')];
				languageCircles.forEach((circle) => {
					const percent = parseFloat(circle.getAttribute('data-percent')) || 0;
					const circumference = 2 * Math.PI * 54; // Circonferenza (2πr)
					const offset = circumference - (percent / 100) * circumference;

					// Impostiamo lo stato iniziale
					gsap.set(circle, {
						strokeDasharray: `${circumference} ${circumference}`,
						strokeDashoffset: circumference
					});

					// Animiamo la barra circolare dall'inizio fino alla percentuale
					gsap.to(circle, {
						strokeDashoffset: offset,
						duration: 0.5,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: circle,
							start: 'top 85%',
							toggleActions: 'play none none none'
						}
					});
				});
			}
		});

		const today = new Date();
		const lastYear = new Date(today);
		lastYear.setFullYear(lastYear.getFullYear() - 1);

		const data = await fetchGithubData();
		const initialColors = $theme === 'dark' ? themeColors.dark : themeColors.light;

		heatmapInstance = new SvelteHeatmap({
			target: heatmapContainer,
			props: {
				data,
				...initialColors,
				dayLabelWidth: 30,
				monthLabelHeight: 20,
				startDate: lastYear,
				endDate: today,
				cellSize: 10,
				cellGap: 2,
				cellRadius: '20%',
				allowOverflow: true
			}
		});

		// Sottoscrizione ai cambiamenti del tema
		return theme.subscribe((value) => {
			updateHeatmapColors(value === 'dark');
		});
	});

	const skillTree = {
		fundamentals: {
			name: 'Fundamentals',
			level: 'master',
			icon: 'fa-solid fa-code',
			children: {
				html: { name: 'HTML', level: 'master', icon: 'fa-brands fa-html5' },
				css: {
					name: 'CSS',
					level: 'master',
					icon: 'fa-brands fa-css3-alt',
					children: {
						sass: { name: 'Sass', level: 'expert', icon: 'fa-brands fa-sass' },
						tailwind: { name: 'TailwindCSS', level: 'master', icon: 'fa-solid fa-wind' },
						cssModules: { name: 'CSS Modules', level: 'expert', icon: 'fa-solid fa-puzzle-piece' },
						bem: { name: 'BEM', level: 'expert', icon: 'fa-solid fa-cubes' }
					}
				},
				git: {
					name: 'Version Control',
					level: 'master',
					icon: 'fa-brands fa-git-alt',
					children: {
						github: { name: 'GitHub', level: 'master', icon: 'fa-brands fa-github' },
						actions: { name: 'GitHub Actions', level: 'intermediate', icon: 'fa-solid fa-gears' }
					}
				}
			}
		},
		frontend: {
			name: 'Frontend',
			level: 'master',
			icon: 'fa-solid fa-desktop',
			children: {
				react: {
					name: 'React',
					level: 'master',
					icon: 'fa-brands fa-react',
					children: {
						nextjs: { name: 'Next.js', level: 'expert', icon: 'fa-solid fa-n' },
						redux: { name: 'Redux', level: 'expert', icon: 'fa-solid fa-layer-group' }
					}
				},
				vue: { name: 'Vue.js', level: 'intermediate', icon: 'fa-brands fa-vuejs' },
				svelte: {
					name: 'Svelte',
					level: 'expert',
					icon: 'fa-solid fa-s',
					children: {
						sveltekit: { name: 'SvelteKit', level: 'expert', icon: 'fa-solid fa-k' }
					}
				},
				typescript: { name: 'TypeScript', level: 'expert', icon: 'fa-solid fa-t' }
			}
		},
		mobile: {
			name: 'Mobile',
			level: 'intermediate',
			icon: 'fa-solid fa-mobile-screen',
			children: {
				flutter: {
					name: 'Flutter',
					level: 'intermediate',
					icon: 'fa-solid fa-f',
					children: {
						dart: { name: 'Dart', level: 'intermediate', icon: 'fa-solid fa-d' }
					}
				},
				reactNative: { name: 'React Native', level: 'intermediate', icon: 'fa-brands fa-react' }
			}
		},
		backend: {
			name: 'Backend',
			level: 'expert',
			icon: 'fa-solid fa-server',
			children: {
				apis: {
					name: 'APIs',
					level: 'expert',
					icon: 'fa-solid fa-plug',
					children: {
						rest: { name: 'RESTful', level: 'expert', icon: 'fa-solid fa-link' },
						graphql: {
							name: 'GraphQL',
							level: 'intermediate',
							icon: 'fa-solid fa-diagram-project'
						},
						axios: { name: 'Axios', level: 'expert', icon: 'fa-solid fa-a' }
					}
				},
				ruby: {
					name: 'Ruby',
					level: 'intermediate',
					icon: 'fa-solid fa-gem',
					children: {
						rails: { name: 'Ruby on Rails', level: 'intermediate', icon: 'fa-solid fa-train' }
					}
				},
				python: { name: 'Python', level: 'intermediate', icon: 'fa-brands fa-python' },
				redis: { name: 'Redis', level: 'intermediate', icon: 'fa-solid fa-database' }
			}
		},
		cloud: {
			name: 'Cloud',
			level: 'intermediate',
			icon: 'fa-solid fa-cloud',
			children: {
				gcp: { name: 'Google Cloud', level: 'intermediate', icon: 'fa-brands fa-google' },
				azure: { name: 'Azure', level: 'intermediate', icon: 'fa-brands fa-microsoft' },
				vercel: { name: 'Vercel', level: 'expert', icon: 'fa-solid fa-v' }
			}
		}
	};

	const levelColors = {
		master: 'from-purple-500 to-purple-700 dark:from-purple-600 dark:to-purple-800',
		expert: 'from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800',
		intermediate: 'from-green-500 to-green-700 dark:from-green-600 dark:to-green-800'
	};

	const languages = [
		{
			name: 'Italian',
			level: 'Native',
			icon: '🇮🇹',
			proficiency: 99.9
		},
		{
			name: 'English',
			level: 'Extremely Fluent',
			icon: '🇬🇧',
			proficiency: 95
		},
		{
			name: 'German',
			level: 'Fluent',
			icon: '🇩🇪',
			proficiency: 80
		},
		{
			name: 'French',
			level: 'Fluent',
			icon: '🇫🇷',
			proficiency: 75
		},
		{
			name: 'Russian',
			level: 'Advanced Beginner',
			icon: '🇷🇺',
			proficiency: 35
		}
	];
</script>

<main class="flex flex-1 flex-col gap-24 p-4 py-20">
	<!-- GitHub Activity -->
	<section class="flex flex-col gap-8">
		<div class="animate-on-scroll flex flex-col gap-2 text-center">
			<h6 class="text-lg sm:text-xl md:text-2xl">My GitHub Activity</h6>
			{#if loading}
				<h3 class="text-3xl sm:text-4xl md:text-5xl">Loading...</h3>
			{:else}
				<h3 class="text-3xl sm:text-4xl md:text-5xl">
					<span class="text-blue-400">{contributionsCount}</span> contributions in the last year
				</h3>
			{/if}
		</div>
		<div
			class="animate-on-scroll mx-auto w-full max-w-5xl rounded-xl bg-slate-200/50 p-6 shadow-lg dark:bg-slate-900/50 dark:shadow-none"
		>
			<div bind:this={heatmapContainer} />
		</div>
	</section>

	<!-- Work Experience -->
	<section class="flex flex-col gap-8">
		<div class="animate-on-scroll flex flex-col gap-2 text-center">
			<h6 class="text-lg sm:text-xl md:text-2xl">Professional Journey</h6>
			<h3 class="text-3xl sm:text-4xl md:text-5xl">
				Notable <span class="text-blue-400">work</span> experience
			</h3>
		</div>

		<div class="mx-auto grid w-full max-w-5xl gap-8 sm:gap-12">
			{#each experiences as experience}
				<a
					href={experience.link}
					target="_blank"
					class="animate-on-scroll group relative flex flex-col gap-6 rounded-xl bg-slate-200/50 p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900/50 dark:shadow-none dark:hover:bg-slate-900/70 sm:flex-row sm:gap-8"
				>
					<div class="shrink-0">
						{#if !experience.logo}
							<CompanyLogoPlaceholder company={experience.company} size={64} />
						{:else}
							<img
								src={experience.logo}
								alt={experience.company}
								class="h-16 w-16 rounded-lg object-contain"
							/>
						{/if}
					</div>
					<div class="flex flex-1 flex-col gap-2">
						<div class="flex flex-col gap-1">
							<p class="text-sm text-slate-600 dark:text-slate-400">{experience.period}</p>
							<h4 class="text-xl font-semibold sm:text-2xl">{experience.company}</h4>
							{#if experience.technologies}
								<div class="flex flex-wrap gap-2">
									{#each experience.technologies as tech}
										<div
											class="flex items-center gap-1.5 rounded-md bg-blue-400/10 px-2 py-1 text-sm text-blue-400"
										>
											{#if tech.icon.startsWith('<svg')}
												{@html tech.icon}
											{:else}
												<i class={tech.icon} />
											{/if}
											<span>{tech.name}</span>
										</div>
									{/each}
								</div>
							{/if}
						</div>
						<p class="text-slate-700 dark:text-slate-300">{@html experience.description}</p>
					</div>
					<div
						class="absolute right-4 top-4 text-slate-400 transition-transform group-hover:translate-x-1"
					>
						<i class="fa-solid fa-arrow-right" />
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Languages -->
	<section class="flex flex-col gap-8">
		<div class="animate-on-scroll flex flex-col gap-2 text-center">
			<h6 class="text-lg sm:text-xl md:text-2xl">Language Proficiency</h6>
			<h3 class="text-3xl sm:text-4xl md:text-5xl">
				My <span class="text-blue-400">linguistic</span> skills
			</h3>
		</div>

		<div class="mx-auto grid w-full max-w-5xl gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
			{#each languages as language}
				<div class="animate-on-scroll flex flex-col items-center gap-4">
					<div class="relative h-[120px] w-[120px]">
						<!-- SVG per il cerchio di progresso -->
						<svg width="120" height="120" viewBox="0 0 120 120">
							<!-- Cerchio di sfondo -->
							<circle
								cx="60"
								cy="60"
								r="54"
								stroke={$theme === 'dark' ? '#1e293b' : '#e2e8f0'}
								stroke-width="10"
								fill="none"
							/>

							<!-- Cerchio di progresso con gradiente dinamico -->
							<defs>
								<linearGradient id="gradient-{language.name}" x1="0%" y1="0%" x2="100%" y2="0%">
									<stop
										offset="0%"
										stop-color={language.proficiency > 80 ? '#3b82f6' : '#60a5fa'}
									/>
									<stop
										offset="100%"
										stop-color={language.proficiency > 80 ? '#2563eb' : '#3b82f6'}
									/>
								</linearGradient>
							</defs>

							<circle
								class="language-circle"
								data-percent={language.proficiency}
								cx="60"
								cy="60"
								r="54"
								stroke={`url(#gradient-${language.name})`}
								stroke-width="10"
								fill="none"
								transform="rotate(-90 60 60)"
								stroke-linecap="round"
							/>
						</svg>

						<!-- Icona della lingua al centro -->
						<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
							{language.icon}
						</div>

						<!-- Percentuale -->
						<div
							class="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white"
						>
							{language.proficiency}%
						</div>
					</div>

					<div class="flex flex-col items-center text-center">
						<h4 class="text-lg font-medium">{language.name}</h4>
						<span class="text-sm text-slate-600 dark:text-slate-400">{language.level}</span>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Skills -->
	<!-- <section class="flex flex-col gap-2">
		<div class="flex flex-col gap-2 text-center">
			<h6 class="text-lg sm:text-xl md:text-2xl">Technical Proficiency</h6>
			<h3 class="text-3xl sm:text-4xl md:text-5xl">
				My <span class="text-blue-400">skill</span> tree
			</h3>
		</div>

		<div class="mx-auto w-full max-w-[1200px] overflow-x-auto p-20">
			<div class="flex min-w-max justify-center gap-8">
				{#each Object.entries(skillTree) as [key, skill]}
					<SkillNode
						{skill}
						isRoot={true}
						siblingIds={Object.entries(skillTree)
							.filter(([k]) => k !== key)
							.map(() => Math.random().toString(36).substr(2, 9))}
						on:nodeToggle={({ detail }) => {
							document.querySelectorAll('.skill-node').forEach((node) => {
								if (typeof node.handleNodeToggle === 'function') {
									node.handleNodeToggle(detail.id, detail.siblingIds);
								}
							});
						}}
					/>
				{/each}
			</div>
		</div>
	</section> -->
</main>

<style>
	/* Animazioni per l'apertura dei nodi */
	:global(.skill-node-enter) {
		opacity: 0;
		transform: translateY(-20px);
	}

	:global(.skill-node-enter-active) {
		opacity: 1;
		transform: translateY(0);
		transition:
			opacity 300ms,
			transform 300ms;
	}

	:global(.skill-node-exit) {
		opacity: 1;
	}

	:global(.skill-node-exit-active) {
		opacity: 0;
		transform: translateY(-20px);
		transition:
			opacity 300ms,
			transform 300ms;
	}

	/* Stile per gli elementi animati */
	:global(.animate-on-scroll) {
		opacity: 0;
	}

	/* Stile per il cerchio di progresso */
	.language-circle {
		transition: stroke-dashoffset 1.5s ease-out;
	}

	/* Disattiva transizioni per utenti che preferiscono ridurre le animazioni */
	@media (prefers-reduced-motion: reduce) {
		:global(.animate-on-scroll) {
			opacity: 1;
		}

		.language-circle {
			transition: none;
		}

		:global(.skill-node-enter),
		:global(.skill-node-enter-active),
		:global(.skill-node-exit),
		:global(.skill-node-exit-active) {
			transition: none;
			opacity: 1;
			transform: none;
		}
	}
</style>
