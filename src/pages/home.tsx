import Link from "next/link";

export default function Home() {
    return (
        <main className="w-screen h-screen flex flex-col items-center justify-center bg-white text-black">
    <div className="text-4xl font-bold my-10 text-center">
        Meet your 
        <span className="text-cyan-300"> personalized </span>
        interview coach/essay editor at 
        <span className="text-cyan-300"> CareerPro!</span>
    </div>
    <div className="inline-flex space-x-10 p-3 rounded-md justify-center">
        <div className="flex flex-col items-center justify-center mx-3 bg-gray-100 w-1/5">
            <p className="mb-4 text-center">Get random sample interview questions for the position you're applying and check the interview coach's advice!</p>
            <Link className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md"
                href="/interview">
                Interview Mode
            </Link>
        </div>
        <div className="flex flex-col items-center justify-center mx-3 bg-gray-100 w-1/5">
            <p className="mb-4 text-center">Give us the essay prompt you have and your response. We will evaluate and edit it for you!</p>
            <Link className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md"
                href="/prompt">
                Prompt Mode
            </Link>
        </div>
    </div>
</main>

    )
}