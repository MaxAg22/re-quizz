import { motion } from "motion/react";
import { Biohazard, Play } from "lucide-react";
import { useEffect, useRef, useCallback, useState } from "react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const audio = new Audio(
      `${(import.meta as any).env.BASE_URL}sounds/resident-evil-environment.mp3`,
    );
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    audio.muted = true;
    const tryPlay = async () => {
      try {
        await audio.play();
      } catch (e) {}
    };

    tryPlay();

    return () => {
      // stop and cleanup audio when leaving the screen
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []);

  const handleStart = useCallback(async () => {
    // Stop background audio when navigating away
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } catch (e) {}
    }
    onStart();
  }, [onStart]);

  const toggleMute = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      // unmute and ensure playback
      audio.muted = false;
      audio.volume = 0.5;
      try {
        await audio.play();
      } catch (e) {
        // ignore
      }
      setIsMuted(false);
    } else {
      // mute (keep playing muted)
      audio.muted = true;
      setIsMuted(true);
    }
  }, [isMuted]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-3xl mx-auto"
    >
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <Biohazard className="w-20 h-20 text-primary" strokeWidth={1.5} />
            </motion.div>
          </div>

          {/* Title */}
          <h1
            className="text-4xl md:text-6xl font-bold text-center mb-4 text-primary tracking-wider"
            style={{ fontFamily: "'Bebas Neue'" }}
          >
            <a className="text-red-800">R</a>
            <a className="text-white">ESIDENT</a>

            <a className="text-red-800"> E</a>
            <a className="text-white">VIL</a>
          </h1>

          <h2 className="text-2xl md:text-3xl text-center mb-8 text-primary/80">
            Quiz Definitivo
          </h2>

          {/* Description */}
          <div className="bg-secondary/50 border border-primary/30 rounded-lg p-6 mb-8">
            <p className="text-foreground/90 text-center text-lg mb-4 leading-relaxed">
              Pon a prueba tu conocimiento sobre la saga de{" "}
              <span className="text-primary font-semibold">Resident Evil</span>.
            </p>
            <p className="text-foreground/70 text-center">
              12 preguntas que separarán a los real fans de los fake fans.
            </p>
          </div>

          {/* Warning box */}
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0px rgba(var(--primary-rgb), 0.3)",
                "0 0 20px rgba(var(--primary-rgb), 0.5)",
                "0 0 0px rgba(var(--primary-rgb), 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-accent/40 border-2 border-primary/60 rounded-lg p-4 mb-8"
          >
            <div className="flex items-center gap-3">
              <Biohazard className="w-6 h-6 text-primary flex-shrink-0" />
              <p className="text-foreground/90 text-sm font-mono">
                ADVERTENCIA: Solo los real fans sobrevivirán
              </p>
            </div>
          </motion.div>

          {/* Start button */}
          <div className="flex justify-center">
            <motion.button
              onClick={handleStart}
              className="px-10 py-5 bg-primary/60 border-2 border-primary/60 rounded-lg
                       hover:bg-primary/80 hover:border-primary transition-all duration-300
                       flex items-center gap-3 group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <Play className="w-6 h-6 text-foreground relative z-10" />
              <span className="text-xl text-foreground relative z-10">
                Comenzar Test
              </span>
            </motion.button>
          </div>

          {/* Footer info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-primary/40 font-mono"
          >
            ¿Estás lista para enfrentarte a las criaturas del conocimiento?
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
