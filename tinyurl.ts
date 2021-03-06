import { containsSpecialChars } from "./utils.ts";

export const shorten = async (url: string, alias?: string) => {
  let apiUrl = `http://tinyurl.com/api-create.php?url=${url}`;
  if (alias) {
    if (containsSpecialChars(alias))
      throw new Error("Alias cannot contains special characters");
    if (alias.length < 5) throw Error("Alias must be over 5 characters");
    if (alias.length > 30) throw Error("Alias cannot be over 30 characters");
    apiUrl += `&alias=${alias}`;
  }

  const response = await fetch(apiUrl);
  if (response.ok) return await response.text();
  else throw Error("URL is likely invalid.");
};
