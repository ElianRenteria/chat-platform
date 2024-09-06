<main class="main__container">
    <div class="container">
        <div class="container header__chat">
            <button on:click={logout} class="chat__logout outline">logout</button>
        </div>
        <h1>Chat Room</h1>
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
            <button on:click={sendMessage} class="chat__send">Send</button>
        </div>
    </div>
</main>

<script>
    import { onDestroy, onMount, afterUpdate } from 'svelte';
    import { pb, user, currentPath } from '../stores';
    import { navigate } from 'svelte-routing';
    onMount(() => {
        currentPath.set("/chat");
    });

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
        navigate('/', { replace: true });
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
        gap: .5rem;
    }

    .display__messages {
        max-height: 400px;
        overflow-y: auto;
        padding: 1rem;
        border: 1px solid #ccc;
        margin-bottom: 1rem;
    }

    @media (min-width: 768px) {
        .display__messages {
            max-height: 60vh;
        }
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
    .header__chat {
        display: flex;
        justify-content: end;
        margin-bottom: 2rem;
    }
    .chat__logout {
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: .5rem;
        padding-bottom: .5rem;
        color: rgba(255, 0, 0, 0.76);
        border-color: rgba(255, 0, 0, 0.76);
    }
    .chat__logout:hover {
        color: rgba(255, 0, 0, 1);
        border-color: rgba(255, 0, 0, 1);
        background-color: rgb(230, 230, 230);
    }
    .chat__send {
        padding-top: .75rem;
        padding-bottom: .75rem;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        height: 100%;
    }
    h1 {
        text-align: center;
    }
    .main__container {
        height: 100vh;
    }
</style>

