'use client'

import { useState } from "react"
import DotButton from "@/app/components/buttons/dot-button"
import DotButtonDark from "@/app/components/buttons/dot-button-dark"
import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"

import RoadmapComponents from "../roadmap"
import CourseComponents from "../courses"
import InterviewQAComponents from "../interview"
import ResumeComponents from "../resume"

import ResumeAnalyzer from "../resume-analyzer"


// DATA
const data = {

    button_two_text: "Roadmap",
    button_one_text: "Courses",
    button_five_text: "Resume",
    button_four_text: "Interview Q&A",
    button_seven_text: "Resume Analyzer",

}

export default function CareerNavigation() {

    const [activeLink, setActiveLink] = useState("Roadmap")

    const renderComponent = () => {

        switch (activeLink) {

            case "Roadmap":
                return <RoadmapComponents />
            case "Courses": 
                return <CourseComponents />
            case "Resume": 
                return <ResumeComponents />
            case "Resume Analyzer": 
                return <ResumeAnalyzer />
            case "Interview Q&A":
                return <InterviewQAComponents />
            default:
                return <RoadmapComponents />

        }

    }

    return (

        <div className="space-y-6">
            <div className="flex items-center justify-center flex-wrap md:justify-normal gap-2 md:gap-4">
                {
                    
                    activeLink === "Roadmap" ? (
                        <DotButtonDark onClick={() => setActiveLink("Roadmap")}>
                            {data.button_two_text}
                        </DotButtonDark>
                    ) : (
                        <DotButton onClick={() => setActiveLink("Roadmap")}>
                            {data.button_two_text}
                        </DotButton>
                    )
                
                }
                {
                
                    activeLink === "Courses" ? (
                        <DotButtonDark onClick={() => setActiveLink("Courses")}>
                            {data.button_one_text}
                        </DotButtonDark>
                    ) : (
                        <DotButton onClick={() => setActiveLink("Courses")}>
                            {data.button_one_text}
                        </DotButton>
                    )
                
                }
                {
                
                    activeLink === "Resume" ? (
                        <DotButtonDark onClick={() => setActiveLink("Resume")}>
                            {data.button_five_text}
                        </DotButtonDark>
                    ) : (
                        <DotButton onClick={() => setActiveLink("Resume")}>
                            {data.button_five_text}
                        </DotButton>
                    )
                
                }
                {
                
                    activeLink === "Resume Analyzer" ? (
                        <DotButtonDark onClick={() => setActiveLink("Resume Analyzer")}>
                            {data.button_seven_text}
                        </DotButtonDark>
                    ) : (
                        <DotButton onClick={() => setActiveLink("Resume Analyzer")}>
                            {data.button_seven_text}
                        </DotButton>
                    )
                
                }
                {
                
                    activeLink === "Interview Q&A" ? (
                        <DotButtonDark onClick={() => setActiveLink("Interview Q&A")}>
                            {data.button_four_text}
                        </DotButtonDark>
                    ) : (
                        <DotButton onClick={() => setActiveLink("Interview Q&A")}>
                            {data.button_four_text}
                        </DotButton>
                    )
                
                }
            </div>
            <div className="rounded-xl bg-neutral-100 min-h-dvh p-4">
                { renderComponent() }
            </div>
        </div>

    )

}
