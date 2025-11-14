<script>
    import { supabase } from "$lib/supabaseClient";
    import { user } from "$lib/stores/auth";

    let email = "";
    let password = "";
    let loading = false;

    async function login() {
        loading = true;
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        loading = false;
        if (error) {
            alert(error.message);
        } else {
            alert("Login successful!");
        }
    }

    async function logout() {
        await supabase.auth.signOut();
    }
</script>

<div class="max-w-sm mx-auto mt-10 space-y-3">
    <h1 class="text-xl font-bold">Login</h1>
    <input bind:value={email} placeholder="Email" class="border p-2 w-full rounded" />
    <input type="password" bind:value={password} placeholder="Password" class="border p-2 w-full rounded" />

    <button on:click={login} disabled={loading} class="bg-blue-600 text-white px-4 py-2 rounded w-full">
        {loading ? "Logging in..." : "Login"}
    </button>

    {#if $user}
        <p class="text-sm text-gray-600">Logged in as {$user.email}</p>
        <button on:click={logout} class="bg-red-600 text-white px-4 py-2 rounded w-full mt-2">Logout</button>
    {/if}
</div>