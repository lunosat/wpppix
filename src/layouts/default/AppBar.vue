<template>
  <v-app-bar flat color="green">
    <v-app-bar-title>
      <v-img src="@/assets/wpp.webp" width="50"></v-img>
    </v-app-bar-title>
    <template v-slot:append>
      <v-sheet class="pa-2 text-h6" rounded="lg">R${{ balance }}</v-sheet>
    </template>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'

const balance = ref('')

setInterval(() => {
  balance.value = parseInt(localStorage.getItem('balance') || '0').toFixed(2)
}, 1000)

</script>
