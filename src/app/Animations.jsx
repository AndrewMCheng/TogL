import { motion, AnimatePresence } from "framer-motion";

export const GRID_SIZE = 6;

export function AnimatedButton({ children, ...props }) {
    return (
        <motion.button
            whileHover={{
                scale: 1.05,
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.25)',
            }}
            whileTap={{
                scale: 0.9,
            }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 15,
            }}
            {...props}
        >
            {children}
        </motion.button>
    );
}

export function AnimatedCell({ isAnimatedCell, onColor, children, ...props }) {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ scale: isAnimatedCell ? 0.9 : 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            {...props}
        >
            {children}
        </motion.button>
    )
}

export function AnimatedColorPicker({ children, ...props }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300 }}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export function FadeInPanel({ children, ...props }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export function FadeOutPanel({ children, ...props }) {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export function AnimatedToggle({ children }) {
    return (
        <motion.div
            whileHover={{ scale: 1.15 }}
            transition={{ type: "spring" }}
        >
            {children}
        </motion.div>
    )
}

export function ResetGame({ children, flip }) {
    return (
        <motion.div
            animate={{ rotateY: flip ? 180 : 0 }}
            transition={{ duration: flip ? 0.6 : 0 }}
        >
            {children}
        </motion.div>
    )
}

const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? '20%' : '-20%',
        opacity: 0,
        scale: 0.98,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction) => ({
        x: direction > 0 ? '-20%' : '20%',
        opacity: 0,
        scale: 0.98,
    }),
};

export function BoardChange({ children, difficulty, direction }) {
  return (
    <div
      className="board-wrapper"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={difficulty}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            position: "relative", // relative again so height is preserved
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
