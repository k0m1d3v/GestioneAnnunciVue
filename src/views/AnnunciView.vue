<script setup>
import { ref } from 'vue'

const annunci = ref([
  {
    id: 1,
    titolo: 'Annuncio 1',
    descrizione: 'Descrizione 1',
    categoria: 'Elettronica',
    telefono: 3313314140,
  },
  {
    id: 2,
    titolo: 'Annuncio 2',
    descrizione: 'Descrizione 2',
    categoria: 'Immobili',
    telefono: 3313314140,
  },
])

const showModal = ref(false)

const deleteAnnuncio = (id) => {
  annunci.value = annunci.value.filter((annuncio) => annuncio.id !== id)
}

const addAnnuncio = (newAnnuncio) => {
  annunci.value.push(newAnnuncio)
  showModal.value = false // Close the modal after adding
}

// Form fields
const titolo = ref('')
const descrizione = ref('')
const categoria = ref('')
const telefono = ref('')
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Annunci</h1>
    <div class="mb-4">
      <button @click="showModal = true" class="bg-blue-500 text-white px-4 py-2 rounded">
        Aggiungi Annuncio
      </button>
    </div>
    <ul>
      <li v-for="annuncio in annunci" :key="annuncio.id" class="border p-4 mb-2">
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
