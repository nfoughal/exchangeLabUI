"use client"

import { useTranslations } from "next-intl"

export default function ReasonSelection({ selectedLanguage, selectedReason, onReasonSelect }) {
  const t = useTranslations("ReasonSelection")

  const reasons = [
    { key: "school", text: t("reasons.school") },
    { key: "brainExercise", text: t("reasons.brainExercise") },
    { key: "enjoyLearning", text: t("reasons.enjoyLearning") },
    { key: "connectFamily", text: t("reasons.connectFamily") },
    { key: "upcomingTrip", text: t("reasons.upcomingTrip") },
  ]

  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-12">
        {t("title", { language: selectedLanguage })}
      </h1>

      <div className="space-y-4 max-w-2xl mx-auto">
        {reasons.map((reason) => (
          <button
            key={reason.key}
            onClick={() => onReasonSelect(reason.text)}
            className="w-full p-6 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors text-left"
          >
            <span className="text-lg text-gray-700">{reason.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
