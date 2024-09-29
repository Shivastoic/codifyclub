"use client"
// SWIPER IMPORT 
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css/bundle"
import "swiper/css/autoplay"

// Import Swiper modules
import { Autoplay } from "swiper/modules"

import Image from "next/image"
import Container from "@/app/components/container"
import Rings from "./rings"

const data = [

    {
        src: "/images/hero-slider/slide-1.jpg",
        alt: "Slide Image",
    },
    {
        src: "/images/hero-slider/slide-2.jpg",
        alt: "Slide Image",
    },
    {
        src: "/images/hero-slider/slide-3.jpg",
        alt: "Slide Image",
    },

]

export default function Hero(){

    return (

        <section className="relative pt-20 bg-[url('/images/hero-background.jpg')] bg-no-repeat bg-cover bg-center bg-dark overflow-hidden">
            <Rings />
            <Container>
                <div className="flex flex-col gap-4 md:gap-6 pt-8 pb-16">
                    <h1 className="text-5xl md:text-6xl lg:text-9xl text-neutral-300 z-10">Welcome,</h1>
                    <div className="h-full aspect-video rounded-2xl md:rounded-3xl relative overflow-hidden">
                        <div className="absolute top-1 left-1 md:top-4 md:left-4 z-20 rounded-full bg-accent px-4 md:px-6 py-1 md:py-2">
                            <span className="text-white text-xs md:text-lg md:font-medium">Upcoming</span>
                        </div>
                        <Swiper 
                            className="mySwiper"
                            loop={true}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                        >
                            {

                                data.map( ( item, index ) => (

                                    <SwiperSlide key={index}>
                                        <div className="w-full h-full">
                                            <Image 
                                                src={item.src}
                                                alt={item.alt}
                                                width={1000}
                                                height={1000}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </SwiperSlide>

                                ))

                            }
                        </Swiper>
                    </div>
                </div>    
            </Container>
        </section>

    )

}
