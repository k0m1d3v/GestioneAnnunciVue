import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnnunciStore = defineStore('annunci', () => {
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

  const addAnnuncio = (newAnnuncio) => {
    annunci.value.push(newAnnuncio)
  }

  const deleteAnnuncio = (id) => {
    annunci.value = annunci.value.filter((annuncio) => annuncio.id !== id)
  }

  return {
    annunci,
    addAnnuncio,
    deleteAnnuncio,
  }
})
