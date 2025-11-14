<script>
    import { user } from "$lib/stores/auth";
</script>

{#if $user}
    <h1 class="text-2xl font-bold">Welcome, {$user.email}!</h1>
    <p class="mt-2">Bu yerda sizning todos va metrics chiqadi.</p>
{:else}
    <p class="text-red-500">Iltimos, login qiling.</p>
{/if}