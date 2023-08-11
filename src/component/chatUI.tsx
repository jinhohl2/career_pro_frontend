import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { API_URL } from '../globals';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface Props {
  mode: string,
  job: string,
  userMessages: string[],
  setUserMessages: any,
  assistantMessages: string[],
  setAssistantMessages: any,
  currentState: string,
  setCurrentState: any,
  getNewQuestion: any
}

export default function ChatUI({ mode, job, userMessages, setUserMessages, assistantMessages, setAssistantMessages, currentState, setCurrentState, getNewQuestion }: Props) {
  const alternatingRole = ['User', 'Coach']
  const alternatingStyle = ['text-green-600  mb-1', 'text-blue-600']
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getFuResponse = async () => {
    if (mode === "interview") {
      setIsLoading(true);
      const tempUserMessages = [...userMessages, "Here is a follow-up question: " + userInput]
      var tempChatHistory = [...chatHistory, userInput];
      setUserMessages(tempUserMessages);
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
      tempChatHistory = [...tempChatHistory, messageResponse.content]
      setAssistantMessages([...assistantMessages, messageResponse.content]);
      setChatHistory(tempChatHistory);
      setCurrentState("fuAnswered");
      setIsLoading(false);
    }

    if(mode==='prompt') {
      const tempUserMessages = [...userMessages, "Here is a follow-up question: " + userInput]
      var tempChatHistory = [...chatHistory, userInput];
      setIsLoading(true);
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
      tempChatHistory = [...tempChatHistory, messageResponse.content]
      setIsLoading(false);
      setAssistantMessages([...assistantMessages, messageResponse.content]);
      setChatHistory(tempChatHistory);
      setCurrentState("fuAnswered");
    }
  }

  const askFU = (() => {
    console.log(chatHistory)
    setCurrentState('ready4fu')
  })

  const startNewQuestion = (() => {
    getNewQuestion()
  })

  return (
    <div className="flex flex-col items-center justify-center border-2 border-black">
  <div className="p-6 bg-white text-black rounded shadow-md w-96">
    <div className="overflow-y-auto h-64 mb-4 border border-gray-300 rounded p-3">
      {chatHistory.map((chat, index) => (
        <div key={index} className="mb-2">
          <div className={alternatingStyle[index % 2]}> {alternatingRole[index % 2]}: {chat}</div>
        </div>
      ))}
      {isLoading && <i className="fas fa-spinner fa-spin text-xl text-gray-500"></i>}
    </div>

    {(currentState == 'ready4fu') && (
      <div>
        <input
          type="text"
          onChange={(e) => setUserInput(e.target.value)}
          className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-gray-100 placeholder-gray-800"
          placeholder="Type your message here"
        />
        <div>
          <button
            className="w-full px-3 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md"
            onClick={getFuResponse}
          >
            Ask a follow-up question
          </button>
          <button
            onClick={startNewQuestion}
            className="w-full px-3 py-2 mt-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md"
          >
            New Instance
          </button>
          </div>
        </div>
      )}

    {(currentState === 'fuAnswered') && (
      <div>
        <button
          onClick={askFU}
          className="mb-2 w-full px-3 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md"
        >
          Ask Another Follow-up
        </button>
        <button
          onClick={startNewQuestion}
          className="w-full px-3 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md"
        >
          New Instance
        </button>
      </div>
    )}
  </div>
</div>


  );
}
