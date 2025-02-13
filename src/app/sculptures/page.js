'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const decodeHtml = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const SculpturesPage = () => {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSculpture, setSelectedSculpture] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);

  const localQuestions = [
    { question: 'What year was "David" by Michelangelo completed?', answer: '1504' },
    { question: 'Who created "The Thinker"?', answer: 'Auguste Rodin' },
    { question: 'What material was used to create "Venus de Milo"?', answer: 'Marble' },
  ];

  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=5&category=25&type=multiple');
      const data = await response.json();
      const formattedQuestions = data.results.map((item) => ({
        question: item.question,
        answer: item.correct_answer,
      }));
      setQuestions(formattedQuestions);
    } catch (error) {
      console.error('Failed to fetch questions. Using local questions.', error);
      setQuestions(localQuestions);
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
    if (quizAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
      setQuizFeedback('Correct!');
      setTimeout(() => {
        setQuizFeedback('');
        setQuizAnswer('');
        setQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
      }, 1500);
    } else {
      setQuizFeedback('Incorrect. Try again!');
    }
  };

  useEffect(() => {
    gsap.from('.animate-section', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.3,
      scrollTrigger: {
        trigger: '.animate-section',
        start: 'top 80%',
      },
    });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans">
      {/* Theme Toggle Button */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="fixed top-4 right-4 p-2 bg-gray-200 dark:bg-gray-800 rounded-full shadow-md"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-900 dark:to-black h-96 flex items-center justify-center text-center">
        <motion.h1
          className="text-5xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Discover the Beauty of Sculptures
        </motion.h1>
      </section>

      {/* Interactive Quiz */}
      <section className="py-12">
        <div className="max-w-screen-lg mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Interactive Quiz</h2>
          {currentQuestion ? (
            <form onSubmit={handleQuizSubmit} className="space-y-4">
              <p className="text-lg">{currentQuestion.question}</p>
              <input
                type="text"
                value={quizAnswer}
                onChange={(e) => setQuizAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="px-4 py-2 border border-black dark:border-white rounded-lg bg-gray-100 dark:bg-gray-700"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-lg shadow-lg hover:bg-blue-600 dark:hover:bg-blue-800"
              >
                Submit
              </button>
            </form>
          ) : (
            <p>Loading questions...</p>
          )}
          {quizFeedback && <p className="mt-4 text-lg">{quizFeedback}</p>}
        </div>
      </section>
    </div>
  );
};

export default SculpturesPage;
