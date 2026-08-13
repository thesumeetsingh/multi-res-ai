import { useState } from "react";
import { sendPrompt } from "./api";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");

  const [geminiResponse, setGeminiResponse] = useState("");
  const [ollamaResponse, setOllamaResponse] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [darkMode, setDarkMode] = useState(true);

  const handleSubmit = async () => {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt || loading) {
      return;
    }

    setLoading(true);
    setError("");

    setGeminiResponse("");
    setOllamaResponse("");

    try {
      const data = await sendPrompt(trimmedPrompt);

      setGeminiResponse(data.gemini || "");
      setOllamaResponse(data.ollama || "");
    } catch (err) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
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
          onClick={() => setDarkMode(!darkMode)}
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

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <section className="responses">
          <div className="response-card">
            <div className="response-header">
              <h2>Gemini</h2>
            </div>

            <div className="response-content">
              {loading ? (
                <div className="loading">
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <p>Generating response...</p>
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

          <div className="response-card">
            <div className="response-header">
              <h2>Ollama</h2>
            </div>

            <div className="response-content">
              {loading ? (
                <div className="loading">
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <p>Generating response...</p>
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