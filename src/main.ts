// src/main.ts
import { generateQuestion } from './quiz.ts';

const startQuiz = async () => {
  let score = 0;
  const totalQuestions = 5;

  for (let i = 0; i < totalQuestions; i++) {
    try {
      const question = await generateQuestion();
      console.log(question.question);
      question.options.forEach((option, index) => {
        console.log(`${index + 1}. ${option}`);
      });

      const userInput = await promptUser('Your answer (1-4): ');
      const userAnswer = question.options[parseInt(userInput) - 1];

      if (userAnswer === question.answer) {
        console.log('Correct!');
        score++;
      } else {
        console.log(`Wrong! The correct answer is: ${question.answer}`);
      }
    } catch (error) {
      console.error('Error during quiz:', error);
      console.log('Skipping to the next question...');
    }
  }

  console.log(`Your final score is: ${score}/${totalQuestions}`);
};

const promptUser = (query: string): Promise<string> => {
  const stdin = Deno.stdin;
  const stdout = Deno.stdout;

  stdout.write(new TextEncoder().encode(query));
  const buf = new Uint8Array(1024);
  return new Promise((resolve) => {
    stdin.read(buf).then((n) => {
      resolve(new TextDecoder().decode(buf.subarray(0, n)).trim());
    });
  });
};

startQuiz();
