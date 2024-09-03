
<h1>Login Page</h1>
<p>Welcome to the Login page!</p>
<div class="container">
    <div class="inputs">
        <input type="text" placeholder="Username" bind:value={username}/>
        <input type="password" placeholder="Password"bind:value={password}/>
    </div>
    <div class="submit__button">
        <button on:click={authenticate}>Login</button>
    </div>
</div>




<script>
    import { pb } from '../stores';

    let username = '';
    let password = '';

    async function authenticate() {
        const authData = await pb.collection('users').authWithPassword(
            username,
            password
        );

        console.log(pb.authStore.isValid);
        console.log(pb.authStore.token);
        console.log(pb.authStore.model.id);

        // "logout" the last authenticated account
        pb.authStore.clear();
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
</style>