import { useState } from "react";
import { isValidTitle } from "../validation.mjs"; 

export default function IdeaForm({ onAddIdea }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("clubs"); 
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    if (!isValidTitle(title) || !category || isSaving) return;

    setIsSaving(true);
    setShowSuccess(false);

    const wasSuccessful = await onAddIdea({ title: title.trim(), category });

    if (wasSuccessful) {
      setTitle("");
      setCategory("clubs"); 
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }

    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <div>
        <label htmlFor="title" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Idea Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSaving}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid #ccc" }}
          placeholder="Enter your Idea"
          required
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="category" style={{ marginBottom: "5px", fontWeight: "bold" }}>Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={isSaving}
          style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        >
          <option value="clubs">Clubs</option>
          <option value="environment">Environment</option>
          <option value="academics">Academics</option>
          <option value="technology">Technology</option>
          <option value="facilities">Facilities</option>
          <option value="safety">Safety</option>
          <option value="career">Career</option>
          <option value="transit">Transit</option>
        </select>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <button 
          type="submit" 
          disabled={isSaving}
          style={{ 
            padding: "10px", 
            background: isSaving ? "#9ca3af" : "#0369a1", 
            color: "white", 
            border: "none", 
            borderRadius: "4px", 
            cursor: isSaving ? "not-allowed" : "pointer" 
          }}
        >
          {isSaving ? "Saving..." : "Add Idea"}
        </button>
        
        {showSuccess && (
          <span style={{ color: "#16a34a", fontWeight: "500" }}>
            ✓ Idea posted successfully!
          </span>
        )}
      </div>
    </form>
  );
}
