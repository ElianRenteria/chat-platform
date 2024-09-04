<div class="container">
    <div class="container">
        <button on:click={logout}>logout</button>
    </div>
    <div class="container display__messages" bind:this={messageContainer}>
        {#each messages as message (message.id)}
            <div class="message">
                <p>{message.text}</p>
                <small>{new Date(message.created).toLocaleTimeString()}</small>
            </div>
        {/each}
    </div>
    <div class="container text__input">
        <input type="text" placeholder="Message" bind:value={message} />
        <button on:click={sendMessage}>Send</button>
    </div>
</div>

<script>
    import { onDestroy, onMount, afterUpdate } from 'svelte';
    import { pb, user } from '../stores';
    let message = '';
    let messages = [];
    let messageContainer;
    $: currentUser = $user;

    async function sendMessage() {
        const data = {
            "text": message,
            "user": currentUser.id,
        };
        await pb.collection('messages').create(data);
        message = '';
    }

    function logout() {
        pb.authStore.clear();
        location.reload();
    }

    onMount(async () => {
        const records = await pb.collection('messages').getList(1, 50, {
            sort: '-created',
            expand: 'user',
        });
        messages = records.items;
        pb
            .collection('messages')
            .subscribe('*', async ({ action, record }) => {
                if (action === 'create') {
                    const usr = await pb.collection('users').getOne(record.user);
                    record.expand = { user: usr };
                    messages = [...messages, record];
                }
                if (action === 'delete') {
                    messages = messages.filter((m) => m.id !== record.id);
                }
            });
    });

    onDestroy(() => {
        pb.collection('messages').unsubscribe();
    });

    // Scroll to bottom when messages array changes
    afterUpdate(() => {
        if (messageContainer) {
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
    });
</script>

<style>
    .text__input {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }

    .display__messages {
        max-height: 400px;
        overflow-y: auto;
        padding: 1rem;
        border: 1px solid #ccc;
        margin-bottom: 1rem;
    }

    .message {
        margin-bottom: 0.5rem;
        padding: 0.5rem;
        background-color: #f1f1f1;
        border-radius: 5px;
    }

    .message small {
        display: block;
        text-align: right;
        color: #777;
    }
</style>
