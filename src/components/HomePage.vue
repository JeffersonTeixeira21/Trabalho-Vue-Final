<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <!-- Coluna da imagem -->
    <div class="hidden md:flex w-full md:w-1/2 h-64 md:h-auto relative">
      <img src="../assets/imagemFundo.jpg" alt="Imagem de fundo" class="object-cover w-full h-full absolute inset-0" />
      <div class="absolute inset-0"></div>
    </div>
    <!-- Coluna do conteúdo -->
    <div class="flex flex-1 flex-col justify-center items-center bg-gray-50 py-12">
      <h1 class="text-4xl font-extrabold mb-6 text-gray-700">
        {{ isAuthenticated ? `Bem-vindo de Volta` : 'Bem-vindo ao MeContrata.com' }}
      </h1>
      <p class="mb-10 text-lg text-gray-700">Use o menu para navegar pelas páginas.</p>
      <div class="flex flex-col gap-4 w-full max-w-xs">
        <router-link
          to="/login"
          v-if="!isAuthenticated"
          class="block w-full py-3 rounded-lg bg-gray-700 text-white text-lg font-semibold text-center shadow hover:bg-gray-800 transition"
        >
          Login
        </router-link>
        <router-link
          to="/register"
          class="block w-full py-3 rounded-lg bg-gray-500 text-white text-lg font-semibold text-center shadow hover:bg-gray-700 transition"
        >
          Registrar-se
        </router-link>
        <router-link
          to="/about"
          v-if="isAuthenticated"
          class="block w-full py-3 rounded-lg bg-gray-700 text-white text-lg font-semibold text-center shadow hover:bg-gray-800 transition"
        >
          Currículo
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false,
      userName: '',
    };
  },
  mounted() {
    this.updateAuth();
  },
  methods: {
    updateAuth() {
      const token = localStorage.getItem('token');
      this.isAuthenticated = !!token;
      this.userName = localStorage.getItem('userName') || '';
    },
  },
  watch: {
    $route() {
      this.updateAuth();
    },
  },
};
</script>