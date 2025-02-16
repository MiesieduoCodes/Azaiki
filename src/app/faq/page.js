import React from 'react';

const faqData = [
  {
    "question": "How can I visit the Azaiki Art Gallery?",
    "answer": "To visit the Azaiki Art Gallery, you can check our website for opening hours and ticket information. We also offer guided tours on weekends!"
  },
  {
    "question": "What types of art can I see at the gallery?",
    "answer": "The gallery showcases a variety of art forms, including contemporary art, sculptures, and local artists' works."
  },
  {
    "question": "Are there any events at the gallery?",
    "answer": "Yes! We host various events, including art exhibitions, workshops, and community gatherings. Check our events page for the latest updates."
  },
  {
    "question": "How can I support the Azaiki Art Gallery?",
    "answer": "You can support us by attending events, making donations, or becoming a member of the gallery."
  }
];

const FAQSection = () => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
          <div className="w-full lg:w-1/2">
            <img
              src="https://pagedone.io/asset/uploads/1696230182.png"
              alt="Azaiki Art Gallery"
              className="w-full rounded-xl object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-xl">
              <div className="mb-6 lg:mb-16">
                <h6 className="text-lg text-center font-medium text-yellow-500 mb-2 lg:text-left">
                  FAQs
                </h6>
                <h2 className="text-4xl text-center font-bold text-gray-900 dark:text-white leading-[3.25rem] mb-5 lg:text-left">
                  Looking for answers about Azaiki Art Gallery?
                </h2>
              </div>
              <div className="accordion-group" data-accordion="default-accordion">
                {faqData.map((faq, index) => (
                  <div key={index} className="accordion pb-8 border-b border-solid border-gray-200 dark:border-gray-700">
                    <button
                      className="accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-600 dark:text-gray-300 w-full transition duration-500 hover:text-yellow-500 dark:hover:text-yellow-400 accordion-active:text-yellow-500 accordion-active:font-medium"
                      aria-controls={`faq${index}`}
                    >
                      <h5>{faq.question}</h5>
                      <svg
                        className="text-gray-900 dark:text-gray-200 transition duration-500 group-hover:text-yellow-500 accordion-active:text-yellow-500 accordion-active:rotate-180"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                    <div id={`faq${index}`} className="accordion-content w-full px-0 overflow-hidden pr-4">
                      <p className="text-base font-normal text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Section: Have More Questions? */}
        <div
  className="mt-16 text-center p-8 rounded-lg"
  style={{
    backgroundImage: "url('https://your-image-url.com/image.jpg')", // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
    Have more questions?
  </h2>
  <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
    We&apos;re here to help! Feel free to reach out to us with any inquiries or concerns.
  </p>
</div>
      </div>
    </section>
  );
};

export default FAQSection;