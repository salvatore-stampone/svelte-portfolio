<script>
	import { onMount } from 'svelte';
	import SvelteHeatmap from 'svelte-heatmap';
	import SkillNode from '../../components/SkillNode.svelte';
	import CompanyLogoPlaceholder from '../../components/CompanyLogoPlaceholder.svelte';
	import { theme } from '$lib/stores/theme';

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
				{ name: 'TailwindCSS', icon: 'fa-solid fa-wind' }
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
				{ name: 'TailwindCSS', icon: 'fa-solid fa-wind' }
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
				{ name: 'TailwindCSS', icon: 'fa-solid fa-wind' }
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
				{ name: 'Dart', icon: 'fa-solid fa-d' },
				{ name: 'Flutter', icon: 'fa-solid fa-f' },
				{ name: 'Node.js', icon: 'fa-brands fa-node-js' },
				{ name: 'Express.js', icon: 'fa-solid fa-server' },
				{ name: 'PostgreSQL', icon: 'fa-solid fa-database' },
				{ name: 'GCP', icon: 'fa-brands fa-google' },
				{ name: 'React', icon: 'fa-brands fa-react' },
				{ name: 'TailwindCSS', icon: 'fa-solid fa-wind' }
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

	onMount(async () => {
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
				cellRadius: '20%'
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
</script>

<main class="flex flex-1 flex-col gap-24 p-4 py-20">
	<!-- GitHub Activity -->
	<section class="flex flex-col gap-8">
		<div class="flex flex-col gap-2 text-center">
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
			class="mx-auto w-full max-w-5xl rounded-xl bg-slate-200/50 p-6 shadow-lg dark:bg-slate-900/50 dark:shadow-none"
		>
			<div bind:this={heatmapContainer} />
		</div>
	</section>

	<!-- Work Experience -->
	<section class="flex flex-col gap-16">
		<div class="flex flex-col gap-2 text-center">
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
					class="group relative flex flex-col gap-6 rounded-xl bg-slate-200/50 p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900/50 dark:shadow-none dark:hover:bg-slate-900/70 sm:flex-row sm:gap-8"
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
											<i class={tech.icon} />
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

	<!-- Skills -->
	<!-- <section class="flex flex-col gap-2">
		<div class="flex flex-col gap-2 text-center">
			<h6 class="text-lg sm:text-xl md:text-2xl">Technical Proficiency</h6>
			<h3 class="text-3xl sm:text-4xl md:text-5xl">
				My <span class="text-blue-400">skill</span> tree
			</h3>
		</div>

		<div class="mx-auto w-full max-w-[1200px] overflow-x-auto p-20">
			<div class="flex min-w-max justify-center gap-16">
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
</style>
