import { useState } from "react";
import { sendPrompt } from "./api";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");

  const [geminiResponse, setGeminiResponse] = useState("");
  const [ollamaResponse, setOllamaResponse] = useState("");

  const [geminiLoading, setGeminiLoading] = useState(false);
  const [ollamaLoading, setOllamaLoading] = useState(false);

  const [geminiError, setGeminiError] = useState("");
  const [ollamaError, setOllamaError] = useState("");

  const [darkMode, setDarkMode] = useState(true);

  const loading = geminiLoading || ollamaLoading;

  const handleSubmit = () => {
    const message = prompt.trim();

    if (!message || loading) {
      return;
    }

    setGeminiResponse("");
    setOllamaResponse("");

    setGeminiError("");
    setOllamaError("");

    setGeminiLoading(true);
    setOllamaLoading(true);

    // Gemini request
    sendPrompt("gemini", message)
      .then((response) => {
        setGeminiResponse(response);
      })
      .catch((error) => {
        setGeminiError(
          error.message || "Failed to fetch Gemini response"
        );
      })
      .finally(() => {
        setGeminiLoading(false);
      });

    // Ollama request
    sendPrompt("ollama", message)
      .then((response) => {
        setOllamaResponse(response);
      })
      .catch((error) => {
        setOllamaError(
          error.message || "Failed to fetch Ollama response"
        );
      })
      .finally(() => {
        setOllamaLoading(false);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (!loading && prompt.trim()) {
        handleSubmit();
      }
    }
  };

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <header className="header">
        <h1>MultiResAi</h1>

        <button
          className="theme-button"
          onClick={() => setDarkMode((current) => !current)}
        >
          {darkMode ? "Light" : "Dark"}
        </button>
      </header>

      <main className="main">
        <section className="prompt-section">
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your prompt..."
            disabled={loading}
          />

          <div className="prompt-footer">
            <span>
              Enter to send · Shift + Enter for a new line
            </span>

            <button
              className="send-button"
              onClick={handleSubmit}
              disabled={!prompt.trim() || loading}
            >
              {loading ? (
                <>
                  <span className="button-spinner"></span>
                  Sending
                </>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </section>

        <section className="responses">
          {/* Gemini */}
          <div className="response-card">
            <div className="response-header">
              <h2>Gemini</h2>
            </div>

            <div className="response-content">
              {geminiLoading ? (
                <div className="loading">
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <p>Generating response...</p>
                </div>
              ) : geminiError ? (
                <div className="response-error">
                  {geminiError}
                </div>
              ) : geminiResponse ? (
                <p>{geminiResponse}</p>
              ) : (
                <div className="empty-state">
                  Gemini response will appear here.
                </div>
              )}
            </div>
          </div>

          {/* Ollama */}
          <div className="response-card">
            <div className="response-header">
              <h2>Ollama</h2>
            </div>

            <div className="response-content">
              {ollamaLoading ? (
                <div className="loading">
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <p>Generating response...</p>
                </div>
              ) : ollamaError ? (
                <div className="response-error">
                  {ollamaError}
                </div>
              ) : ollamaResponse ? (
                <p>{ollamaResponse}</p>
              ) : (
                <div className="empty-state">
                  Ollama response will appear here.
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;