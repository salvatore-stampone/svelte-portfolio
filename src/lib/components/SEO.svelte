<script lang="ts">
	export let title = 'Salvatore Stampone | Developer, YouTuber & Writer';
	export let description =
		"I'm Salvatore Stampone, a Full Stack Developer, YouTuber and Writer based in Italy, with an undeniable love for the front-end.";
	export let type = 'website';
	export let image = '/api/og';
	export let url = 'https://salvatorestampone.com';
	export let keywords =
		'developer, full stack, frontend, backend, youtube, writer, next.js, vue.js, sveltekit, javascript, typescript';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />

	<!-- Open Graph -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:image" content={image} />
	<meta property="og:url" content={url} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>
