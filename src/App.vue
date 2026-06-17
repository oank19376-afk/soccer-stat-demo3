<template>
  <v-app>
    <!-- Здесь начинается код шапки -->
    <v-app-bar
      color="primary"
      title="Soccer Stat Demo"
    >
      <template #prepend>
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

