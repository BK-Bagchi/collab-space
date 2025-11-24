const Notes = () => {
  return (
    <section className="py-20 px-8 md:px-16 bg-softWhite">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-charcoalGray logo-font">
        Capture Ideas with Smart Notes 📝
      </h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Text Note */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-300 transform hover:-translate-y-2 transition-all duration-300">
          <h3 className="font-semibold text-lg text-electricBlue heading-font">
            Text Note
          </h3>
          <p className="mt-3 text-gray-600 text-sm">
            “Remember to finalize the project documentation for dashboard
            analytics.”
          </p>
        </div>

        {/* Todo Note */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-300 transform hover:-translate-y-2 transition-all duration-300">
          <h3 className="font-semibold text-lg text-vibrantPurple heading-font">
            Todo Note
          </h3>
          <ul className="mt-3 text-gray-600 text-sm space-y-2">
            <li>✔ Update backend task model</li>
            <li>✔ Add upload support for PNG/PDF</li>
            <li className="opacity-60">⬜ Finish calendar reminders UI</li>
          </ul>
        </div>
      </div>

      <p className="text-center text-gray-600 text-sm mt-8">
        Organize thoughts, plan tasks, pin notes — and sync across devices.
      </p>
    </section>
  );
};

export default Notes;
