<template>
    <v-tabs
      v-model="tab"
      bg-color="green"
      fixed-tabs
      align-tabs="center"
    >
      <v-tab value="one">Empresas</v-tab>
      <v-tab value="two">Saque</v-tab>
    </v-tabs>

    <v-window v-model="tab">
        <v-window-item value="one">
          <CompanysSection/>
        </v-window-item>

        <v-window-item value="two">
          <WithdrawSection/>
        </v-window-item>
    </v-window>
</template>

<script setup>
import { ref } from 'vue'
import CompanysSection from './CompanysSection.vue';
import WithdrawSection from './WithdrawSection.vue';

const tab = ref()

</script>