<template>
  <q-layout :style="bgStyle">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      bgStyle: {
        backgroundColor: "#E5E057"
      }
    }
  }
}
</script>

