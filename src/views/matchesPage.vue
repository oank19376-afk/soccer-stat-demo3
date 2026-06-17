<template>
  <v-container>
    <h1>
      страница матчей для лиги {{ LeagueId }}</h1>
    <v-row>
      <v-col>
        <v-text-field
          v-model="search"
          label="Поиск по командам"
          clearable
          variant="outlined"
          density="comfortable"
        />
      </v-col>
      <v-col>
        <v-menu>
          <template #activator="{ props }">
            <v-text-field
              v-bind="props"
              label="Дата от"
              :model-value="datefrom"
              readonly
              variant="outlined"
              density="comfortable"
            />
          </template>
          <v-locale-provider locale="ru"> <v-date-picker
            v-model="datefrom"
            
            

            header="Выберите дату"
            tile="выбор даты"
          /></v-locale-provider>


         
         
        </v-menu>
      </v-col>
      <v-col>
        <v-menu>
          <template #activator="{ props }">
            <v-text-field
              v-bind="props"
              label="Дата до"
              :model-value="dateto"
              readonly
              variant="outlined"
              density="comfortable"
            />
          </template>
           <v-locale-provider locale="ru"> <v-date-picker
            v-model="dateto"
              header="Выберите дату"
            tile="выбор даты"
          /></v-locale-provider>
         
        </v-menu>
      </v-col>
    </v-row>
    <div v-if="loading">
      <v-progress-circular indeterminate />
    </div>
    <div v-else>
      <v-data-table
        :headers="headers"
        :items="filteredMatches"
      >
      <template #item.date="{item}">
        {{ formatDate(item.date)}}
      </template>
        <template #item.scoreText="{item}">
          <div>
            <!-- {{ item.home_score }}:{{ item.away_score }} -->
              <v-chip>{{ item.scoreText }}</v-chip>
          </div>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>
  

<script setup>
import axios from 'axios';
// import { search } from 'core-js/fn/symbol';
import {ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
const route=useRoute()
const LeagueId=route.params.id
const search=ref('')
const datefrom=ref('')
const dateto=ref('')
//Заголовок таблицы
const headers=[
  {title:'Дата',key:'date',sortable:true},
   {title:'Время',key:'time',sortable:true},
    {title:'Хозяева',key:'home_team',sortable:true},
     {title:'Гости',key:'away_team',sortable:true},
      {title:'Счет',key:'scoreText',sortable:true},
]

//данные
const matches=ref([])
const loading=ref(true)
const filteredMatches=computed(()=>{
  let result=[...matches.value]
  if (search.value){
    const query=search.value.toLowerCase()
    result=result.filter(m=>
    m.home_team.toLowerCase().includes(query)||
  m.away_team.toLowerCase().includes(query))
  
  }
  if (datefrom.value) {result=result.filter(m=>new Date(m.date)>=Date(datefrom.value))}
  if (dateto.value) {result=result.filter(m=>new Date(m.date)<=Date(dateto.value))}
  return result
})

const formatDate=(dateStr)=>{
  if (!dateStr) return'-'
  const date=new Date(dateStr)
  return date.toLocaleDateString('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
})
}
const fetchMatches=async()=>{
  loading.value=true
    try{
        const response=await axios. get ('/matches.json')
        matches.value=response.data.map(m=>({
          id:m.id,
          date:m.date,
          time:m.time,
          home_team:m.home_team,
          away_team:m.away_team,
          scoreText:`${m.home_score ?? '-'}:${m.away_score ?? '-'}`



        }))
        console.log(matches.value)
    }
    catch (err){
        console.log(err)

    }
    finally{
      loading.value=(false)
    }
}
onMounted(()=>fetchMatches())
</script>
