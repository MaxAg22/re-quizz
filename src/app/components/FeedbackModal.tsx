import { motion, AnimatePresence } from "motion/react";
import { X, AlertCircle } from "lucide-react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  correctAnswer: string;
}

export function FeedbackModal({
  isOpen,
  onClose,
  correctAnswer,
}: FeedbackModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="bg-card border-4 border-primary rounded-lg shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header con efecto de alerta */}
              <div className="bg-gradient-to-r from-primary to-primary/80 p-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 10px,
                        rgba(0, 0, 0, 0.3) 10px,
                        rgba(0, 0, 0, 0.3) 20px
                      )`,
                    }}
                  />
                </div>

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-foreground" />
                    <h3 className="text-xl font-mono text-foreground tracking-wider">
                      ¡ERROR FATAL!
                    </h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-foreground hover:text-foreground/80 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <p className="text-foreground/90 mb-4 leading-relaxed">
                  ¡Te equivocaste, huele a fake fan! La respuesta correcta era:
                </p>

                <div className="p-4 bg-secondary/50 border-2 border-primary/50 rounded-lg">
                  <p className="text-foreground leading-relaxed">
                    {correctAnswer}
                  </p>
                </div>

                <div className="mt-6 flex justify-end">
                  <motion.button
                    onClick={onClose}
                    className="px-6 py-2 bg-primary hover:bg-primary/80 border-2 border-primary 
                             text-foreground font-mono tracking-wide rounded transition-colors
                             hover:shadow-lg hover:shadow-primary/50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    CONTINUAR
                  </motion.button>
                </div>
              </div>

              {/* Scanline effect */}
              <div className="absolute inset-0 pointer-events-none opacity-10">
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
