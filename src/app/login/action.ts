'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

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

  try {
    validateInput(formData);

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    console.log('test 1');
    const { error } = await supabase.auth.signInWithPassword(data);
    console.log('test 2', error);
    revalidatePath('/', 'layout');
    redirect('/');
  } catch (error) {
    console.log('test 3');
    if (error instanceof Error) {
      redirect('/error?messagtest=' + encodeURIComponent(error.message));
    } else {
      redirect('/error');
    }
  }
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
