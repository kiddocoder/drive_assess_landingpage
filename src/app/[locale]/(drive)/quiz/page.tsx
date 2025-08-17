"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import {
    CheckCircle,
    X,
    RotateCcw,
    Trophy,
    Zap,
    Brain,
    Target,
    Star,
    Heart,
    Share2,
    BookOpen,
    Award,
    Timer,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { fetchAllCategories, fetchUserQuestions } from "@/api/categories"


interface QuizState {
    category: any
    currentQuestionIndex: number
    selectedAnswer: number | null
    showResult: boolean
    isCorrect: boolean
    score: number
    quizCompleted: boolean
    quizStarted: boolean
    questions: any[]
}

const TakeQuiz: React.FC = () => {
    const [state, setState] = useState<QuizState>({
        category: null,
        currentQuestionIndex: 0,
        selectedAnswer: null,
        showResult: false,
        isCorrect: false,
        score: 0,
        quizCompleted: false,
        quizStarted: false,
        questions: [],
    })

    const totalQuestions = 10
    const currentQuestion = state.questions[state.currentQuestionIndex]

    const [categories, setCategories] = useState<any>([]);
    const [questionsQuiz, setQuestionQuiz] = useState([])

    useEffect(() => {
        const fetchCategories = async () => await fetchAllCategories().then(data => setCategories(data))
        const fetchQuestions = async () => await fetchUserQuestions().then(data => setQuestionQuiz(data))

        fetchCategories();
        fetchQuestions();
    }, [])



    // Auto-submit when ends all questions
    useEffect(() => {
        let interval: any = null
        if (!state.showResult) {
            // 
            interval = setInterval(() => {
                if (state.currentQuestionIndex + 1 === state.questions.length) {
                    handleSubmitAnswer()
                }
            })
        } else if (!state.showResult && state.quizStarted) {
            handleSubmitAnswer()
        }
        return () => clearInterval(interval)
    }, [state.showResult, state.quizStarted])

    const startQuiz = (category?: any) => {
        let filteredQuestions = [...questionsQuiz]

        let selectedCategory: string | null = null
        if (category && category !== "ALL") {
            filteredQuestions = questionsQuiz.filter((q: any) => q.category._id === category._id)
            selectedCategory = category
        }


        // Shuffle and limit questions
        const shuffled = filteredQuestions.sort(() => Math.random() - 0.5).slice(0, totalQuestions)

        setState((prev) => ({
            ...prev,
            category: selectedCategory,
            questions: shuffled,
            quizStarted: true,
            currentQuestionIndex: 0,
            selectedAnswer: null,
            showResult: false,
            score: 0,
            quizCompleted: false,
        }))
    }

    const handleAnswerSelect = useCallback(
        (answerIndex: number) => {
            if (state.showResult) return

            setState((prev) => ({ ...prev, selectedAnswer: answerIndex }))

            // Auto-check result after selection
            setTimeout(() => {
                handleSubmitAnswer(answerIndex)
            }, 500)
        },
        [state.showResult],
    )

    const handleSubmitAnswer = useCallback(
        (answerIndex?: number) => {
            const selectedIdx = answerIndex ?? state.selectedAnswer
            const correct = selectedIdx === currentQuestion?.correctAnswer

            setState((prev) => ({
                ...prev,
                isCorrect: correct,
                showResult: true,
                score: correct ? prev.score + 1 : prev.score,
            }))
        },
        [state.selectedAnswer, currentQuestion],
    )

    const handleNextQuestion = () => {
        if (state.currentQuestionIndex + 1 >= totalQuestions) {
            setState((prev) => ({ ...prev, quizCompleted: true }))
        } else {
            setState((prev) => ({
                ...prev,
                currentQuestionIndex: prev.currentQuestionIndex + 1,
                selectedAnswer: null,
                showResult: false,
            }))
        }
    }

    const resetQuiz = () => {
        setState({
            category: null,
            currentQuestionIndex: 0,
            selectedAnswer: null,
            showResult: false,
            isCorrect: false,
            score: 0,
            quizCompleted: false,
            quizStarted: false,
            questions: [],
        })
    }

    // category Selection Screen
    if (!state.category) {
        return (
            <section className="py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Canadian Driving Test Practice</h1>
                        <p className="text-gray-600">Choose your challenge level and category</p>
                    </div>

                    {/* Category Selection */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h2 className="text-xl font-bold mb-4 text-center">Or Choose by Category</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {categories?.data?.map((category: any) => (
                                <button
                                    key={category._id}
                                    onClick={() => startQuiz(category)}
                                    className="bg-white hover:bg-gray-50 rounded-lg p-3 text-left transition-all border border-gray-200"
                                >
                                    <div className="flex items-center space-x-2">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl`}>
                                            {category.icon}
                                        </div>
                                        <span className="font-medium">{category.name}</span>
                                    </div>
                                </button>
                            )) || []}
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    // Quiz Completion Screen
    if (state.quizCompleted) {
        const percentage = Math.round((state.score / totalQuestions) * 100)
        const isExcellent = percentage >= 90
        const isGood = percentage >= 70
        const isPassing = percentage >= 60

        return (
            <section className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 text-center">
                        {/* Celebration */}
                        <div className="mb-6">
                            {isExcellent ? (
                                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-3" />
                            ) : isGood ? (
                                <Award className="w-16 h-16 text-blue-500 mx-auto mb-3" />
                            ) : isPassing ? (
                                <Star className="w-16 h-16 text-green-500 mx-auto mb-3" />
                            ) : (
                                <Target className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                            )}
                        </div>

                        {/* Results */}
                        <div>
                            <h1 className="text-3xl font-bold mb-3">
                                {isExcellent
                                    ? "Outstanding! 🎉"
                                    : isGood
                                        ? "Great Job! 👏"
                                        : isPassing
                                            ? "Well Done! 👍"
                                            : "Keep Practicing! 💪"}
                            </h1>

                            <div className="text-5xl font-bold mb-3 text-gray-800">
                                {state.score}/{totalQuestions}
                            </div>

                            <div className="text-xl mb-6 text-gray-600">
                                {percentage}% Score
                            </div>
                        </div>

                        {/* Next Steps */}
                        <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-200">
                            <Heart className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Ready to Take the Next Step?</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Create your account to save progress, track improvement, and share achievements.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                    <BookOpen className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                                    <div className="font-medium">Save Progress</div>
                                </div>
                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                    <Share2 className="w-5 h-5 text-green-500 mx-auto mb-1" />
                                    <div className="font-medium">Share Results</div>
                                </div>
                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                    <Award className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                                    <div className="font-medium">View License</div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                Create Free Account
                            </button>
                            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2">
                                <Share2 className="w-4 h-4" />
                                <span>Share Results</span>
                            </button>
                            <button
                                onClick={resetQuiz}
                                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center space-x-2"
                            >
                                <RotateCcw className="w-4 h-4" />
                                <span>Try Again</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    // Quiz Interface
    return (
        <section className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
                    {/* Header */}
                    <div className={`bg-blue-600 p-5 text-white`}>
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-3">
                            <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                                <span className="bg-white/20 px-3 py-1 rounded text-xs font-medium">
                                    Q{state.currentQuestionIndex + 1}/{totalQuestions}
                                </span>
                                {state.category && state.category !== "ALL" && (
                                    <span className="bg-white/20 px-2 py-1 rounded text-xs">{state.category.name}</span>
                                )}
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="text-sm">
                                    Score: {state.score}/{state.currentQuestionIndex + (state.showResult ? 1 : 0)}
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-white/20 rounded-full h-2">
                            <motion.div
                                className="bg-white h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${((state.currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    {/* Question Content */}
                    <div className="p-5">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">
                                {currentQuestion?.question}
                            </h2>

                            {/* Image for visual questions */}
                            {currentQuestion?.hasImage && (
                                <div className="flex justify-center mb-5">
                                    <div className="bg-gray-100 p-3 rounded-lg border border-gray-200">
                                        <img
                                            src={currentQuestion.imageUrl}
                                            alt="Traffic sign"
                                            className="w-32 h-32 object-contain mx-auto"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Answer Options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                            {currentQuestion?.options.map((option: any, index: any) => {
                                let optionClass = "p-4 rounded-lg border transition-colors text-left cursor-pointer"

                                if (state.showResult) {
                                    if (index === currentQuestion.correctAnswer) {
                                        optionClass += " border-green-400 bg-green-50 text-green-800"
                                    } else if (index === state.selectedAnswer && state.selectedAnswer !== currentQuestion.correctAnswer) {
                                        optionClass += " border-red-400 bg-red-50 text-red-800"
                                    } else {
                                        optionClass += " border-gray-300 bg-gray-50 text-gray-600"
                                    }
                                } else if (state.selectedAnswer === index) {
                                    optionClass += " border-blue-400 bg-blue-50 text-blue-800"
                                } else {
                                    optionClass += " border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerSelect(index)}
                                        className={optionClass}
                                        disabled={state.showResult}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ${state.showResult && index === currentQuestion.correctAnswer
                                                    ? "border-green-500 bg-green-500"
                                                    : state.showResult &&
                                                        index === state.selectedAnswer &&
                                                        state.selectedAnswer !== currentQuestion.correctAnswer
                                                        ? "border-red-500 bg-red-500"
                                                        : state.selectedAnswer === index
                                                            ? "border-blue-500 bg-blue-500"
                                                            : "border-gray-400"
                                                    }`}
                                            >
                                                {state.showResult && index === currentQuestion.correctAnswer && (
                                                    <CheckCircle className="w-4 h-4 text-white" />
                                                )}
                                                {state.showResult &&
                                                    index === state.selectedAnswer &&
                                                    state.selectedAnswer !== currentQuestion.correctAnswer && (
                                                        <X className="w-4 h-4 text-white" />
                                                    )}
                                                {!state.showResult && state.selectedAnswer === index && (
                                                    <div className="w-2 h-2 bg-white rounded-full" />
                                                )}
                                            </div>
                                            <span className="font-medium">{option}</span>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>

                        {/* Result Feedback */}
                        <AnimatePresence>
                            {state.showResult && (
                                <motion.div
                                    className={`p-4 rounded-lg mb-5 border ${state.isCorrect ? "bg-green-50 border-green-400" : "bg-red-50 border-red-400"
                                        }`}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex items-start space-x-3">
                                        {state.isCorrect ? (
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                        ) : (
                                            <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                                        )}
                                        <div>
                                            <div className={`font-medium mb-2 ${state.isCorrect ? "text-green-700" : "text-red-700"}`}>
                                                {state.isCorrect ? "Correct!" : "Incorrect"}
                                            </div>
                                            <p className={`text-sm ${state.isCorrect ? "text-green-600" : "text-red-600"}`}>
                                                {currentQuestion?.explanation}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex justify-between items-center">
                            <button
                                onClick={resetQuiz}
                                className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors text-sm"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                <span>Back to Menu</span>
                            </button>

                            {state.showResult && (
                                <button
                                    onClick={handleNextQuestion}
                                    className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                                >
                                    <span>{state.currentQuestionIndex + 1 >= totalQuestions ? "View Results" : "Next Question"}</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TakeQuiz