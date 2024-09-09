// Importando a biblioteca da Google Generative AI
import { GoogleGenerativeAI } from "@google/generative-ai";

// Selecionando os elementos do DOM
const respostaDiv = document.querySelector("#resposta-da-ia");
const textarea = document.querySelector("textarea");
const submit = document.querySelector("input[type=submit]");

// Chave da API do Google Generative AI
const API_KEY = "AIzaSyDw7wzUU8n-LxAeofoUL1DMqSRFQNIejjQ";

// Inicializando o cliente Google Generative AI
const genAI = new GoogleGenerativeAI(API_KEY);

// Função para obter o modelo e iniciar a conversa com a IA
async function iniciarChat() {
  try {
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = await model.startChat();
    return chat;
  } catch (error) {
    console.error("Erro ao iniciar o chat com a IA:", error);
  }
}

submit.addEventListener("click", async () => {
  if (textarea.value.trim().length === 0) {
    return;
  }

  try {
    const chat = await iniciarChat();
    const result = await chat.sendMessage(textarea.value);
    const response = await result.response.text(); // Corrigido para receber o texto diretamente
    respostaDiv.innerHTML = markdown.toHTML(response);
  } catch (error) {
    console.error("Erro ao enviar mensagem para IA:", error);
    respostaDiv.innerHTML = "<p>Erro ao obter a resposta. Tente novamente mais tarde.</p>";
  }
});
