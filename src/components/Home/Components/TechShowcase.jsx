import React from "../../../assets/React_logo.webp";
import Node from "../../../assets/Node_js_logo.webp";
import Mongo from "../../../assets/mongodb_logo.webp";
import SocketIO from "../../../assets/Socket_io_logo.png";
import Tailwind from "../../../assets/Tailwind_Css.png";
import JWT from "../../../assets/JWT.webp";
import Cloudinary from "../../../assets/Cloudinary_icon.png";
import ExpressJS from "../../../assets/ExpressJs_icon.png";

const TechShowcase = () => {
  const techStack = [
    { name: "MongoDB", icon: Mongo, color: "text-[#4DB33D]" },
    { name: "Express.js", icon: ExpressJS, color: "text-gray-200" },
    { name: "React", icon: React, color: "text-[#61DAFB]" },
    { name: "Node.js", icon: Node, color: "text-[#26A69A]" },
    { name: "Socket.IO", icon: SocketIO, color: "text-[#FF5722]" },
    { name: "Tailwind CSS", icon: Tailwind, color: "text-[#38BDF8]" },
    { name: "JWT Auth", icon: JWT, color: "text-[#8E24AA]" },
    { name: "Cloudinary", icon: Cloudinary, color: "text-[#2979FF]" },
  ];

  return (
    <section className="py-20 px-8 md:px-16 text-center bg-charcoalGray text-white">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-font">
        Powered by Modern Technology ⚙️
      </h2>

      <p className="text-gray-300 mb-12 max-w-2xl mx-auto text-sm md:text-base body-font">
        Built with the MERN stack, Socket.IO, Tailwind CSS, and other
        high-performance tools to deliver a seamless real-time experience.
      </p>

      {/* Tech Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {techStack.map(({ name, icon, color }) => (
          <div
            key={name}
            className="group py-8 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl 
                       flex flex-col items-center shadow-md hover:shadow-xl 
                       transition-all duration-300 hover:-translate-y-2 relative"
          >
            {/* Glow on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition bg-white"></div>

            {/* Icon */}
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-full bg-white/10 ${color} text-2xl mb-4 shadow-inner`}
            >
              <img src={icon} alt={name} className="w-8 h-8 rounded-full" />
            </div>

            {/* Name */}
            <span className="font-semibold text-sm md:text-base heading-font">
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechShowcase;
