"use client"
import React, { useState } from 'react';

const FaqSection = () => {
  // State to manage active section
  const [activeIndex, setActiveIndex] = useState(null);

  // Toggle the active section
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl font-manrope text-center font-bold text-gray-900 leading-[3.25rem]">
            Frequently asked questions
          </h2>
        </div>
        <div className="accordion-group">
          {/* Accordion Item 1 */}
          <div className={`accordion border border-solid border-gray-300 p-4 rounded-xl mb-8 lg:p-4 ${activeIndex === 0 ? 'bg-indigo-50 border-indigo-600' : ''}`}>
            <button
              onClick={() => toggleAccordion(0)}
              className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 hover:text-indigo-600"
              aria-controls="collapse-one"
            >
              <h5>How can I reset my password?</h5>
              <svg
                className={`w-6 h-6 transition duration-500 ${activeIndex === 0 ? 'rotate-45' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18M12 18V6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {activeIndex === 0 && (
              <div id="collapse-one" className="accordion-content w-full overflow-hidden pr-4">
                <p className="text-base text-gray-900 font-normal leading-6">
                  To reset your password, go to the login page, click "Forgot Password," and follow the instructions to reset it via email.
                </p>
              </div>
            )}
          </div>

          {/* Accordion Item 2 */}
          <div className={`accordion border border-solid border-gray-300 p-4 rounded-xl mb-8 lg:p-4 ${activeIndex === 1 ? 'bg-indigo-50 border-indigo-600' : ''}`}>
            <button
              onClick={() => toggleAccordion(1)}
              className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 hover:text-indigo-600"
              aria-controls="collapse-two"
            >
              <h5>How do I update my billing information?</h5>
              <svg
                className={`w-6 h-6 transition duration-500 ${activeIndex === 1 ? 'rotate-45' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18M12 18V6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {activeIndex === 1 && (
              <div id="collapse-two" className="accordion-content w-full overflow-hidden pr-4">
                <p className="text-base text-gray-900 font-normal leading-6">
                  To update your billing information, go to your account settings, navigate to the billing section, and update your payment details.
                </p>
              </div>
            )}
          </div>

          {/* Accordion Item 3 */}
          <div className={`accordion border border-solid border-gray-300 p-4 rounded-xl mb-8 lg:p-4 ${activeIndex === 2 ? 'bg-indigo-50 border-indigo-600' : ''}`}>
            <button
              onClick={() => toggleAccordion(2)}
              className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 hover:text-indigo-600"
              aria-controls="collapse-three"
            >
              <h5>How can I contact customer support?</h5>
              <svg
                className={`w-6 h-6 transition duration-500 ${activeIndex === 2 ? 'rotate-45' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18M12 18V6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {activeIndex === 2 && (
              <div id="collapse-three" className="accordion-content w-full overflow-hidden pr-4">
                <p className="text-base text-gray-900 font-normal leading-6">
                  To contact customer support, visit our support page and submit a request or use the live chat feature.
                </p>
              </div>
            )}
          </div>

          {/* Accordion Item 4 */}
          <div className={`accordion border border-solid border-gray-300 p-4 rounded-xl mb-8 lg:p-4 ${activeIndex === 3 ? 'bg-indigo-50 border-indigo-600' : ''}`}>
            <button
              onClick={() => toggleAccordion(3)}
              className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 hover:text-indigo-600"
              aria-controls="collapse-four"
            >
              <h5>How do I delete my account?</h5>
              <svg
                className={`w-6 h-6 transition duration-500 ${activeIndex === 3 ? 'rotate-45' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18M12 18V6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {activeIndex === 3 && (
              <div id="collapse-four" className="accordion-content w-full overflow-hidden pr-4">
                <p className="text-base text-gray-900 font-normal leading-6">
                  To delete your account, go to your account settings, scroll to the bottom, and select the option to permanently delete your account.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
