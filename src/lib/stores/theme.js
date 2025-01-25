import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// Crea lo store
const storedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : 'dark';
export const theme = writable(storedTheme || 'dark');

// Funzione per aggiornare il tema
export function toggleTheme() {
	theme.update((currentTheme) => {
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
		localStorage.setItem('theme', newTheme);
		// Emetti un evento custom per notificare il cambio tema
		if (browser) {
			document.dispatchEvent(new CustomEvent('themeChanged', { detail: newTheme }));
		}
		return newTheme;
	});
}

// Inizializza il tema se siamo nel browser
if (browser) {
	theme.subscribe((value) => {
		document.documentElement.classList.toggle('dark', value === 'dark');
	});
}
