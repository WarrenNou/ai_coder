const API_BASE_URL = "http://localhost:3001/api";

const mockResponse = {
  generatedCode:
    '// Generated code\nfunction example() {\n  console.log("Hello from AI");\n}',
  documentation:
    "## Documentation\n\nThis is a sample function that logs a greeting.",
  executionResults: "Code generated successfully",
};

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
      console.warn("API call failed, using mock response");
      return mockResponse;
    }

    return await response.json();
  } catch (error) {
    console.warn("API call failed, using mock response");
    return mockResponse;
  }
};
