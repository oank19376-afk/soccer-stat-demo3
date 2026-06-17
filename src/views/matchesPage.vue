<template>
  <h1>
    страница матчей для лиги {{ LeagueId }}
  </h1>
  <div v-if="loading">
    <v-progress-circular indeterminate />
  </div>
  <div v-else>
    <v-data-table
      :headers="headers"
      :items="matches"
    >
    <template #scoreText="{item}">
      <div>
{{ item.home_score }}:{{item.away_score }}
      </div>
    </template>
    </v-data-table>
  </div>
</template>
<script setup>
import axios from 'axios';
import {ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route=useRoute()
const LeagueId=route.params.id
//Заголовок таблицы
const headers=[
  {title:'Дата',key:'date',sortable:true},
   {title:'Время',key:'time',sortable:true},
    {title:'Хозяева',key:'home-team',sortable:true},
     {title:'Гости',key:'away-team',sortable:true},
      {title:'Счет',key:'scoreText',sortable:true},
]

//данные
const matches=ref([])
const loading=ref(true)

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
