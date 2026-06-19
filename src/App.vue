<template>



  <v-app>
    <!-- Здесь начинается код шапки -->
    <v-app-bar
      color="#1E90FF"
      title="Soccer Stat Demo"
    >
      <template #prepend>
        <v-icon
          color="white"
          size="32"
          class="mr-2">
          mdi-soccer
        </v-icon>
        <v-app-bar-nav-icon />
      </template>
    </v-app-bar>
    <!-- Код шапки закончился -->

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

