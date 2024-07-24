const respostaDiv = document.querySelector("#resposta-da-ia");
const textarea = document.querySelector("textarea");
const submit = document.querySelector("input[type=submit]");

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDw7wzUU8n-LxAeofoUL1DMqSRFQNIejjQ";

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

submit.addEventListener("click", async () => {
  if(textarea.value.trim().length == 0) {
    return;
  }
  console.log("foi")
  const result = await model.generateContent(textarea.value);
  const response = await result.response;
  const text = response.text();
  respostaDiv.innerHTML = markdown.toHTML(text);
})