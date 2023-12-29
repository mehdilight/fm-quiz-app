<script setup>
import Layout from './components/Layout.vue';
import useQuiz from './composables/useQuiz';

const { quizzes } = useQuiz();

</script>

<template>
  <Layout class="p-6 lg:grid lg:grid-cols-2 lg:gap-32 lg:max-w-[1153px] lg:mx-auto lg:mt-24">
    <section class="mb-10">
      <h1 class="text-4xl text-dark-navy mb-4 md:text-headingL leading-tight">
        <span class="font-light">
          Welcome to the
        </span> <br>
        <span class="font-medium">
          Frontend Quiz!
        </span>
      </h1>
      <p class="text-sm text-dark-navy font-light italic md:text-bodyS">
        Pick a subject to get started.
      </p>
    </section>
    <section class="space-y-3 lg:space-y-8">
      <router-link class="block bg-white px-4 py-3 rounded flex items-center space-x-4 hover:scale-105 focus:scale-105 transition-transform transform-gpu" v-for="quiz in quizzes" :to="quiz.title">
        <span class="flex items-center justify-center w-10 h-10 rounded md:w-14 md:h-14" :style="{backgroundColor: quiz['icon-bg']}">
          <img :src="quiz.icon" alt="" class="p-[5.72px]">
        </span>
        <span class="text-dark-navy font-medium text-lg md:text-headingS">
          {{ quiz.title }}
        </span>
      </router-link>
    </section>
  </Layout>
</template>
