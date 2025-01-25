<script>
	import { page } from '$app/stores';
</script>

<main class="full-height grid place-items-center p-4">
	<div class="flex flex-col items-center gap-8 text-center">
		<div class="flex items-baseline gap-4">
			<h1 class="text-8xl font-bold text-blue-400 sm:text-9xl">4</h1>
			<div class="relative">
				<h1 class="text-8xl font-bold text-blue-400 sm:text-9xl">0</h1>
				<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-4xl">
					<i class="fa-regular fa-face-dizzy animate-spin-slow" />
				</div>
			</div>
			<h1 class="text-8xl font-bold text-blue-400 sm:text-9xl">4</h1>
		</div>

		<div class="flex max-w-md flex-col gap-4">
			<h2 class="text-2xl font-semibold sm:text-3xl">Oops! Page not found</h2>
			<p class="text-slate-600 dark:text-slate-400">
				Looks like you've wandered into uncharted territory! Don't worry, even the best explorers
				get lost sometimes.
			</p>
			<a
				href="/"
				class="group relative mx-auto mt-4 overflow-hidden rounded-full bg-slate-950 px-6 py-2 text-slate-200 dark:bg-slate-200 dark:text-slate-950"
			>
				<div
					class="absolute right-full top-0 z-0 h-full w-full bg-blue-400 opacity-20 duration-200 group-hover:translate-x-full"
				/>
				<span class="relative z-[1]">Take me home</span>
			</a>
		</div>
	</div>
</main>

<style>
	@keyframes spin-slow {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.animate-spin-slow {
		animation: spin-slow 4s linear infinite;
	}

	.full-height {
		height: calc(100vh - 200px);
	}
</style>
