import { trySignIn } from "@service";

export const signIn = (phone: string, password: string) =>
  trySignIn(phone, password);
