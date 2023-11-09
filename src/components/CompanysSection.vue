<template>
    <v-alert
        type="warning"
        title="Avaliações esgotadas!"
        text="Você já respondeu todas as avaliações, retorne amanhã para continuar lucrando!"
        class="ma-4"
        v-model="allDisabled"
    ></v-alert>
    <div v-for="(company, index) in companys" :key="index" class="ma-4">
        <v-card :title="company.name" elevation="5" rounded="lg" subtitle="Você tem um novo relatório" class="pa-4">
            <template v-slot:prepend>
                <v-avatar color="blue-darken-2" class="mx-3" size="x-large">
                    <v-img :src="company.avatar" cover />
                </v-avatar>
            </template>
            <v-btn color="green" class="w-100" size="large" :disabled="company.disabled"
                @click="toPage(company.id)">Gerar relatório - R${{ company.value
                }}</v-btn>
        </v-card>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

import bradescoAvatar from '@/assets/avatars/bradesco.png'
import magaluAvatar from '@/assets/avatars/magalu.webp'
import nubankAvatar from '@/assets/avatars/nubank.png'
import itauAvatar from '@/assets/avatars/itau.png'
import casasBahiaAvatar from '@/assets/avatars/casasBahia.png'
import petrobrasAvatar from '@/assets/avatars/petrobras.jpg'
import oBoticarioAvatar from '@/assets/avatars/oBoticario.png'
import americanasAvatar from '@/assets/avatars/americanas.png'
import havanAvatar from '@/assets/avatars/havan.jpg'

const companys = ref([{
    name: 'Magalu',
    value: 34,
    id: '1',
    avatar: magaluAvatar,
    disabled: false
}, {
    name: 'Bradesco',
    value: 29,
    id: '2',
    avatar: bradescoAvatar,
    disabled: false
}, {
    name: 'Nubank',
    value: 31,
    id: '3',
    avatar: nubankAvatar,
    disabled: false
}, {
    name: 'Itaú',
    value: 25, // valor aleatório fixo entre 20 e 35
    id: '4',
    avatar: itauAvatar,
    disabled: false
},
{
    name: 'Casas Bahia',
    value: 22, // valor aleatório fixo entre 20 e 35
    id: '5',
    avatar: casasBahiaAvatar,
    disabled: false
},
{
    name: 'Petrobras',
    value: 27, // valor aleatório fixo entre 20 e 35
    id: '6',
    avatar: petrobrasAvatar,
    disabled: false
},
{
    name: 'O Boticário',
    value: 33, // valor aleatório fixo entre 20 e 35
    id: '7',
    avatar: oBoticarioAvatar,
    disabled: false
},
{
    name: 'Lojas Americanas',
    value: 24, // valor aleatório fixo entre 20 e 35
    id: '8',
    avatar: americanasAvatar,
    disabled: false
},
{
    name: 'Havan',
    value: 30, // valor aleatório fixo entre 20 e 35
    id: '9',
    avatar: havanAvatar,
    disabled: false
}])

const allDisabled = computed(() => {
  return companys.value.every(company => company.disabled);
});

const toPage = (id) => {
    router.push(`/company/${id}`)
}

onMounted(() => {
    const answeredForms = JSON.parse(localStorage.getItem('answeredForms')) || []

    console.log(answeredForms)

    companys.value.forEach(e => {
        if(answeredForms.includes(parseInt(e.id))){
            e.disabled = true
        }
    })
})

</script>