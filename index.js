import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  import chalk from "chalk";
  import ora from "ora";
  import prompt from "prompt-sync";
  import 'dotenv/config'
  

  const promptSync = prompt()
 
  const modelName = "gemini-1.5-pro"
  const apiKey = process.env.GEMINI_API_KEY
  
  
  
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 2048,
    responseModalities: [
    ],
    responseMimeType: "text/plain",
  };
  const SAFETY_SETTINGS = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];


async function run() {
    const spinner = ora("Initializing chat...").start();
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
  
        const model = genAI.getGenerativeModel({
        model: modelName,});

        const chat = model.startChat({
            generationConfig : generationConfig,
            safetySettings : SAFETY_SETTINGS,
            history : [],
        });
        spinner.stop()
        while(true){
            const userInput = promptSync(chalk.green("Harsh: "))
            if(userInput.toLowerCase() === "close"){
                console.log(chalk.yellow('Bye Harsh!'));
                process.exit(0);
            }
            const result = await chat.sendMessage(userInput);
            if (result.error) {
                console.error(chalk.red('AI Error:'), result.error.message);
                continue;
            }
            const response = result.response.text();
            console.log(chalk.blue('Bot: '),response);
        }
        
  
  
    } catch (error) {
        spinner.stop();
        console.error(chalk.red('An error occured: '),error.message);
        process.exit(1);
        
    }
    
  }
  
  run();