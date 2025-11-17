import React, { useState } from "react";
// prettier-ignore
import { ChevronDown, ChevronUp, HelpCircle, CornerDownRight } from "lucide-react";
import faqData from "../../utils/faqData";

const Help = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [tab, setTab] = useState("faq"); // "faq" | "contact"

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex items-center gap-3">
        <HelpCircle className="text-vibrantPurple w-8 h-8" />
        <h1 className="text-3xl font-bold text-charcoalGray">Help & Support</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 border-b border-gray-200 pb-2">
        <button
          onClick={() => setTab("faq")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            tab === "faq"
              ? "bg-electricBlue text-white shadow"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          FAQ
        </button>

        <button
          onClick={() => setTab("contact")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            tab === "contact"
              ? "bg-vibrantPurple text-white shadow"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Contact Admin
        </button>
      </div>

      {/* FAQ SECTION */}
      {tab === "faq" && (
        <section className="animate-fadeIn">
          <h2 className="text-xl font-semibold text-electricBlue mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqData.map((category, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-5"
              >
                <h3 className="text-lg font-semibold text-charcoalGray mb-4 flex items-center gap-2">
                  📌 {category.category}
                </h3>

                <div className="space-y-3">
                  {category.items.map((item, j) => {
                    const index = `${i}-${j}`;
                    const isOpen = openIndex === index;

                    return (
                      <div
                        key={j}
                        className="rounded-xl bg-softWhite border border-gray-100"
                      >
                        {/* QUESTION */}
                        <button
                          onClick={() => toggleFAQ(index)}
                          className="w-full flex justify-between items-center p-3 md:p-4 text-left"
                        >
                          <p className="font-medium text-sm md:text-base text-charcoalGray flex items-center gap-2">
                            {item.q}
                          </p>

                          {isOpen ? (
                            <ChevronUp className="text-vibrantPurple w-5 h-5 cursor-pointer" />
                          ) : (
                            <ChevronDown className="text-vibrantPurple w-5 h-5 cursor-pointer" />
                          )}
                        </button>

                        {/* ANSWER */}
                        {isOpen && (
                          <p className="px-4 pb-4 text-sm text-gray-600 leading-relaxed flex items-center gap-2">
                            <CornerDownRight size={14} />
                            {item.a}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CONTACT ADMIN SECTION */}
      {tab === "contact" && (
        <section className="animate-fadeIn">
          <h2 className="text-xl font-semibold text-vibrantPurple mb-4">
            Contact Admin
          </h2>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <form className="space-y-5">
              {/* Subject */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-charcoalGray mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Write the subject"
                  className="p-3 border border-gray-300 rounded-xl bg-softWhite outline-none focus:ring-2 focus:ring-[#2979ff]"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-charcoalGray mb-1">
                  Message
                </label>
                <textarea
                  placeholder="Write your message for admin…"
                  className="p-3 h-32 border border-gray-300 rounded-xl bg-softWhite outline-none focus:ring-2 focus:ring-[#2979ff]"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="bg-[#8E24AA] w-full text-white font-medium py-3 rounded-xl hover:bg-purple-700 transition shadow-md cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};

export default Help;
