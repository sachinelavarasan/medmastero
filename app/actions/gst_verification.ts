'use server';

export async function gstVerification(gstin: string) {
  const url = `${process.env.GST_RAPID_ENDPOINT}/${gstin}/details`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_APIKEY!,
      'X-RapidAPI-Host': 'powerful-gstin-tool.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
