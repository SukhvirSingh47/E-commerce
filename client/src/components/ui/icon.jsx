export default function SocialIcon({ icon }) {
  return (
    <button
      className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center
      text-gray-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition"
    >
      {icon}
    </button>
  );
}
