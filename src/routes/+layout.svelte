<script>
    import "../app.css"; // Tailwind config ishlashi uchun global CSS
    import favicon from "$lib/assets/favicon.svg";
    import {user} from "$lib/stores/auth";
</script>

<svelte:head>
    <link rel="icon" href={favicon}/>
</svelte:head>

<!-- Global navbar -->
<nav class="flex gap-4 p-4 border-b bg-gray-50">
    {#if $user === null}
        <a href="/signup" class="hover:text-blue-600">Signup</a>
        <a href="/login" class="hover:text-blue-600">Login</a>
    {:else}
        <a href="/dashboard" class="hover:text-blue-600">Dashboard</a>
    {/if}
</nav>

<!-- Children slot -->
<slot/>

<!-- Footer -->
{#if $user}
    <footer class="p-4 text-sm text-gray-500">Logged in as {$user.email}</footer>
{:else}
    <footer class="p-4 text-sm text-gray-500">Not logged in</footer>
{/if}
