import Container from "@/app/components/container";
import Image from "next/image";
import { Gradient } from "@/app/components/gradient";

const data = {

    section_heading: "Explore the Possibilities of your Future with ",
    section_subheading: "",
    ball_src: "/images/ball.png",

}

export default function Opportunity(){

    return (

        <section className="relative sm:py-16 lg:py-24 bg-dark overflow-hidden">
            <Gradient />
            <div class="hidden absolute top-0 left-7.5 right-7.5 h-[1px] bg-neutral-600/25 undefined pointer-events-none lg:block xl:left-10 right-10"></div>
            <div class="hidden absolute top-0 left-5 w-[1px] h-full bg-neutral-600/25 pointer-events-none md:block lg:left-7.5 xl:left-10"></div>
            <div class="hidden absolute top-0 right-5 w-[1px] h-full bg-neutral-600/25 pointer-events-none md:block lg:right-7.5 xl:right-10"></div>
            <Container>
                <div className="relative flex flex-col items-center justify-center gap-10">
                    <div className="flex max-w-[900px] py-10 z-10">
                        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl text-center font-sora font-medium lg:leading-tight">
                            { data.section_heading }
                            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-4xl md:text-5xl lg:text-7xl">Codify</span>
                        </h2>
                    </div>
                    <Image 
                        src={data.ball_src}
                        alt="ball"
                        width={200}
                        height={200}
                        className="size-52 absolute top-24 left-0 animate-bounceUpDown"  
                    />
                    <div className="grid grid-cols-3 gap-6 h-dvh w-full">
                        <div className="w-full h-full rounded-xl bg-neutral-400/25 col-span-2 row-span-2"></div>
                        <div className="w-full h-full rounded-xl bg-neutral-400/25"></div>
                        <div className="w-full h-full rounded-xl bg-neutral-400/25"></div>
                        <div className="w-full h-full rounded-xl bg-neutral-400/25"></div>
                        <div className="w-full h-full rounded-xl bg-neutral-400/25 col-span-2"></div>
                    </div>
                </div>
            </Container>
        </section>

    )

}
