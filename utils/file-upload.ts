import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabaseBuc = process.env.NEXT_PUBLIC_SB_BUCKET!;

const supabase = createClient(supabaseUrl, supabaseKey);

export const upload = async (file: File) => {
  if (!file.name) return false;

  try {
    let currentTime = new Date().getTime();
    let fileSplit = file.name.split('.');
    let fileName = `${fileSplit[0]}-` + currentTime + `.${fileSplit[1]}`;
    const { data, error } = await supabase.storage
      .from(supabaseBuc)
      .upload('public/' + fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });
    if (error) {
      throw error;
    } else {
      const publicUrl = supabase.storage.from(supabaseBuc).getPublicUrl(data.path);
      return publicUrl;
    }
  } catch (error) {
    throw error;
  }
};
