<h1>Registration</h1>
<p>Create Account!</p>
{#if message}
    <p class="feedback {error ? 'error' : ''}">{message}</p>
{/if}
<div class="container">
    <div class="inputs">
        <input type="text" placeholder="Username" bind:value={username} />
        <input type="password" placeholder="Password" bind:value={password} />
        <input type="password" placeholder="Confirm Password" bind:value={confirmPassword} />
    </div>
    <div class="submit__button">
        <button on:click={register}>Create</button>
    </div>
</div>

<script>
    import { pb, currentPath } from '../stores';
    import { navigate } from 'svelte-routing';
    import { onMount } from "svelte";
    onMount(() => {
        currentPath.set("/register");
    });

    let username = '';
    let password = '';
    let confirmPassword = '';
    let message = '';
    let error = false;

    async function register() {
        if (password.length < 8 || password.length > 72) {
            message = 'Password must be between 8 and 72 characters long';
            error = true;
            return;
        }

        if (password !== confirmPassword) {
            message = 'Passwords do not match';
            error = true;
            return;
        }

        const data = {
            "username": username,
            "password": password,
            "passwordConfirm": confirmPassword,
        };

        try {
            const record = await pb.collection('users').create(data);
            message = 'Account created successfully!';
            error = false;
            clearInputs();
            navigate('/login', { replace: true });
        } catch (err) {
            message = 'Username already exists';
            error = true;
        }
    }

    function clearInputs() {
        username = '';
        password = '';
        confirmPassword = '';
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
        margin-top: 1rem;
        color: green;
    }
    .feedback.error {
        color: red;
    }
</style>
