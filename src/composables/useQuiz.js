import { ref } from 'vue';
import QuizData from './data.json';

const quizzes = ref(QuizData.quizzes);

const selectedQuiz = ref({});

export default function useQuiz() {

    const findByQuizTitle = (quizTitle) => {
        return quizzes.value.find((_quiz) => _quiz.title === quizTitle) ?? null;
    }

    const updateSelectedQuiz = (title) => {
        let quiz = findByQuizTitle(title);
        if (!quiz) return false;

        selectedQuiz.value = quiz;

        return true;
    }

    const clearSelectedQuiz = () => {
        selectedQuiz.value = {};
    }
    return {
        quizzes,
        selectedQuiz,
        updateSelectedQuiz,
        findByQuizTitle,
        clearSelectedQuiz
    }
}
