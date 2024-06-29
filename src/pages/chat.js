import {useEffect, useRef} from 'react';
import { Widget,
    addResponseMessage, 
    toggleWidget, 
    setQuickButtons, 
    toggleInputDisabled, addUserMessage} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import "../chat.css"
import {questions, generateInitialMenu as terminalFunction} from '../UserInfoQuestions';


function Chat() {

    let currentQuestionNumber = useRef(0);
    let user_response = [];
    let input_visible = useRef(true);
    let open_chat_widget = useRef(false);
    const hasEffectRun = useRef(false);
    

    const handleNewUserMessage = (newMessage) => {
        // console.log(`New message incoming! ${newMessage}`);
        enableInputField(false);
        // Now send the message throught the backend API
        ResponseHandler(currentQuestionNumber.current-1, newMessage);
      };

    const handleButtonClick = (value) => {

        setQuickButtons([]);
        addUserMessage(value);
        ResponseHandler(currentQuestionNumber.current -1, value);

    };

    const enableInputField = (show) => {
        if (show !== input_visible.current) {
            toggleInputDisabled();
            input_visible.current = show;
        }
    }

    const showChatWidget = (show) => {
        if (show !== open_chat_widget.current) {
            toggleWidget();
            open_chat_widget.current = show;
        }
    }

    const ResponseHandler = (questionNum, response) => {

        // update resonse in user response
        user_response[questionNum] = {...questions[questionNum]};
        user_response[questionNum]["Response"] = response;
        // console.log(user_response);

        if (questions.length <= currentQuestionNumber.current) {
            console.log("Conversation Ended");
            terminalFunction(user_response);
        } else {
            AskNextQuestion();
        }        
    }

    const AskNextQuestion  = () => {

        if (questions.length > currentQuestionNumber.current) {
            const question = questions[currentQuestionNumber.current];
            currentQuestionNumber.current +=1;
            if (question.ResponseType === "label") {
                user_response[currentQuestionNumber.current-1] = {...question};
                user_response[currentQuestionNumber.current-1]["Response"] = "";
                // console.log(user_response);

                addResponseMessage(question.Question);
                AskNextQuestion();
            } else if (question.ResponseType === "input") {
                addResponseMessage(question.Question);
                enableInputField(true);
            } else if (question.ResponseType === "buttons") {
                addResponseMessage(question.Question);
                setQuickButtons(question.Options);
            } else {
                throw new Error('question type not handled');
            }
        }
    }
      
    useEffect(() => {
        if (hasEffectRun.current) return;

        showChatWidget(true);
        enableInputField(false);
        AskNextQuestion();
        hasEffectRun.current = true;
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


