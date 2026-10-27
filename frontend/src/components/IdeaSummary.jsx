export default function IdeaSummary({ ideas }) {
  const totalCount = ideas.length;
  
  
  const categories = [...new Set(ideas.map((i) => i.category).filter(Boolean))];

  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "20px", padding: "10px", backgroundColor: "#f3f4f6", borderRadius: "6px" }}>
      <div>
        <strong>Total Ideas:</strong> {totalCount}
      </div>
    </div>
  );
}
