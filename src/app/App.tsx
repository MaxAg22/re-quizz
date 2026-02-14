import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { QuizQuestion } from "./components/QuizQuestion";
import { Results } from "./components/Results";
import { questions } from "./data/questions";

type GameState = "welcome" | "quiz" | "results";

export default function App() {
  const [gameState, setGameState] = useState<GameState>("welcome");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleStart = () => {
    setGameState("quiz");
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    // Move to next question or show results
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameState("results");
    }
  };

  const handleRestart = () => {
    setGameState("welcome");
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Background texture/pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `repeating-linear-gradient(
                 0deg,
                 transparent,
                 transparent 2px,
                 rgba(220, 38, 38, 0.03) 2px,
                 rgba(220, 38, 38, 0.03) 4px
               )`,
             }} 
        />
      </div>

      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.15),
              rgba(0, 0, 0, 0.15) 1px,
              transparent 1px,
              transparent 2px
            )`,
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
        <AnimatePresence mode="wait">
          {gameState === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <WelcomeScreen onStart={handleStart} />
            </motion.div>
          )}

          {gameState === "quiz" && (
            <motion.div
              key={`question-${currentQuestionIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <QuizQuestion
                question={questions[currentQuestionIndex]}
                currentQuestion={currentQuestionIndex + 1}
                totalQuestions={questions.length}
                onAnswer={handleAnswer}
              />
            </motion.div>
          )}

          {gameState === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Results
                score={score}
                totalQuestions={questions.length}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Umbrella logo watermark (optional) */}
      <div className="fixed bottom-4 right-4 text-red-950/20 font-mono text-xs tracking-wider">
        UMBRELLA CORPORATION
      </div>
    </div>
  );
}