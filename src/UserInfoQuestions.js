import { generateFullMealPlan } from './components/open_ai';
import { useNavigate } from "react-router-dom";


const openapi_key = process.env.OPENAI_API_KEY;


// Rules for questions should always end with buttons ResponseType which should take to next page or action
const questions = [
    {
        id: 0,
        Question: "We will now try to generate a simple meal plan for you. For this, I will ask you a few questions.",
        ResponseType: "label",
        Response: ""
    },
    {
        id: 1,
        Question: "Where are you from? City, State, Country?",
        ResponseType: "input",
        Response: ""
    },
    {
        id: 2,
        Question: "Are you a vegetatian or non vegetarian",
        ResponseType: "buttons",
        Options: [
            {
                label: "Vegetarian",
                value: "Vegetarian"
            },
            {
                label: "Non-Vegetarian",
                value: "Non-Vegetarian"
            }
        ],
        Response: ""
    },
    {
        id: 3,
        Question: "Describe your meal preferences, what you like dont like etc. Be long if you like.",
        ResponseType: "input",
        Response: ""
    },
    {
        id: 4,
        Question: "Now, we will autogenerate a meal plan based on this information. You can come back to edit these selections any time you like.",
        ResponseType: "buttons",
        Options: [
            {
                label: "OK",
                value: "OK"
            }
        ],
        Response: ""
    },
]

const generateInitialMenu = (user_response) => {
    // const navigate = useNavigate();
    const user_data = user_response.map((question)=> 
        {
            return {
                "Question": question.Question,
                "Response": question.Response,
            }
        }
    )
    console.log(user_data);

    const meal_plan = generateFullMealPlan(user_data);

    // navigate('/editable-list-mode')

    return meal_plan;

} 

export {questions, generateInitialMenu};
