import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

interface SubscriptionAlertProps {
  isVisible: boolean;
  onClose: () => void;
  message?: string;
}

const SubscriptionAlert = ({
  isVisible,
  onClose,
  message = "Thank you for subscribing! We'll keep you updated with our latest news and updates.",
}: SubscriptionAlertProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-md border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <CheckCircle2 className="text-brand-green" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-gray-800">{message}</p>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubscriptionAlert;
