import { motion } from "motion/react";
import { Question } from "../data/questions";
import { useState } from "react";
import { FeedbackModal } from "./FeedbackModal";
import { Check, X } from "lucide-react";

interface QuizQuestionProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
}

export function QuizQuestion({
  question,
  currentQuestion,
  totalQuestions,
  onAnswer,
}: QuizQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [answered, setAnswered] = useState(false);

  const playSuccessSound = () => {
    const audio = new Audio(
      `${(import.meta as any).env.BASE_URL}sounds/click.mp3`,
    );
    audio.play();
  };

  const playFailureSound = () => {
    const audio = new Audio(
      `${(import.meta as any).env.BASE_URL}sounds/fail.mp3`,
    );
    audio.play();
  };

  const handleOptionClick = (index: number, isCorrect: boolean) => {
    if (answered) return; // Prevenir múltiples clicks

    setSelectedOption(index);
    setAnswered(true);

    // Si es incorrecta, mostrar modal
    if (!isCorrect) {
      playFailureSound();
      setShowModal(true);
    } else {
      // Si es correcta, avanzar después de un delay
      playSuccessSound();
      setTimeout(() => {
        onAnswer(isCorrect);
        setSelectedOption(null);
        setAnswered(false);
      }, 1500);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    // Avanzar a la siguiente pregunta después de cerrar el modal
    setTimeout(() => {
      onAnswer(false);
      setSelectedOption(null);
      setAnswered(false);
    }, 300);
  };

  // Encontrar la respuesta correcta para el modal
  const correctAnswer =
    question.options.find((opt) => opt.isCorrect)?.text || "";
  const correctIndex = question.options.findIndex((opt) => opt.isCorrect);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-primary font-mono">
            PREGUNTA {currentQuestion} / {totalQuestions}
          </span>
          <span className="text-sm text-primary font-mono">
            {Math.round((currentQuestion / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-card border border-primary/30 overflow-hidden">
          <motion.div
            className="h-full bg-linear-to-r from-primary/60 via-primary to-primary/60"
            initial={{ width: 0 }}
            animate={{
              width: `${(currentQuestion / totalQuestions) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Image Section - Template para agregar imágenes */}
      {question.imageUrl && (
        <img
          src={question.imageUrl}
          alt="Question visual"
          className="w-64 h-64 mb-5 overflow-hidden items-center object-cover mx-auto rounded-lg border-2 border-primary/50"
        />
      )}

      {/* Question */}
      <div className="mb-8 p-6 bg-card border-2 border-primary/50 rounded-lg backdrop-blur-sm">
        <h2 className="text-xl md:text-2xl text-foreground leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-4">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrectOption = option.isCorrect;
          const showCorrect = answered && isCorrectOption;
          const showIncorrect = answered && isSelected && !isCorrectOption;

          let buttonClass =
            "w-full p-4 bg-secondary/60 border-2 border-primary/40 rounded-lg text-left group relative overflow-hidden transition-all duration-300";

          if (showCorrect) {
            buttonClass =
              "w-full p-4 bg-primary/40 border-2 border-primary rounded-lg text-left group relative overflow-hidden";
          } else if (showIncorrect) {
            buttonClass =
              "w-full p-4 bg-destructive/40 border-2 border-destructive rounded-lg text-left group relative overflow-hidden";
          } else if (!answered) {
            buttonClass += " hover:bg-accent/40 hover:border-primary/60";
          }

          return (
            <motion.button
              key={index}
              onClick={() => handleOptionClick(index, option.isCorrect)}
              className={buttonClass}
              whileHover={!answered ? { scale: 1.02 } : {}}
              whileTap={!answered ? { scale: 0.98 } : {}}
              disabled={answered}
            >
              {/* Hover effect */}
              {!answered && (
                <div
                  className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/20 to-primary/0 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              )}

              <div className="relative flex items-center gap-4">
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded border flex items-center justify-center font-mono text-sm transition-colors
                    ${
                      showCorrect
                        ? "bg-primary/50 border-primary text-foreground"
                        : showIncorrect
                          ? "bg-destructive/50 border-destructive text-foreground"
                          : "border-primary/50 bg-secondary text-primary group-hover:bg-accent group-hover:border-primary"
                    }`}
                >
                  {showCorrect ? (
                    <Check className="w-4 h-4" />
                  ) : showIncorrect ? (
                    <X className="w-4 h-4" />
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </span>
                <span
                  className={`transition-colors ${
                    showCorrect
                      ? "text-foreground"
                      : showIncorrect
                        ? "text-foreground"
                        : "text-foreground/90 group-hover:text-foreground"
                  }`}
                >
                  {option.text}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Modal de feedback */}
      <FeedbackModal
        isOpen={showModal}
        onClose={handleModalClose}
        correctAnswer={correctAnswer}
      />
    </motion.div>
  );
}
