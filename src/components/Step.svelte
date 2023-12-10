<script>
	export let step;
</script>

<a
	href={step.href}
	target="_blank"
	class="group flex cursor-pointer flex-col gap-4 rounded-lg border border-solid border-blue-700 p-4 text-center duration-200 hover:border-blue-400 sm:p-6 md:p-8"
	><div
		class="mx-auto -mt-10 grid place-items-center bg-slate-950 px-4 text-5xl duration-200 sm:-mt-12 md:-mt-14 md:text-6xl lg:-mt-16"
	>
		<i class={step.icon}></i>
	</div>
	<h3 class="text-xl sm:text-2xl md:text-3xl">{step.name}</h3>
	<p class="text-start">{@html step.desc}</p>
	<div class="flex flex-1 items-center justify-between gap-4">
		<p class="ml-auto">
			Go to <span class="inline-block duration-200 group-hover:translate-x-2">&rarr;</span>
		</p>
	</div>
</a>
