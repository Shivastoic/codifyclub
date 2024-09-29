'use client'
import Container from '../components/container';
import styles from './styles.module.scss';
import Picture1 from '/public/images/founders/main.webp';
import Picture2 from '/public/images/founders/hackdiwas.jpg';
import Picture3 from '/public/images/founders/gdsc.jpg';
import Picture4 from '/public/images/founders/promotion.jpg'
import Picture5 from '/public/images/founders/tedx.jpg'
import Picture6 from '/public/images/founders/uhack-1.jpg'
import Picture7 from '/public/images/founders/uhack-2.jpg'
import Image from 'next/image';
import { useScroll, useTransform, motion} from 'framer-motion';
import { useRef } from 'react';

// IMPORT ABOUT FOUNDER COMPONENT
import AboutFounders from './about-founders';

export default function Index() {
    
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    const pictures = [
        {
            src: Picture1,
            scale: scale4
        },
        {
            src: Picture2,
            scale: scale5
        },
        {
            src: Picture3,
            scale: scale6
        },
        {
            src: Picture4,
            scale: scale5
        },
        {
            src: Picture5,
            scale: scale6
        },
        {
            src: Picture6,
            scale: scale8
        },
        {
            src: Picture7,
            scale: scale9
        }
    ]
	const mainPic = Picture1

    return (

		<section className="flex flex-col pt-24 bg-dark">
            <div className="flex flex-col gap-6 sm:gap-8 lg:gap-14 bg-[url('/images/hero-background.jpg')] bg-no-repeat bg-cover bg-center">
                <div className="absolute top-28 left-32">
                    <Image 
                        alt='arrow'
                        className="hidden md:block md:w-28 lg:w-40 scale-x-[-1]"
                        width={100}
                        height={0}
                        src="/icons/curved-arrow.svg"
                    />
                </div>
                <div className="flex justify-end gap-2 px-4">
                    <div className="mb-[6px] md:mb-4 border-b-4 lg:border-b-8 border-white w-6 md:w-16 lg:w-20"></div>
                    <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[180px] text-white font-semibold">Founders.</h1>
                </div>
                <div ref={container} className="hidden md:block h-[300vh] relative">
                    <div className="sticky overflow-hidden top-0 h-screen">
                        {

                            pictures.map( ({src, scale}, index) => {

                                return (

                                    <motion.div key={index} style={{scale}} className={styles.el}>
                                        <div className={styles.imageContainer}>
                                            <Image
                                                src={src}
                                                fill
                                                alt="image"
                                                placeholder='blur'
                                            />
                                        </div>
                                    </motion.div>

                                )
                            })

                        }
                    </div>
                </div>
            </div>
            <div className="bg-white">
                <Container>
                    <div className="flex flex-col justify-center gap-6 py-4">
                        <div className="md:hidden">
                            <Image
                                src={mainPic}
                                alt="mainpic"
                                className="object-cover"
                            />
                        </div>
                        <div className="py-6">
                            <AboutFounders />
                        </div>
                    </div>
                </Container>
            </div>
		</section>

    )

}
