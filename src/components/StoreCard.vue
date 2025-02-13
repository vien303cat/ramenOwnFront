<template>
  <v-card>
    <router-link :to="'/store/' + _id" class="no-underline">
      <v-img :src="image" height="300" cover></v-img>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-subtitle>{{ adress }}</v-card-subtitle>
      <v-card-subtitle>{{ timetxt }}</v-card-subtitle>
      <!-- <v-card-text>{{ depiction }}</v-card-text> -->
      <v-card-subtitle>評價數</v-card-subtitle>
      <v-card-subtitle>平均分</v-card-subtitle>
    </router-link>
  </v-card>
</template>

<script setup>
defineProps({
  // eslint-disable-next-line vue/prop-name-casing
  _id: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  adress: {
    type: String,
    default: '',
  },
  timetxt: {
    type: String,
    default: '',
  },
  depiction: {
    type: String,
    default: '',
  },
})
</script>
<style>
.no-underline {
  text-decoration: none;
  color: white;
}
</style>
