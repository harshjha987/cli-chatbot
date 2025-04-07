"use server"

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"

const apiKey  = process.env.GEMINI_API_KEY
const modelName = "gemini-1.5-pro";

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 2048,
    responseMimeType: "text/plain",
  }
  const SAFETY_SETTINGS = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  ]

type Message = {
    role : "user" | "bot"
    content : string
}

export async function chatWithBot(userInput : string , prevMessages : Message[]){
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is not set")
      }
    try {
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({
            model : modelName,
           
        })
        const history = prevMessages.map((msg) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
          }))

        const chat = model.startChat({
            generationConfig,
            safetySettings : SAFETY_SETTINGS,
            history ,
        })

        const result = await chat.sendMessage(userInput)

        const response = result.response.text()
        return response


        
    } catch (error) {
        console.error("Error in chatWithGemini:", error)
    throw new Error("Failed to get response from Gemini")
        
    }
}