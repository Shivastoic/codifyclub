export default function Container({ children }) {

    return (

        <section className="w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto px-4 h-full">
            { children }
        </section>

    )

}
