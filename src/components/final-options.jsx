"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { useEffect } from "react"

export default function FinalOptions({ formData, onOptionSelect }) {
  const t = useTranslations("FinalOptions")
  console.log("FinalOptions component rendered with formData:", formData)

  
  const handleOptionSelect = async (option) => {
    console.log("Selected option:", option)
    if (option === "take_test" ) {return}
    // Here you would send all the form data to your backend
    const registrationData = {
      ...formData,
      finalChoice: option,
      timestamp: new Date().toISOString(),
    }

    try {
      // Replace with your actual backend endpoint
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      })

      if (response.ok) {
        onOptionSelect(option)
      } else {
        console.error("Registration failed")
      }
    } catch (error) {
      console.error("Error submitting registration:", error)
    }
  }

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  useEffect(() => {

      setTimeout(scrollToTop, 0);
   
  }, []);

  return (
    <div className="max-w-2xl mx-auto text-center py-40">
      <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-8">{t("title")}</h1>

      <p className="text-xl text-[#777777] mb-12">
        {t("subtitle", { language: formData.language === "childEnglish" ? "English" : formData.language })}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
        <Link
          onClick={() => handleOptionSelect("take_test")}
          href= {{
            pathname: "/placement-test",
            query: { formData: JSON.stringify(formData) }
          }}

          className="p-8 bg-white rounded-2xl border border-gray-200 hover:border-gray-400 transition-colors"
        >
          <div className="text-2xl font-semibold text-gray-900 mb-2">{t("takeTest")}</div>
          <div className="text-[#777777]">{t("takeTestDesc")}</div>
        </Link>

        <button
          onClick={() => handleOptionSelect("start_beginning")}
          className="p-8 bg-white rounded-2xl border border-gray-200 hover:border-gray-400 transition-colors"
        >
          <div className="text-2xl font-semibold text-gray-900 mb-2">{t("startBeginning")}</div>
          <div className="text-[#777777]">{t("startBeginningDesc")}</div>
        </button>
      </div>
    </div>
  )
}
