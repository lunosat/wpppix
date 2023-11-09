<template>
    <v-card title="Perguntas" prepend-icon="mdi-help-circle-outline" class="ma-4">
        <v-alert 
            type="success"
            v-model="alertShow"
            title="Pesquisa concluída!"
            text="O saldo será adicionado em sua conta dentro de alguns segundos."
            class="ma-4"
        ></v-alert>
        <v-img :src="company.banner" class="ma-4 rounded-lg"></v-img>

        <p align="center">{{ company.questionOne }}</p>

        <v-row class="my-2">
            <v-col v-for="(btn, index) in btns" :key="index" class="ma-2" cols="1.1">
                <v-btn :icon="btn.icon" :color="btn.color" rounded="lg"></v-btn>
            </v-col>
        </v-row>

        <p align="center">{{ company.questionTwo.question }}</p>

        <v-row class="ma-2">
            <v-col>
                <v-btn class="w-100" size="large" :color="selectedOption === company.questionTwo.optionOne ? 'green' : ''"
                    @click="selectOption(company.questionTwo.optionOne)">
                    {{ company.questionTwo.optionOne }}
                </v-btn>
            </v-col>
            <v-col>
                <v-btn class="w-100" size="large" :color="selectedOption === company.questionTwo.optionTwo ? 'green' : ''"
                    @click="selectOption(company.questionTwo.optionTwo)">
                    {{ company.questionTwo.optionTwo }}
                </v-btn>
            </v-col>
        </v-row>
        <p align="center">{{ company.questionThree }}</p>
        <v-row class="ma-2">
            <v-col>
                <v-btn class="w-100" size="large" :color="selectedYesNo === 'Sim' ? 'green' : ''"
                    @click="selectYesNo('Sim')">
                    Sim
                </v-btn>
            </v-col>
            <v-col>
                <v-btn class="w-100" size="large" :color="selectedYesNo === 'Não' ? 'green' : ''"
                    @click="selectYesNo('Não')">
                    Não
                </v-btn>
            </v-col>
        </v-row>
        <div class="ma-4">
            <v-btn color="green" class="w-100" size="large" @click="addBalance(company.value, company.id)">Enviar
                respostas</v-btn>
        </div>
    </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

import nubankBanner from '@/assets/banners/nubank.png'
import magaluBanner from '@/assets/banners/magalu.jpg'
import bradescoBanner from '@/assets/banners/bradesco.png'
import itauBanner from '@/assets/banners/itau.jpeg'
import havanBanner from '@/assets/banners/havan.jpg'
import oBoticarioBanner from '@/assets/banners/oBoticario.webp'
import petrobrasBanner from '@/assets/banners/petrobras.jpeg'
import americanasBanner from '@/assets/banners/americanas.png'
import casasBahiaBanner from '@/assets/banners/casasBahia.jpg'

const selectedOption = ref('');

// Propriedade reativa para rastrear a resposta de sim/não para a pergunta três
const selectedYesNo = ref('');

// Método para selecionar uma opção e mudar sua cor para verde
const selectOption = (option) => {
  selectedOption.value = option;
};

// Método para selecionar uma resposta de sim/não e mudar sua cor para verde
const selectYesNo = (answer) => {
  selectedYesNo.value = answer;
};

const alertShow = ref(false)

const btns = ref([
    {
        icon: 'mdi-emoticon-angry-outline',
        color: '#a31b1b'
    }, {
        icon: 'mdi-emoticon-sad-outline',
        color: '#ffa500'
    }, {
        icon: 'mdi-emoticon-neutral-outline',
        color: '#c9802d'
    }, {
        icon: 'mdi-emoticon-happy-outline',
        color: '#679b33'
    }, {
        icon: 'mdi-emoticon-excited-outline',
        color: '#1fa449'
    }
])

const company = ref({
    banner: '',
    questionOne: '',
    questionTwo: {
        question: '',
        optionOne: '',
        optionTwo: ''
    },
    questionThree: '',
    id: 0,
    value: 0,
})

