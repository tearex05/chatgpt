import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyCyOkndls5jqj8VtVdfiyZyDWmyDTE9oGQ" });

export const main = async (query) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: query,
  });
  return response.text;
}