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

export async function createCabin(newCabin) {
  const imageName = `${Math.ceil(
    Math.random() * 1000000000000000,
  )}-${newCabin.name.replace('/', '')}`;

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //   console.log(`Image name: ${imagePath}`);

  // 1. Create Cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Unable to create a Cabin');
  }

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
