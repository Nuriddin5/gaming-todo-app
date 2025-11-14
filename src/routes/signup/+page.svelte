<script>
    import { supabase } from "$lib/supabaseClient";
    import { user } from "$lib/stores/auth";

    let email = "";
    let password = "";
    let loading = false;

    async function signup() {
        loading = true;
        const { error } = await supabase.auth.signUp({ email, password });
        loading = false;
        if (error) {
            alert(error.message);
        } else {
            alert("Signup successful! Check your email for confirmation.");
        }
    }
</script>

<div class="max-w-sm mx-auto mt-10 space-y-3">
    <h1 class="text-xl font-bold">Signup</h1>
    <input bind:value={email} placeholder="Email" class="border p-2 w-full rounded" />
    <input type="password" bind:value={password} placeholder="Password" class="border p-2 w-full rounded" />

    <button on:click={signup} disabled={loading} class="bg-green-600 text-white px-4 py-2 rounded w-full">
        {loading ? "Signing up..." : "Signup"}
    </button>

    {#if $user}
        <p class="text-sm text-gray-600">Already logged in as {$user.email}</p>
    {/if}
</div>