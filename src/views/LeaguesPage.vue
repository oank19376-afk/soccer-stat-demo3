<template>
  <div>
    <!-- <v-btn prepend-icon="$vuetify">
      Button
    </v-btn> -->



    <!-- <input
      v-model="search"
      placeholder="Поиск лиги"
    > -->

<v-card
      class="mx-auto mb-4"
      color="surface-light"
      max-width="600"
    >
      <v-card-text>
        <v-text-field
          v-model="search"
          :loading="loading"
          append-inner-icon="mdi-magnify"
          density="compact"
          label="Поиск лиги"
          variant="solo"
          hide-details
          single-line
          clearable
          @click:append-inner="onSearch"
          @input="onSearch"
        />
      </v-card-text>
    </v-card>


    

    <!-- <button @click="fetchParticipants">получение данных</button> -->
    
    <!-- <div
      v-for="league in filterParticipants"  
       
       
       
      :key="league.id"
      class="league-item"
      @click="goToLeague(league.id)"
    >
      <strong>{{ league.name }}</strong> — {{ league.stadium }}
    </div> -->
  </div>



  <v-row>
    <v-col
      v-for="league in filterParticipants"
      :key="league.id"
      cols="12"
      sm="6"
      md="4"
      lg="3"
    >
      <v-card
        color="#AFEEEE"   
        
        elevation="2"
        class="league-card"
        @click="goToLeague(league.id)"
      >
        <v-card-title>{{ league.name }}</v-card-title>
        <!-- <v-card-subtitle>{{ league.country || 'Страна не указана' }}</v-card-subtitle> -->
        <v-card-text>
          <v-icon small>mdi-stadium</v-icon>
          {{ league.stadium }}
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="#4682B4"
            size="small"
            @click.stop="goToLeague(league.id)"
          >
            Перейти
            <v-icon end>
              mdi-arrow-right
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>








</template>
<script setup>
import {computed,  ref } from 'vue'
import { useRouter } from 'vue-router'
 import axios from 'axios'
 import { onMounted } from 'vue'
const router = useRouter()
const search = ref('')
// const leagues = ref([
// { id: 1, name: 'Premier League', country: 'Англия' },
// { id: 2, name: 'La Liga', country: 'Испания' },
// { id: 3, name: 'Bundesliga', country: 'Гемания' }
// ])
// const error=ref('')

const participants=ref([])
// const filteredLeagues = computed(() =>

// leagues.value.filter(l =>
// l.name.toLowerCase().includes(search.value.toLowerCase())
// )
// )
const filterParticipants=computed(()=>participants.value.filter(l =>
  l.name.toLowerCase().includes(search.value.toLowerCase()
)))
const goToLeague = (id) => {
  console.log(id)
router.push(`/match/${id}`) // Переходим на маршрут /match/:id
}
const fetchParticipants = async()=>{
  try{ const response=await axios.get('/leagues.json')
  // console.log(response)
  participants.value=response.data

  }
  catch(err){console.log(err)
//     if (err.response) {
// // Сервер ответил с ошибкой (4xx или 5xx)
// const status = err.response.status;
// if (status === 401) error.value = 'Ошибка авторизации. Проверьте ключ API.';
// else if (status === 404) error.value = 'Соревнование не найдено.';
// else if (status === 429) error.value = 'Слишком много запросов. Попробуйте завтра.';
// else error.value = `Ошибка сервера (${status}). Попробуйте позже.`;
// } else if (err.request) {
// // Запрос был отправлен, но ответа нет (нет интернета, CORS)
// error.value = 'Нет ответа от сервера. Проверьте соединение.';
// } else {
// // Прочие ошибки, например, при настройке запроса
// error.value = 'Неизвестная ошибка. Обновите страницу.';
// }
  }

}
onMounted(()=>{fetchParticipants()})
// Здесь позже будет router.push

</script>
<style scoped>
.league-item {
padding: 10px;
border-bottom: 1px solid #eee;
cursor: pointer;
}
.league-item:hover {
background: #f5f5f5;
}
</style>
