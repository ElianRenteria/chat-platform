<button on:click={logout}>logout</button>
<script>
    import { pb } from '../stores';
    let message = '';
    let messages = [];

    async function sendMessage() {
        const data = {
            "message": message,
            "timestamp": new Date().toISOString(),
        };
        await pb.collection('messages').create(data);
        message = '';
    }

    // pb.collection('messages').subscribe((data) => {
    //     messages = data;
    // });
    function logout() {
        pb.authStore.clear();
        location.reload();
    }
</script>