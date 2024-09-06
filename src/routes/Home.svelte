<main>
    <h1>Home</h1>
    <p>Welcome!</p>
</main>





<script>
    import { onMount } from "svelte";
    import { currentPath } from "../stores";
    onMount(() => {
        currentPath.set("/home");
    });
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
</style>