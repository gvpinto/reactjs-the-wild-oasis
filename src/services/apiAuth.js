import supabase from './supabase';

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  //   console.log(data);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}
