<script setup></script>

<template>
  <main class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
    <h1 class="text-4xl font-bold text-gray-800 mb-6">Gestione annunci con Vue.js + Pinia</h1>
    <button
      class="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
      @click="$router.push('/annunci')"
    >
      Go to the project
    </button>
  </main>
</template>
