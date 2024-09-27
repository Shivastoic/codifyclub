import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export const DesktopNavbar = () => {

    return (

        <SlideTabs />

    );

};

const SlideTabs = () => {

    const [position, setPosition] = useState({

		left: 0,
		width: 0,
		opacity: 0,

    });

    return (

		<ul
			onMouseLeave={() => {

				setPosition((pv) => ({
					...pv,
					opacity: 0,
				}));

			}}
			className="relative mx-auto flex w-fit rounded-full p-1"
		>
			<Link href="/">
				<Tab setPosition={setPosition}>Home</Tab>
			</Link>
			<Link href="/resource">
				<Tab setPosition={setPosition}>Resource</Tab>
			</Link>
			<Link href="/lounge">
				<Tab setPosition={setPosition}>Lounge</Tab>
			</Link>
			<Link href="/career">
				<Tab setPosition={setPosition}>Career</Tab>
			</Link>
			<Link href="/founders">
				<Tab setPosition={setPosition}>Blog</Tab>
			</Link>

			<Cursor position={position} />
		</ul>

    );

};

const Tab = ({ children, setPosition }) => {

	const ref = useRef(null);

	return (

		<li
			ref={ref}
			onMouseEnter={() => {
				if (!ref?.current) return;

				const { width } = ref.current.getBoundingClientRect();

				setPosition({
				left: ref.current.offsetLeft,
				width,
				opacity: 1,
				});
			}}
			className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
		>
			{children}
		</li>

	);

};

const Cursor = ({ position }) => {

	return (

		<motion.li
			animate={{
				...position,
			}}
			className="absolute z-0 h-7 rounded-full bg-white md:h-12"
		/>

	);

};
