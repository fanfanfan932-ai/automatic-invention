export default function SuccessAlert({ message }) {
  if (!message) return null;

  return <p className="mb-4 rounded-lg bg-emerald-100 p-3 text-emerald-700">✅ {message}</p>;
}
