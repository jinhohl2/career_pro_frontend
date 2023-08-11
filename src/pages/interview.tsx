"use client";
import * as dotenv from 'dotenv';
dotenv.config();
import Image from 'next/image'
import { useState } from "react";
import { json } from 'stream/consumers';
import { API_URL } from '../globals'
import ChatUI from '../component/chatUI';
import '@fortawesome/fontawesome-free/css/all.min.css';
import man_white_shirt from '../../public/man_white_shirt.png'

export default function Interview() {
  const [job, setJob] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [userResponse, setUserResponse] = useState<string>("");
  const [evaluation, setEvaluation] = useState<string>("");
  const [isLoadingQ, setIsLoadingQ] = useState<boolean>(false);
  const [isLoadingR, setIsLoadingR] = useState<boolean>(false);

  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [assistantMessages, setAssistantMessages] = useState<string[]>([]);
  const [currentState, setCurrentState] = useState<string>("waiting4Q");

  const getNewQuestion = async () => {
    const tempUserMessages = [...userMessages, "Give me a question"]
    setUserMessages(tempUserMessages);
    console.log(API_URL)
    setIsLoadingQ(true);
    const response = await fetch(`${API_URL}/interview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        job: job,
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
    setQuestion(messageResponse.content);
    setUserResponse(" ");
    setEvaluation("");
    setCurrentState("ready4res");
    setIsLoadingQ(false);
  }

  const submitResponse = async () => {
    const tempUserMessages = [...userMessages, userResponse]
    setUserMessages(tempUserMessages);
    setIsLoadingR(true);
    const response = await fetch(`${API_URL}/interview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        job: job,
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
    setIsLoadingR(false);
    setAssistantMessages([...userMessages, messageResponse.content]);
    setEvaluation(messageResponse.content);
    setCurrentState("evaluated");
  }

  const askFollowUp = () => {
    setCurrentState("ready4fu")
  }

  return (
    <main className="flex flex-col items-center justify-start p-24 space-y-4 w-screen min-h-screen bg-gray-100 text-gray-700 space-y-6">
      {/*---Picture---*/}
      <div className="w-30 aspect-picture bg-white rounded-full border-2 border-white">
        <Image src={man_white_shirt}
          width={100}
          height={100}
          alt='' />
      </div>
      {/*---Job---*/}
      <div className='flex flex-col items-center justify-center space-y-2'>
        <span className="font-medium">Enter the job that you are applying for Here:</span>
        <input
          className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700"
          type="text"
          placeholder="Software Developer"
          onChange={(e) => setJob(e.target.value)} />
      </div>
      {isLoadingQ && <i className="fas fa-spinner fa-spin text-xl text-gray-500"></i>}
      <div className='flex flex-col justify-between'>
        {/*---Throw me a question button---*/}
        {currentState === 'waiting4Q' && (
          <button className="text-base sm:text-lg md:text-xl lg:text-2xl bg-gray-800 text-white hover:bg-gray-700 rounded-md px-2 py-1"
            onClick={getNewQuestion}>
            Throw me a question!
          </button>
        )}
        
        {/*---Question Display & Response Input---*/}
        {(currentState === 'ready4res'
          || currentState === 'evaluated'
          || currentState === 'ready4fu'
          || currentState === 'fuAnswered'
        ) && (
            <div className='flex flex-col space-y-4 justify-between items-center'>
              <span className="text-gray-800 font-semibold">Question:</span>
              <div className="px-3 py-1 rounded-md text-gray-700 bg-white border border-gray-300 h-20 overflow-y-auto">
                {question}
              </div>
              <span className="text-gray-800 font-semibold">Response:</span>
              <textarea
                className="px-3 py-1 rounded-md text-gray-700 bg-white border border-gray-300"
                rows={10}
                cols={50}
                placeholder="Your response goes here"
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)} />
              <button className="text-base sm:text-lg md:text-xl lg:text-2xl bg-gray-800 text-white hover:bg-gray-700 rounded-md px-2 py-1"
                onClick={submitResponse}>Submit response</button>
            </div>
          )}
      </div>
      {isLoadingR && <i className="fas fa-spinner fa-spin text-xl text-gray-500"></i>}
      <div className='flex flex-col justify-between'>
        {/*---Evaluation Display---*/}
        {currentState === "evaluated" && (
          <div className='flex flex-col space-y-4 justify-between items-center'>
            <span className="text-gray-800 font-semibold">Evaluation:</span>
            <div className="text-white bg-slate-500 font-medium border border-gray-300 rounded-md overflow-y-auto h-96 min-w-25rem px-3 py-1">
              {evaluation}
            </div>
            <div className="inline-flex space-x-4">
              <button className="text-base sm:text-lg md:text-xl lg:text-2xl bg-gray-800 text-white hover:bg-gray-700 rounded-md px-2 py-1"
                onClick={getNewQuestion}>
                New Question
              </button>
              <button className="text-base sm:text-lg md:text-xl lg:text-2xl bg-gray-800 text-white hover:bg-gray-700 rounded-md px-2 py-1"
                onClick={askFollowUp}>
                Follow-up
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        {/*---Follow up Chat UI---*/}
        {(currentState === 'ready4fu' || currentState === 'fuAnswered') && (
          <ChatUI
            mode={"interview"}
            job={job}
            userMessages={userMessages}
            setUserMessages={setUserMessages}
            assistantMessages={assistantMessages}
            setAssistantMessages={setAssistantMessages}
            currentState={currentState}
            setCurrentState={setCurrentState}
            getNewQuestion={getNewQuestion} />
        )}
      </div>
      <div>

      </div>
    </main>


  )
}
