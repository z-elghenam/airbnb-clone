"use server"

import { signIn } from '@/auth'
import db from '@/libs/db'
import { LoginSchema } from '@/schemas'
import { AuthError } from 'next-auth'
import * as z from 'zod'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  try{
    const validatedFileds = LoginSchema.safeParse(values)
    if (!validatedFileds.success) {
      return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFileds.data;

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return { error: "Email does not exist!" };
      // return { error: "Invalid Credentials!" };
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    
    return {success: "Logged in successfully!"}
  }catch(error){
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
}
