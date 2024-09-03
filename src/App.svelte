<script>
  import { Router, Route, Link } from 'svelte-routing';
  import Home from './routes/Home.svelte';
  import Login from './routes/Login.svelte';
  import Register from './routes/Register.svelte';
  import Chat from './routes/Chat.svelte';
  import '@picocss/pico'

  let currentTheme = 'dark';
  function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
  }
</script>

<Router>
  <header>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/app">App</Link>
      <button on:click={toggleTheme}>Toggle</button>
    </nav>
  </header>
  <body>
    <main class="container">
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/chat" component={Chat} />
    </main>
  </body>
</Router>
