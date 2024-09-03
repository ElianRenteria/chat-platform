
<h1>Login Page</h1>
<p>Welcome to the Login page!</p>
<div class="container">
    <input type="text" placeholder="Username" bind:value={username}/>
    <input type="password" placeholder="Password"bind:value={password}/>
    <button on:click={authenticate}>Login</button>
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
    }
    p {
        font-size: 2rem;
        font-weight: 300;
    }
</style>