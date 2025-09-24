const dotenv=require('dotenv');
dotenv.config();
const {GoogleGenerativeAI}=require("@google/generative-ai");
const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
async function runGemini(userInput){
    const model=genAI.getGenerativeModel({model:"gemini-1.5-flash"});
     const prompt = `
     You are a mood extraction assistant. 
     From the following text, extract only the moods or emotional states mentioned. 
     Return the result as a JSON array of strings without any extra words.
     Input: "${userInput}"`;

    const result=await model.generateContent(prompt);
    const response=await result.response;
    const text=response.text();
    return text;
}

module.exports=runGemini;