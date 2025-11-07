<script>
	import { onMount } from 'svelte';

	onMount(() => {
		window.location.href = 'mailto:salvatorestampone@icloud.com';
	});
</script>

<svelte:head>
	<title>Contact Me | Salvatore Stampone</title>
	<meta
		name="description"
		content="Contact me to discuss your project. I offer Web Development, App Development, Graphic Design and Consulting services."
	/>
</svelte:head>

<section class="mx-auto w-full max-w-3xl px-4 py-16">
	<div class="flex flex-col items-center justify-center text-center">
		<p class="mb-4 text-lg">Reindirizzamento alla mail...</p>
		<p class="text-slate-700 dark:text-slate-400">
			Se non vieni reindirizzato automaticamente,
			<a
				href="mailto:salvatorestampone@icloud.com"
				class="text-blue-400 hover:underline"
			>
				clicca qui
			</a>
		</p>
	</div>
</section>
