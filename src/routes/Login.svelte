
<div class="container">
    <h1>Login Page</h1>
    <p>Welcome to the Login page!</p>
    <div class="container">
        <input type="text" placeholder="Username" bind:value={username}/>
        <input type="password" placeholder="Password"bind:value={password}/>
        <button on:click={authenticate}>Login</button>
    </div>
</div>



<script>
    import PocketBase from 'pocketbase';

    let username = '';
    let password = '';

    const pb = new PocketBase('https://elianrenteria.me/pocketbase');

    async function authenticate() {
        const authData = await pb.collection('users').authWithPassword(
            username,
            password
        );

        // after the above you can also access the auth data from the authStore
        console.log(pb.authStore.isValid);
        console.log(pb.authStore.token);
        console.log(pb.authStore.model.id);

        // "logout" the last authenticated account
        pb.authStore.clear();
    }
</script>

<style>
    /* Your Home page styles */
    h1 {
        font-size: 4rem;
    }
    p {
        font-size: 2rem;
        font-weight: 300;
    }
</style>