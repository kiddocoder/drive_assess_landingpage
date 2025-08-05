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

// Real road sign images
// const SIGN_IMAGES = {
//     STOP_SIGN: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Stop_sign.svg/120px-Stop_sign.svg.png",
//     YIELD_SIGN: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Yield.svg/120px-Yield.svg.png",
//     CURVE_SIGN: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Road-sign-curve.svg/120px-Road-sign-curve.svg.png",
//     SPEED_LIMIT: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/A1a-50.svg/120px-A1a-50.svg.png",
//     CONSTRUCTION: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Road_construction_icon.svg/120px-Road_construction_icon.svg.png"
// }

// Question Categories
// const CATEGORIES = {
//     ROAD_SIGNS: "Road Signs & Signals",
//     TRAFFIC_RULES: "Traffic Rules & Laws",
//     PARKING: "Parking & Positioning",
//     SAFETY: "Safety & Emergency",
//     VEHICLE_OPERATION: "Vehicle Operation",
// }

// Quiz Modes
const QUIZ_MODES = {
    EASY: { name: "Easy", time: 30, icon: Target, color: "bg-green-500", description: "30s per question" },
    NORMAL: { name: "Normal", time: 20, icon: Brain, color: "bg-blue-500", description: "20s per question" },
    FAST: { name: "Fast", time: 15, icon: Zap, color: "bg-purple-500", description: "15s per question" },
    EXPERT: { name: "Expert", time: 10, icon: Star, color: "bg-red-500", description: "10s per question" },
}

// Comprehensive Question Database with real images
// const QUIZ_QUESTIONS = [
//     // Road Signs & Signals
//     {
//         id: 1,
//         category: CATEGORIES.ROAD_SIGNS,
//         question: "What does this traffic sign indicate?",
//         hasImage: true,
//         imageUrl: SIGN_IMAGES.STOP_SIGN,
//         options: ["Yield to traffic", "Stop completely", "Slow down", "No entry"],
//         correctAnswer: 1,
//         explanation: "The red octagonal STOP sign requires drivers to come to a complete stop before proceeding.",
//         difficulty: "easy",
//     },
//     {
//         id: 2,
//         category: CATEGORIES.ROAD_SIGNS,
//         question: "This sign indicates:",
//         hasImage: true,
//         imageUrl: SIGN_IMAGES.YIELD_SIGN,
//         options: ["Stop and wait", "Yield right-of-way", "Merge ahead", "Construction zone"],
//         correctAnswer: 1,
//         explanation: "The triangular YIELD sign means you must give right-of-way to other traffic and pedestrians.",
//         difficulty: "easy",
//     },
//     {
//         id: 3,
//         category: CATEGORIES.ROAD_SIGNS,
//         question: "What does this warning sign mean?",
//         hasImage: true,
//         imageUrl: SIGN_IMAGES.CURVE_SIGN,
//         options: ["Sharp turn ahead", "Road narrows", "Hill ahead", "Intersection ahead"],
//         correctAnswer: 0,
//         explanation: "This diamond-shaped yellow sign warns of a sharp curve or turn in the road ahead.",
//         difficulty: "normal",
//     },
//     {
//         id: 4,
//         category: CATEGORIES.ROAD_SIGNS,
//         question: "This regulatory sign means:",
//         hasImage: true,
//         imageUrl: SIGN_IMAGES.SPEED_LIMIT,
//         options: ["Minimum speed 50 km/h", "Maximum speed 50 km/h", "Recommended speed 50 km/h", "Average speed 50 km/h"],
//         correctAnswer: 1,
//         explanation: "White circular signs with numbers indicate the maximum speed limit allowed on that road.",
//         difficulty: "easy",
//     },
//     {
//         id: 16,
//         category: CATEGORIES.ROAD_SIGNS,
//         question: "This construction sign indicates:",
//         hasImage: true,
//         imageUrl: SIGN_IMAGES.CONSTRUCTION,
//         options: ["Road work ahead", "Detour required", "Lane closure", "Reduced speed zone"],
//         correctAnswer: 0,
//         explanation: "Orange diamond signs indicate construction zones and warn of workers or equipment ahead.",
//         difficulty: "easy",
//     },

