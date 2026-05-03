import React, { useState } from 'react';
import { RefreshCcw, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { QUIZ_QUESTIONS, FLASHCARDS } from './quizData';
import './LearningMode.css';

export const QuizMode = ({ onClose }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const question = QUIZ_QUESTIONS[currentQIndex];

  const handleOptionSelect = (index) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === question.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    let feedback = "Beginner";
    if (percentage === 100) feedback = "Election Expert!";
    else if (percentage >= 70) feedback = "Informed Voter";

    return (
      <div className="learning-overlay">
        <div className="learning-card results-card">
          <h2>Quiz Complete!</h2>
          <div className="score-display">
            <span className="score-number">{score}</span>
            <span className="score-total">/ {QUIZ_QUESTIONS.length}</span>
          </div>
          <p className="feedback-text">Level: <strong>{feedback}</strong></p>
          
          <div className="results-actions">
            <button className="primary-btn" onClick={resetQuiz}><RefreshCcw size={16} /> Retry Quiz</button>
            <button className="secondary-btn" onClick={onClose}>Back to Assistant</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="learning-overlay">
      <div className="learning-card quiz-card">
        <div className="quiz-header">
          <span className="question-count">Question {currentQIndex + 1} of {QUIZ_QUESTIONS.length}</span>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <h3 className="question-text">{question.question}</h3>
        
        <div className="options-grid">
          {question.options.map((opt, idx) => {
            let btnClass = "quiz-option";
            if (isAnswered) {
              if (idx === question.correctAnswer) btnClass += " correct";
              else if (idx === selectedOption) btnClass += " incorrect";
            } else if (idx === selectedOption) {
              btnClass += " selected";
            }

            return (
              <button 
                key={idx} 
                className={btnClass}
                onClick={() => handleOptionSelect(idx)}
                disabled={isAnswered}
              >
                {opt}
                {isAnswered && idx === question.correctAnswer && <CheckCircle size={18} className="icon-right" />}
                {isAnswered && idx === selectedOption && idx !== question.correctAnswer && <XCircle size={18} className="icon-wrong" />}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="explanation-box">
            <p><strong>Explanation:</strong> {question.explanation}</p>
            <button className="primary-btn next-btn" onClick={handleNext}>
              {currentQIndex < QUIZ_QUESTIONS.length - 1 ? "Next Question" : "See Results"} <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export const FlashcardsMode = ({ onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const card = FLASHCARDS[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev < FLASHCARDS.length - 1 ? prev + 1 : 0));
    }, 150); // wait for flip animation to reset
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : FLASHCARDS.length - 1));
    }, 150);
  };

  return (
    <div className="learning-overlay">
      <div className="learning-card flashcard-container">
        <div className="quiz-header">
          <span className="question-count">Flashcard {currentIndex + 1} of {FLASHCARDS.length}</span>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
          <div className="flashcard-front">
            <h3>{card.front}</h3>
            <span className="flip-hint">Click to reveal answer</span>
          </div>
          <div className="flashcard-back">
            <p>{card.back}</p>
          </div>
        </div>

        <div className="flashcard-controls">
          <button className="secondary-btn" onClick={handlePrev}>Previous</button>
          <button className="primary-btn" onClick={handleNext}>Next Card</button>
        </div>
      </div>
    </div>
  );
};
