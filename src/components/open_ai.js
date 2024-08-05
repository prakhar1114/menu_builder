import OpenAI from "openai";
// require openai;

const assistantId = process.env.REACT_APP_MEAL_PLAN_ASSISTANT;
const openapi_key = process.env.REACT_APP_OPENAI_API_KEY;
const project_id = process.env.REACT_APP_PROJECT_ID;
const org_id = process.env.REACT_APP_ORGANIZATION_ID;
// const openai = new OpenAI({
//     apiKey: openapi_key,
//     organization: org_id,
//     project: project_id,
//     dangerouslyAllowBrowser: true
// });


const getFirstResponse = async (user_responses, thread) => {
    try {
        const message = await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: `${user_responses}`,
        });
        const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
            assistant_id: assistantId,
        });
    
        const threadMessages = await openai.beta.threads.messages.list(thread.id);

        if (threadMessages.data.length > 0 && threadMessages.data[0].content[0].text) {
            console.log("New message");
            console.log(threadMessages.data[0].content[0].text.value);
            return threadMessages.data[0].content[0].text.value;
        } else {
            console.error("No response found in the thread.");
            return null;
        }

    } catch (error) {
        console.error("An error occurred: ", error);
        return null;
    }
}

const generateFullMealPlan = async (user_responses) => {

    const thread = await openai.beta.threads.create();

    let response = await getFirstResponse(user_responses, thread);
    let count = 0
    let response_valid = false

    while (response_valid || count < 3) {
        const { isValid, reason } = isValidMealSchedule(response);
        response_valid = isValid;
        count++;
        if (!isValid) {
            console.log(reason);
            await openai.beta.threads.messages.create(thread.id, {
                role: "user",
                content: reason,
            });
            response = await createRunAndGetResponse(thread);
            
        } else {
            console.log("valid meal schedule")
            break;
        }
    }
    return response

}

async function createRunAndGetResponse(thread) {
    try {
        const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
            assistant_id: assistantId,
        }); 

        const threadMessages = await openai.beta.threads.messages.list(thread.id);

        if (threadMessages.data.length > 0 && threadMessages.data[0].content[0].text) {
            console.log("New message");
            console.log(threadMessages.data[0].content[0].text.value);
            return threadMessages.data[0].content[0].text.value;
        } else {
            console.error("No response found in the thread.");
            return null;
        }

    } catch (error) {
        console.error("An error occurred: ", error);
        return null;
    }

}

function isValidMealSchedule(response) {

    let schedule;
    try {
        schedule = JSON.parse(response); // Try parsing the text as JSON
    } catch (error) {
        return { isValid: false, reason: "The provided string is not valid JSON. Correct the response." };
    }

    const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    if (!Array.isArray(schedule)) {
        return { isValid: false, reason: "The schedule is not an array. Correct the response." };
    }
    
    if (schedule.length !== 7) {
        return { isValid: false, reason: "The schedule does not contain exactly seven days. Correct the response." };
    }

    const daysEncountered = new Set();

    for (const entry of schedule) {
        if (typeof entry !== 'object' || entry === null) {
            return { isValid: false, reason: "One or more entries are not valid objects. Correct the response." };
        }

        if (!('Day' in entry && 'Breakfast' in entry && 'Lunch' in entry && 'Dinner' in entry)) {
            return { isValid: false, reason: "An entry is missing one or more required keys (Day, Breakfast, Lunch, Dinner). Correct the response." };
        }

        if (!validDays.includes(entry.Day)) {
            return { isValid: false, reason: `Invalid day found: ${entry.Day}. Correct the response.` };
        }

        if (daysEncountered.has(entry.Day)) {
            return { isValid: false, reason: `Duplicate day found: ${entry.Day}. Correct the response.` };
        }
        daysEncountered.add(entry.Day);

        if (typeof entry.Breakfast !== 'string' || entry.Breakfast.trim() === '' ||
            typeof entry.Lunch !== 'string' || entry.Lunch.trim() === '' ||
            typeof entry.Dinner !== 'string' || entry.Dinner.trim() === '') {
            return { isValid: false, reason: `Meal entries must be non-empty strings. Found an issue in entry for ${entry.Day}. Correct the response.` };
        }
    }

    if (daysEncountered.size !== 7) {
        return { isValid: false, reason: "Not all days of the week are present. Correct the response." };
    }

    return { isValid: true, reason: "The meal schedule is valid." };
}

export {generateFullMealPlan};


