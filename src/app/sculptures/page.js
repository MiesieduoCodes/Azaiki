"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import sculpturesData from "@/app/components/constants/sculptures.json"; // Adjust the path as needed

const SculpturesPage = () => {
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizFeedback, setQuizFeedback] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  // Fallback local quiz questions
  const localQuestions = [
    { question: 'What year was "David" by Michelangelo completed?', answer: "1504" },
    { question: 'Who created "The Thinker"?', answer: "Auguste Rodin" },
    { question: 'What material was used to create "Venus de Milo"?', answer: "Marble" }
  ];

  // Fetch quiz questions (fallback to local questions if fetch fails)
  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=25&type=multiple"
      );
      const data = await response.json();
      const formattedQuestions = data.results.map((item) => ({
        question: item.question,
        answer: item.correct_answer
      }));
      setQuestions(formattedQuestions);
    } catch (error) {
      console.error("Failed to fetch questions. Using local questions.", error);
      setQuestions(localQuestions);
    } finally {
      setLoading(false); // Set loading to false after fetch attempt
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuestion(questions[questionIndex]);
    }
  }, [questions, questionIndex]);

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    if (
      quizAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()
    ) {
      setQuizFeedback("Correct!");
      setTimeout(() => {
        setQuizFeedback("");
        setQuizAnswer("");
        setQuestionIndex((prev) => (prev + 1) % questions.length);
      }, 1500);
    } else {
      setQuizFeedback("Incorrect. Try again!");
    }
  };

  // Extract sculptures and artists from the imported JSON
  const { sculptures, artists } = sculpturesData;

  // Helper to get an artist by ID
  const getArtistById = (id) =>
    artists.find((artist) => artist.id === id);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-700 dark:from-yellow-800 dark:to-yellow-900 h-96 flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Discover Sculptures & Artists
        </motion.h1>
        <motion.p
          className="text-xl max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Explore iconic sculptures and meet the brilliant minds behind them.
        </motion.p>
      </section>

      {/* Sculptures Section */}
      <section className="py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Sculptures</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {sculptures.map((sculpture) => {
              const artist = getArtistById(sculpture.artistId);
              return (
                <motion.div
                  key={sculpture.id}
                  className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={sculpture.image}
                    alt={sculpture.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-2xl font-semibold">
                      {sculpture.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {artist ? artist.name : "Unknown Artist"}
                    </p>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      {sculpture.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Artists Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Artists</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {artists.map((artist) => (
              <motion.div
                key={artist.id}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-2xl font-semibold">
                    {artist.name}
                  </h3>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    {artist.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Quiz Section */}
      <section className="py-12">
        <div className="max-w-screen-lg mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Interactive Quiz</h2>
          {loading ? (
            <p>Loading questions...</p>
          ) : currentQuestion ? (
            <form onSubmit={handleQuizSubmit} className="space-y-4">
              <p className="text-lg mb-4">{currentQuestion.question}</p>
              <input
                type="text"
                value={quizAnswer}
                onChange={(e) => setQuizAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 w-full"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-lg shadow-lg hover:bg-blue-600 dark:hover:bg-blue-800 transition-colors"
              >
                Submit
              </button>
            </form>
          ) : (
            <p>No more questions available.</p>
          )}
          {quizFeedback && (
            <motion.p
              className="mt-4 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {quizFeedback}
            </motion.p>
          )}
        </div>
      </section>
    </div>
  );
};

export default SculpturesPage;