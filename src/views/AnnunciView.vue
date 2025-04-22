<script setup>
import { useAnnunciStore } from '../stores/useAnnunciStore'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'

const annunciStore = useAnnunciStore()
const { annunci } = storeToRefs(annunciStore)

const deleteAnnuncio = (id) => {
  annunciStore.deleteAnnuncio(id)
}

const addAnnuncio = (newAnnuncio) => {
  annunciStore.addAnnuncio(newAnnuncio)
  showModal.value = false // Close the modal after adding
}

const showModal = ref(false)

// Form fields
const titolo = ref('')
const descrizione = ref('')
const categoria = ref('')
const telefono = ref('')

// Filtering
const selectedCategoria = ref('') // Categoria selezionata per il filtro
const filteredAnnunci = computed(() => {
  if (!selectedCategoria.value) return annunci.value
  return annunci.value.filter((annuncio) => annuncio.categoria === selectedCategoria.value)
})
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Annunci</h1>

    <!-- Filtro per categoria -->
    <div class="mb-4">
      <label for="categoria-filter" class="block text-sm font-medium text-gray-700"
        >Filtra per Categoria</label
      >
      <select
        id="categoria-filter"
        v-model="selectedCategoria"
        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Tutte le categorie</option>
        <option v-for="annuncio in annunci" :key="annuncio.categoria" :value="annuncio.categoria">
          {{ annuncio.categoria }}
        </option>
      </select>
    </div>

    <div class="mb-4">
      <button @click="showModal = true" class="bg-blue-500 text-white px-4 py-2 rounded">
        Aggiungi Annuncio
      </button>
    </div>

    <ul>
      <li v-for="annuncio in filteredAnnunci" :key="annuncio.id" class="border p-4 mb-2">
        <h2 class="text-xl font-semibold">{{ annuncio.titolo }}</h2>
        <p>{{ annuncio.descrizione }}</p>
        <p class="text-gray-500">Categoria: {{ annuncio.categoria }}</p>
        <p class="text-gray-500">Telefono: {{ annuncio.telefono }}</p>
        <button
          @click="deleteAnnuncio(annuncio.id)"
          class="bg-red-500 text-white px-4 py-2 rounded"
        >
          Elimina
        </button>
      </li>
    </ul>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-bold mb-4">Aggiungi Annuncio</h2>
        <form
          @submit.prevent="
            addAnnuncio({
              id: Date.now(),
              titolo: titolo,
              descrizione: descrizione,
              categoria: categoria,
              telefono: telefono,
            })
          "
        >
          <div class="mb-4">
            <label for="titolo" class="block text-sm font-medium text-gray-700">Titolo</label>
            <input
              id="titolo"
              v-model="titolo"
              type="text"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label for="descrizione" class="block text-sm font-medium text-gray-700"
              >Descrizione</label
            >
            <textarea
              id="descrizione"
              v-model="descrizione"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="categoria" class="block text-sm font-medium text-gray-700">Categoria</label>
            <input
              id="categoria"
              v-model="categoria"
              type="text"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label for="telefono" class="block text-sm font-medium text-gray-700">Telefono</label>
            <input
              id="telefono"
              v-model="telefono"
              type="text"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              @click="showModal = false"
              class="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Annulla
            </button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Aggiungi</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
