const Workflow = () => {
  return (
    <section className="py-20 px-8 md:px-16 bg-softWhite">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-charcoalGray logo-font">
        Visual Project Workflow 🚀
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Todo */}
        <div className="p-6 bg-white rounded-xl shadow-md border body-font">
          <h3 className="font-semibold text-lg mb-3 text-electricBlue">Todo</h3>
          <div className="p-3 bg-gray-100 rounded-lg text-sm shadow-sm">
            Design Login Page
          </div>
        </div>

        {/* In Progress */}
        <div className="p-6 bg-white rounded-xl shadow-md border body-font">
          <h3 className="font-semibold text-lg mb-3 text-vibrantPurple">
            In Progress
          </h3>
          <div className="p-3 bg-gray-100 rounded-lg text-sm shadow-sm">
            Integrating Notifications API
          </div>
          <p className="text-xs text-gray-500 mt-2 animate-pulse">
            Updating...
          </p>
        </div>

        {/* Done */}
        <div className="p-6 bg-white rounded-xl shadow-md border body-font">
          <h3 className="font-semibold text-lg mb-3 text-tealGreen">
            Completed
          </h3>
          <div className="p-3 bg-gray-100 rounded-lg text-sm shadow-sm line-through">
            Setup Auth System
          </div>
        </div>
      </div>

      <p className="text-center text-gray-600 text-sm mt-10">
        Real-time Kanban-style task updates powered by Socket.IO.
      </p>
    </section>
  );
};

export default Workflow;
