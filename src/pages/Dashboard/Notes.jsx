import { useEffect, useState } from "react";
import { toast } from "react-toastify";
//prettier-ignore
import { Archive, CheckCircle2, Circle, Edit, FileText, ListTodo, Pin, PlusCircle, StickyNote, Tag, Trash2 } from "lucide-react";
import { NoteAPI } from "../../api";
import Loading from "../../components/Loading/Loading";
import Modal from "../../components/Modal/Modal";
import CreateNote from "../../components/Forms/CreateNote";
import CreateTodo from "../../components/Forms/CreateTodo";
import UpdateNote from "../../components/Forms/UpdateNote";
import UpdateTodo from "../../components/Forms/UpdateTodo";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | pinned | archived
  const [open, setOpen] = useState(false);
  const [addNote, setAddNote] = useState(false);
  const [addTodo, setAddTodo] = useState(false);
  const [updateNote, setUpdateNote] = useState(false);
  const [updateTodo, setUpdateTodo] = useState(false);
  const [updateNoteItem, setUpdateNoteItem] = useState({});

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

  const togglePin = async (id) => {
    try {
      const res = await NoteAPI.togglePinNote(id);
      setNotes((prev) => prev.map((n) => (n._id === id ? res.data.note : n)));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error pinning note:", error.response.data.message);
    }
  };

  const toggleArchive = async (id) => {
    try {
      const res = await NoteAPI.toggleArchiveNote(id);
      setNotes((prev) => prev.map((n) => (n._id === id ? res.data.note : n)));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error archiving note:", error.response.data.message);
    }
  };

  const handleUpdateNote = async (note) => {
    setUpdateNoteItem(note);

    if (note.type === "TEXT") setUpdateNote(true);
    if (note.type === "TODO") setUpdateTodo(true);
  };

  const handleToggleTodo = async (id, todoId) => {
    try {
      const res = await NoteAPI.toggleTodoDone(id, todoId);
      setNotes((prev) => prev.map((n) => (n._id === id ? res.data.note : n)));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error archiving note:", error.response.data.message);
    }
  };

  const handleDeleteNote = async (note) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (!confirmed) return;
    try {
      let res;
      if (note.type === "TEXT") res = await NoteAPI.deleteNote(note._id);
      if (note.type === "TODO") res = await NoteAPI.deleteTodo(note._id);
      setNotes((prev) => prev.filter((n) => n._id !== note._id));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error deleting note:", error.response.data.message);
    }
  };

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
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition ${
              filter === "all"
                ? "bg-electricBlue text-white"
                : "bg-white text-charcoalGray border-gray-300"
            }`}
          >
            <StickyNote size={16} /> All Notes
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
                ? "bg-tealGreen text-white"
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
                {/* TOP INDICATORS */}
                <div className="flex items-center justify-between mb-3">
                  {/* COLOR + PIN + ARCHIVE */}
                  <div className="flex items-center gap-3">
                    {/* COLOR INDICATOR */}
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: note.color || "#2979FF" }}
                    ></span>

                    {/* PIN ICON */}
                    <Pin
                      size={18}
                      onClick={() => togglePin(note._id)}
                      className={`cursor-pointer transition
    ${
      note.pinned
        ? "text-red-500 transform rotate-45"
        : "text-gray-400 hover:text-gray-600"
    }
  `}
                    />

                    {/* ARCHIVE ICON */}
                    <Archive
                      size={18}
                      onClick={() => toggleArchive(note._id)}
                      className={`cursor-pointer transition
    ${note.archived ? "text-yellow-500" : "text-gray-400 hover:text-gray-600"}
  `}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      {/* EDIT ICON */}
                      <Edit
                        size={18}
                        onClick={() => {
                          handleUpdateNote(note);
                        }}
                        className="text-gray-400 cursor-pointer hover:text-electricBlue transition"
                      />
                      {/* DELETE ICON */}
                      <Trash2
                        size={18}
                        onClick={() => handleDeleteNote(note)}
                        className="text-gray-400 cursor-pointer hover:text-red-600 transition"
                      />
                    </div>
                  </div>
                </div>

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
                          <Circle
                            size={16}
                            className="text-gray-400"
                            onClick={() => handleToggleTodo(note._id, t._id)}
                          />
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
                        className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                      >
                        #{tag}
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
        <Modal
          setActiveModal={setAddNote}
          render={<CreateNote {...{ setNotes, setAddNote }} />}
        />
      )}
      {addTodo && (
        <Modal
          setActiveModal={setAddTodo}
          render={<CreateTodo {...{ setNotes, setAddTodo }} />}
        />
      )}
      {updateNote && (
        <Modal
          setActiveModal={setUpdateNote}
          render={
            <UpdateNote {...{ setNotes, setUpdateNote, updateNoteItem }} />
          }
        />
      )}
      {updateTodo && (
        <Modal
          setActiveModal={setUpdateTodo}
          render={
            <UpdateTodo {...{ setNotes, setUpdateTodo, updateNoteItem }} />
          }
        />
      )}
    </div>
  );
};

export default Notes;
