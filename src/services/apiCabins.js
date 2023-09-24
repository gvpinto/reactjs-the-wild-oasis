import supabase, { supabaseUrl } from '../services/supabase';

export async function getCabins() {
  const { data: cabins, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Unable to retrieve Cabins');
  }
  return cabins;
}

// Need to setup up the Policy in Supabase
export async function deleteCabin(id) {
  const { error, data } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Unable to delete Cabin');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.ceil(Math.random() * 1000000000000000)}-${
    newCabin.image?.name
  }`.replaceAll('/', '');

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from('cabins');

  // 1. Create Cabin

  // A) CREATE cabin

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT Cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Unable to create a Cabin');
  }

  // For Duplicating and Editing without uploading an Image return early
  if (hasImagePath) return data;

  // 2. Upload Image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image, {
      contentType: 'image/jpeg',
      cacheControl: '3600',
      upsert: false,
    });

  // 3. If Upload ends in an error Delete the created Cabin
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error('Error occurred when uploading cabin image');
  }
  return data;
  //   return null;
}
