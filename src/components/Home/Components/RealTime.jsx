const RealTime = () => {
  return (
    <section className="py-20 px-8 md:px-16 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-charcoalGray logo-font">
        Real-Time Collaboration, Like Never Before ⚡
      </h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Illustration */}
        <div className="relative bg-gradient-to-br from-electricBlue/20 via-vibrantPurple/20 to-[#26A69A]/20 p-10 rounded-2xl shadow-xl">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-700 text-sm">
              <span className="font-semibold text-electricBlue">Dipto</span> is
              editing the task...
            </p>

            <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-softWhite">
              <p className="text-gray-600 text-sm animate-pulse">Typing...</p>
            </div>
          </div>

          <span className="absolute -top-4 -right-4 bg-electricBlue text-white py-1 px-3 rounded-xl text-xs shadow-lg">
            Live Sync
          </span>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center space-y-4 text-gray-700">
          <h3 className="text-2xl font-semibold text-charcoalGray heading-font">
            Work Together in Real Time
          </h3>
          <p className="text-sm body-font">
            Whether you're updating tasks, sharing files, or messaging your team
            — every action updates instantly across all devices.
          </p>

          <ul className="text-sm space-y-2">
            <li>✔ Live typing indicators</li>
            <li>✔ Live project updates & task sync</li>
            <li>✔ Multi-device session support</li>
            <li>✔ Instantly delivered notifications</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RealTime;
