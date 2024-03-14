'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const validateInput = (data: FormData) => {
  const email = data.get('email');
  const password = data.get('password');

  if (
    !email ||
    !password ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    throw new Error('Invalid input');
  }
};

export async function login(formData: FormData) {
  const supabase = createClient();

  validateInput(formData);

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    alert(error.message);
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  try {
    validateInput(formData);

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const { error } = await supabase.auth.signUp(data);

    if (error) {
      throw error;
    }

    revalidatePath('/', 'layout');
    redirect('/home');
  } catch (error) {
    if (error instanceof Error) {
      redirect('/error?message=' + encodeURIComponent(error.message));
    } else {
      redirect('/error');
    }
  }
}
