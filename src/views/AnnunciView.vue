<script setup>
import { ref, computed } from 'vue'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

const email = ref('')
const password = ref('')
const user = ref(null)
const errorMessage = ref('')
const isRegistering = ref(false) // Stato per alternare tra login e registrazione

const announcements = ref([]) // Array to store announcements
const showModal = ref(false) // State to toggle the modal
const newAnnouncement = ref({ title: '', description: '', category: '', cellphone: '' }) // New announcement data
const selectedCategory = ref('') // Selected category for filtering

const login = async () => {
  console.log('Login button clicked') // Debug log
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    user.value = userCredential.user
    errorMessage.value = ''
    console.log('User logged in:', user.value) // Debug log
  } catch (error) {
    errorMessage.value = error.message
    console.error('Login error:', error) // Debug log
  }
}

const register = async () => {
  console.log('Register button clicked') // Debug log
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    user.value = userCredential.user
    errorMessage.value = ''
    console.log('User registered:', user.value) // Debug log
  } catch (error) {
    errorMessage.value = error.message
    console.error('Registration error:', error) // Debug log
  }
}

const logout = async () => {
  try {
    await signOut(auth)
    user.value = null
  } catch (error) {
    errorMessage.value = error.message
  }
}

const toggleRegistering = () => {
  isRegistering.value = !isRegistering.value
  console.log('Toggle button clicked, isRegistering:', isRegistering.value) // Debug log
}

// Bypass login
const bypassLogin = () => {
  user.value = { email: 'mockuser@example.com' }
  console.log('Bypass login activated, user:', user.value) // Debug log
}

// Add Announce
const addAnnounce = () => {
  console.log('Add Announce button clicked') // Debug log
  showModal.value = true // Show the modal
}

const saveAnnouncement = () => {
  if (
    newAnnouncement.value.title &&
    newAnnouncement.value.description &&
    newAnnouncement.value.category &&
    newAnnouncement.value.cellphone
  ) {
    announcements.value.push({ ...newAnnouncement.value, id: Date.now() })
    newAnnouncement.value = { title: '', description: '', category: '', cellphone: '' } // Reset the form
    showModal.value = false // Close the modal
    console.log('Announcement added:', announcements.value) // Debug log
  } else {
    console.error('All fields are required') // Debug log
  }
}

// Delete Announcement
const deleteAnnouncement = (id) => {
  announcements.value = announcements.value.filter((announcement) => announcement.id !== id)
  console.log(`Announcement with id ${id} deleted`) // Debug log
}

// Filtered Announcements
const filteredAnnouncements = computed(() => {
  if (!selectedCategory.value) return announcements.value
  return announcements.value.filter(
    (announcement) => announcement.category === selectedCategory.value,
  )
})
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Annunci</h1>

    <!-- Login/Register Form -->
    <div v-if="!user" class="mb-4">
      <h2 class="text-xl font-bold mb-2">{{ isRegistering ? 'Registrati' : 'Login' }}</h2>
      <form @submit.prevent="isRegistering ? register : login">
        <div class="mb-2">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div class="mb-2">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
          {{ isRegistering ? 'Registrati' : 'Login' }}
        </button>
      </form>
      <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
      <p class="mt-4">
        {{ isRegistering ? 'Hai già un account?' : 'Non hai un account?' }}
        <button @click="toggleRegistering" class="text-blue-500 underline">
          {{ isRegistering ? 'Accedi' : 'Registrati' }}
        </button>
      </p>
      <!-- Bypass Login Button -->
      <button @click="bypassLogin" class="bg-green-500 text-white px-4 py-2 rounded mt-4">
        Bypass Login
      </button>
    </div>

    <!-- Logout Button -->
    <div v-else class="mb-4">
      <p class="mb-2">Benvenuto, {{ user.email }}</p>
      <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </div>

    <!-- Annunci Section -->
    <div v-if="user">
      <h2 class="text-xl font-bold mb-4">Gestisci i tuoi annunci</h2>

      <!-- Filter by Category -->
      <div class="mb-4">
        <label for="category-filter" class="block text-sm font-medium text-gray-700"
          >Filtra per Categoria</label
        >
        <select
          id="category-filter"
          v-model="selectedCategory"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Tutte le categorie</option>
          <option
            v-for="announcement in announcements"
            :key="announcement.category"
            :value="announcement.category"
          >
            {{ announcement.category }}
          </option>
        </select>
      </div>

      <button @click="addAnnounce" class="bg-blue-500 text-white px-4 py-2 rounded">
        Aggiungi Annuncio
      </button>
      <ul class="mt-4">
        <li
          v-for="announcement in filteredAnnouncements"
          :key="announcement.id"
          class="border p-4 mb-2"
        >
          <h3 class="text-lg font-bold">{{ announcement.title }}</h3>
          <p>{{ announcement.description }}</p>
          <p class="text-gray-500">Categoria: {{ announcement.category }}</p>
          <p class="text-gray-500">Telefono: {{ announcement.cellphone }}</p>
          <button
            @click="deleteAnnouncement(announcement.id)"
            class="bg-red-500 text-white px-4 py-2 rounded mt-2"
          >
            Elimina
          </button>
        </li>
      </ul>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-bold mb-4">Nuovo Annuncio</h2>
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700">Titolo</label>
          <input
            id="title"
            v-model="newAnnouncement.title"
            type="text"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700"
            >Descrizione</label
          >
          <textarea
            id="description"
            v-model="newAnnouncement.description"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <div class="mb-4">
          <label for="category" class="block text-sm font-medium text-gray-700">Categoria</label>
          <input
            id="category"
            v-model="newAnnouncement.category"
            type="text"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div class="mb-4">
          <label for="cellphone" class="block text-sm font-medium text-gray-700">Telefono</label>
          <input
            id="cellphone"
            v-model="newAnnouncement.cellphone"
            type="text"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div class="flex justify-end">
          <button @click="showModal = false" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">
            Annulla
          </button>
          <button @click="saveAnnouncement" class="bg-blue-500 text-white px-4 py-2 rounded">
            Salva
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
