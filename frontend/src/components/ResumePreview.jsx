export default function ResumePreview({ data }) {
  return (
    <div className="p-4 border">
      <h1 className="text-2xl font-bold">{data.fullName}</h1>
      <p>{data.summary}</p>
    </div>
  );
}
