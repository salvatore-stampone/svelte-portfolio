<script>
	import { onMount, createEventDispatcher } from 'svelte';

	export let skill;
	export let isRoot = false;
	export let parentId = null;
	export let siblingIds = [];

	const dispatch = createEventDispatcher();
	const id = Math.random().toString(36).substr(2, 9);

	const levelColors = {
		master: 'from-purple-500 to-purple-700',
		expert: 'from-blue-500 to-blue-700',
		intermediate: 'from-green-500 to-green-700'
	};

	let isOpen = false;
	let hasChildren = skill.children && Object.keys(skill.children).length > 0;

	// Gestisce l'apertura/chiusura del nodo
	function toggleOpen() {
		if (hasChildren) {
			isOpen = !isOpen;
			dispatch('nodeToggle', { id, parentId, siblingIds });
		}
	}

	// Ascolta gli eventi di toggle da altri nodi
	export function handleNodeToggle(toggledId, toggledSiblings) {
		if (toggledSiblings?.includes(id)) {
			isOpen = false;
		} else if (toggledId !== id && toggledId !== parentId) {
			isOpen = false;
		}
	}
</script>

<div class="skill-node relative flex flex-col items-center">
	<!-- Nodo -->
	<button
		on:click={toggleOpen}
		class="group relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br p-0.5 transition-all duration-300 hover:scale-110 {levelColors[
			skill.level
		]}"
	>
		<div
			class="flex h-full w-full items-center justify-center rounded-full bg-slate-900/90 text-2xl text-slate-200 transition-colors group-hover:bg-slate-900/70 dark:bg-slate-200/5"
		>
			{#if skill.icon.startsWith('<svg')}
				{@html skill.icon}
			{:else}
				<i class={skill.icon} />
			{/if}
		</div>

		<!-- Indicatore di figli -->
		{#if hasChildren}
			<div class="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-0.5">
				<div class="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
				<div class="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
				<div class="h-1.5 w-1.5 rounded-full bg-current opacity-40" />
			</div>
		{/if}

		<!-- Tooltip -->
		<div
			class="absolute -top-16 z-50 hidden w-max rounded-lg bg-slate-200 px-3 py-2 text-sm text-slate-950 shadow-lg group-hover:block dark:bg-slate-800 dark:text-slate-200"
		>
			<p class="font-semibold">{skill.name}</p>
			<p class="text-xs capitalize text-slate-500 dark:text-slate-400">{skill.level}</p>
			{#if hasChildren}
				<p class="mt-1 text-xs text-blue-400">Click to expand</p>
			{/if}
		</div>
	</button>

	<!-- Children con rami di collegamento migliorati -->
	{#if hasChildren && isOpen}
		<div class="relative mt-12 flex flex-col items-center">
			<!-- Linea verticale principale con curve -->
			<div class="absolute left-1/2 top-[-2rem] h-8 w-[2px] -translate-x-1/2">
				<div
					class="h-full w-full bg-gradient-to-b from-current to-slate-400/50 dark:to-slate-600/50"
					style="border-radius: 1px;"
				/>
			</div>

			<!-- Container per i nodi figli con rami migliorati -->
			<div class="relative grid auto-cols-fr grid-flow-col gap-12">
				{#if Object.keys(skill.children).length > 1}
					<!-- Linea orizzontale curva che connette tutti i figli -->
					<div class="absolute -top-4 left-[calc(-1rem)] h-[2px] w-[calc(100%+2rem)]">
						<div
							class="h-full w-full rounded-full bg-gradient-to-r from-slate-400/50 via-slate-400/50 to-slate-400/50 dark:from-slate-600/50 dark:via-slate-600/50 dark:to-slate-600/50"
							style="box-shadow: 0 0 5px rgba(148, 163, 184, 0.1);"
						/>
					</div>

					<!-- Curve agli angoli -->
					<div class="absolute -top-4 left-0 h-4 w-4">
						<div
							class="absolute bottom-0 left-0 h-1/2 w-[2px] bg-slate-400/50 dark:bg-slate-600/50"
						/>
						<div
							class="absolute bottom-0 left-0 h-[2px] w-1/2 bg-slate-400/50 dark:bg-slate-600/50"
						/>
						<div
							class="absolute bottom-0 left-0 h-4 w-4 rounded-bl-full border-b border-l border-slate-400/50 dark:border-slate-600/50"
						/>
					</div>
					<div class="absolute -top-4 right-0 h-4 w-4">
						<div
							class="absolute bottom-0 right-0 h-1/2 w-[2px] bg-slate-400/50 dark:bg-slate-600/50"
						/>
						<div
							class="absolute bottom-0 right-0 h-[2px] w-1/2 bg-slate-400/50 dark:bg-slate-600/50"
						/>
						<div
							class="absolute bottom-0 right-0 h-4 w-4 rounded-br-full border-b border-r border-slate-400/50 dark:border-slate-600/50"
						/>
					</div>
				{/if}

				{#each Object.entries(skill.children) as [key, childSkill]}
					<div class="relative flex flex-col items-center">
						<div
							class="absolute -top-4 left-1/2 h-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-slate-400/50 to-transparent"
							style="box-shadow: 0 0 5px rgba(148, 163, 184, 0.1);"
						/>
						<svelte:self
							skill={childSkill}
							parentId={id}
							siblingIds={Object.entries(skill.children)
								.filter(([k]) => k !== key)
								.map(() => Math.random().toString(36).substr(2, 9))}
							on:nodeToggle
						/>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	/* Aggiungi un sottile effetto glow ai rami */
	:global(.skill-node) {
		--connection-glow: 0 0 5px rgba(148, 163, 184, 0.1);
	}
</style>
