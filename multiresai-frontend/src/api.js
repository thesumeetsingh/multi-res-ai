const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendPrompt = async (prompt) => {
  const encodedPrompt = encodeURIComponent(prompt);

  const response = await fetch(
    `${API_BASE_URL}/generate/${encodedPrompt}`
  );

  if (!response.ok) {
    throw new Error("Failed to get response from backend");
  }

  const data = await response.json();

  return data;
};