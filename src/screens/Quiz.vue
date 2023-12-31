<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
import PageWrapper from '../components/PageWrapper.vue';
import useQuiz from '../composables/useQuiz';
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';

const { updateSelectedQuiz, selectedQuiz, clearSelectedQuiz } = useQuiz();
const route = useRoute();
const router = useRouter();

const currentQuestionIndex = ref(0);
const currentQuestion = computed(() => {
    return selectedQuiz.value.questions[currentQuestionIndex.value];
})

const selectedOption = ref(null);

onBeforeRouteLeave(() => {
    clearSelectedQuiz()
})

const characters = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D'
};

const score = ref(0);

const correctAnswer = computed(() => {
    return currentQuestion.value.answer;
});

const isAnswerSubmitted = ref(false);

const selectOption = (option) => {
    selectedOption.value = option;
}

const submitAnswer = () => {
    if (correctAnswer.value === selectedOption.value) {
        score.value = score.value + 1;
    }

    isAnswerSubmitted.value = true;
}

const nextQuestion = () => {
    currentQuestionIndex.value = currentQuestionIndex.value + 1;
    selectedOption.value = null;
    isAnswerSubmitted.value = false;
}


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
            <p class="text-sm text-dark-navy font-light italic md:text-bodyS mb-3 md:mb-7">
                Question {{ currentQuestionIndex + 1 }} of {{ selectedQuiz.questions.length }}
            </p>
            <p class="text-xl md:text-headingM text-dark-navy leading-tight">
                {{ currentQuestion.question }}
            </p>
        </section>
        <section class="space-y-3 lg:space-y-8">
            <button 
                @click="selectOption(option)" v-for="(option, index) in currentQuestion.options"
                class="group outline-none w-full block bg-white px-4 py-3 rounded flex items-center space-x-4 hover:scale-105 focus:scale-105 transition-transform transform-gpu"
                :class="{
                    'ring ring-purple' : option === selectedOption,
                    '!ring-green': isAnswerSubmitted && selectedOption === option && selectedOption === correctAnswer,
                    '!ring-red': isAnswerSubmitted && selectedOption === option && selectedOption !== correctAnswer
                }"
            >
                <span 
                    class="group-focus:bg-purple/30 group-hover:bg-purple/30 group-focus:text-purple group-hover:text-purple font-medium flex bg-light-grey items-center text-grey-navy text-headingS justify-center flex-shrink-0 w-10 h-10 rounded md:w-14 md:h-14"
                    :class="{
                        '!bg-purple !text-white': option === selectedOption,
                        '!bg-green': isAnswerSubmitted && selectedOption === option && selectedOption === correctAnswer,
                        '!bg-red': isAnswerSubmitted && selectedOption === option && selectedOption !== correctAnswer
                    }"
                >
                    {{ characters[index] }}
                </span>
                <span class="text-dark-navy font-medium text-lg md:text-headingS text-left">
                    {{ option }}
                </span>
            </button>
            <button v-if="!isAnswerSubmitted" @click="submitAnswer" class="bg-purple w-full block font-medium px-4 py-3 rounded-xl text-white text-headingS hover:bg-purple/50">
                Submit Answer
            </button>
            <button v-else @click="nextQuestion" class="bg-purple w-full block font-medium px-4 py-3 rounded-xl text-white text-headingS hover:bg-purple/50">
                Next Question
            </button>
        </section>
    </PageWrapper>
</template>
