import supabase from '../services/supabase';

export async function getCabins() {
  const { data: cabins, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Unable to retrieve Cabins');
  }
  return cabins;
}
