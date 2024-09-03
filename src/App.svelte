<script>
  import { Router, Route, Link } from 'svelte-routing';
  import Home from './routes/Home.svelte';
  import Login from './routes/Login.svelte';
  import Register from './routes/Register.svelte';
  import Chat from './routes/Chat.svelte';
  import '@picocss/pico'
</script>

<Router>
  <div class="container">
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/app">App</Link>
    </nav>
    <main>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/chat" component={Chat} />
    </main>
  </div>
</Router>
