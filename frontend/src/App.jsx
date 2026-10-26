import { useState, useEffect } from "react";
import IdeaForm from "./components/IdeaForm.jsx";
import IdeaList from "./components/IdeaList.jsx";
import IdeaSummary from "./components/IdeaSummary.jsx";

export default function App() {
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReadError, setIsReadError] = useState(false); 

  const API_URL = "http://localhost:8080/api/ideas";
  const LOCAL_STORAGE_KEY = "toni_campus_board_ideas";

  useEffect(() => {
    const controller = new AbortController();
    fetchInitialIdeas(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  const fetchInitialIdeas = async (signal) => {
    setIsLoading(true);
    setError(null);
    setIsReadError(false);
    try {
      const response = await fetch(API_URL, { signal });
      if (!response.ok) throw new Error("Failed to read initial ideas from the server.");
      const serverSeeds = await response.json();

      const localSaved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (localSaved) {
        setIdeas(JSON.parse(localSaved));
      } else {
        setIdeas(serverSeeds);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(serverSeeds));
      }
    } catch (err) {
      if (err.name === "AbortError" || signal?.aborted) {
        return; 
      }
      setError(err.message || "Failed to fetch ideas.");
      setIsReadError(true); 
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  };

  const handleManualRetry = () => {
    fetchInitialIdeas();
  };

  const handleAddIdea = async (newIdea) => {
    const trimmedTitle = (newIdea.title || "").trim();
    if (!trimmedTitle) {
      setError("Validation Error: Title cannot be empty or spaces only.");
      return false;
    }

    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: trimmedTitle, category: newIdea.category }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Could not save your idea. Server rejected request.");
      }

      const createdIdea = await response.json();

      setIdeas((prevIdeas) => {
        const updated = [...prevIdeas, createdIdea];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });

      return true;
    } catch (err) {
      setError(err.message || "Failed to fetch"); 
      return false;
    }
  };

  const handleDeleteIdea = (id) => {
    setIdeas((prevIdeas) => {
      const filtered = prevIdeas.filter((idea) => idea.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
      return filtered;
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "0 20px", fontFamily: "sans-serif" }}>
      <h1>Toni's Campus Idea Board</h1>
      
      {error && (
        <div style={{ color: "#b91c1c", backgroundColor: "#fee2e2", padding: "12px", borderRadius: "4px", border: "1px solid #fca5a5", marginBottom: "20px" }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <IdeaForm onAddIdea={handleAddIdea} />
      
      <hr style={{ margin: "30px 0", border: "0", borderTop: "1px solid #ccc" }} />
      
      <IdeaSummary ideas={ideas} />
      
      {isLoading ? (
        <p style={{ color: "#666", fontStyle: "italic" }}>Loading ideas…</p>
      ) : isReadError ? (
        <div style={{ textAlign: "center", padding: "20px", border: "1px dashed #ccc", borderRadius: "6px" }}>
          <p style={{ color: "#666" }}>Error: Sever failed, cannot display list. Please "Retry Loading".</p>
          <button 
            onClick={handleManualRetry} 
            style={{ padding: "10px 20px", backgroundColor: "#4b5563", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
          >
            Retry Loading
          </button>
        </div>
      ) : ideas.length === 0 ? (
        <p style={{ color: "#666" }}>No ideas yet. Please submit an idea.</p>
      ) : (
        <IdeaList ideas={ideas} onDeleteIdea={handleDeleteIdea} />
      )}
    </div>
  );
}
