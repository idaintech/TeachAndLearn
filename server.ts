import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // StudyBuddy AI Parent Co-Pilot endpoint
  app.post('/api/studybuddy', async (req, res) => {
    try {
      const { prompt, childAge = 9, childGrade = 'Grade 3', topic = 'Fractions' } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'Prompt is required' });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;

      if (apiKey) {
        try {
          const ai = new GoogleGenAI({
            apiKey: apiKey,
            httpOptions: {
              headers: {
                'User-Agent': 'aistudio-build',
              },
            },
          });

          const systemInstruction = `You are StudyBuddy AI, an empathetic, encouraging learning co-pilot designed specifically to help PARENTS support their children's education.
The parent's child is ${childAge} years old in ${childGrade}, focusing on ${topic}.
Never act as a substitute for human teachers; position yourself as a supportive co-pilot for the parent.
Your response MUST always follow this structured 5-part format:
1. Simple Explanation: A clear, gentle explanation in friendly terms that a parent can use with their child (e.g., using familiar objects like pizza, blocks, or sharing snacks).
2. Everyday Example: A realistic real-world scenario illustrating the concept.
3. 10-Minute Activity: A quick, fun hands-on offline activity the parent and child can do together.
4. Practice Question: One age-appropriate question with a friendly hint.
5. Encouraging Feedback: Warm, supportive words for the parent to say to encourage their child without shame or pressure.

Keep the tone warm, practical, and family-focused.`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
            config: {
              systemInstruction: systemInstruction,
              temperature: 0.7,
            },
          });

          if (response && response.text) {
            res.json({
              reply: response.text,
              source: 'gemini-3.8-flash',
            });
            return;
          }
        } catch (geminiError) {
          console.warn('Gemini API call encountered an issue, serving pedagogical fallback:', geminiError);
        }
      }

      // High-quality pedagogical fallback when API key is unconfigured or rate-limited
      let reply = '';
      const lower = prompt.toLowerCase();

      if (lower.includes('fraction') || lower.includes('pizza') || lower.includes('half')) {
        reply = `**1. Simple Explanation:**
Explain fractions using something delicious and familiar—like a fresh pizza or a chocolate bar! 
Tell your child: "A fraction just means fair shares. When we cut 1 whole pizza into 4 equal slices, each slice is called 1 out of 4, or 1/4."

**2. Everyday Example:**
If you have 4 slices of apple and your child eats 1 slice, they ate 1/4 of the apple. If you eat 2 slices, you ate 2/4 (which is also half the apple!).

**3. 10-Minute Activity (The Paper Pizza Craft):**
Take a paper plate or a round piece of paper. Draw 4 or 8 slices with a marker. Have your child color 2 slices yellow for cheese and 2 red for tomato. Ask: "What fraction of our plate is red?"

**4. Practice Question:**
"If grandma brings 6 cookies and we divide them equally between you and your sister, what fraction of the cookies do you get? (Hint: How many halves are in the whole batch?)"

**5. Encouraging Feedback to Give Your Child:**
"Fractions can feel tricky at first, but your brain is building new connections every time we slice paper or share snacks. You're doing wonderful work!"`;
      } else if (lower.includes('multiplication') || lower.includes('times table')) {
        reply = `**1. Simple Explanation:**
Explain that multiplication is simply "equal groups having a party together." Instead of counting 3 + 3 + 3 + 3 one by one, we see 4 happy groups of 3!

**2. Everyday Example:**
Look at an egg carton or muffin tin: 2 rows of 6 cups equals 12 cups total.

**3. 10-Minute Activity (Lego / Bead Arrays):**
Take Legos or coins. Ask your child to build 3 rows of 4 bricks. Count them together by skipping: "4, 8, 12!"

**4. Practice Question:**
"If you read 5 pages of your favorite book every night for 4 days, how many pages will you have read altogether?"

**5. Encouraging Feedback to Give Your Child:**
"You don't have to memorize everything instantly. Look at how quickly you spotted those groups! Let's celebrate that win."`;
      } else if (lower.includes('homework') || lower.includes('frustrated') || lower.includes('focus')) {
        reply = `**1. Simple Explanation:**
When a child feels stuck with homework, their brain's emotional center is feeling overwhelmed. Let's break the assignment down into small, bite-sized "snack steps."

**2. Everyday Example:**
Compare it to climbing a staircase: we don't jump straight to the roof; we take one calm step at a time!

**3. 10-Minute Activity (The 2-Minute Reset & Chunking):**
Set a friendly timer for 10 minutes. Tell your child: "Let's only do 2 problems together, and then we take a stretch break with high-fives."

**4. Practice Question:**
Ask your child: "Which problem looks the friendliest to start with?" Giving them the choice gives them a feeling of control.

**5. Encouraging Feedback to Give Your Child:**
"Being stuck is just proof that your brain is about to learn something brand new. Take a breath; we are in this together."`;
      } else {
        reply = `**1. Simple Explanation:**
Start with what your child already knows and loves. Connect this lesson to real-world objects they can see, touch, or hold.

**2. Everyday Example:**
Relate this concept to their daily routine—such as counting pocket money, reading signs on the street, or measuring ingredients for pancakes.

**3. 10-Minute Activity:**
Create a quick challenge: turn this question into a mini-game where your child is the "detective" or "teacher" explaining the clue to you.

**4. Practice Question:**
Try asking: "If a friend asked you how this works in your own words, what is the first clue you'd give them?"

**5. Encouraging Feedback to Give Your Child:**
"I love the creative way your mind thinks through this! Let's strengthen this skill together one step at a time."`;
      }

      res.json({
        reply,
        source: 'pedagogical-engine',
      });
    } catch (err: any) {
      console.error('StudyBuddy error:', err);
      res.status(500).json({ error: 'Failed to process advice request' });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Teach&Learn server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
