import { useState, useEffect, useCallback } from "react"
import QAAccordion from "./qa-accordion"
import PrimaryButtonDark from "@/app/components/buttons/primary/primary-dark"
import { IoMdRefresh } from "react-icons/io"
import { FiSearch } from "react-icons/fi"
import { GoogleGenerativeAI } from "@google/generative-ai"

// DATA
const data = {
    button_text: "Refresh",
    search_placeholder: "Enter interview topic (e.g. Python, JavaScript, React)",
}

// Function to evaluate the response
const evaluateResponse = async (question, answer) => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
    const genAI = new GoogleGenerativeAI(apiKey)
  
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    })
  
    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    }
  
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        })
    
        const result = await chatSession.sendMessage(
            `Evaluate the following answer to the given question and rate it out of 10 rate it more than 5 always: 
            Question: "${question}"
            Answer: "${answer}"
            Provide only the rating in numerical form.`
        )
    
        const rating = parseFloat(result.response.text().trim())
        return rating
    } catch (error) {
        console.error("Error evaluating response with Gemini API", error)
        throw error
    }
}

// Function to fetch interview questions from Gemini API
const fetchQuestionsFromGemini = async (selectedCategory) => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
    const genAI = new GoogleGenerativeAI(apiKey)

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    })

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    }

    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        })

        const result = await chatSession.sendMessage(
            `Create exactly 6 short interview questions on ${selectedCategory} and return the response without any heading or explanation, direct questions line by line`
        )
        
        return result.response.text()
    } catch (error) {
        console.error("Error fetching questions from Gemini API", error)
        throw error
    }
}

export default function InterviewQAComponents() {
    const [searchInput, setSearchInput] = useState("Python")
    const [selectedQuestionCategory, setSelectedQuestionCategory] = useState("Python")
    const [questions, setQuestions] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [ratings, setRatings] = useState({})
    const [openAccordionIndex, setOpenAccordionIndex] = useState(0)

    // Fetch questions using Gemini API
    const fetchQuestions = useCallback(async () => {
        setIsLoading(true)
        setError(null)

        try {
            const questionsText = await fetchQuestionsFromGemini(selectedQuestionCategory)
            const parsedQuestions = questionsText.split("\n").filter(q => q)
            setQuestions(parsedQuestions)
            // Reset open accordion to the first one whenever new questions are loaded
            setOpenAccordionIndex(0)
        } catch (error) {
            setError("Failed to load questions.")
        } finally {
            setIsLoading(false)
        }
    }, [selectedQuestionCategory])

    // Handle answer submission and evaluation
    const handleAnswerSubmit = async (question, answer) => {
        if (!answer.trim()) return

        try {
            const rating = await evaluateResponse(question, answer)
            setRatings((prevRatings) => ({
                ...prevRatings,
                [question]: rating,
            }))
        } catch (err) {
            setError("Failed to evaluate the response.")
        }
    }

    // Fetch questions initially
    useEffect(() => {
        fetchQuestions()
    }, [fetchQuestions])

    // Handle search submission
    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (searchInput.trim()) {
            setSelectedQuestionCategory(searchInput.trim())
        }
    }

    // Handle refresh button click
    const handleRefresh = () => {
        if (searchInput.trim()) {
            setSelectedQuestionCategory(searchInput.trim())
            fetchQuestions()
        }
    }

    // Toggle accordion open/close
    const toggleAccordion = (index) => {
        setOpenAccordionIndex(openAccordionIndex === index ? null : index)
    }

    return (
        <section className="space-y-6">
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder={data.search_placeholder}
                        className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        type="submit" 
                        className="group absolute right-0 text-gray-500 hover:text-gray-700 bg-accent h-full aspect-square flex items-center justify-center rounded-r-lg"
                        aria-label="Search"
                    >
                        <FiSearch className="text-xl group-hover:text-2xl duration-150 text-white" />
                    </button>
                </div>
            </form>
            
            <div className="flex flex-col px-4 rounded-xl bg-white h-full w-full">
                {isLoading ? (
                    <p className="py-4 text-center">Loading questions...</p>
                ) : error ? (
                    <p className="py-4 text-center text-red-500">{error}</p>
                ) : (
                    questions.map((question, index) => (
                        <QAAccordion 
                            key={index} 
                            title={question} 
                            onSubmit={(answer) => handleAnswerSubmit(question, answer)}
                            rating={ratings[question]}
                            isOpen={openAccordionIndex === index}
                            onToggle={() => toggleAccordion(index)}
                        />
                    ))
                )}
            </div>
            <div className="flex justify-center">
                <PrimaryButtonDark onClick={handleRefresh} disabled={isLoading}>
                    {data.button_text}
                    <span className="text-xl"><IoMdRefresh /></span>
                </PrimaryButtonDark>
            </div>
        </section>
    )
}
