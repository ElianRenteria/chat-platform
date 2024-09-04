<script>
  import { Router, Route, Link } from 'svelte-routing';
  import Home from './routes/Home.svelte';
  import Login from './routes/Login.svelte';
  import Register from './routes/Register.svelte';
  import Chat from './routes/Chat.svelte';
  import ProtectedRoute from './components/ProtectedRoute.svelte';
  import '@picocss/pico';
  import { SunMoon } from 'lucide-svelte';

  let currentTheme = 'light';
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
      <button on:click={toggleTheme} class="unstyled"><SunMoon/></button>
    </nav>
  </header>
  <body>
    <main class="container">
      <Route path="/" let:params>
        <ProtectedRoute allowedWhenAuthenticated={true} redirectTo="/chat">
          <Home />
        </ProtectedRoute>
      </Route>
      <Route path="/login" let:params>
        <ProtectedRoute allowedWhenAuthenticated={true} redirectTo="/chat">
          <Login />
        </ProtectedRoute>
      </Route>
      <Route path="/register" let:params>
        <ProtectedRoute allowedWhenAuthenticated={true} redirectTo="/chat">
          <Register />
        </ProtectedRoute>
      </Route>
      <Route path="/chat" let:params>
        <ProtectedRoute allowedWhenAuthenticated={false} redirectTo="/login">
          <Chat />
        </ProtectedRoute>
      </Route>
      
    </main>
  </body>
</Router>

<style>
  nav {
    display: flex;
    justify-content: end;
    padding: 1rem;
    gap: 1rem;
  }
  .unstyled {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: inherit;
  }
</style>