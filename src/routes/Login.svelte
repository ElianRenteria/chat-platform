<h1>Login</h1>
<p>Welcome Back!</p>
<div class="container">
    <div class="inputs">
        <input type="text" placeholder="Username" bind:value={username}/>
        <input type="password" placeholder="Password" bind:value={password}/>
    </div>
    <div class="submit__button">
        <button on:click={authenticate}>Login</button>
    </div>
</div>

<script>
    import { pb, user } from '../stores';
    import { navigate } from 'svelte-routing';

    let username = '';
    let password = '';

    async function authenticate() {
        try {
            const authData = await pb.collection('users').authWithPassword(username, password);
            user.set(authData["record"]);
            console.log('Authenticated:', authData);
            navigate('/chat', { replace: true });
        } catch (error) {
            console.error('Authentication failed:', error);
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
</style>
