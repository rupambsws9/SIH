const responses = {
  hi: "Hello! How can I assist you today?",
  "what is the capital of france?": "The capital of France is Paris.",
  "who wrote 'to kill a mockingbird'?":
    "Harper Lee wrote 'To Kill a Mockingbird'.",
  "what is the largest planet in our solar system?":
    "The largest planet in our solar system is Jupiter.",
  default: "Sorry, I didn't understand that. Can you please rephrase?",
};

document.getElementById("send-btn").addEventListener("click", () => {
  const userInput = document
    .getElementById("user-input")
    .value.trim()
    .toLowerCase();
  if (userInput) {
    addMessage(userInput, "user-message");
    const response = getResponse(userInput);
    setTimeout(() => addMessage(response, "bot-message"), 500); // Delay for effect
    document.getElementById("user-input").value = "";
  }
});

function addMessage(text, className) {
  const chatContent = document.getElementById("chat-content");
  const messageDiv = document.createElement("div");
  messageDiv.className = `chat-message ${className}`;
  messageDiv.innerText = text;
  chatContent.appendChild(messageDiv);
  chatContent.scrollTop = chatContent.scrollHeight; // Scroll to bottom
}

function getResponse(input) {
  return responses[input] || responses["default"];
}
