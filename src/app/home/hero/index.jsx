"use client"
// SWIPER IMPORT 
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css/bundle"
import "swiper/css/autoplay"

// Import Swiper modules
import { Autoplay } from "swiper/modules"

import Link from "next/link"
import Image from "next/image"
import Container from "@/app/components/container"
import Rings from "./rings"
import ScrollDown from "./scroll-down"
import DotButton from "@/app/components/buttons/dot-button"
import DotButtonDark from "@/app/components/buttons/dot-button-dark"

const data = {

    subtitle: "Welcome to,",
    title: "Codify club",
    button_one_link: "/",
    button_one_text: "Lounge",
    button_two_link: "/",
    button_two_text: "Career",
    button_three_link: "/",
    button_three_text: "Resources",

}

const heroList = [

    {
        item: "Engaging Community",
    },
    {
        item: "Learning platform",
    },
    {
        item: "Events like Hackathons, Tech fiestas",
    },
    {
        item: "Career opportunities",
    },

]

const sliderData = [

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

        <section className="relative pb-10 pt-20 md:py-20 bg-light overflow-hidden">
            <Rings />
            <div className="absolute top-[25%] md:top-[31%] right-10 md:right-16 z-10"><ScrollDown /></div>
            <div className="pt-12 flex flex-col gap-6">
                <div className="space-y-4 z-10">
                    <h3 className="text-center font-sora text-xl">{ data.subtitle }</h3>
                    <h1 className="text-5xl md:text-6xl lg:text-[140px] tracking-wide text-center text-neutral-900 font-bebas uppercase z-10">{ data.title }</h1>
                    <div className="flex items-center justify-center gap-2 md:gap-4">
                        <Link href={ data.button_one_link }>
                            <DotButton>{ data.button_one_text }</DotButton>
                        </Link>
                        <Link href={ data.button_two_link }>
                            <DotButton>{ data.button_two_text }</DotButton>
                        </Link>
                        <Link href={ data.button_three_link }>
                            <DotButtonDark>{ data.button_three_text }</DotButtonDark>
                        </Link>
                    </div>
                </div>
                <div className="mx-4 py-6 md:p-10 flex items-center justify-center bg-dark rounded-xl">
                    <Container>
                        <div className="relative flex flex-col gap-6 md:gap-10 py-8 lg:py-12 lg:px-32">
                            <div className="h-full md:aspect-video relative overflow-hidden">
                                <div className="absolute top-1 left-1 md:top-4 md:left-4 z-20 rounded-full bg-accent px-4 md:px-6 py-1 md:py-2 cursor-default">
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

                                        sliderData.map( ( item, index ) => (

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
                            <ul className="list-disc list-inside space-y-2">
                                {

                                    heroList.map( ( data, index ) => (

                                        <li key={ index } className="text-sm text-neutral-300 uppercase font-syne font-bold">{ data.item }</li>

                                    ))

                                }
                            </ul>
                        </div>    
                    </Container>
                </div>
            </div>
        </section>

    )

}
