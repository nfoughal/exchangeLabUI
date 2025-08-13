"use client"

export default function UserTypeSelection({ selectedType, onTypeSelect }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-12">Are you a parent or student?</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
        <button
          onClick={() => onTypeSelect("parent")}
          className="p-8 bg-white rounded-2xl border border-gray-200 hover:border-orange-300 transition-colors"
        >
          <div className="text-2xl font-semibold text-gray-900 mb-2">Parent</div>
          <div className="text-[#777777]">Signing up for my child</div>
        </button>

        <button
          onClick={() => onTypeSelect("student")}
          className="p-8 bg-white rounded-2xl border border-gray-200 hover:border-orange-300 transition-colors"
        >
          <div className="text-2xl font-semibold text-gray-900 mb-2">Student</div>
          <div className="text-[#777777]">Learning for myself</div>
        </button>
      </div>
    </div>
  )
}
