<script>
	import Step from './Step.svelte';

	const steps = [
		{
			name: 'SpeedService Lucera',
			icon: 'fa-solid fa-truck-fast',
			desc: '<p>Experience seamless shipping solutions with SpeedService Lucera. This <strong class="text-blue-400">Next.js and Tailwind CSS</strong> powered website allows you to effortlessly generate shipping quotes and schedule convenient home pickups.</p>',
			href: 'https://www.speedservicelucera.com/'
		},
		{
			name: 'Life in Dots',
			icon: 'fa-solid fa-shield-heart',
			desc: '<p>Explore Life in Dots, a website built with <strong class="text-blue-400">React, Typescript, and Vite.</strong> Visualize the duration of your life through an engaging dot representation.</p>',
			href: 'https://life-in-dots-jade.vercel.app/'
		},
		{
			name: 'Ready',
			icon: 'fa-solid fa-book-open',
			desc: 'Dive into the literary world with Ready. Utilizing <strong class="text-blue-400">JavaScript and Sass</strong>, this website connects to the OpenLibrary API, enabling you to search for literary genres or embark on a serendipitous journey with the \'Feeling Lucky\' button.',
			href: 'https://salvatore-stampone.github.io/ready/'
		}
	];

	const qualities = [
		{
			name: 'a self taught developer',
			desc: "I have been teaching myself how to code everyday using the internet and my thirst for knowledge. The creative thinking and doing it requires, within the boundaries it sets, is what I love most. From JS, HTML and CSS, my expertise has evolved to include JS frameworks, UI design, the backend, and DB's."
		},
		{
			name: 'a language fanatic',
			desc: 'I have a degree in Foreign Languages and Literatures and I am fond of the German language, which makes me an unusual programmer. My literary passion vouches for my dedication to coding, seen the radical change it has required.'
		},
		{
			name: 'a self-driven team player',
			desc: 'I deeply enjoy learning in and of itself and playing videogames and football, which makes me a good candidate for team projects. I am also thoroughly organized, which makes it particularly easy to work on my own, as well.'
		}
	];
</script>

<main class="flex flex-1 flex-col p-4">
	<section id="intro" class="grid grid-cols-1 gap-10 py-8 sm:py-14 lg:grid-cols-2">
		<div class="flex flex-col gap-6 text-center md:gap-8 lg:justify-center lg:gap-10 lg:text-start">
			<h2 class="text-4xl sm:text-5xl lg:text-6xl">
				Hi! I'm <span class="text-blue-400">Salvatore</span> Stampone<br />Full Stack
				<span class="text-blue-400">Developer</span>
			</h2>
			<p class="sm:text-lg md:text-xl">
				The frontend is where my main interests are: my <span class="text-blue-400"
					>favorite tech</span
				> includes JavaScript (Next.js or SvelteKit), TailwindCSS, Node.js + Express.js and PostgreSQL!
			</p>
			<a
				href="mailto:stampone.salvatore@gmail.com"
				class="group relative mx-auto cursor-pointer overflow-hidden rounded-full bg-white px-6 py-3 text-slate-950 sm:text-lg md:text-xl lg:mr-auto"
			>
				<div
					class="absolute right-full top-0 z-0 h-full w-full bg-blue-400 opacity-20 duration-200 group-hover:translate-x-full"
				/>
				<h4 class="relative z-[9]">Get in touch &rarr;</h4>
			</a>
		</div>
		<div class="relative grid place-items-center shadow-2xl">
			<img src="images/profile.png" alt="Profile" class="z-[2] max-h-[70vh] object-cover" />
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
				<Step {step} />
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
					<p class="text-4xl text-slate-500 sm:text-5xl md:text-6xl">
						0{index + 1}
					</p>
					<div class="flex flex-col gap-6 sm:gap-8">
						<h3 class="text-2xl sm:text-3xl md:text-5xl">{quality.name}</h3>
						<p>{quality.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>
</main>
