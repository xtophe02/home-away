"use client";

import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { actionFunction } from "@/utils/types";

const initialState = {
  message: "",
  error: false,
};

export default function FormContainer({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) {
  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.error) {
      toast({ description: state.message });
    } else if (state.message && state.error) {
      const errorMessages = state.message.split(",");
      const description = (
        <div>
          {errorMessages.map((msg, idx) => (
            <p key={idx}>{msg.trim()}</p> // Trim any extra spaces around the messages
          ))}
        </div>
      );
      toast({
        description,
        variant: "destructive",
      });
    }
  }, [state]);
  return (
    <form action={formAction} autoComplete="off">
      {children}
    </form>
  );
}
