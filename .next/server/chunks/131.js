"use strict";
exports.id = 131;
exports.ids = [131];
exports.modules = {

/***/ 823:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/man_white_shirt.f1f3db19.png","height":1024,"width":1024,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAA00lEQVR42gHIADf/APz9/f7//9za2aqWjqeVj+Lg4P////z8/AD////d3d1nPiiIUzN7RBx4Ylrk5OT///8A////qaCdsZKHu6Oax62kxqKVoJWR/P39AP3+/66emdCwpPPRxfXSxtW2qquXkfn6+wD6+/zCtLHZsKbmxLnnxrvasqfBsa32+PgA////3dzd7szD9M/C8My/8c7F29nZ/v7+APz9/f///9HS0rippbqppc3Nzf////79/gD9/f35+fni4OC0u8Gttb3h4N/4+Pj6/PpilZrdfMXOBgAAAABJRU5ErkJggg==","blurWidth":8,"blurHeight":8});

/***/ }),

/***/ 9779:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ ChatUI)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6011);
/* harmony import */ var _fortawesome_fontawesome_free_css_all_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4595);
/* harmony import */ var _fortawesome_fontawesome_free_css_all_min_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_free_css_all_min_css__WEBPACK_IMPORTED_MODULE_2__);




function ChatUI({ mode , job , userMessages , setUserMessages , assistantMessages , setAssistantMessages , currentState , setCurrentState , getNewQuestion  }) {
    const alternatingRole = [
        "User",
        "Coach"
    ];
    const alternatingStyle = [
        "text-green-600  mb-1",
        "text-blue-600"
    ];
    const [chatHistory, setChatHistory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [userInput, setUserInput] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const getFuResponse = async ()=>{
        if (mode === "interview") {
            setIsLoading(true);
            const tempUserMessages = [
                ...userMessages,
                "Here is a follow-up question: " + userInput
            ];
            var tempChatHistory = [
                ...chatHistory,
                userInput
            ];
            setUserMessages(tempUserMessages);
            const response = await fetch(`${_globals__WEBPACK_IMPORTED_MODULE_3__/* .API_URL */ .T}/interview`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    job: job,
                    userMessages: tempUserMessages,
                    assistantMessages: assistantMessages
                })
            });
            if (!response.ok) {
                console.log(response.statusText);
            }
            const messageResponse = await response.json();
            tempChatHistory = [
                ...tempChatHistory,
                messageResponse.content
            ];
            setAssistantMessages([
                ...assistantMessages,
                messageResponse.content
            ]);
            setChatHistory(tempChatHistory);
            setCurrentState("fuAnswered");
            setIsLoading(false);
        }
        if (mode === "prompt") {
            const tempUserMessages = [
                ...userMessages,
                "Here is a follow-up question: " + userInput
            ];
            var tempChatHistory = [
                ...chatHistory,
                userInput
            ];
            setIsLoading(true);
            setUserMessages(tempUserMessages);
            const response = await fetch(`${_globals__WEBPACK_IMPORTED_MODULE_3__/* .API_URL */ .T}/prompt`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userMessages: tempUserMessages,
                    assistantMessages: assistantMessages
                })
            });
            if (!response.ok) {
                console.log(response.statusText);
            }
            const messageResponse = await response.json();
            tempChatHistory = [
                ...tempChatHistory,
                messageResponse.content
            ];
            setIsLoading(false);
            setAssistantMessages([
                ...assistantMessages,
                messageResponse.content
            ]);
            setChatHistory(tempChatHistory);
            setCurrentState("fuAnswered");
        }
    };
    const askFU = ()=>{
        console.log(chatHistory);
        setCurrentState("ready4fu");
    };
    const startNewQuestion = ()=>{
        getNewQuestion();
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "flex flex-col items-center justify-center border-2 border-black",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "p-6 bg-white text-black rounded shadow-md w-96",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "overflow-y-auto h-64 mb-4 border border-gray-300 rounded p-3",
                    children: [
                        chatHistory.map((chat, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "mb-2",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: alternatingStyle[index % 2],
                                    children: [
                                        " ",
                                        alternatingRole[index % 2],
                                        ": ",
                                        chat
                                    ]
                                })
                            }, index)),
                        isLoading && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                            className: "fas fa-spinner fa-spin text-xl text-gray-500"
                        })
                    ]
                }),
                currentState == "ready4fu" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            type: "text",
                            onChange: (e)=>setUserInput(e.target.value),
                            className: "mb-2 w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-gray-100 placeholder-gray-800",
                            placeholder: "Type your message here"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "w-full px-3 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md",
                                    onClick: getFuResponse,
                                    children: "Ask a follow-up question"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    onClick: startNewQuestion,
                                    className: "w-full px-3 py-2 mt-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md",
                                    children: "New Instance"
                                })
                            ]
                        })
                    ]
                }),
                currentState === "fuAnswered" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            onClick: askFU,
                            className: "mb-2 w-full px-3 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md",
                            children: "Ask Another Follow-up"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            onClick: startNewQuestion,
                            className: "w-full px-3 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md",
                            children: "New Instance"
                        })
                    ]
                })
            ]
        })
    });
}


/***/ }),

/***/ 6011:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "T": () => (/* binding */ API_URL)
/* harmony export */ });
const API_URL = "https://eromrhyte7ehpe5vv3xqhmr5iu0duldb.lambda-url.us-east-1.on.aws";


/***/ })

};
;