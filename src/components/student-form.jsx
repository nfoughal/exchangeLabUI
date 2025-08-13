"use client"

import { useTranslations } from "next-intl"
import { useState } from "react"

export default function StudentForm({ studentInfo, onStudentInfoChange, onSubmit }) {
  const t = useTranslations("StudentForm")
  const tCountries = useTranslations("Countries")
  const tErrors = useTranslations("Errors")
  
  // Add error state for form fields
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: ""
  })
  
  // Track if form has been submitted
  const [formSubmitted, setFormSubmitted] = useState(false)
  
  // Track touched fields
  const [touchedFields, setTouchedFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    country: false
  })

  const countries = [
    { key: "unitedStates", value: "United States" },
    { key: "unitedKingdom", value: "United Kingdom" },
    { key: "canada", value: "Canada" },
    { key: "australia", value: "Australia" },
    { key: "germany", value: "Germany" },
    { key: "france", value: "France" },
    { key: "spain", value: "Spain" },
    { key: "italy", value: "Italy" },
  ]

  const validateField = (field, value) => {
    let errorMessage = ""
    
    switch (field) {
      case "firstName":
      case "lastName":
        if (!value.trim()) errorMessage = tErrors("requiredField")
        else if (value.trim().length < 2) errorMessage = tErrors("nameMinLength")
        break
      case "email":
        if (!value.trim()) errorMessage = tErrors("requiredField")
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errorMessage = tErrors("invalidEmail")
        break
      case "phoneNumber":
        if (!value.trim()) errorMessage = tErrors("requiredField")
        else if (!/^[0-9+\-\s]{7,15}$/.test(value)) errorMessage = tErrors("invalidPhoneNumber")
        break
      case "country":
        if (!value) errorMessage = tErrors("requiredField")
        break
      default:
        break
    }
    
    return errorMessage
  }

  const handleChange = (field, value) => {
    // Update validation error, but don't display until submit or blur
    const errorMessage = validateField(field, value)
    setErrors(prev => ({ ...prev, [field]: errorMessage }))
    onStudentInfoChange({ ...studentInfo, [field]: value })
  }
  
  const handleBlur = (field) => {
    // Mark field as touched when it loses focus
    setTouchedFields(prev => ({ ...prev, [field]: true }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate all fields before submitting
    let formIsValid = true
    const newErrors = { ...errors }
    
    // Validate all fields
    for (const field in studentInfo) {
      const errorMessage = validateField(field, studentInfo[field])
      newErrors[field] = errorMessage
      if (errorMessage) formIsValid = false
    }
    
    setErrors(newErrors)
    setFormSubmitted(true)
    
    // Mark all fields as touched on submit
    const allTouched = {}
    for (const field in touchedFields) {
      allTouched[field] = true
    }
    setTouchedFields(allTouched)
    
    if (formIsValid) {
      onSubmit()
    }
  }

  const getInputClass = (fieldName) => {
    const showError = (formSubmitted || touchedFields[fieldName]) && errors[fieldName]
    return `w-full px-4 py-2.5 rounded-lg border ${
      showError
        ? "border-red-500 focus:ring-1 focus:ring-red-500 focus:border-red-500" 
        : "border-gray-300 focus:ring-1 focus:ring-gray-800 focus:border-gray-800"
    } transition-colors outline-none`
  }
  
  const shouldShowError = (fieldName) => {
    return (formSubmitted || touchedFields[fieldName]) && errors[fieldName]
  }

  return (
    <div className="max-w-2xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-serif text-gray-900 mb-8 text-center">{t("title")}</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                {t("firstName")} <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                value={studentInfo.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                onBlur={() => handleBlur("firstName")}
                required
                className={getInputClass("firstName")}
              />
              {shouldShowError("firstName") && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                {t("lastName")} <span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                value={studentInfo.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                onBlur={() => handleBlur("lastName")}
                required
                className={getInputClass("lastName")}
              />
              {shouldShowError("lastName") && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t("email")} <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={studentInfo.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                required
                className={getInputClass("email")}
              />
              {shouldShowError("email") && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                {t("phoneNumber")} <span className="text-red-500">*</span>
              </label>
              <input
                id="phoneNumber"
                type="tel"
                value={studentInfo.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                onBlur={() => handleBlur("phoneNumber")}
                required
                className={getInputClass("phoneNumber")}
              />
              {shouldShowError("phoneNumber") && (
                <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            <div className="md:col-span-2 space-y-2">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                {t("country")} <span className="text-red-500">*</span>
              </label>
              <select
                id="country"
                value={studentInfo.country}
                onChange={(e) => handleChange("country", e.target.value)}
                onBlur={() => handleBlur("country")}
                className={`${getInputClass("country")} bg-white`}
                required
              >
                <option value="">{t("selectCountry")}</option>
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {tCountries(country.key)}
                  </option>
                ))}
              </select>
              {shouldShowError("country") && (
                <p className="text-red-500 text-xs mt-1">{errors.country}</p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4">
  <button 
    type="submit" 
    className="w-full bg-[#3189c5] hover:bg-[#276c9a] text-white px-8 py-3 text-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
  >
    {t("signUp")}
  </button>
</div>
      </form>
    </div>
  )
}