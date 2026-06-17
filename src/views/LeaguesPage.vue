<template>
  <div>
    <v-btn prepend-icon="$vuetify">
      Button
    </v-btn>
    <input
      v-model="search"
      placeholder="Поиск лиги"
    >
    <!-- <button @click="fetchParticipants">получение данных</button> -->
    
    <div
      v-for="league in filterParticipants"  
       
       
       
      :key="league.id"
      class="league-item"
      @click="goToLeague(league.id)"
    >
      <strong>{{ league.name }}</strong> — {{ league.country }}
    </div>
  </div>
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
const error=ref('')

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
  try{ const response=await axios.get(' https://api.sstats.net/leagues')
  // console.log(response)
  participants.value=response.data.data

  }
  catch(err){
    if (err.response) {
// Сервер ответил с ошибкой (4xx или 5xx)
const status = err.response.status;
if (status === 401) error.value = 'Ошибка авторизации. Проверьте ключ API.';
else if (status === 404) error.value = 'Соревнование не найдено.';
else if (status === 429) error.value = 'Слишком много запросов. Попробуйте завтра.';
else error.value = `Ошибка сервера (${status}). Попробуйте позже.`;
} else if (err.request) {
// Запрос был отправлен, но ответа нет (нет интернета, CORS)
error.value = 'Нет ответа от сервера. Проверьте соединение.';
} else {
// Прочие ошибки, например, при настройке запроса
error.value = 'Неизвестная ошибка. Обновите страницу.';
}
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
