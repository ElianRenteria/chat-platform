<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';
  
    export let allowedWhenAuthenticated = false;
    export let redirectTo = '/login';
    let tokenExists = false;
  
    onMount(() => {
      const token = localStorage.getItem('pocketbase_auth');
      tokenExists = !!token;
  
      if (!tokenExists && !allowedWhenAuthenticated) {
        navigate(redirectTo, { replace: true });
      } else if (tokenExists && allowedWhenAuthenticated) {
        navigate('/chat', { replace: true });
      }
    });
  </script>
  
  <slot />
  