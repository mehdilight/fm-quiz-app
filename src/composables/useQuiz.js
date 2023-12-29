import { ref } from 'vue';
import QuizData from './data.json';

const quizzes = ref(QuizData.quizzes);

export default function useQuiz() {
    return {
        quizzes
    }
}