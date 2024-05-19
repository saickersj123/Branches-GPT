const { OpenAIApi } = require("openai");
require("dotenv").config();

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

const runPrompt = async () => {
  const prompt = "Tell me a joke about a cat eating pasta.";

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 60,
      temperature: 1,
    });

    console.log(response.data.choices[0].text.trim());
  } catch (error) {
    if (error.response) {
      console.error("API 응답 오류:", error.response.status, error.response.data);
    } else {
      console.error("API 호출 중 오류 발생:", error.message);
    }
  }
};

runPrompt();
