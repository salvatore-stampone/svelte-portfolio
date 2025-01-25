<script>
	export let company = '';
	export let size = 48;

	// Prende le prime due lettere del nome dell'azienda
	$: initials = company
		.split(' ')
		.slice(0, 2)
		.map((word) => word.charAt(0))
		.join('')
		.toUpperCase();

	// Array di combinazioni di colori gradevoli
	const colorPairs = [
		{ start: '#FF6B6B', end: '#4ECDC4' }, // Rosso-Turchese
		{ start: '#A8E6CF', end: '#FFD3B6' }, // Verde menta-Pesca
		{ start: '#3498DB', end: '#E74C3C' }, // Blu-Rosso
		{ start: '#9B59B6', end: '#3498DB' }, // Viola-Blu
		{ start: '#2ECC71', end: '#F1C40F' }, // Verde-Giallo
		{ start: '#FF9A8B', end: '#FF6B6B' }, // Rosa-Rosso
		{ start: '#6C5CE7', end: '#a8e6cf' }, // Viola-Verde acqua
		{ start: '#81ecec', end: '#6c5ce7' } // Ciano-Viola
	];

	let gradientColors;

	// Sceglie una coppia di colori basata sul nome dell'azienda
	$: {
		const hash = company.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
		const colorIndex = hash % colorPairs.length;
		gradientColors = colorPairs[colorIndex];
	}
</script>

<div
	class="relative overflow-hidden"
	style="
		width: {size}px; 
		height: {size}px;
		border-radius: 8px;
		background: linear-gradient(135deg, {gradientColors.start}, {gradientColors.end});
		box-shadow: inset 0 0 20px rgba(0,0,0,0.1);
	"
>
	<svg
		width={size}
		height={size}
		viewBox="0 0 48 48"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="relative z-10"
	>
		<text
			x="50%"
			y="50%"
			dominant-baseline="middle"
			text-anchor="middle"
			fill="white"
			font-size="18"
			font-family="system-ui, -apple-system, sans-serif"
			font-weight="600"
			class="drop-shadow"
		>
			{initials}
		</text>
	</svg>
</div>

<style>
	.drop-shadow {
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
	}
</style>
