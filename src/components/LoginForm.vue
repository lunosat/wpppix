<template>
    <div class="d-flex flex-column justify-center align-center h-screen">
        <v-sheet elevation="12" color="green" class="ma-4 pa-4" rounded="xl" align="center">
            <v-img :src="logo" width="100"></v-img>
            <v-alert type="error" v-model="alert"
                text="Seu e-mail não foi encontrado! Verifique seu e-mail e tente novamente.">

            </v-alert>
            <p class="text-h5 ma-4" align="center">Utilize o mesmo e-mail de sua compra para realizar o log-in</p>
            <v-text-field type="email" v-model="email" variant="outlined" label="E-mail"
                placeholder="user@email.com"></v-text-field>

            <v-btn color="success" class="w-100" size="large" @click="login">
                Entrar
                <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
            </v-btn>
        </v-sheet>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios'

import logo from '@/assets/wpp.webp'

const router = useRouter()

const email = ref('')
const alert = ref(false)
const isActive = ref(false)

const login = async () => {
    try {
        isActive.value = true
        const res = await axios.post('/api/login', {
            email: email.value
        })

        if(email.value === 'demo@demo.com'){
            localStorage.setItem('isDemo', true)
        }

        console.log(res)

        if (res.status === 200) {
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('balance', res.data.balance)
            router.push('/')
        } else {
            isActive.value = false
            alert.value = true
        }
    } catch (e) {
        isActive.value = true
        alert.value = true
    }

}
</script>