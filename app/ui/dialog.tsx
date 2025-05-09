"use client";

import { XMarkIcon } from "@heroicons/react/16/solid";
import { motion, AnimatePresence } from "framer-motion";

export default function Dialog({
  isOpen = false,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {

  const dialogOuterAnimation = {
    initial: "hidden",
    animate: "visible",
    exit: "exit",
    variants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0},
    },
    transition: { duration: 0.2, ease: "easeOut" },
  };

  const dialogInnerAnimation = {
    ...dialogOuterAnimation,
    variants: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...dialogOuterAnimation}
          className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 flex justify-center items-center z-60"
        >
          <motion.div
            {...dialogInnerAnimation}
            className="rounded-4xl p-2 bg-white shadow-5xl relative lg:min-h-64 lg:min-w-[500px] lg:p-3 2xl:p-4"
          >

            {/* Header */}
            <div className="flex justify-between items-center w-full p-2 lg:p-4">
              <h3 className="text-sm font-bold font-hb text-blueish-600">{title}</h3>
              <div
                onClick={onClose}
                className="h-8 w-8 cursor-pointer rounded-full hover:bg-greyish-300/20 transition duration-200 ease"
              >
                <XMarkIcon className="text-greyish-300" />
              </div>
            </div>

            {/* Body */}
            <div className="h-full p-2 lg:p-4">
              {children}
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}