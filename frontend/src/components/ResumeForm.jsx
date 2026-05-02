export default function ResumeForm({ data, setData }) {
  return (
    <div>
      <input
        placeholder="Full Name"
        className="border p-2 w-full mb-2"
        onChange={(e) => setData({ ...data, fullName: e.target.value })}
      />

      <textarea
        placeholder="Summary"
        className="border p-2 w-full mb-2"
        onChange={(e) => setData({ ...data, summary: e.target.value })}
      />
    </div>
  );
}
