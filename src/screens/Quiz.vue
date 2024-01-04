<script setup>
import { computed, onBeforeMount, onUnmounted, ref, watch } from 'vue';
import PageWrapper from '../components/PageWrapper.vue';
import useQuiz from '../composables/useQuiz';
import { useRoute, useRouter } from 'vue-router';

const { updateSelectedQuiz, selectedQuiz, clearSelectedQuiz } = useQuiz();
const route = useRoute();
const router = useRouter();

const currentQuestionIndex = ref(0);
const currentQuestion = computed(() => {
  return selectedQuiz.value?.questions[currentQuestionIndex.value];
})

const selectedOption = ref(null);

const characters = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D'
};

const score = ref(0);
const shouldDisplayScore = ref(false);


const correctAnswer = computed(() => {
  return currentQuestion.value.answer;
});

const isAnswerSubmitted = ref(false);

const selectOption = (option) => {
  if (isAnswerSubmitted.value) return;
  selectedOption.value = option;
}

const submitAnswer = () => {
  if (correctAnswer.value === selectedOption.value) {
    score.value = score.value + 1;
  }

  isAnswerSubmitted.value = true;
}

const displayScore = () => {
  shouldDisplayScore.value = true;
}

const nextQuestion = () => {
  if (currentQuestionIndex.value === selectedQuiz.value.questions.length - 1) {
    displayScore();
  } else {
    currentQuestionIndex.value = currentQuestionIndex.value + 1;
  }
  selectedOption.value = null;
  isAnswerSubmitted.value = false;
}

const playAgain = () => {
  currentQuestionIndex.value = 0;
  score.value = 0;
  shouldDisplayScore.value = false;
}
onUnmounted(() => {
  clearSelectedQuiz();
})
watch(() => route.params.quiz, () => {
  if (updateSelectedQuiz(route.params.quiz)) {
    return;
  }

  router.replace({ path: '/' });
})

onBeforeMount(() => {
  // updateSelectedQuiz returns true when the operation is done successfully otherwise we will redirect to home page
  if (updateSelectedQuiz(route.params.quiz)) {
    return;
  }

  router.replace({ path: '/' });
});
</script>
<template>
  <PageWrapper>
    <section class="mb-10">
      <template v-if="!shouldDisplayScore">
        <p class="text-sm text-dark-navy dark:text-white font-light italic md:text-bodyS mb-3 md:mb-7">
          Question {{ currentQuestionIndex + 1 }} of {{ selectedQuiz.questions?.length }}
        </p>
        <p class="text-xl md:text-headingM text-dark-navy dark:text-white leading-tight">
          {{ currentQuestion.question }}
        </p>
      </template>
      <template v-else>
        <h1 class="text-4xl text-dark-navy dark:text-white mb-4 md:text-headingL leading-tight">
          <span class="font-light">
            Quiz completed
          </span> <br>
          <span class="font-medium">
            You scored...
          </span>
        </h1>
      </template>
    </section>
    <section v-if="!shouldDisplayScore" class="space-y-3 lg:space-y-8">
      <button @click="selectOption(option)" v-for="(option, index) in currentQuestion.options" class="answer-selector"
        :class="{
          'selected': option === selectedOption,
          'correct': isAnswerSubmitted && selectedOption === option && selectedOption === correctAnswer,
          'wrong': isAnswerSubmitted && selectedOption === option && selectedOption !== correctAnswer
        }">
        <span class="answer-selector-index">
          {{ characters[index] }}
        </span>
        <span class="answer-selector-body">
          {{ option }}
        </span>
      </button>
      <button v-if="!isAnswerSubmitted" @click="submitAnswer"
        class="bg-purple w-full block font-medium px-4 py-3 rounded-xl text-white text-headingS hover:bg-purple/50">
        Submit Answer
      </button>
      <button v-else @click="nextQuestion"
        class="bg-purple w-full block font-medium px-4 py-3 rounded-xl text-white text-headingS hover:bg-purple/50">
        Next Question
      </button>
    </section>
    <section v-else>
      <div class="p-8 rounded-xl bg-white dark:bg-navy text-center flex flex-col justify-center items-center">
        <div class="flex items-center space-x-4 mb-4">
          <span class="flex items-center justify-center w-10 h-10 rounded md:w-14 md:h-14"
            :style="{ backgroundColor: selectedQuiz['icon-bg'] }">
            <img :src="selectedQuiz.icon" alt="" class="p-[5.72px]">
          </span>
          <span class="text-dark-navy dark:text-white font-medium text-lg md:text-headingS">
            {{ selectedQuiz.title }}
          </span>
        </div>
        <div class="text-dark-navy dark:text-white">
          <span class="text-[88px] font-medium">{{ score }}</span> <br>
          <span>
            out of {{ selectedQuiz.questions.length }}
          </span>
        </div>
      </div>
      <div class="mt-4">
        <button @click="playAgain" class="bg-purple w-full block font-medium px-4 py-3 rounded-xl text-white text-headingS hover:bg-purple/50">
          Play Again
        </button>
      </div>
    </section>
  </PageWrapper>
</template>
