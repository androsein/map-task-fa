<template>
  <div id="app">
    <b-alert
      class="position-absolute m-4 bottom-0 right-0 z-index-99"
      v-model="$store.getters.isAlertShowing"
      :variant="$store.getters.alertVariant"
      fade
    >
      {{ $store.getters.alertMessage }}
    </b-alert>
    <router-view />
  </div>
</template>
