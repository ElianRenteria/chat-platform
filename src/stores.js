import { readable, writable } from 'svelte/store';
import PocketBase from 'pocketbase';

export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);
export const user = writable(null);
