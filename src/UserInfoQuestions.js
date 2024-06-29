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
    console.log("Add routine to generate menu from chat gpt and populate in menu maker list");
    console.log(user_response);
} 

// questions, terminal function
export {questions, generateInitialMenu};
