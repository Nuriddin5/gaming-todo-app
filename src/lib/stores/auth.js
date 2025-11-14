import { writable } from "svelte/store";
import { supabase } from "$lib/supabaseClient";

export const user = writable(null);

supabase.auth.onAuthStateChange((_event, session) => {
    user.set(session?.user ?? null);
});