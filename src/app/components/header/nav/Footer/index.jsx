// IMPORT REACT ICONS
import Link from "next/link"
import { FaLinkedinIn, FaSquareInstagram, FaGithub } from "react-icons/fa6"
import { IoMdMail } from "react-icons/io"

const links = [

	{
		icon: <FaSquareInstagram />,
		link: "https://www.instagram.com/codifyclub/",
		color: "text-pink-500",
	},
	{
		icon: <FaLinkedinIn />,
		link: "/",
		color: "text-blue-500",
	},
	{
		icon: <FaGithub />,
		link: "/",
		color: "text-black",
	},
	{
		icon: <IoMdMail />,
		link: "/",
		color: "text-red-400",
	},

]

export default function NavFooter() {
	
    return (

		<div className="flex justify-between w-full">
			{

				links.map(( data, index ) => (

					<Link key={index} href={data.link} target="blank">
						<div className={`bg-white rounded-full size-12 flex items-center justify-center group`}>
							<span className={`${data.color} duration-150 text-xl`}>{ data.icon }</span>
						</div>
					</Link>

				))

			}
		</div>

    )

}
