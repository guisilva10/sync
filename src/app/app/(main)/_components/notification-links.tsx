/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { AlertCircle, X } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/_components/ui/alert";

const NotificationLinks = ({
  autoClose = true,
  duration = 5000,
  onClose = () => {},
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Mostrar notificação com um pequeno delay para permitir animação
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Auto-fechar após o tempo definido, se ativado
    let closeTimer: string | number | NodeJS.Timeout | undefined;
    if (autoClose) {
      closeTimer = setTimeout(() => {
        handleClose();
      }, duration);
    }

    return () => {
      clearTimeout(showTimer);
      if (closeTimer) clearTimeout(closeTimer);
    };
  }, [autoClose, duration]);

  const handleClose = () => {
    setIsExiting(true);
    // Adicionar delay para a animação de saída terminar
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-md transition-all duration-300 ${
        isExiting ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <Alert variant="destructive" className="flex items-start pr-2">
        <AlertCircle className="mt-1 h-4 w-4" />
        <div className="ml-2 flex-1">
          <AlertTitle>Atenção</AlertTitle>
          <AlertDescription>
            Você pode deixar apenas um link ativo por vez.
          </AlertDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="ml-2 h-8 w-8 flex-shrink-0 rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>
      </Alert>
    </div>
  );
};

export default NotificationLinks;
