import { useState } from "react";

const useAskAi = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (input, setInput) => {
    if (input.trim() === "") return; // Prevent empty messages

    // Add user's message
    const userMessage = { text: input, sender: "me" };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    // Set loading state
    setIsLoading(true);

    try {
      // Fetch AI response from API
      const response = await fetch("http://localhost:8000/api/ai/ask-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { text: data.data, sender: "ChatGpt" },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "AI could not generate a response", sender: "ChatGpt" },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Error reaching AI service", sender: "ChatGpt" },
      ]);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return { messages, sendMessage, isLoading };
};

export default useAskAi;
