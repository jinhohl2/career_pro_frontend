import { useState } from "react";
import { API_URL } from "../globals";
import ChatUI from "../component/chatUI";
import Image from 'next/image';
import { TextareaHTMLAttributes } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import man_white_shirt from '../../public/man_white_shirt.png';

export default function Prompt() {
    const [prompt, setPrompt] = useState<string>("");
    const [userResponse, setUserResponse] = useState<string>("");
    const [evaluation, setEvaluation] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [userMessages, setUserMessages] = useState<string[]>([]);
    const [assistantMessages, setAssistantMessages] = useState<string[]>([]);
    const [currentState, setCurrentState] = useState<string>("ready4eval");


    const getEvaluation = async () => {
        const promptResponseSet = `prompt: ${prompt}, response: ${userResponse}`
        const tempUserMessages = [...userMessages, promptResponseSet]
        setIsLoading(true)
        setUserMessages(tempUserMessages);
        const response = await fetch(`${API_URL}/prompt`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userMessages: tempUserMessages,
                assistantMessages: assistantMessages
            })
        })
        if (!response.ok) {
            console.log(response.statusText);
        }
        const messageResponse = (await response.json()) as {
            role: string,
            content: string
        }
        setAssistantMessages([...userMessages, messageResponse.content]);
        setEvaluation(messageResponse.content);
        setCurrentState("evaluated");
        setIsLoading(false);
    }

    const inputNewPrompt = (() => {
        setPrompt("")
        setUserResponse("")
        setCurrentState("ready4eval");
    })

    const askFollowUp = () => {
        setCurrentState("ready4fu")
    }

    return (
        <main className="flex flex-col items-center justify-start p-24 w-screen min-h-screen bg-gray-100 rounded-lg space-y-6">
  {/*---Picture---*/}
  <div className="w-30 aspect-picture rounded-full border-2 border-white">
    <Image src={man_white_shirt} 
      width={100}
      height={100}
      alt=''/>
  </div>
  {/*---Prompt Input---*/}
  <div className='flex flex-col items-center justify-center space-y-2'>
    <span className="text-gray-800 font-semibold">Prompt:</span>
    <textarea
      className="px-3 py-1 rounded-md text-gray-700 bg-white border border-gray-200"
      rows = {10}
      cols = {50}
      placeholder="Copy your prompt here"
      onChange={(e) => setPrompt(e.target.value)} />
  </div>

  <div className='flex flex-col items-center justify-center space-y-2'>
    <span className="text-gray-800 font-semibold">Response:</span>
    <textarea
      className="px-3 py-1 rounded-md text-gray-700 bg-white border border-gray-200"
      rows={10}
      cols={50}
      placeholder="Write your response here"
      onChange={(e) => setPrompt(e.target.value)} />
  </div>

  <button
      className="text-base sm:text-lg md:text-xl lg:text-2xl bg-gray-800 hover:bg-gray-700 rounded-md px-2 py-1 text-white"
      onClick={getEvaluation}
  >
      Get an evaluation
  </button>

  {isLoading && <i className="fas fa-spinner fa-spin text-xl text-gray-500"></i>}

  {(currentState === "evaluated") && (
      <div className="flex flex-col justify-between items-center space-y-4">
        <span className="text-gray-800 font-semibold">Evaluation:</span>
          <div className="px-3 py-1 rounded-md text-white bg-slate-500 border border-gray-300 h-96 min-w-25rem overflow-y-auto">
                {evaluation}
              </div>
          <div className="inline-flex space-x-4">
              <button className="text-base sm:text-lg md:text-xl lg:text-2xl bg-gray-800 hover:bg-gray-700 rounded-md px-2 py-1 text-white"
                  onClick={inputNewPrompt}>
                  Input new prompt
              </button>
              <button className="text-base sm:text-lg md:text-xl lg:text-2xl bg-gray-800 hover:bg-gray-700 rounded-md px-2 py-1 text-white"
                  onClick={askFollowUp}>
                  Ask follow up
              </button>
          </div>
      </div>
  )}

  <div>
      {/*---Follow up Chat UI---*/}
      {(currentState === 'ready4fu' || currentState === 'fuAnswered') && (
          <ChatUI
              mode={"prompt"}
              job={""}
              userMessages={userMessages}
              setUserMessages={setUserMessages}
              assistantMessages={assistantMessages}
              setAssistantMessages={setAssistantMessages}
              currentState={currentState}
              setCurrentState={setCurrentState}
              getNewQuestion={inputNewPrompt} />
      )}
  </div>
</main>


    )
}