import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getEmail = async (req, res) => {
  try {
    const subject = JSON.stringify(req.body, null, 2);
    console.log(subject);

    async function run() {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const updatedSubject = "write me a email. subject : " + subject;
      const prompt = updatedSubject;
      console.log(prompt);

      const result = await model.generateContent(prompt);
      const response = result.response;
      res.status(200).json(response);
    }

    const generatedEmail = run();
  } catch (e) {
    res.status(500).json("message :" + e.message);
  }
};
