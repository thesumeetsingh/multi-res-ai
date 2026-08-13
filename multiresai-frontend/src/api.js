const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendPrompt = async (model, message) => {
  const encodedMessage = encodeURIComponent(message);

  const response = await fetch(
    `${API_BASE_URL}/${model}/${encodedMessage}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to get response from ${model}`
    );
  }

  return await response.text();
};