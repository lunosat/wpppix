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
        <v-btn class="w-100" color="green" size="x-large" @click="performWithdrawal">Realizar saque</v-btn>
    </v-sheet>

    <!-- Diálogo que contém tanto o loading quanto a mensagem de sucesso -->
    <v-dialog v-model="dialog">
        <v-card rounded="lg">
            <!-- Conteúdo do diálogo para o estado de carregamento -->
            <v-card-text v-if="loading" class="text-center">
                <v-progress-circular indeterminate size="64" color="green"></v-progress-circular>
            </v-card-text>

            <!-- Conteúdo do diálogo para a mensagem de sucesso -->
            <div v-else>
                <v-card-title class="headline text-center">Saque realizado!</v-card-title>
                <v-card-text class="text-center">
                    <v-icon large color="success" class="success-check">mdi-check-circle</v-icon>
                    <p>Seu saque foi realizado com sucesso!</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="closeDialog">Fechar</v-btn>
                </v-card-actions>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue'

const keys = ref(['CPF', 'Telefone', 'E-mail', 'Aleatória'])
const selectedKey = ref()
const alert = ref({ active: false, type: '', text: '', title: ''})
const balance = ref()
const keyPix = ref()
const loading = ref(false)
const dialog = ref(false)

balance.value = parseFloat(localStorage.getItem('balance')).toFixed(2)

const isDemo = localStorage.getItem('isDemo')

if(isDemo){
    selectedKey.value = 'CPF'
    keyPix.value = '401.***.***-23'
}

const performWithdrawal = () => {
    if(isDemo){
        dialog.value = true
        loading.value = true
        setTimeout(() => {
            loading.value = false
        }, 3000)
    } else {
        alert.value.active = true
        alert.value.text = 'Por segurança seu saldo está retido por 7 dias.'
        alert.value.title = 'Saque bloqueado!'
        alert.value.type = 'error'
    }
}

const closeDialog = () => {
    dialog.value = false
    loading.value = false
}
</script>

<style>

.success-check {
    font-size: 120px; /* Ajuste este valor conforme necessário */
}
</style>
