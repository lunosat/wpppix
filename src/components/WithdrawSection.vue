<template>
    <v-sheet class="ma-4 pa-2" elevation="5">
        <p class="text-h4" align="center">Realizar saque</p>
        <v-divider class="my-4"></v-divider>
        <v-alert v-model="alert.active" closable :type="alert.type" :title="alert.title" :text="alert.text" class="my-4" variant="flat"></v-alert>
        <v-select
            :items="keys"
            v-model="selectedKey"
            label="Tipo de chave"
            variant="outlined"
        ></v-select>
        <v-text-field variant="outlined" label="Chave pix" v-model="keyPix"></v-text-field>
        <v-text-field variant="outlined" prefix="R$" label="Valor" v-model="balance" disabled></v-text-field>
        <v-btn class="w-100" color="green" size="x-large" @click="alertShow">Realizar saque</v-btn>
    </v-sheet>
</template>

<script setup>
import { ref } from 'vue'

const keys = ref(['CPF', 'Telefone', 'E-mail', 'Aleatória'])
const selectedKey = ref()
const alert = ref({ active: false, type: '', text: '', title: ''})
const balance = ref()
const keyPix = ref()

balance.value = balance.value = parseInt(localStorage.getItem('balance')).toFixed(2)

const isDemo = localStorage.getItem('isDemo')

if(isDemo){
    selectedKey.value = 'CPF'
    keyPix.value = '401.***.***-23'
}

const alertShow = () => {
    if(isDemo){
        alert.value.active = true
        alert.value.text = 'Seu saldo foi realizado com sucesso! Em breve receberá em sua conta.'
        alert.value.title = 'Saque realizado!'
        alert.value.type = 'success'
    } else {
        alert.value.active = true
        alert.value.text = 'Por segurança seu saldo está retido por 7 dias.'
        alert.value.title = 'Saque bloqueado!'
        alert.value.type = 'error'
    }
}

</script>