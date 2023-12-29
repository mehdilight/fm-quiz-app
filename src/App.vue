<script setup>
import Layout from './components/Layout.vue';
import useQuiz from './composables/useQuiz';

const { quizzes } = useQuiz();

</script>

<template>
  <Layout class="p-6">
    <section class="mb-10">
      <h1 class="text-4xl text-dark-navy mb-4">
        <span class="font-light">
          Welcome to the
        </span>
        <span class="font-medium">
          Frontend Quiz!
        </span>
      </h1>
      <p class="text-sm text-dark-navy font-light italic">
        Pick a subject to get started.
      </p>
    </section>
    <section class="space-y-3">
      <router-link class="block bg-white px-4 py-3 rounded flex items-center space-x-4 hover:scale-105 focus:scale-105 transition-transform transform-gpu" v-for="quiz in quizzes" :to="quiz.title">
        <span class="w-10 h-10 rounded" :style="{backgroundColor: quiz['icon-bg']}">
          <img :src="quiz.icon" alt="" class="p-[5.72px]">
        </span>
        <span class="text-dark-navy font-medium text-lg">
          {{ quiz.title }}
        </span>
      </router-link>
    </section>
  </Layout>
</template>
