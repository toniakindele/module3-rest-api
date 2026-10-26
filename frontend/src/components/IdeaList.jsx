import IdeaCard from "./IdeaCard.jsx";

export default function IdeaList({ ideas, onDeleteIdea }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <h2>Current Ideas</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} onDeleteIdea={onDeleteIdea} />
        ))}
      </div>
    </div>
  );
}
