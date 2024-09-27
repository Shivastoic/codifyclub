// IMPORT REACT ICONS
import Link from "next/link"
import { FaLinkedinIn, FaSquareInstagram, FaGithub } from "react-icons/fa6"
import { IoMdMail } from "react-icons/io"

const links = [

	{
		icon: <FaSquareInstagram />,
		link: "https://www.instagram.com/codifyclub/",
		color: "bg-pink-500",
	},
	{
		icon: <FaLinkedinIn />,
		link: "/",
		color: "bg-blue-500",
	},
	{
		icon: <FaGithub />,
		link: "/",
		color: "bg-black",
	},
	{
		icon: <IoMdMail />,
		link: "/",
		color: "bg-red-400",
	},

]

export default function index() {
	
    return (

		<div className="flex justify-between w-full">
			{

				links.map(( data, index ) => (

					<Link key={index} href={data.link} target="blank">
						<div className={`bg-white rounded-full size-12 flex items-center justify-center group hover:${data.color} duration-150`}>
							<span className={`group-hover:text-${data.color} duration-150 text-xl`}>{ data.icon }</span>
						</div>
					</Link>

				))

			}
		</div>

    )

}
