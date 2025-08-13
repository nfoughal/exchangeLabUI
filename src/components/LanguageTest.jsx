"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import LanguageSwitcher from "./components/language-switcher"

const questionSets = {
  French: [
    {
      id: 1,
      question: "Je _______ au cinéma hier soir.",
      options: [
        { label: "A", value: "vais" },
        { label: "B", value: "suis allé" },
        { label: "C", value: "irai" },
      ],
      correctAnswer: "suis allé",
    },
    {
      id: 2,
      question: "Elle _______ le français depuis cinq ans.",
      options: [
        { label: "A", value: "étudie" },
        { label: "B", value: "a étudié" },
        { label: "C", value: "étudiait" },
      ],
      correctAnswer: "étudie",
    },
    {
      id: 3,
      question: "Si j'_______ riche, je voyagerais dans le monde entier.",
      options: [
        { label: "A", value: "suis" },
        { label: "B", value: "étais" },
        { label: "C", value: "serai" },
      ],
      correctAnswer: "étais",
    },
    {
      id: 4,
      question: "Le livre _______ par des millions de personnes.",
      options: [
        { label: "A", value: "a été lu" },
        { label: "B", value: "lit" },
        { label: "C", value: "lisant" },
      ],
      correctAnswer: "a été lu",
    },
    {
      id: 5,
      question: "J'aimerais _______ parler français couramment.",
      options: [
        { label: "A", value: "peux" },
        { label: "B", value: "pouvoir" },
        { label: "C", value: "pourrais" },
      ],
      correctAnswer: "pouvoir",
    },
    {
      id: 6,
      question: "L'année prochaine, j'_______ mon diplôme.",
      options: [
        { label: "A", value: "obtiendrai" },
        { label: "B", value: "aurai obtenu" },
        { label: "C", value: "obtiens" },
      ],
      correctAnswer: "aurai obtenu",
    },
    {
      id: 7,
      question: "La réunion _______ reportée à la semaine prochaine.",
      options: [
        { label: "A", value: "a été" },
        { label: "B", value: "ont été" },
        { label: "C", value: "était été" },
      ],
      correctAnswer: "a été",
    },
    {
      id: 8,
      question: "_______ vous m'aider avec ce problème?",
      options: [
        { label: "A", value: "Pourriez" },
        { label: "B", value: "Devriez" },
        { label: "C", value: "Devez" },
      ],
      correctAnswer: "Pourriez",
    },
    {
      id: 9,
      question: "J'ai hâte de _______ revoir.",
      options: [
        { label: "A", value: "te voir" },
        { label: "B", value: "te revoir" },
        { label: "C", value: "voir" },
      ],
      correctAnswer: "te revoir",
    },
    {
      id: 10,
      question: "Le projet _______ terminé d'ici la fin du mois.",
      options: [
        { label: "A", value: "sera" },
        { label: "B", value: "aura été" },
        { label: "C", value: "serait" },
      ],
      correctAnswer: "sera",
    },
    {
      id: 11,
      question: "_______ j'avais étudié plus dur, j'aurais réussi l'examen.",
      options: [
        { label: "A", value: "Si" },
        { label: "B", value: "À moins que" },
        { label: "C", value: "Bien que" },
      ],
      correctAnswer: "Si",
    },
    {
      id: 12,
      question: "Nous _______ une fête chez moi. Voulez-vous venir?",
      options: [
        { label: "A", value: "organisons" },
        { label: "B", value: "organiser" },
        { label: "C", value: "organisé" },
      ],
      correctAnswer: "organisons",
    },
  ],
  English: [
    {
      id: 1,
      question: "We are _______ a party at my apartment. Would you like to come?",
      options: [
        { label: "A", value: "having" },
        { label: "B", value: "to have" },
        { label: "C", value: "have" },
      ],
      correctAnswer: "having",
    },
    {
      id: 2,
      question: "I _______ to the cinema last night.",
      options: [
        { label: "A", value: "go" },
        { label: "B", value: "went" },
        { label: "C", value: "going" },
      ],
      correctAnswer: "went",
    },
    {
      id: 3,
      question: "She _______ English for five years.",
      options: [
        { label: "A", value: "studies" },
        { label: "B", value: "has studied" },
        { label: "C", value: "study" },
      ],
      correctAnswer: "has studied",
    },
    {
      id: 4,
      question: "If I _______ rich, I would travel the world.",
      options: [
        { label: "A", value: "am" },
        { label: "B", value: "was" },
        { label: "C", value: "were" },
      ],
      correctAnswer: "were",
    },
    {
      id: 5,
      question: "The book _______ by millions of people.",
      options: [
        { label: "A", value: "was read" },
        { label: "B", value: "read" },
        { label: "C", value: "reading" },
      ],
      correctAnswer: "was read",
    },
    {
      id: 6,
      question: "I wish I _______ speak French fluently.",
      options: [
        { label: "A", value: "can" },
        { label: "B", value: "could" },
        { label: "C", value: "will" },
      ],
      correctAnswer: "could",
    },
    {
      id: 7,
      question: "By next year, I _______ my degree.",
      options: [
        { label: "A", value: "will finish" },
        { label: "B", value: "will have finished" },
        { label: "C", value: "finish" },
      ],
      correctAnswer: "will have finished",
    },
    {
      id: 8,
      question: "The meeting _______ postponed until next week.",
      options: [
        { label: "A", value: "has been" },
        { label: "B", value: "have been" },
        { label: "C", value: "was been" },
      ],
      correctAnswer: "has been",
    },
    {
      id: 9,
      question: "_______ you help me with this problem?",
      options: [
        { label: "A", value: "Could" },
        { label: "B", value: "Should" },
        { label: "C", value: "Must" },
      ],
      correctAnswer: "Could",
    },
    {
      id: 10,
      question: "I'm looking forward _______ you again.",
      options: [
        { label: "A", value: "to see" },
        { label: "B", value: "to seeing" },
        { label: "C", value: "see" },
      ],
      correctAnswer: "to seeing",
    },
    {
      id: 11,
      question: "The project _______ completed by the end of the month.",
      options: [
        { label: "A", value: "will be" },
        { label: "B", value: "will have been" },
        { label: "C", value: "would be" },
      ],
      correctAnswer: "will be",
    },
    {
      id: 12,
      question: "_______ I had studied harder, I would have passed the exam.",
      options: [
        { label: "A", value: "If" },
        { label: "B", value: "Unless" },
        { label: "C", value: "Although" },
      ],
      correctAnswer: "If",
    },
  ],
  Spanish: [
    {
      id: 1,
      question: "Nosotros _______ una fiesta en mi apartamento. ¿Te gustaría venir?",
      options: [
        { label: "A", value: "tenemos" },
        { label: "B", value: "tener" },
        { label: "C", value: "teniendo" },
      ],
      correctAnswer: "tenemos",
    },
    {
      id: 2,
      question: "Yo _______ al cine anoche.",
      options: [
        { label: "A", value: "voy" },
        { label: "B", value: "fui" },
        { label: "C", value: "yendo" },
      ],
      correctAnswer: "fui",
    },
    {
      id: 3,
      question: "Ella _______ español durante cinco años.",
      options: [
        { label: "A", value: "estudia" },
        { label: "B", value: "ha estudiado" },
        { label: "C", value: "estudiar" },
      ],
      correctAnswer: "ha estudiado",
    },
    {
      id: 4,
      question: "Si yo _______ rico, viajaría por el mundo.",
      options: [
        { label: "A", value: "soy" },
        { label: "B", value: "era" },
        { label: "C", value: "fuera" },
      ],
      correctAnswer: "fuera",
    },
    {
      id: 5,
      question: "El libro _______ por millones de personas.",
      options: [
        { label: "A", value: "fue leído" },
        { label: "B", value: "lee" },
        { label: "C", value: "leyendo" },
      ],
      correctAnswer: "fue leído",
    },
    {
      id: 6,
      question: "Ojalá _______ hablar francés con fluidez.",
      options: [
        { label: "A", value: "puedo" },
        { label: "B", value: "pudiera" },
        { label: "C", value: "podré" },
      ],
      correctAnswer: "pudiera",
    },
    {
      id: 7,
      question: "Para el próximo año, yo _______ mi título.",
      options: [
        { label: "A", value: "terminaré" },
        { label: "B", value: "habré terminado" },
        { label: "C", value: "termino" },
      ],
      correctAnswer: "habré terminado",
    },
    {
      id: 8,
      question: "La reunión _______ pospuesta hasta la próxima semana.",
      options: [
        { label: "A", value: "ha sido" },
        { label: "B", value: "han sido" },
        { label: "C", value: "fue sido" },
      ],
      correctAnswer: "ha sido",
    },
    {
      id: 9,
      question: "¿_______ ayudarme con este problema?",
      options: [
        { label: "A", value: "Podrías" },
        { label: "B", value: "Deberías" },
        { label: "C", value: "Debes" },
      ],
      correctAnswer: "Podrías",
    },
    {
      id: 10,
      question: "Tengo ganas de _______ otra vez.",
      options: [
        { label: "A", value: "verte" },
        { label: "B", value: "te veo" },
        { label: "C", value: "ver" },
      ],
      correctAnswer: "verte",
    },
    {
      id: 11,
      question: "El proyecto _______ completado para fin de mes.",
      options: [
        { label: "A", value: "será" },
        { label: "B", value: "habrá sido" },
        { label: "C", value: "sería" },
      ],
      correctAnswer: "será",
    },
    {
      id: 12,
      question: "_______ hubiera estudiado más, habría aprobado el examen.",
      options: [
        { label: "A", value: "Si" },
        { label: "B", value: "A menos que" },
        { label: "C", value: "Aunque" },
      ],
      correctAnswer: "Si",
    },
  ],
}

