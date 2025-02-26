<template>
  <v-card>
    <router-link :to="'/store/' + _id" class="no-underline">
      <v-img :src="image" aspect-ratio="1" cover></v-img>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-subtitle>{{ adress }}</v-card-subtitle>
      <v-card-subtitle>{{ timetxt }}</v-card-subtitle>
      <!-- <v-card-text>{{ depiction }}</v-card-text> -->
      <v-card-subtitle>評價數: {{ scores }} 則</v-card-subtitle>
      <v-card-subtitle>
        平均評價:
        <span v-if="avgScore">
          {{ Number(avgScore).toFixed(1) }}
          <v-rating readonly length="1" size="18" model-value="1" active-color="info" />
        </span>
        <span v-else> 尚無評價 </span>
      </v-card-subtitle>
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
  scores: {
    type: String,
    default: '',
  },
  avgScore: {
    type: String,
    default: '0',
  },
})
</script>
<style>
.no-underline {
  text-decoration: none;
  color: white;
}
.v-card {
  transition: transform 0.3s ease-in-out;
}
.v-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
