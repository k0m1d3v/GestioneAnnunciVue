<template>
  <nav class="bg-blue-600 text-white p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-xl font-bold">Gestione Annunci</h1>
      <ul class="flex space-x-4">
        <li>
          <router-link
            to="/"
            class="hover:text-gray-300 transition"
            active-class="font-semibold underline"
          >
            Home
          </router-link>
        </li>
        <li>
          <router-link
            to="/annunci"
            class="hover:text-gray-300 transition"
            active-class="font-semibold underline"
          >
            Annunci
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
// No additional logic needed for now
</script>

<style scoped>
/* Add custom styles if needed */
</style>
