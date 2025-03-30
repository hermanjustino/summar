import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with your API key
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Generate content using Gemini 1.5 Pro model
 * @param {string} prompt - The prompt for content generation
 * @param {object} options - Additional options for the generation
 * @returns {Promise<string>} - The generated content
 */
export const generateContent = async (prompt, options = {}) => {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    
    // Generate content based on the prompt
    const result = await model.generateContent(prompt);
    const response = result.response;
    
    return response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate content. Please try again.");
  }
};

/**
 * Summarize text content
 * @param {string} text - The text to summarize
 * @returns {Promise<string>} - The summarized text
 */
export const summarizeContent = async (text) => {
  const prompt = `Please summarize the following text in a concise but comprehensive manner:\n\n${text}`;
  return generateContent(prompt);
};

/**
 * Generate social media posts based on content
 * @param {string} content - The content to base posts on
 * @param {Array<string>} platforms - The platforms to generate for (e.g., ['twitter', 'linkedin'])
 * @returns {Promise<object>} - Object with platforms as keys and generated posts as values
 */
export const generateSocialPosts = async (content, platforms = ['twitter', 'linkedin', 'instagram']) => {
  const results = {};
  
  for (const platform of platforms) {
    const prompt = `Generate a ${platform} post based on the following content:\n\n${content}`;
    results[platform] = await generateContent(prompt);
  }
  
  return results;
};

export default {
  generateContent,
  summarizeContent,
  generateSocialPosts
};