const companys = [{
    banner: magaluBanner,
    questionOne: 'De 0 a 5, que nota você dá para o atendimento da Magazine Luiza?',
    questionTwo: {
        question: 'Em uma loja de eletrodomésticos, você prefere mais móveis ou eletônicos?',
        optionOne: 'Móveis',
        optionTwo: 'Eletrônicos'
    },
    questionThree: 'Você faria um empréstimo nesse banco?',
    id: 1,
    value: 34
}, {
    banner: bradescoBanner,
    questionOne: 'De 0 a 5, que nota você dá para o atendimento do Bradesco',
    questionTwo: {
        question: 'Em uma loja de eletrodomésticos, você prefere mais móveis ou eletônicos?',
        optionOne: 'Limite maior',
        optionTwo: 'Menores taxas'
    },
    questionThree: 'Você faria um empréstimo nesse banco?',
    id: 2,
    value: 29
}, {
    banner: nubankBanner,
    questionOne: 'De 0 a 5, que nota você dá para o atendimento do Nubank?',
    questionTwo: {
        question: 'Em um banco, você prefere um cartão com limite maior ou menores taxas?',
        optionOne: 'Limite maior',
        optionTwo: 'Menores taxas'
    },
    questionThree: 'Você faria um empréstimo nesse banco?',
    id: 3,
    value: 31
}, {
    banner: itauBanner,
    questionOne: 'De 0 a 5, que nota você dá para o atendimento do Itaú?',
    questionTwo: {
        question: 'Você prefere atendimento online ou presencial em agências?',
        optionOne: 'Atendimento online',
        optionTwo: 'Presencial em agências'
    },
    questionThree: 'Você recomendaria o Itaú para amigos ou familiares?',
    id: 4,
    value: 25
},
{
    banner: casasBahiaBanner,
    questionOne: 'De 0 a 5, que nota você dá para a variedade de produtos das Casas Bahia?',
    questionTwo: {
        question: 'Para compras de eletrodomésticos, você valoriza mais o preço ou a qualidade?',
        optionOne: 'Preço',
        optionTwo: 'Qualidade'
    },
    questionThree: 'Você já financiou algum produto nas Casas Bahia?',
    id: 5,
    value: 22
},
{
    banner: petrobrasBanner,
    questionOne: 'De 0 a 5, que nota você dá para a qualidade do combustível da Petrobras?',
    questionTwo: {
        question: 'Você considera importante a origem do combustível que utiliza?',
        optionOne: 'Sim, é muito importante',
        optionTwo: 'Não, não me importo'
    },
    questionThree: 'Você participa do programa de fidelidade da Petrobras?',
    id: 6,
    value: 27
},
{
    banner: oBoticarioBanner,
    questionOne: 'De 0 a 5, que nota você dá para os produtos de O Boticário?',
    questionTwo: {
        question: 'Você prefere comprar cosméticos em lojas físicas ou online?',
        optionOne: 'Lojas físicas',
        optionTwo: 'Online'
    },
    questionThree: 'Você considera O Boticário uma marca sustentável?',
    id: 7,
    value: 33
},
{
    banner: americanasBanner,
    questionOne: 'De 0 a 5, que nota você dá para a experiência de compra nas Lojas Americanas?',
    questionTwo: {
        question: 'Em uma loja de varejo, você prefere promoções frequentes ou preços baixos constantes?',
        optionOne: 'Promoções frequentes',
        optionTwo: 'Preços baixos constantes'
    },
    questionThree: 'Você já utilizou o serviço de entrega rápida das Americanas?',
    id: 8,
    value: 24
},
{
    banner: havanBanner,
    questionOne: 'De 0 a 5, que nota você dá para a diversidade de produtos na Havan?',
    questionTwo: {
        question: 'Você prefere fazer compras em lojas com muitas opções ou lojas especializadas?',
        optionOne: 'Muitas opções',
        optionTwo: 'Lojas especializadas'
    },
    questionThree: 'Você já comprou produtos de marca própria da Havan?',
    id: 9,
    value: 30
}]

const addBalance = (value, id) => {
    let actualBalance = parseInt(localStorage.getItem('balance')) || 0
    let answeredForms = JSON.parse(localStorage.getItem('answeredForms')) || []

    answeredForms.push(id)

    localStorage.setItem('answeredForms', JSON.stringify(answeredForms))
    const balance = actualBalance += value
    localStorage.setItem('balance', balance)

    alertShow.value = true

    setTimeout(() => {
        router.push('/')
    }, 3000)
}

onMounted(() => {
    const id = parseInt(route.params.id)

    company.value = companys.find((e) => e.id === id)
})
</script>