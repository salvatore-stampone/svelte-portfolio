<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	// Form states
	let type = '';
	let fullName = '';
	let email = '';
	let projectDescription = '';
	let isSubmitting = false;
	let formSubmitted = false;
	let formError = null;

	// Validation errors
	let errors = {
		type: '',
		fullName: '',
		email: ''
	};

	// Service type options
	const serviceTypes = [
		'Web Development',
		'Graphic Design',
		'Video Editing',
		'Consulting',
		'Other'
	];

	// Form validation
	function validateForm() {
		let isValid = true;
		errors = {
			type: '',
			fullName: '',
			email: ''
		};

		if (!type) {
			errors.type = 'Please select a service type';
			isValid = false;
		}

		if (!fullName.trim()) {
			errors.fullName = 'Please enter your full name';
			isValid = false;
		} else if (fullName.trim().length < 3) {
			errors.fullName = 'Name must be at least 3 characters';
			isValid = false;
		}

		// Email validation (required)
		if (!email.trim()) {
			errors.email = 'Please enter your email address';
			isValid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = 'Please enter a valid email address';
			isValid = false;
		}

		return isValid;
	}

	// Form submission handler
	async function handleSubmit() {
		if (!validateForm()) return;

		isSubmitting = true;
		formError = null;

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					type,
					fullName,
					email,
					projectDescription
				})
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Failed to send message');
			}

			// Success
			formSubmitted = true;

			// Reset form
			type = '';
			fullName = '';
			email = '';
			projectDescription = '';
		} catch (error) {
			console.error('Error submitting the form:', error);
			formError =
				error.message ||
				'An error occurred while submitting the form. Please try again later or contact me directly via email.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Contact Me | Salvatore Stampone</title>
	<meta
		name="description"
		content="Contact me to discuss your project and get a quote. I offer Web Development, Graphic Design, Video Editing and Consulting services."
	/>
</svelte:head>

<section class="mx-auto w-full max-w-3xl px-4 py-16">
	<h1 class="mb-8 font-freshwost text-3xl md:text-4xl">Let's talk about your project.</h1>

	<div class="rounded-lg bg-slate-100 p-6 shadow-sm dark:bg-slate-900 dark:shadow-none">
		{#if formSubmitted}
			<div class="flex flex-col items-center justify-center py-8 text-center" transition:fade>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mb-4 h-16 w-16 text-green-500"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<h2 class="mb-2 text-xl font-semibold">Thank you for contacting me!</h2>
				<p class="mb-6">I'll get back to you as soon as possible.</p>
				<button
					on:click={() => (formSubmitted = false)}
					class="group relative overflow-hidden rounded-full bg-slate-950 px-5 py-2 text-slate-200 dark:bg-slate-200 dark:text-slate-950"
				>
					<div
						class="absolute right-full top-0 z-0 h-full w-full bg-blue-400 opacity-20 duration-200 group-hover:translate-x-full"
					></div>
					<span class="relative z-[9]">Send another message</span>
				</button>
			</div>
		{:else}
			<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-6">
				<div class="flex flex-col gap-2">
					<label for="service-type" class="font-semibold"
						>Service Type <span class="text-red-500">*</span></label
					>
					<select
						id="service-type"
						bind:value={type}
						class="rounded-md border border-slate-300 bg-white p-3 text-slate-950 outline-none transition-colors focus:border-blue-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-blue-400"
					>
						<option value="" disabled selected>Select a service type</option>
						{#each serviceTypes as service}
							<option value={service}>{service}</option>
						{/each}
					</select>
					{#if errors.type}
						<p class="mt-1 text-sm text-red-500">{errors.type}</p>
					{/if}
				</div>

				<div class="flex flex-col gap-2">
					<label for="full-name" class="font-semibold"
						>Full Name <span class="text-red-500">*</span></label
					>
					<input
						type="text"
						id="full-name"
						bind:value={fullName}
						placeholder="Enter your full name"
						class="rounded-md border border-slate-300 bg-white p-3 text-slate-950 outline-none transition-colors focus:border-blue-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-blue-400"
					/>
					{#if errors.fullName}
						<p class="mt-1 text-sm text-red-500">{errors.fullName}</p>
					{/if}
				</div>

				<div class="flex flex-col gap-2">
					<label for="email" class="font-semibold"
						>Email Address <span class="text-red-500">*</span></label
					>
					<input
						type="email"
						id="email"
						bind:value={email}
						placeholder="your.email@example.com"
						class="rounded-md border border-slate-300 bg-white p-3 text-slate-950 outline-none transition-colors focus:border-blue-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-blue-400"
					/>
					{#if errors.email}
						<p class="mt-1 text-sm text-red-500">{errors.email}</p>
					{/if}
				</div>

				<div class="flex flex-col gap-2">
					<label for="project-description" class="font-semibold">Project Description</label>
					<textarea
						id="project-description"
						bind:value={projectDescription}
						placeholder="Briefly describe your project (optional)"
						rows="5"
						class="rounded-md border border-slate-300 bg-white p-3 text-slate-950 outline-none transition-colors focus:border-blue-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-blue-400"
					></textarea>
				</div>

				{#if formError}
					<div class="rounded-md bg-red-100 p-3 text-red-800 dark:bg-red-900/30 dark:text-red-300">
						{formError}
					</div>
				{/if}

				<button
					type="submit"
					class="group relative mt-2 overflow-hidden rounded-full bg-slate-950 px-6 py-3 text-slate-200 transition-colors disabled:opacity-70 dark:bg-slate-200 dark:text-slate-950"
					disabled={isSubmitting}
				>
					<div
						class="absolute right-full top-0 z-0 h-full w-full bg-blue-400 opacity-20 duration-200 group-hover:translate-x-full"
					></div>
					<span class="relative z-[9] flex items-center justify-center gap-2">
						{#if isSubmitting}
							<svg
								class="h-5 w-5 animate-spin"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							Submitting...
						{:else}
							Get a quote
						{/if}
					</span>
				</button>
			</form>
		{/if}
	</div>

	<div
		class="mt-12 flex flex-col gap-4 rounded-lg bg-slate-100 p-6 shadow-sm dark:bg-slate-900 dark:shadow-none"
	>
		<h2 class="font-freshwost text-xl">Direct Contact</h2>
		<p class="text-slate-700 dark:text-slate-400">
			Prefer to reach out directly? You can contact me via:
		</p>

		<div class="flex flex-col gap-3">
			<a
				href="mailto:salvatorestampone@icloud.com"
				class="flex items-center gap-2 text-slate-950 transition-colors hover:text-blue-400 dark:text-slate-200 dark:hover:text-blue-400"
			>
				<i class="fa-regular fa-envelope"></i>
				<span>salvatorestampone@icloud.com</span>
			</a>

			<a
				href="https://www.linkedin.com/in/salvatorestampone/"
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-2 text-slate-950 transition-colors hover:text-blue-400 dark:text-slate-200 dark:hover:text-blue-400"
			>
				<i class="fa-brands fa-linkedin"></i>
				<span>LinkedIn</span>
			</a>
		</div>
	</div>
</section>
