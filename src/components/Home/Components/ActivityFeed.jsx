const ActivityFeed = () => {
  const activities = [
    { user: "Dipto", action: "completed a task", time: "2 minutes ago" },
    { user: "User", action: "commented on UI Design", time: "5 minutes ago" },
    //prettier-ignore
    { user: "Manager", action: "assigned you a new task", time: "10 minutes ago"},
  ];

  return (
    <section className="py-20 px-8 md:px-16 bg-charcoalGray">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-softWhite logo-font">
        Stay Updated with Live Activity 🔔
      </h2>

      <div className="max-w-3xl mx-auto bg-softWhite shadow-lg rounded-2xl p-8 border">
        {activities.map((log, i) => (
          <div key={i} className="border-b py-4 body-font">
            <p className="text-gray-800">
              <span className="font-semibold text-electricBlue">
                {log.user}
              </span>{" "}
              {log.action}
            </p>
            <p className="text-xs text-gray-500 mt-1">{log.time}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivityFeed;
