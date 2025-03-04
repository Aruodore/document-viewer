import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "./button";

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ title, isOpen, onClose, children }: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Overlay with backdrop blur and slight transparency */}
        <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity" />

        {/* Modal Content */}
        <Dialog.Content
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 p-6 rounded-lg w-11/12 max-w-2xl shadow-lg max-h-[90vh] overflow-y-auto focus:outline-none"
          aria-modal="true"
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-white dark:bg-gray-900 z-10">
            <Dialog.Title className="text-xl font-bold dark:text-gray-200">
              {title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button
                onClick={onClose}
                variant="ghost"
                aria-label="Close modal"
              >
                <X size={20} className="dark:text-gray-200" />
              </Button>
            </Dialog.Close>
          </div>

          {/* Modal Content */}
          <div className="overflow-y-auto dark:text-gray-300">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
