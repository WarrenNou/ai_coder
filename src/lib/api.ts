const API_BASE_URL = "http://localhost:3001/api";

export const generateCode = async (
  prompt: string,
  model: string = "gemini-pro",
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, model }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate code");
    }

    return await response.json();
  } catch (error) {
    console.error("Error generating code:", error);
    throw error;
  }
};