//     // Traffic Rules & Laws
//     {
//         id: 5,
//         category: CATEGORIES.TRAFFIC_RULES,
//         question: "What is the basic speed limit outside city limits on a primary highway?",
//         options: ["100 km/h", "90 km/h", "110 km/h", "80 km/h"],
//         correctAnswer: 0,
//         explanation: "The basic speed limit on primary highways outside urban areas is 100 km/h unless otherwise posted.",
//         difficulty: "normal",
//     },
//     {
//         id: 6,
//         category: CATEGORIES.TRAFFIC_RULES,
//         question: "A driver's license is suspended when they accumulate:",
//         options: ["15 demerit points", "8 demerit points", "5 demerit points", "12 demerit points"],
//         correctAnswer: 0,
//         explanation: "A fully licensed driver faces suspension when they accumulate 15 demerit points.",
//         difficulty: "normal",
//     },
//     {
//         id: 7,
//         category: CATEGORIES.TRAFFIC_RULES,
//         question: "When approaching an intersection with a green right-turn arrow and red light:",
//         options: [
//             "Must stop and wait for green light",
//             "May go straight through",
//             "May proceed in arrow direction when safe",
//             "May turn left without stopping",
//         ],
//         correctAnswer: 2,
//         explanation: "A green arrow means you may proceed in the direction of the arrow when it's safe, even if the main light is red.",
//         difficulty: "hard",
//     },
//     {
//         id: 8,
//         category: CATEGORIES.TRAFFIC_RULES,
//         question: "A flashing yellow traffic light means:",
//         options: [
//             "Stop until light stops flashing",
//             "Proceed with caution",
//             "Light will turn red",
//             "Light will turn green",
//         ],
//         correctAnswer: 1,
//         explanation: "A flashing yellow light means proceed with caution after yielding to pedestrians and other traffic.",
//         difficulty: "normal",
//     },
//     {
//         id: 15,
//         category: CATEGORIES.TRAFFIC_RULES,
//         question: "At an uncontrolled intersection, when two vehicles arrive simultaneously:",
//         options: [
//             "Vehicle on left has right-of-way",
//             "Vehicle on right has right-of-way",
//             "Larger vehicle has right-of-way",
//             "First to flash lights has right-of-way",
//         ],
//         correctAnswer: 1,
//         explanation: "At uncontrolled intersections, the vehicle on the right has the right-of-way when arriving simultaneously.",
//         difficulty: "hard",
//     },

//     // Vehicle Operation
//     {
//         id: 9,
//         category: CATEGORIES.VEHICLE_OPERATION,
//         question: "When backing a passenger vehicle to the left, a driver should:",
//         options: [
//             "Look in rear-view mirror only",
//             "Look over right shoulder",
//             "Look over left shoulder with occasional front glances",
//             "Use mirrors without shoulder checking",
//         ],
//         correctAnswer: 2,
//         explanation: "When backing left, look over your left shoulder with occasional glances to the front for awareness.",
//         difficulty: "normal",
//     },
//     {
//         id: 10,
//         category: CATEGORIES.VEHICLE_OPERATION,
//         question: "The 2-second rule for following distance:",
//         options: [
//             "Is only accurate on highways",
//             "Is not accurate above 100 km/h",
//             "Is accurate at any speed",
//             "Is not accurate below 30 km/h",
//         ],
//         correctAnswer: 2,
//         explanation: "The 2-second rule provides a safe following distance at any speed under normal conditions.",
//         difficulty: "normal",
//     },

//     // Safety & Emergency
//     {
//         id: 11,
//         category: CATEGORIES.SAFETY,
//         question: "When approached by an emergency vehicle with siren, you must:",
//         options: [
//             "Continue at reduced speed",
//             "Turn on hazard lights",
//             "Stop only if emergency vehicle has difficulty passing",
//             "Drive to right curb/edge and stop",
//         ],
//         correctAnswer: 3,
//         explanation: "You must pull over to the right side of the road and stop to allow emergency vehicles to pass safely.",
//         difficulty: "easy",
//     },
//     {
//         id: 12,
//         category: CATEGORIES.SAFETY,
//         question: "Seat belts must be worn:",
//         options: ["Only with passengers", "Properly at all times", "Only at highway speeds", "Only in the city"],
//         correctAnswer: 1,
//         explanation: "Law requires seat belts to be worn properly at all times while the vehicle is in motion.",
//         difficulty: "easy",
//     },

//     // Parking & Positioning
//     {
//         id: 13,
//         category: CATEGORIES.PARKING,
//         question: "When parallel parking, wheels closest to curb must be within:",
//         options: ["80 centimetres", "30 centimetres", "10 centimetres", "50 centimetres"],
//         correctAnswer: 3,
//         explanation: "When parallel parking, your wheels must be within 50 centimetres (about 20 inches) of the curb.",
//         difficulty: "hard",
//     },
//     {
//         id: 14,
//         category: CATEGORIES.PARKING,
//         question: "Minimum distance from a fire hydrant a vehicle must be parked:",
//         options: ["3 metres", "4 metres", "2 metres", "5 metres"],
//         correctAnswer: 0,
//         explanation: "Vehicles must be parked at least 3 metres away from fire hydrants to ensure emergency access.",
//         difficulty: "normal",
//     },
// ]

interface QuizState {
    mode: keyof typeof QUIZ_MODES | null
    category: any
    currentQuestionIndex: number
    selectedAnswer: number | null
    showResult: boolean
    isCorrect: boolean
    score: number
    quizCompleted: boolean
    quizStarted: boolean
    timeLeft: number
    timerActive: boolean
    questions: any[]
}

