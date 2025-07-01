<template>
  <div class="min-h-screen flex flex-col">
    <nav class="bg-gray-800/80 backdrop-blur-md shadow-lg border-b border-gray-700 text-white p-4 flex justify-between items-center sticky top-0 z-50 rounded-b-xl">
      <div class="flex items-center space-x-3">
        <span class="text-xl font-extrabold tracking-wide drop-shadow">MeContrata.com</span>
      </div>
      <button @click="toggleMenu" class="md:hidden p-2 rounded hover:bg-gray-700 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <ul
        :class="{'block': menuOpen, 'hidden': !menuOpen}"
        class="md:flex md:space-x-6 md:items-center md:block bg-gray-800/90 md:bg-transparent absolute md:static left-0 right-0 top-16 md:top-0 p-4 md:p-0 rounded-b-xl md:rounded-none shadow-lg md:shadow-none border-b md:border-0 border-gray-700 z-40">
        <li><router-link to="/" class="block py-2 md:py-0 px-3 rounded hover:bg-gray-700 hover:text-white transition font-medium">Início</router-link></li>
        <li v-if="isAuthenticated">
          <router-link to="/about" class="block py-2 md:py-0 px-3 rounded hover:bg-gray-700 hover:text-white transition font-medium">Currículo</router-link>
        </li>
        <li><router-link to="/register" class="block py-2 md:py-0 px-3 rounded hover:bg-gray-700 hover:text-white transition font-medium">Registrar-se</router-link></li>
        <li v-if="isAuthenticated">
          <router-link to="/profile" class="block py-2 md:py-0 px-3 rounded hover:bg-gray-700 hover:text-white transition font-medium">Perfil</router-link>
        </li>
        <li v-else>
          <button @click="goToLogin" class="block py-2 md:py-0 px-6 rounded-lg font-semibold bg-gradient-to-r from-gray-600 to-gray-800 shadow-md hover:from-gray-700 hover:to-gray-900 hover:scale-105 transition-all duration-200 focus:outline-none text-white">
            Login
          </button>
        </li>
        <li v-if="isAuthenticated">
          <button @click="logout" class="block py-2 md:py-0 px-6 rounded-lg font-semibold bg-gradient-to-r from-red-500 to-red-700 shadow-md hover:from-red-600 hover:to-red-800 hover:scale-105 transition-all duration-200 focus:outline-none text-white ml-2">
            Sair
          </button>
        </li>
      </ul>
    </nav>

    <main class="flex-grow container mx-auto px-4 py-6">
      <router-view />
    </main>

    <footer class="bg-gray-100 text-center py-4 text-gray-600">
      &copy; 2025 Sistema Básico de Criação de Currículos. Todos os direitos reservados.
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
      isAuthenticated: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    goToLogin() {
      this.$router.push('/login');
    },
    logout() {
      localStorage.removeItem('token');
      this.updateAuth();
      this.$router.push('/');
    },
    updateAuth() {
      this.isAuthenticated = !!localStorage.getItem('token');
    }
  },
  mounted() {
    this.updateAuth();
  },
  watch: {
    $route() {
      this.updateAuth();
    }
  }
};
</script>