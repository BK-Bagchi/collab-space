import { StickyNote, PlusCircle } from "lucide-react";

const Notes = () => {
  const placeholderNotes = [
    {
      id: 1,
      title: "Project Meeting Summary",
      content: "Discussed UI layout, state structure, and task workflow…",
    },
    {
      id: 2,
      title: "Ideas for Next Sprint",
      content: "Add note sharing, tagging options, and search filter…",
    },
    {
      id: 3,
      title: "Important Reminders",
      content: "Refactor dashboard, optimize socket events…",
    },
  ];

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <StickyNote size={28} className="text-vibrantPurple" />
          <h2 className="text-2xl font-bold text-charcoalGray">Notes</h2>
        </div>

        <button
          disabled
          className="flex items-center gap-2 bg-gray-300 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed"
        >
          <PlusCircle size={20} />
          Add Note (Coming Soon)
        </button>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {placeholderNotes.map((note) => (
          <div
            key={note.id}
            className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-charcoalGray">
              {note.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2">{note.content}</p>

            <p className="mt-4 text-xs text-gray-400 italic">
              (Full notes feature coming in next version)
            </p>
          </div>
        ))}
      </div>

      {/* Footer Message */}
      <p className="mt-6 text-center text-gray-500 text-sm">
        ✨ Note-taking feature is in development — stay tuned!
      </p>
    </div>
  );
};

export default Notes;
