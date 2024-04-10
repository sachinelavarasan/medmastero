import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://acbjcaoqxkumhqkmstro.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjYmpjYW9xeGt1bWhxa21zdHJvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwOTU0ODMwNiwiZXhwIjoyMDI1MTI0MzA2fQ.UfKfDLWY5SlkcWwVT4s_ImHCrP4HexSN1WF3ceG2-Kc';
const supabaseBuc = 'medmastero-bucket';

const supabase = createClient(supabaseUrl, supabaseKey);

export const upload = async (file: File) => {
  if (!file.name) return false;

  try {
    let currentTime = new Date().getTime();
    let fileSplit = file.name.split('.');
    let fileName = `${fileSplit[0]}-` + currentTime + `.${fileSplit[1]}`;
    console.log(fileName);
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
