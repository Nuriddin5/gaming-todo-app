<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabaseClient';
    let password = '';
    let confirm = '';
    let loading = false;
    let error = '';
    let success = '';

    let token_hash;

    // 1) check if the token is valid
    onMount(async () => {
        const url = new URL(window.location.href);
        token_hash = url.searchParams.get('token_hash');
        const type = url.searchParams.get('type') || 'recovery';

        if (!token_hash) {
            error = 'Invalid or missing token.';
            return;
        }

        loading = true;
        error = '';
        try {
            // Exchange token for a session (verifies token). For password reset links, type is usually "recovery".
            const { data, error: err } = await supabase.auth.exchangeCodeForSession(token_hash);
            if (err) {
                error = 'Token verification failed. Please request a new reset link.';
            } else if (!data.session) {
                error = 'No active session from reset token.';
            }
        } catch (e) {
            error = 'Unexpected error verifying token.';
        } finally {
            loading = false;
        }
    });

    // 2) check if the password is the same
    function validatePasswords() {
        if (!password || !confirm) return 'Please enter and confirm your new password.';
        if (password !== confirm) return 'Passwords do not match.';
        if (password.length < 8) return 'Password must be at least 8 characters.';
        return '';
    }

    // 3) update the password
    async function resetPassword() {
        error = '';
        success = '';
        const v = validatePasswords();
        if (v) {
            error = v;
            return;
        }

        loading = true;
        try {
            const { error: err } = await supabase.auth.updateUser({ password });
            if (err) {
                error = err.message || 'Failed to update password.';
                return;
            }
            success = 'Password updated successfully. You can now sign in with your new password.';
            // Optional: sign out to ensure re-auth with new password
            await supabase.auth.signOut();
            // Optional: redirect after short delay
            // setTimeout(() => (window.location.href = '/login'), 1200);
        } catch (e) {
            error = e;
        } finally {
            loading = false;
        }
    }
</script>

<div class="max-w-sm space-y-3">
    <h1 class="text-xl font-bold">Reset password</h1>

    {#if error}
        <p class="text-red-600 text-sm">{error}</p>
    {/if}
    {#if success}
        <p class="text-green-600 text-sm">{success}</p>
    {/if}

    <input
            class="w-full border rounded px-3 py-2"
            type="password"
            placeholder="Enter new password"
            bind:value={password}
            disabled={loading}
    />
    <input
            class="w-full border rounded px-3 py-2"
            type="password"
            placeholder="Retype new password"
            bind:value={confirm}
            disabled={loading}
    />
    <button
            class="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
            on:click|preventDefault={resetPassword}
            disabled={loading}
    >
        {loading ? 'Processing...' : 'Reset password'}
    </button>
</div>