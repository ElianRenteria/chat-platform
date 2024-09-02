<script>
  import { Router, Route, Link } from 'svelte-routing';
  import Home from './routes/Home.svelte';
  import Login from './routes/Login.svelte';
  import Register from './routes/Register.svelte';
  import Chat from './routes/Chat.svelte';
</script>

<Router>
  <div class="h-full w-full flex flex-col justify-start items-center">
    <nav class="w-full mt-3 flex justify-center gap-3">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/app">App</Link>
    </nav>
    <main class="w-full h-full">
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/chat" component={Chat} />
    </main>
  </div>
</Router>
