import { useState } from "react"
import RoadmapSelector from "./roadmap-selector"
import { roadmap_data } from "./roadmapData"
import Image from "next/image"

// DATA
const data = {

    noroadmap: "No roadmap for this category yet."

}

export default function RoadmapComponents() {

    const [selectedRoadmapCategory, setSelectedRoadmapCategory] = useState("Frontend Web Development")
    const [imageLoaded, setImageLoaded] = useState(false)

    const selectedRoadmap = roadmap_data.find((roadmap) => roadmap.category === selectedRoadmapCategory)

    const handleImageLoad = () => {

        setImageLoaded(true)

    }

    return (

        <section className="space-y-6">
            <RoadmapSelector
                selectedCategory={selectedRoadmapCategory}
                onSelect={(category) => {

                    setSelectedRoadmapCategory(category)
                    setImageLoaded(false) 
                    
                }}
            />

            {
            
                selectedRoadmap ? (

                    <div className="flex flex-col gap-4">
                        <h3 className="text-4xl font-sora font-medium">{ selectedRoadmap.title }</h3>

                        <div className="relative w-full h-full">
                            {

                                !imageLoaded && (

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-50"></div>
                                    </div>

                                )
                            
                            }

                            <Image
                                src={selectedRoadmap.src}
                                alt={selectedRoadmap.alt}
                                width={3000}
                                height={3000}
                                className="w-full h-full rounded-xl"
                                onLoadingComplete={ handleImageLoad } 
                            />
                        </div>
                    </div>

                ) : (

                    <p className="text-lg font-medium font-sora">{ data.noroadmap }</p>

                )
            
            }
        </section>

    )

}
