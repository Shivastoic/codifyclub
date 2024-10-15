'use client'

import { useState } from "react"
import DotButton from "@/app/components/buttons/dot-button"
import DotButtonDark from "@/app/components/buttons/dot-button-dark"

import JobPortalComponents from "../job-portal"
import RoadmapComponents from "../roadmap"
import CourseComponents from "../courses"
import InterviewQAComponents from "../interview"

// DATA
const data = {

    button_one_text: "Courses",
    button_two_text: "Roadmap",
    button_three_text: "Job Portal",
    button_four_text: "Interview Q&A",

}

export default function CareerNavigation() {

    const [activeLink, setActiveLink] = useState("Courses")

    const renderComponent = () => {

        switch (activeLink) {

            case "Courses":
                return <CourseComponents />
            case "Roadmap":
                return <RoadmapComponents />
            case "Interview Q&A":
                return <InterviewQAComponents />
            case "Job Portal":
                return <JobPortalComponents />
            default:
                return <CourseComponents />

        }

    }

    return (

        <div className="space-y-6">
            <div className="flex items-center justify-center md:justify-normal gap-2 md:gap-4">
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
                {
                
                    activeLink === "Job Portal" ? (
                        <DotButtonDark onClick={() => setActiveLink("Job Portal")}>
                            {data.button_three_text}
                        </DotButtonDark>
                    ) : (
                        <DotButton onClick={() => setActiveLink("Job Portal")}>
                            {data.button_three_text}
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
