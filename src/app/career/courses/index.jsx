import { useState } from "react"
import CategorySelector from "@/app/components/category-selector"

// IMPORT COURSE DATA
import { course_data } from "./courseData"
import CourseCard from "./course-card"
import Image from "next/image"

export default function CourseComponents() {
    const [selectedCategory, setSelectedCategory] = useState("Select a category")
    const [selectedCourse, setSelectedCourse] = useState(null)

    const courseCategories = [
        "Web Development",
        "Artificial Intelligence",
        "App Development",
        "Business Intelligence",
        "Video Editing",
        "Social Media",
        "Select a category"
    ];

    // Filter the data based on the selected category
    const filteredCourses = selectedCategory === "Select a category"
        ? course_data
        : course_data.filter(course => course.category === selectedCategory);

    const handleCardClick = (course) => {
        setSelectedCourse(course)
    }

    const handleBackClick = () => {
        setSelectedCourse(null)
    }

    return (
        <section className="space-y-6">
            <CategorySelector 
                categories={courseCategories}
                selectedCategory={selectedCategory}
                onSelect={(category) => {
                    setSelectedCategory(category)
                    setSelectedCourse(null) // Reset selected course when changing category
                }}
            />
            
            {!selectedCourse ? (
                // Show the grid of course cards
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        filteredCourses.map((course, index) => (
                            <div key={index} onClick={() => handleCardClick(course)} className="cursor-pointer">
                                <CourseCard
                                    title={course.title}
                                    src={course.src}
                                    auther={course.auther}
                                    price={course.price}
                                    discount_price={course.discount_price}
                                    rating={course.rating}
                                />
                            </div>
                        ))
                    }
                </div>
            ) : (
                // Show the detailed course view
                <div className="animate-fadeIn px-6 py-10 rounded-xl bg-white">
                    <button 
                        onClick={handleBackClick}
                        className="flex items-center text-blue-600 text-lg hover:text-blue-800 mb-4"
                    >
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Back to all courses
                    </button>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left column - Image and description */}
                        <div className="lg:w-2/3 space-y-10">
                            <div className="rounded-lg overflow-hidden">

                                <Image 
                                    src={selectedCourse.src} 
                                    alt={selectedCourse.title}
                                    width={1000}
                                    height={1000}
                                    className="w-full h-auto object-cover" 
                                />
                            </div>
                            
                            <div className="space-y-4">
                                <h1 className="text-xl md:text-3xl font-apercu font-bold mb-4">{selectedCourse.title}</h1>
                                
                                <div className="flex items-center mb-4">
                                    <div className="flex items-center mr-4">
                                        <span className="text-yellow-500 mr-1">★</span>
                                        <span>{selectedCourse.rating}</span>
                                    </div>
                                    <div className="text-gray-600">
                                        by <span className="text-lg font-medium">{selectedCourse.auther}</span>
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div className="mb-6">
                                <h2 className="text-xl font-bold mb-2">About this course</h2>
                                <p className="text-gray-700">
                                    {selectedCourse.description || 
                                     "This comprehensive course will take you through all the essential concepts and practical applications. Learn from industry experts and gain hands-on experience through real-world projects."}
                                </p>
                            </div>
                            
                            <div className="mb-6">
                                <h2 className="text-xl font-bold mb-2">What you'll learn</h2>
                                <ul className="list-disc pl-6 text-gray-700">
                                    {selectedCourse.learningPoints ? 
                                        selectedCourse.learningPoints.map((point, index) => (
                                            <li key={index}>{point}</li>
                                        )) : 
                                        [
                                            "Master the fundamental concepts and techniques",
                                            "Build professional-quality projects for your portfolio",
                                            "Gain industry-relevant skills that employers are looking for",
                                            "Learn best practices and optimization strategies"
                                        ].map((point, index) => (
                                            <li key={index}>{point}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            
                            <div>
                                <h2 className="text-xl font-bold mb-2">Course content</h2>
                                <p className="text-gray-700">
                                    {selectedCourse.contentLength || "12 hours"} of video content • {selectedCourse.modules || "8"} modules • Access on mobile and desktop
                                </p>
                            </div>
                        </div>
                        
                        {/* Right column - Price card */}
                        <div className="lg:w-1/3">
                            <div className="border rounded-lg p-6">
                                <div className="mb-4">
                                    <span className="text-3xl font-bold">${selectedCourse.discount_price || selectedCourse.price}</span>
                                    {selectedCourse.discount_price && (
                                        <span className="ml-2 line-through text-gray-500">${selectedCourse.price}</span>
                                    )}
                                </div>
                                
                                {selectedCourse.discount_price && (
                                    <div className="mb-4 bg-green-100 text-green-800 px-3 py-1 rounded inline-block">
                                        {Math.round((1 - selectedCourse.discount_price / selectedCourse.price) * 100)}% off
                                    </div>
                                )}
                                
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded mb-4">
                                    Enroll now
                                </button>
                                
                                <button className="w-full border border-blue-600 text-blue-600 font-bold py-3 rounded mb-6">
                                    Add to wishlist
                                </button>
                                
                                <div className="text-gray-700 text-sm">
                                    <p className="mb-2">
                                        <strong>30-Day Money-Back Guarantee</strong>
                                    </p>
                                    <p className="mb-2">
                                        <strong>Includes:</strong>
                                    </p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Full lifetime access</li>
                                        <li>Access on mobile and desktop</li>
                                        <li>Certificate of completion</li>
                                        <li>Downloadable resources</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
