<div class="container">
    <div class="container">
        <button on:click={logout}>logout</button>
    </div>
    <div class="container display__messages" bind:this={messageContainer}>
        {#each messages as message (message.id)}
            <div class="message">
                <div class="message__user">
                    <img src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${message.expand?.user?.username || 'Unknown'}`}  alt="Avatar" width="50" height="auto" class="avatar"/>
                    <p>
                        <strong>{message.expand?.user?.username || 'Unknown User'}:</strong> {message.text}
                    </p>
                </div>
                <small>{new Date(message.created).toLocaleTimeString()}</small>
            </div>
        {/each}
    </div>
    <div class="container text__input">
        <input type="text" placeholder="Message" bind:value={message} on:keydown={handleKeydown}/>
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

    function handleKeydown(event) {
        if (event.key === 'Enter' && message.trim()) {
            sendMessage();
        }
    }

    function logout() {
        pb.authStore.clear();
        location.reload();
    }

    onMount(async () => {
        // Fetch messages with user data expanded
        const records = await pb.collection('messages').getList(1, 50, {
            sort: 'created',
            expand: 'user',
        });
        messages = records.items;

        // Subscribe to real-time changes and add messages with expanded user info
        pb.collection('messages').subscribe('*', async ({ action, record }) => {
            if (action === 'create') {
                const usr = await pb.collection('users').getOne(record.user);
                record.expand = { user: usr }; // Attach user data to the record
                messages = [...messages, record]; // Add new message
            }
            if (action === 'delete') {
                messages = messages.filter((m) => m.id !== record.id); // Remove deleted message
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
    .message__user {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: end;
        width: 100%;
        height: 100%;
    }
    .message__user p {
        margin: 0;
        margin-left: .5rem;
    }
    .avatar {
        border-radius: .25rem;
    }
</style>

