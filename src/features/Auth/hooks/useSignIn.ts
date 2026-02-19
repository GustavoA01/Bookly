import { SignInFormType, signInSchema } from "@/src/data/schemas";
import { auth } from "@/src/services/firebase/firebaseConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

export const useSignIn = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema),
  });

  const handleSignIn = async (data: SignInFormType) => {
    startTransition(async () => {
      try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        router.push("/");
      } catch (error) {
        const signInError = error as FirebaseError;
        const errorCode = signInError.code;
        const errorMessage = signInError.message;

        console.error("Erro ao fazer login:", errorCode, errorMessage);
        setErrorMessage(errorMessage);

        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    });
  };

  return { methods, handleSignIn, isPending, errorMessage };
};
