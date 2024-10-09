import { useState } from "react"
import CourseSelector from "./course-selector"

export default function CourseComponents(){

    const [selectedCategory, setSelectedCategory] = useState("Select a category")

    return (

        <section className="space-y-6">
            <CourseSelector 
                selectedCategory={selectedCategory}
                onSelect={(category) => setSelectedCategory(category)}
            />
        </section>

    )

}
