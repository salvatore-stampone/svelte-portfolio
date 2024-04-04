<script>
	import classNames from 'classnames';
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';

	let y;
	let innerHeight = 0;
	let innerWidth = 0;

	function goTop() {
		document.body.scrollIntoView();
	}
</script>

<div>
	<Header {y} />

	<div
		class="relative mx-auto flex min-h-screen w-full max-w-[1400px] flex-col text-sm sm:text-base"
	>
		<div
			class={classNames(
				'fixed bottom-0 z-10 flex w-full p-10 duration-200',
				y > 0 ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
			)}
		>
			<button
				on:click={goTop}
				class="ml-auto grid aspect-square cursor-pointer place-items-center rounded-full bg-slate-900 px-3 text-blue-400 duration-200 hover:bg-slate-800 sm:px-4"
			>
				<i class="fa-solid fa-arrow-up"></i>
			</button>
		</div>
		<slot />
		<Footer />
	</div>
</div>

<svelte:window bind:scrollY={y} bind:innerHeight bind:innerWidth />
