"use client"

import { useTranslations } from "next-intl"
import { useState } from "react"

export default function ParentForm({ parentInfo, childInfo, onParentInfoChange, onChildInfoChange, onSubmit }) {
  const t = useTranslations("ParentForm")
  const tCountries = useTranslations("Countries")
  const tErrors = useTranslations("Errors")
  
  // Add error state for form fields
  const [errors, setErrors] = useState({
    parentName: "",
    whatsappNumber: "",
    email: "",
    country: "",
    firstName: "",
    lastName: "",
    age: ""
  })
  
  // Track if form has been submitted
  const [formSubmitted, setFormSubmitted] = useState(false)
  
  // Track touched fields
  const [touchedFields, setTouchedFields] = useState({
    parentName: false,
    whatsappNumber: false,
    email: false,
    country: false,
    firstName: false,
    lastName: false,
    age: false
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
      case "parentName":
        if (!value.trim()) errorMessage = tErrors("requiredField")
        else if (value.trim().length < 2) errorMessage = tErrors("nameMinLength")
        break
      case "whatsappNumber":
        if (!value.trim()) errorMessage = tErrors("requiredField")
        else if (!/^[0-9+\-\s]{7,15}$/.test(value)) errorMessage = tErrors("invalidPhoneNumber")
        break
      case "email":
        if (!value.trim()) errorMessage = tErrors("requiredField")
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errorMessage = tErrors("invalidEmail")
        break
      case "country":
        if (!value) errorMessage = tErrors("requiredField")
        break
      case "firstName":
      case "lastName":
        if (!value.trim()) errorMessage = tErrors("requiredField")
        else if (value.trim().length < 2) errorMessage = tErrors("nameMinLength")
        break
      case "age":
        if (!value) errorMessage = tErrors("requiredField")
        else if (isNaN(value) || value < 3 || value > 18) errorMessage = tErrors("invalidAge")
        break
      default:
        break
    }
    
    return errorMessage
  }

  const handleParentChange = (field, value) => {
    // Update validation error, but don't display until submit or blur
    const errorMessage = validateField(field, value)
    setErrors(prev => ({ ...prev, [field]: errorMessage }))
    onParentInfoChange({ ...parentInfo, [field]: value })
  }

  const handleChildChange = (field, value) => {
    // Update validation error, but don't display until submit or blur
    const errorMessage = validateField(field, value)
    setErrors(prev => ({ ...prev, [field]: errorMessage }))
    onChildInfoChange({ ...childInfo, [field]: value })
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
    
    // Validate parent fields
    for (const field in parentInfo) {
      const errorMessage = validateField(field, parentInfo[field])
      newErrors[field] = errorMessage
      if (errorMessage) formIsValid = false
    }
    
    // Validate child fields
    for (const field in childInfo) {
      const errorMessage = validateField(field, childInfo[field])
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
        ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500" 
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
        {/* Parent Information Section */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-2">{t("parentInfo")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="parentName" className="block text-sm font-medium text-gray-700">
                {t("parentName")} <span className="text-red-500">*</span>
              </label>
              <input
                id="parentName"
                type="text"
                value={parentInfo.parentName}
                onChange={(e) => handleParentChange("parentName", e.target.value)}
                onBlur={() => handleBlur("parentName")}
                required
                className={getInputClass("parentName")}
              />
              {shouldShowError("parentName") && (
                <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700">
                {t("whatsappNumber")} <span className="text-red-500">*</span>
              </label>
              <input
                id="whatsappNumber"
                type="tel"
                value={parentInfo.whatsappNumber}
                onChange={(e) => handleParentChange("whatsappNumber", e.target.value)}
                onBlur={() => handleBlur("whatsappNumber")}
                required
                className={getInputClass("whatsappNumber")}
              />
              {shouldShowError("whatsappNumber") && (
                <p className="text-red-500 text-xs mt-1">{errors.whatsappNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="parentEmail" className="block text-sm font-medium text-gray-700">
                {t("email")} <span className="text-red-500">*</span>
              </label>
              <input
                id="parentEmail"
                type="email"
                value={parentInfo.email}
                onChange={(e) => handleParentChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                required
                className={getInputClass("email")}
              />
              {shouldShowError("email") && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="parentCountry" className="block text-sm font-medium text-gray-700">
                {t("country")} <span className="text-red-500">*</span>
              </label>
              <select
                id="parentCountry"
                value={parentInfo.country}
                onChange={(e) => handleParentChange("country", e.target.value)}
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

        {/* Child Information Section */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-2">{t("childInfo")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label htmlFor="childFirstName" className="block text-sm font-medium text-gray-700">
                {t("firstName")} <span className="text-red-500">*</span>
              </label>
              <input
                id="childFirstName"
                type="text"
                value={childInfo.firstName}
                onChange={(e) => handleChildChange("firstName", e.target.value)}
                onBlur={() => handleBlur("firstName")}
                required
                className={getInputClass("firstName")}
              />
              {shouldShowError("firstName") && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="childLastName" className="block text-sm font-medium text-gray-700">
                {t("lastName")} <span className="text-red-500">*</span>
              </label>
              <input
                id="childLastName"
                type="text"
                value={childInfo.lastName}
                onChange={(e) => handleChildChange("lastName", e.target.value)}
                onBlur={() => handleBlur("lastName")}
                required
                className={getInputClass("lastName")}
              />
              {shouldShowError("lastName") && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="childAge" className="block text-sm font-medium text-gray-700">
                {t("age")} <span className="text-red-500">*</span>
              </label>
              <input
                id="childAge"
                type="number"
                min="3"
                max="18"
                value={childInfo.age}
                onChange={(e) => handleChildChange("age", e.target.value)}
                onBlur={() => handleBlur("age")}
                required
                className={getInputClass("age")}
              />
              {shouldShowError("age") && (
                <p className="text-red-500 text-xs mt-1">{errors.age}</p>
              )}
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <button 
            type="submit" 
            className="w-full bg-[#3189c5] hover:bg-[#276c9a] text-white px-8 py-3 text-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
            {t("signupChild")}
          </button>
        </div>
      </form>
    </div>
  )
}