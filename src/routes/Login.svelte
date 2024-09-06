<h1>Login</h1>
<p>Welcome Back!</p>
{#if message}
    <p class="feedback {error ? 'error' : ''}">{message}</p>
{/if}
{#if !loading}
<div class="container">
    <div class="inputs">
        <input type="text" placeholder="Username" bind:value={username} />
        <input type="password" placeholder="Password" bind:value={password} />
    </div>
    <div class="submit__button">
        <button on:click={authenticate}>Login</button>
    </div>
</div>
{/if}

{#if loading}
<article aria-busy="true">Loading...</article>
{/if}

<script>
    import { pb, user, currentPath } from '../stores';
    import { navigate } from 'svelte-routing';
    import { onMount } from "svelte";
    onMount(() => {
        currentPath.set("/login");
    });

    let username = '';
    let password = '';
    let message = '';  
    let error = false; 
    let loading = false; // Variable to track loading state

    async function authenticate() {
        loading = true; // Show loading indicator
        message = '';   // Clear any previous messages
        error = false;  // Reset error state

        try {
            const authData = await pb.collection('users').authWithPassword(username, password);
            user.set(authData["record"]);
            message = 'Login successful! Redirecting...';
            navigate('/chat', { replace: true });
        } catch (err) {
            console.error('Authentication failed:', err);
            message = 'Invalid username or password';
            error = true;
        } finally {
            loading = false; // Hide loading indicator
        }
    }
</script>

<style>
    h1 {
        font-size: 4rem;
        text-align: center;
    }
    p {
        font-size: 2rem;
        font-weight: 300;
        text-align: center;
    }
    .submit__button {
        display: flex;
        justify-content: center;
    }
    .inputs {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 2rem;
        gap: 1rem;
    }
    input {
        width: 50% !important;
        min-width: 300px;
        max-width: 600px;
    }
    button {
        padding-left: 2rem;
        padding-right: 2rem;
    }
    .feedback {
        text-align: center;
        font-size: 1rem;
        margin-top: .5rem;
        color: green;
    }
    .feedback.error {
        color: red;
    }
    article[aria-busy="true"] {
        text-align: center;
        font-size: 1.5rem;
        font-weight: bold;
        margin-top: 2rem;
    }
</style>
