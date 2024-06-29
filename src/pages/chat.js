import {useEffect, useRef} from 'react';
import { Widget,
    addResponseMessage, 
    toggleWidget, 
    setQuickButtons, 
    toggleInputDisabled, addUserMessage} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
// import "react-chat-elements/dist/main.css"
// import { MessageBox } from "react-chat-elements";
// import { Input } from 'react-chat-elements'
import "../chat.css"

// have different set of questions defined here, or questions called here for different information
// import questions from '../UserInfoQuestions';
import {questions, generateInitialMenu as terminalFunction} from '../UserInfoQuestions';


function Chat() {

    let currentQuestionNumber = 0;
    let user_response = [];
    let input_visible = true;
    let open_chat_widget = false;
    

    const handleNewUserMessage = (newMessage) => {
        // console.log(`New message incoming! ${newMessage}`);
        enableInputField(false);
        // Now send the message throught the backend API
        ResponseHandler(currentQuestionNumber-1, newMessage);
      };

    const handleButtonClick = (value) => {
        const questionNum = parseInt(value.charAt(0), 10);
        const response = value.slice(1).trim();
        setQuickButtons([]);
        addUserMessage(response);

        if (currentQuestionNumber ===  questionNum) {
            ResponseHandler(questionNum -1, response);
        } else {
            addResponseMessage('Question Expired, Refresh to restart Conversation');
        }
    };

    const enableInputField = (show) => {
        if (show !== input_visible) {
            toggleInputDisabled();
            input_visible = show;
        }
    }

    const showChatWidget = (show) => {
        if (show !== open_chat_widget) {
            toggleWidget();
            open_chat_widget = show;
        }
    }

    const ResponseHandler = (questionNum, response) => {

        // update resonse in user response
        user_response[questionNum] = {...questions[questionNum]};
        user_response[questionNum]["Response"] = response;

        if (questions.length <= currentQuestionNumber) {
            console.log("Conversation Ended");
            terminalFunction(user_response);
        } else {
            AskNextQuestion();
        }        
    }

    const AskNextQuestion  = () => {
        if (questions.length > currentQuestionNumber) {
            const question = questions[currentQuestionNumber];
            currentQuestionNumber +=1;
            if (question.ResponseType === "label") {
                user_response[currentQuestionNumber-1] = {...question};
                user_response[currentQuestionNumber-1]["Response"] = "";

                addResponseMessage(question.Question);
                AskNextQuestion();
            } else if (question.ResponseType === "input") {
                addResponseMessage(question.Question);
                enableInputField(true);
            } else if (question.ResponseType === "buttons") {
                addResponseMessage(question.Question);
                const buttons = question.Options.map( option => (
                    {
                        ...option,
                        value: `${currentQuestionNumber}${option.value}`
                    }
                ));
                setQuickButtons(buttons);
            } else {
                throw new Error('question type not handled');
            }
        }
    }
      

    useEffect(() => {
        // toggleWidget();
        showChatWidget(true);
        enableInputField(false);

        AskNextQuestion();
    }, []
    );

    return (
        <>
            <Widget 
                handleNewUserMessage={handleNewUserMessage}
                fullScreenMode={false}
                handleQuickButtonClicked={handleButtonClick}
            />
        </>
    );
}

export default Chat;