export default function LanguageTest({ formData }) {
  console.log("LanguageTest component rendered with formData:", formData.language)
  const t = useTranslations()
  const lang = formData.language;
  const [testState, setTestState] = useState("welcome") 
  const [testLanguage, setTestLanguage] = useState(lang)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [answers, setAnswers] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [score, setScore] = useState(0)

  const questions = questionSets[testLanguage] || [];
  const progress = questions.length > 0
  ? ((currentQuestion + (selectedAnswer ? 1 : 0)) / questions.length) * 100
  : 0;
  
  const handleStartTest = () => {
    setTestState("testing")
  }

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer)
  }

  const handleNextQuestion = async () => {
    if (!selectedAnswer) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)
    setSelectedAnswer("")

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Last question - process results and go directly to thank you
      setIsSubmitting(true)
      
      // Calculate score
      const calculatedScore = newAnswers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].correctAnswer ? 1 : 0)
      }, 0)

      // Combine formData with test results
      const testResults = {
        ...formData,
        email: formData?.email || formData?.parentInfo?.email || formData?.studentInfo?.email,
        testLanguage,
        answers: newAnswers,
        score: calculatedScore,
        testType: 'placement',
        completedAt: new Date().toISOString()
      }

      console.log("Test results with formData:", testResults)
      
      // Simulate API call - replace with your actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Here you would send testResults to your backend
      // await fetch('/api/test-results', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(testResults)
      // })

      setScore(calculatedScore)
      setIsSubmitting(false)
      setTestState("thank-you")
    }
  }

  const handleKeyPress = (e) => {
    if (testState === "welcome" && e.key === "Enter") {
      handleStartTest()
    } else if (testState === "testing" && e.key === "Enter" && selectedAnswer) {
      handleNextQuestion()
    }
  }

  const resetTest = () => {
    setTestState("welcome")
    setCurrentQuestion(0)
    setSelectedAnswer("")
    setAnswers([])
    setScore(0)
  }

  const userEmail = formData?.email || formData?.parentInfo?.email || formData?.studentInfo?.email
  const phoneNumber = formData?.phoneNumber || formData?.parentInfo?.whatsappNumber || formData?.studentInfo?.phoneNumber 

  return (
    <div
      id="test-container"
      className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4 outline-none relative"
      onKeyDown={handleKeyPress}
      tabIndex={0}
      autoFocus
    >
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        {testState === "testing" && (
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Welcome Page */}
        {testState === "welcome" && (
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl font-bold text-blue-700 mb-6">{t("welcome.title")}</h1>

            {/* Show user info if available */}
            {formData && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800">{t("welcome.part1")} {formData.childInfo?.firstName || formData.studentInfo?.firstName || 'Student'} {t("welcome.part2")} {formData.language} {t("welcome.part3")}</p>
              </div>
            )}

            <div className="space-y-4 text-lg text-gray-700 max-w-xl mx-auto">
              <p>{t("welcome.description1")}</p>
              <p>{t("welcome.description2")}</p>
            </div>

            <div className="pt-6">
              <Button
                onClick={handleStartTest}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                {t("welcome.startButton")}
              </Button>
              <p className="text-sm text-blue-500 mt-2 font-medium animate-pulse">{t("welcome.pressEnter")}</p>
            </div>
          </div>
        )}

        {/* Question Page */}
        {testState === "testing" && (
          <div className="space-y-8 animate-slide-in">
            <div className="text-center">
              <div className="text-blue-600 text-lg font-medium mb-4">
                {currentQuestion + 1} → {currentQuestion + 1}/12
              </div>

              <h2 className="text-2xl font-medium text-gray-800 mb-8 leading-relaxed">
                {questions[currentQuestion].question.split("_______").map((part, index) => (
                  <span key={index}>
                    {part}
                    {index < questions[currentQuestion].question.split("_______").length - 1 && (
                      <span className="border-b-2 border-gray-400 px-4 py-1 mx-2 inline-block min-w-[100px]"></span>
                    )}
                  </span>
                ))}
                <span className="text-red-500">*</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleAnswerSelect(option.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-md ${
                    selectedAnswer === option.value
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <span className="font-semibold text-blue-600 mr-2">{option.label}</span>
                  <span className="text-gray-800">{option.value}</span>
                  {selectedAnswer === option.value && <span className="float-right text-blue-600">✓</span>}
                </button>
              ))}
            </div>

            <div className="text-center pt-4">
              <Button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer || isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "..." : t("question.okButton")}
              </Button>
            </div>
          </div>
        )}

        {/* Thank You Page */}
        {testState === "thank-you" && (
          <div className="text-center space-y-8 animate-fade-in mt-16">
            <div className="space-y-6">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-4xl font-bold text-green-600 mb-4">{t("thankYou.title")}</h1>
              <div className="text-xl text-gray-700 space-y-4 max-w-lg mx-auto">
                <p>{t("thankYou.completed")}</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">{t("thankYou.results")}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {score}/{questions.length}
                  </div>
                  <p className="text-blue-700">
                    {t("thankYou.score")}: {Math.round((score / questions.length) * 100)}%
                  </p>
                </div>
                {phoneNumber && (
                  <p>
                    {t("thankYou.sentTo")} <strong>{phoneNumber}</strong> {t("thankYou.checkInbox")}
                  </p>
                )}
              </div>

              <div className="pt-6 space-y-4">
                <Button
                  onClick={resetTest}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  {t("thankYou.takeAgain")}
                </Button>
                <p className="text-sm text-gray-500">{t("thankYou.improve")}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}