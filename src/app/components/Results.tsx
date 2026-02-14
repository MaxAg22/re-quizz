import { motion, AnimatePresence } from "motion/react";
import { Skull, RotateCcw } from "lucide-react";
import { useEffect, useRef, useCallback, useState } from "react";

interface ResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export function Results({ score, totalQuestions, onRestart }: ResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showReward, setShowReward] = useState(false);

  const getMessage = () => {
    if (percentage >= 80) {
      return {
        title: "¡IMPOSIBLE!",
        subtitle:
          "Sos una real fan, un baño no te va a salvar del nivel de govir que tenes.",
        description:
          "Conoces hasta los secretos más absurdos de la saga. Umbrella te está buscando.",
      };
    } else if (percentage >= 50) {
      return {
        title: "¡NO SOS FAKE FAN!",
        subtitle: "Sin embargo, sos terrible POSER!.",
        description: "Yo que vos me dedico al Candy Crush.",
      };
    } else if (percentage >= 20) {
      return {
        title: "¡FAKE FAN DETECTADA!",
        subtitle:
          "Tu conocimiento de RE está más muerto Leon en la nueva entrega.",
        description: "Es hora de admitir que solo jugaste el RE4 Remake.",
      };
    } else {
      return {
        title: "¡NI SIQUIERA LLEGAS A FAKE FAN!",
        subtitle: "Silent Hill anda necesitando fans.",
        description:
          "¿Seguro que jugaste Resident Evil? Porque parece que te confundiste de saga.",
      };
    }
  };

  const message = getMessage();

  useEffect(() => {
    const audio = new Audio(
      "/sounds/save-room-resident-evil-4-classico-o-save.mp3",
    );
    audio.loop = true;
    audio.preload = "auto";
    audio.muted = true; // start muted so browsers allow autoplay
    audioRef.current = audio;

    const tryPlay = async () => {
      try {
        await audio.play();
      } catch (e) {
        // autoplay blocked
      }
    };

    tryPlay();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMute = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      audio.volume = 0.5;
      try {
        await audio.play();
      } catch (e) {}
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  }, [isMuted]);

  const handleRestart = useCallback(() => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } catch (e) {}
    }
    onRestart();
  }, [onRestart]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Main Results Card */}
      <div className="relative bg-card border-2 border-primary/50 rounded-lg p-8 md:p-12 backdrop-blur-sm overflow-hidden">
        {/* Mute/unmute control (top-right) */}
        <button
          onClick={toggleMute}
          aria-label={
            isMuted ? "Unmute background audio" : "Mute background audio"
          }
          className="absolute top-4 right-4 z-30 p-2 rounded-md bg-card/60 border border-primary/30 text-foreground/90 hover:bg-card/80"
        >
          {isMuted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
              <path d="M19 6.41a8 8 0 0 1 0 11.18"></path>
              <path d="M15 10.54a4 4 0 0 1 0 3.11"></path>
            </svg>
          )}
        </button>
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: 2,
                delay: 0.2,
              }}
            >
              <Skull className="w-16 h-16 text-primary" strokeWidth={1.5} />
            </motion.div>
          </div>

          {/* Reward modal with animation */}
          <AnimatePresence>
            {showReward && (
              <>
                <motion.div
                  key="backdrop"
                  className="fixed inset-0 bg-black/60 z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowReward(false)}
                />

                <motion.div
                  key="modal"
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="bg-card border border-primary/40 rounded-lg max-w-xl w-full p-6 relative">
                    <button
                      onClick={() => setShowReward(false)}
                      className="absolute top-3 right-3 p-2 rounded text-foreground/90 hover:text-foreground"
                      aria-label="Cerrar recompensa"
                    >
                      ✕
                    </button>

                    <h3 className="text-2xl font-bold mb-2 text-primary">
                      !Felicidades!
                    </h3>
                    <p className="mb-4 text-foreground/90">
                      Como sos una fake fan necesitas jugar mucho más así que te
                      invito a jugar el DLC de los Winters.
                    </p>

                    <div className="mb-4">
                      <motion.img
                        src="/img/rouse.jpg"
                        alt="Recompensa"
                        className="w-full rounded-md object-cover"
                        initial={{ y: 0 }}
                        animate={{ y: [-6, 6, -6] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>

                    <div className="flex justify-end">
                      <motion.button
                        onClick={() => setShowReward(false)}
                        className="px-4 py-2 bg-primary/60 border border-primary rounded text-foreground"
                        whileTap={{ scale: 0.98 }}
                      >
                        Cerrar
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          {/* Score details */}
          <div className="p-3 mb-1 ">
            <h2 className="text-3xl text-center font-bold text-primary mb-2">
              {message.title}
            </h2>
          </div>
          <div className="bg-secondary/50 border border-primary/30 rounded-lg p-6 mb-8">
            <div className="text-center mb-4">
              <h3 className="text-xl text-foreground mb-2">
                {message.subtitle}
              </h3>
              <p className="text-foreground/70">{message.description}</p>
            </div>
            <div className="flex justify-center gap-8 text-center items-center">
              <div>
                <div className="text-3xl font-bold text-primary">{score}</div>
                <div className="text-sm text-primary/60 font-mono">
                  CORRECTAS
                </div>
              </div>
              <div className="w-px h-12 bg-primary/30" />
              <div>
                <div className="text-3xl font-bold text-primary/60">
                  {totalQuestions - score}
                </div>
                <div className="text-sm text-primary/60 font-mono">
                  INCORRECTAS
                </div>
              </div>
            </div>
          </div>

          {/* Restart + Reward buttons */}
          <div className="flex justify-center gap-4">
            <motion.button
              onClick={handleRestart}
              className="px-8 py-4 bg-primary/60 border-2 border-primary/60 rounded-lg
                       hover:bg-primary/80 hover:border-primary transition-all duration-300
                       flex items-center gap-3 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-5 h-5 text-foreground group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-lg text-foreground">Intentar de nuevo</span>
            </motion.button>

            <motion.button
              onClick={() => setShowReward(true)}
              className="px-6 py-3 bg-secondary/60 border-2 border-primary/30 rounded-lg
                       hover:bg-secondary/80 hover:border-primary transition-all duration-300
                       text-foreground"
              whileHover={{ scale: 1.03 }}
            >
              Recompensa
            </motion.button>
          </div>

          {/* Easter egg message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center text-sm text-primary/40 font-mono"
          >
            * Las respuestas "correctas" quizás no sean tan correctas... ¿o sí?
            *
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