const TakeQuiz: React.FC = () => {
    const [state, setState] = useState<QuizState>({
        mode: null,
        category: null,
        currentQuestionIndex: 0,
        selectedAnswer: null,
        showResult: false,
        isCorrect: false,
        score: 0,
        quizCompleted: false,
        quizStarted: false,
        timeLeft: 30,
        timerActive: false,
        questions: [],
    })

    const totalQuestions = 10
    const currentQuestion = state.questions[state.currentQuestionIndex]
    const modeConfig = state.mode ? QUIZ_MODES[state.mode] : null

    const [categories, setCategories] = useState<any>([]);
    const [questionsQuiz, setQuestionQuiz] = useState([])

    useEffect(() => {
        const fetchCategories = async () => await fetchAllCategories().then(data => setCategories(data))
        const fetchQuestions = async () => await fetchUserQuestions().then(data => setQuestionQuiz(data))

        fetchCategories();
        fetchQuestions();
    }, [])



    // Auto-submit when timer ends
    useEffect(() => {
        let interval: any = null
        if (state.timerActive && state.timeLeft > 0 && !state.showResult) {
            interval = setInterval(() => {
                setState((prev) => ({ ...prev, timeLeft: prev.timeLeft - 1 }))
            }, 1000)
        } else if (state.timeLeft === 0 && !state.showResult && state.quizStarted) {
            handleSubmitAnswer()
        }
        return () => clearInterval(interval)
    }, [state.timerActive, state.timeLeft, state.showResult, state.quizStarted])

    const startQuiz = (mode: keyof typeof QUIZ_MODES, category?: any) => {
        let filteredQuestions = [...questionsQuiz]

        let selectedCategory: string | null = null
        if (category && category !== "ALL") {
            filteredQuestions = questionsQuiz.filter((q: any) => q.category._id === category._id)
            selectedCategory = category
        }

        if (mode) {
            filteredQuestions = questionsQuiz.filter((q: any) => q.difficulty === mode.toLowerCase())
            selectedCategory = category
        }

        // Shuffle and limit questions
        const shuffled = filteredQuestions.sort(() => Math.random() - 0.5).slice(0, totalQuestions)

        setState((prev) => ({
            ...prev,
            mode,
            category: selectedCategory,
            questions: shuffled,
            quizStarted: true,
            timerActive: true,
            timeLeft: QUIZ_MODES[mode].time,
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
                timerActive: false,
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
                timeLeft: modeConfig?.time || 30,
                timerActive: true,
            }))
        }
    }

    const resetQuiz = () => {
        setState({
            mode: null,
            category: null,
            currentQuestionIndex: 0,
            selectedAnswer: null,
            showResult: false,
            isCorrect: false,
            score: 0,
            quizCompleted: false,
            quizStarted: false,
            timeLeft: 30,
            timerActive: false,
            questions: [],
        })
    }

    // Mode Selection Screen
    if (!state.mode) {
        return (
            <section className="py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Canadian Driving Test Practice</h1>
                        <p className="text-gray-600">Choose your challenge level and category</p>
                    </div>

                    {/* Mode Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {Object.entries(QUIZ_MODES).map(([key, mode]) => {
                            const Icon = mode.icon
                            return (
                                <div
                                    key={key}
                                    className={`${mode.color} rounded-lg p-4 cursor-pointer text-white transition-all hover:opacity-90`}
                                    onClick={() => startQuiz(key as keyof typeof QUIZ_MODES, "ALL")}
                                >
                                    <Icon className="w-8 h-8 mb-2 mx-auto" />
                                    <h3 className="text-lg font-bold mb-1 text-center">{mode.name}</h3>
                                    <p className="text-sm text-center opacity-90">{mode.description}</p>
                                </div>
                            )
                        })}
                    </div>

                    {/* Category Selection */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h2 className="text-xl font-bold mb-4 text-center">Or Choose by Category</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {categories?.data?.map((category: any) => (
                                <button
                                    key={category._id}
                                    onClick={() => startQuiz("NORMAL", category)}
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
                                {percentage}% Score • {modeConfig?.name}
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
                    <div className={`${modeConfig?.color} p-5 text-white`}>
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-3">
                            <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                                <span className="bg-white/20 px-3 py-1 rounded text-xs font-medium">
                                    Q{state.currentQuestionIndex + 1}/{totalQuestions}
                                </span>
                                <span className="text-sm">{modeConfig?.name}</span>
                                {state.category && state.category !== "ALL" && (
                                    <span className="bg-white/20 px-2 py-1 rounded text-xs">{state.category.name}</span>
                                )}
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded">
                                    <Timer className="w-3 h-3" />
                                    <span
                                        className={`font-mono font-medium ${state.timeLeft <= 5 ? "text-red-200 animate-pulse" : ""}`}
                                    >
                                        {state.timeLeft}s
                                    </span>
                                </div>
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