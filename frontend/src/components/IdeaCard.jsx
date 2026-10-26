export default function IdeaCard({ idea, onDeleteIdea }) {
  return (
    <div 
      style={{ 
        padding: "15px", 
        border: "1px solid #e5e7eb", 
        borderRadius: "6px", 
        backgroundColor: "#f9fafb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <div>
        <h3 style={{ margin: "0 0 5px 0", color: "#111827" }}>{idea.title}</h3>
        <span style={{ display: "inline-block", fontSize: "12px", padding: "3px 8px", backgroundColor: "#e0f2fe", color: "#0369a1", borderRadius: "12px", fontWeight: "600" }}>
          {idea.category}
        </span>
      </div>
      
      <button
        onClick={() => onDeleteIdea(idea.id)}
        style={{
          padding: "6px 12px",
          backgroundColor: "#ef4444",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "13px"
        }}
        aria-label={`Delete ${idea.title}`}
      >
        Delete
      </button>
    </div>
  );
}
