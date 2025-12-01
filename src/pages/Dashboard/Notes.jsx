import { useEffect, useState } from "react";
//prettier-ignore
import { Archive, CheckCircle2, Circle, FileText, ListTodo, Pin, PlusCircle, StickyNote } from "lucide-react";
import { NoteAPI } from "../../api";
import Loading from "../../components/Loading/Loading";
import Modal from "../../components/Modal/Modal";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | pinned | archived
  const [open, setOpen] = useState(false);
  const [addNote, setAddNote] = useState(false);
  const [addTodo, setAddTodo] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await NoteAPI.getUserNotes();
        setNotes(res.data.notes);
      } catch (error) {
        console.warn("Error fetching notes:", error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);
  // console.log(notes);

  const filteredNotes = notes.filter((n) => {
    if (filter === "pinned") return n.pinned && !n.archived;
    if (filter === "archived") return n.archived;
    return !n.archived;
  });

  return (
    <div className="animate-fadeIn pb-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <StickyNote size={28} className="text-vibrantPurple" />
          <h2 className="text-2xl font-bold text-charcoalGray">Notes</h2>
        </div>

        {!loading && (
          <div className="relative">
            {/* MAIN BUTTON */}
            <button
              className="flex items-center gap-2 bg-electricBlue text-softWhite px-4 py-2 rounded-lg cursor-pointer hover:bg-electricBlue/90 transition"
              onClick={() => setOpen(!open)}
            >
              <PlusCircle size={20} />
              Add Note
            </button>

            {/* DROPDOWN MENU */}
            {open && (
              <div
                className="absolute right-0 mt-2 bg-white border border-gray-200 shadow-lg 
          rounded-lg w-40 overflow-hidden animate-fadeIn z-50"
              >
                {/* Add Text Note */}
                <button
                  className="w-full flex items-center gap-2 px-4 py-2 text-charcoalGray 
            hover:bg-[#2979FF]/10 transition text-sm cursor-pointer"
                  onClick={() => {
                    setOpen(false);
                    setAddNote(true);
                  }}
                >
                  <FileText size={16} className="text-electricBlue" />
                  Text Note
                </button>

                {/* Add Todo Note */}
                <button
                  className="w-full flex items-center gap-2 px-4 py-2 text-charcoalGray 
            hover:bg-[#8E24AA]/10 transition text-sm cursor-pointer border-t"
                  onClick={() => {
                    setOpen(false);
                    setAddTodo(true);
                  }}
                >
                  <ListTodo size={16} className="text-vibrantPurple" />
                  Todo Note
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <Loading loading={loading}>
        {/* FILTER BUTTONS */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg border text-sm transition ${
              filter === "all"
                ? "bg-electricBlue text-white"
                : "bg-white text-charcoalGray border-gray-300"
            }`}
          >
            All Notes
          </button>

          <button
            onClick={() => setFilter("pinned")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition ${
              filter === "pinned"
                ? "bg-vibrantPurple text-white"
                : "bg-white text-charcoalGray border-gray-300"
            }`}
          >
            <Pin size={16} />
            Pinned
          </button>

          <button
            onClick={() => setFilter("archived")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition ${
              filter === "archived"
                ? "bg-charcoalGray text-white"
                : "bg-white text-charcoalGray border-gray-300"
            }`}
          >
            <Archive size={16} />
            Archived
          </button>
        </div>

        {/* EMPTY STATE */}
        {filteredNotes.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            <StickyNote size={40} className="mx-auto mb-3 text-gray-400" />
            <p>No notes found here.</p>
          </div>
        ) : (
          /* NOTES GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <div
                key={note._id}
                className="relative bg-white border border-gray-200 shadow-sm rounded-xl p-5 hover:shadow-md transition"
              >
                {/* PIN / ARCHIVE ICONS */}
                <div className="absolute top-3 right-3 flex gap-2">
                  {note.pinned && (
                    <Pin size={18} className="text-vibrantPurple" />
                  )}
                  {note.archived && (
                    <Archive size={18} className="text-gray-500" />
                  )}
                </div>

                {/* COLOR INDICATOR */}
                <div
                  className="w-4 h-4 rounded-full mb-3"
                  style={{ backgroundColor: note.color || "#2979FF" }}
                ></div>

                {/* TITLE */}
                <h3 className="text-lg font-semibold text-charcoalGray flex items-center gap-2">
                  {note.type === "TEXT" ? (
                    <FileText size={18} className="text-electricBlue" />
                  ) : (
                    <ListTodo size={18} className="text-tealGreen" />
                  )}
                  {note.title}
                </h3>

                {/* CONTENT OR TODOS */}
                {note.type === "TEXT" ? (
                  <p className="text-sm text-gray-600 mt-2">{note.content}</p>
                ) : (
                  <ul className="mt-3 space-y-2">
                    {note.todos.map((t) => (
                      <li key={t._id} className="flex items-center gap-2">
                        {t.done ? (
                          <CheckCircle2 size={16} className="text-green-500" />
                        ) : (
                          <Circle size={16} className="text-gray-400" />
                        )}
                        <span
                          className={`text-sm ${
                            t.done
                              ? "line-through text-gray-400"
                              : "text-gray-700"
                          }`}
                        >
                          {t.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* TAGS */}
                {note.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-electricBlue/10 text-electricBlue rounded-md flex items-center gap-1"
                      >
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* RELATED */}
                {(note.relatedTask || note.relatedProject) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {note.relatedTask && (
                      <span className="px-2 py-1 text-xs bg-[#26A69A]/10 text-[#26A69A] rounded-md">
                        Task: {note.relatedTask}
                      </span>
                    )}
                    {note.relatedProject && (
                      <span className="px-2 py-1 text-xs bg-[#8E24AA]/10 text-[#8E24AA] rounded-md">
                        Project: {note.relatedProject}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Loading>
      {addNote && (
        <Modal setActiveModal={setAddNote} render={<di>This is note</di>} />
      )}
      {addTodo && (
        <Modal setActiveModal={setAddTodo} render={<di>This is todo</di>} />
      )}
    </div>
  );
};

export default Notes;
