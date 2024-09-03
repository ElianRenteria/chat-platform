
<h1>Registration Page</h1>
<p>Welcome to the Login page!</p>
<div class="container">
    <div class="inputs">
        <input type="text" placeholder="Username" bind:value={username}/>
        <input type="password" placeholder="Password"bind:value={password}/>
        <input type="password" placeholder="Confirm Password"bind:value={confirmPassword}/>
    </div>
    <div class="submit__button">
        <button on:click={register}>Login</button>
    </div>
</div>




<script>
    import { pb } from '../stores';
    let username = '';
    let password = '';
    let confirmPassword = '';

    async function register() {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        const data = {
            "username": username,
            "password": password,
            "passwordConfirm": confirmPassword,
        };
        const record = await pb.collection('users').create(data);
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