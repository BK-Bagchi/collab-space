import React from "../../../assets/React_logo.webp";
import Node from "../../../assets/Node_js_logo.webp";
import Mongo from "../../../assets/mongodb_logo.webp";
import SocketIO from "../../../assets/Socket_io_logo.png";
const TechShowcase = () => {
  const techStack = [
    { name: "React", icon: React, color: "bg-[#2979FF]/20 text-[#2979FF]" },
    {
      name: "Socket.IO",
      icon: SocketIO,
      color: "bg-[#FF5722]/20 text-[#FF5722]",
    },
    { name: "Node.js", icon: Node, color: "bg-[#26A69A]/20 text-[#26A69A]" },
    { name: "MongoDB", icon: Mongo, color: "bg-[#8E24AA]/20 text-[#8E24AA]" },
  ];

  return (
    <section className="py-20 px-8 md:px-16 text-center bg-charcoalGray text-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
        Powered by Modern Technology ⚙️
      </h2>
      <p className="text-gray-300 mb-12 max-w-2xl mx-auto text-sm md:text-base">
        Built with the MERN stack, Socket.IO, modern UI frameworks, and scalable
        architecture to deliver a seamless real-time experience.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {techStack.map(({ name, icon, color }) => (
          <div
            key={name}
            className={`flex flex-col items-center justify-center p-6 rounded-2xl ${color} border border-gray-700 shadow-lg hover:scale-105 transition-transform duration-300`}
          >
            <img src={icon} alt={name} className="mb-3 w-8 h-8 rounded-full" />
            <span className="font-semibold text-sm md:text-base">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechShowcase;
