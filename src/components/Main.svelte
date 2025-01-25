<script>
	import Step from './Step.svelte';
	import { theme } from '$lib/stores/theme';

	const steps = [
		{
			name: 'Keeo',
			icon: 'fa-solid fa-music',
			desc: '<p>Explore Keeo, a website built with <strong class="text-blue-400">Next.js, TypeScript, and TailwindCSS.</strong> Sign up to try our revolutionary mobile app.</p>',
			href: 'https://www.keeo.io/'
		},
		{
			name: 'Brots',
			icon: 'fa-solid fa-record-vinyl',
			desc: 'Dive into the innovation of musical world with Brots. Utilizing <strong class="text-blue-400">NextJS, TypeScript, and TailwindCSS</strong>, this website links together music, Web 3.0, and an amazing UX.',
			href: 'https://www.brots.cloud/'
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
			name: 'a passionate writer',
			desc: `Reading <strong class="text-blue-400">fiction and self-improvement books</strong> is one of my favorite hobbies. <strong class="text-blue-400">Every week</strong> I publish a blog post with interest insights on what I read and learn. Check it out `,
			href: 'https://buildthestairs.substack.com/',
			link: 'here',
			desc_1: '.'
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
	<section id="intro" class="grid grid-cols-1 gap-10 py-8 sm:py-14 lg:grid-cols-2">
		<div class="flex flex-col gap-6 text-center md:gap-8 lg:justify-center lg:gap-10 lg:text-start">
			<h2 class="text-4xl sm:text-5xl lg:text-6xl">
				Hi! I'm <span class="text-blue-400">Salvatore</span> Stampone<br />Full Stack
				<span class="text-blue-400">Developer</span>,<br />
				<span class="text-blue-400">Writer</span>
			</h2>
			<p class="sm:text-lg md:text-xl">
				The frontend is where my main interests are but I'm versitile: my <span
					class="text-blue-400">most proficient tech</span
				> includes JavaScript (Next.js, Vue.js, SvelteKit), TailwindCSS, Express.js, Ruby on Rails, Python,
				and PostgreSQL!
			</p>
			<p class="sm:text-lg md:text-xl">
				I also have a <a
					href="https://buildthestairs.substack.com/"
					target="_blank"
					class="text-blue-400 underline transition-colors hover:text-blue-500 hover:no-underline sm:text-lg md:text-xl"
					>blog</a
				> where I share my learnings and interests in a fun and engaging way.
			</p>
			<a
				href="mailto:salvatorestampone@icloud.com"
				class="group relative mx-auto cursor-pointer overflow-hidden rounded-full bg-slate-950 px-6 py-3 text-slate-200 dark:bg-slate-200 dark:text-slate-950 sm:text-lg md:text-xl lg:mr-auto"
			>
				<div
					class="absolute right-full top-0 z-0 h-full w-full bg-blue-400 opacity-20 duration-200 group-hover:translate-x-full"
				/>
				<h4 class="relative z-[9]">Get in touch &rarr;</h4>
			</a>
		</div>
		<div class="relative grid place-items-center">
			<img
				src={$theme === 'dark' ? 'images/profile.png' : 'images/profile-no-outline.png'}
				alt="Profile"
				class="z-[2] max-h-[70vh] object-cover [mask-image:linear-gradient(to_top,transparent_2%,black_30%)]"
			/>
		</div>
	</section>

	<section id="projects" class="flex flex-col gap-24 py-20 lg:py-32">
		<div class="flex flex-col gap-2 text-center">
			<h6 class="text-lg sm:text-xl md:text-2xl">A few of my creative endeavors.</h6>
			<h3 class="text-3xl sm:text-4xl md:text-5xl">
				Curious to <span class="text-blue-400">see</span> my work?
			</h3>
		</div>
		<!-- <a
			href="#"
			target="_blank"
			class="mx-auto -mb-4 -mt-10 flex items-center gap-2 rounded-md border border-solid border-white px-4 py-2 duration-200 hover:border-blue-700 sm:mb-0"
		>
			<i class="fa-regular fa-circle-play"></i>
			<p>Watch the video</p>
		</a> -->
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-10">
			{#each steps as step}
				<a
					href={step.href}
					target="_blank"
					class="group flex cursor-pointer flex-col gap-4 rounded-lg border border-solid border-blue-700 bg-slate-200 p-4 text-center duration-200 hover:border-blue-400 hover:shadow-lg dark:bg-slate-950 dark:hover:shadow-none sm:p-6 md:p-8"
				>
					<i class:text-4xl={true} class:text-blue-400={true} class={step.icon} />
					<h4 class="text-2xl sm:text-3xl md:text-4xl">{step.name}</h4>
					<p class="text-sm sm:text-base md:text-lg">{@html step.desc}</p>
				</a>
			{/each}
		</div>
	</section>

	<section
		id="about"
		class="relative flex flex-col gap-16 py-20 pt-10 sm:gap-20 md:gap-24 lg:py-32 lg:pt-10"
	>
		<div
			class="relative flex flex-col gap-2 py-4 text-center before:absolute before:left-0 before:top-0 before:h-1.5 before:w-2/3 before:bg-blue-700 after:absolute after:bottom-0 after:right-0 after:h-1.5 after:w-2/3 after:bg-blue-700"
		>
			<h6 class="text-lg sm:text-xl md:text-2xl">Want to know more?</h6>
			<h3 class="text-3xl sm:text-4xl md:text-5xl">
				A bit <span class="text-blue-400">about</span> me.
			</h3>
		</div>
		<p class="mx-auto text-lg sm:text-xl md:text-2xl">I am . . .</p>
		<div class="mx-auto flex w-full max-w-[800px] flex-col gap-20">
			{#each qualities as quality, index}
				<div class="flex gap-6 sm:gap-8">
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
