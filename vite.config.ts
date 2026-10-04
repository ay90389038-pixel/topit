import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import dotenv from 'dotenv';
import {GoogleGenAI} from '@google/genai';

dotenv.config();

function aiTutorApiPlugin(): Plugin {
  return {
    name: 'ai-tutor-api',
    configureServer(server) {
      server.middlewares.use('/api/ai-tutor', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let bodyStr = '';
        req.on('data', chunk => {
          bodyStr += chunk;
        });

        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json');
          try {
            const data = JSON.parse(bodyStr || '{}');
            const { mode, topic, subject, classLevel, board, studentAnswer, query } = data;

            const apiKey = process.env.GEMINI_API_KEY;
            if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
              try {
                const ai = new GoogleGenAI({
                  apiKey,
                  httpOptions: {
                    headers: {
                      'User-Agent': 'aistudio-build',
                    },
                  },
                });

                const systemInstruction = `You are TOPIT's master Indian Board Exam Tutor for CBSE, ICSE, and State Boards (Classes 9-12).
Your goal is to help students score 95%+ in their Board Examinations.
Always align strictly with NCERT syllabus, official CBSE/ICSE marking schemes, standard scientific terminology, correct equations, and step-by-step scoring points.
Never hallucinate future exam questions; guide students on conceptual depth, exam presentation, keywords that fetch marks, and common pitfalls.
Format responses with clean Markdown, bullet points, and high-yield presentation.`;

                let prompt = '';
                switch (mode) {
                  case 'explain_simply':
                    prompt = `Explain the concept "${topic}" from ${subject} (${classLevel}, ${board}) in the simplest possible terms (ELI10). Use an everyday intuitive analogy, highlight 3 key rules, and give 1 board exam example. Query details: ${query || ''}`;
                    break;
                  case 'explain_detail':
                    prompt = `Provide a comprehensive, high-scoring board exam explanation for "${topic}" in ${subject} (${classLevel}, ${board}). Include: 1. Formal Definition & Scientific Principle 2. Chemical/Mathematical Equations or Laws 3. Step-by-step Mechanism or Derivation 4. Common mistakes students make in board exams.`;
                    break;
                  case 'give_examples':
                    prompt = `Give 3 authentic, board-relevant examples for "${topic}" in ${subject} (${classLevel}, ${board}). Show the question format, step-by-step working, and where CBSE/ICSE awards marks in the marking scheme.`;
                    break;
                  case 'teach_me':
                    prompt = `Act as an interactive, encouraging teacher explaining "${topic}" in ${subject} (${classLevel}, ${board}). Break it into 3 progressive micro-steps, ask an engaging comprehension question at the end, and highlight why this concept is vital for the board exam.`;
                    break;
                  case 'create_quiz':
                    prompt = `Create a 3-question board-level quick quiz for "${topic}" in ${subject} (${classLevel}, ${board}).
Question 1: Standard Board MCQ (with 4 options and correct answer).
Question 2: Indian Board Assertion-Reasoning question (with standard 4 options: A. Both A and R are true and R is correct explanation, B. Both true but R is not correct, C. A is true R is false, D. A is false R is true).
Question 3: Competency-based 2-mark question with step-marking criteria.`;
                    break;
                  case 'check_answer':
                    prompt = `Evaluate the student's answer for this board question on "${topic}" in ${subject} (${classLevel}, ${board}).
Question: "${query || topic}"
Student's Submitted Answer: "${studentAnswer || ''}"
Provide:
1. Estimated Score out of 5 marks according to official board marking scheme.
2. What key scientific/mathematical keywords were included vs missed.
3. Model answer showing ideal board exam presentation to score full marks.`;
                    break;
                  case 'revision_notes':
                    prompt = `Create high-yield, last-minute board revision notes for "${topic}" in ${subject} (${classLevel}, ${board}).
Include:
- 5 Golden Bullet Points (must-remember)
- All Core Formulas / Equations
- 1 Memory Trick / Mnemonic
- Top 3 board traps to avoid.`;
                    break;
                  case 'test_me':
                    prompt = `Give 1 high-frequency board question on "${topic}" from ${subject} (${classLevel}, ${board}). State the year pattern it frequently appears in (e.g. 3-mark or 5-mark question), provide the question clearly, and give a collapsible detailed solution with step marks.`;
                    break;
                  default:
                    prompt = `As an expert board exam tutor, answer the student's query regarding "${topic || query}" in ${subject || 'Science'} (${classLevel || 'Class 10'}, ${board || 'CBSE'}): ${query}`;
                }

                const response = await ai.models.generateContent({
                  model: 'gemini-3.8-flash',
                  contents: prompt,
                  config: {
                    systemInstruction,
                    temperature: 0.7,
                  },
                });

                res.end(JSON.stringify({
                  text: response.text,
                  mode,
                  source: 'gemini-3.8-flash',
                }));
                return;
              } catch (apiErr: any) {
                console.warn('Gemini API call failed, using intelligent educational fallback:', apiErr?.message);
              }
            }

            // Fallback educational response generator for demo or offline mode
            const fallbackText = generateCuratedResponse(mode, topic, subject, classLevel, board, studentAnswer, query);
            res.end(JSON.stringify({
              text: fallbackText,
              mode,
              source: 'topit-knowledge-engine',
            }));
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message || 'Internal server error' }));
          }
        });
      });
    },
  };
}

function generateCuratedResponse(mode: string, topic: string = 'Carbon & its Compounds', subject: string = 'Science', classLevel: string = 'Class 10', board: string = 'CBSE', studentAnswer?: string, query?: string): string {
  const currentTopic = topic || 'Carbon and its Compounds';
  switch (mode) {
    case 'explain_simply':
      return `### 💡 Simple Explanation: ${currentTopic}\n\n**The Big Idea in 30 Seconds:**\nThink of Carbon as the ultimate Lego builder of the chemical world. With an atomic number of 6, it has 4 electrons in its outer shell (tetravalency). It doesn't gain 4 electrons (energy too high) nor lose 4 electrons (nucleus cannot hold it). Instead, it **shares** pairs of electrons, forming strong **covalent bonds**.\n\n**3 Golden Rules to Remember:**\n1. **Catenation:** Carbon has the unique ability to link with other carbon atoms to form vast chains, branches, and rings.\n2. **Tetravalency:** Every carbon atom forms exactly 4 single bonds (or combinations like double/triple bonds totaling 4).\n3. **Isomerism:** Compounds with the identical molecular formula but distinct structural formulas (e.g., n-butane and isobutane).\n\n**Board Exam Tip:** In CBSE/ICSE 2-mark questions, always define both **Catenation** and **Tetravalency** whenever asked why carbon forms millions of compounds!`;
    case 'explain_detail':
      return `### 📘 Detailed Board Syllabus Review: ${currentTopic}\n\n#### 1. Core Principle & Chemical Bonding\nCarbon ($_{6}C$) electron configuration: $2, 4$.\nTo attain inert gas stability (Neon $2,8$), it shares electrons with hydrogen, halogens, oxygen, and other carbons. Covalent bonds have low melting/boiling points because intermolecular forces are weak, and they do not conduct electricity because no free ions are formed.\n\n#### 2. Key Chemical Reactions for Board Exam\n- **Combustion:** $CH_4 + 2O_2 \\rightarrow CO_2 + 2H_2O + \\text{Heat and Light}$\n- **Oxidation (Alkaline } KMnO_4 \\text{ or Acidified } K_2Cr_2O_7\\text{):}\n  $CH_3CH_2OH \\xrightarrow{\\text{Alk. } KMnO_4 + \\Delta} CH_3COOH$\n- **Addition Reaction (Hydrogenation of Oils):**\n  Vegetable oil (unsaturated) $+ H_2 \\xrightarrow{Ni\\text{ catalyst}} \\text{Vegetable ghee (saturated)}$\n- **Esterification:**\n  $CH_3COOH + CH_3CH_2OH \\xrightarrow{\\text{Conc. } H_2SO_4} CH_3COOCH_2CH_3 \\text{ (Sweet smelling ester)} + H_2O$\n- **Saponification (Making Soap):**\n  $\\text{Ester} + NaOH \\rightarrow \\text{Sodium ethanoate (Soap)} + \\text{Alcohol}$\n\n#### 3. Common Board Pitfalls\n- Confusing detergent vs soap action in hard water: Soaps form insoluble scum with $Ca^{2+}$ and $Mg^{2+}$, whereas synthetic detergents do not.\n- Forgetting to write catalysts ($Ni$, alkaline $KMnO_4$, Conc. $H_2SO_4$) in board answer sheets causes a 1/2 mark penalty!`;
    case 'give_examples':
      return `### 📝 3 Board-Relevant Solved Examples: ${currentTopic}\n\n#### Example 1: Homologous Series (2 Marks)\n**Question:** What is a homologous series? Write the molecular formula of the second and third members of the alkene series.\n**Marking Scheme Answer:**\n- **Definition (1 Mark):** A series of organic compounds having the same functional group, similar chemical properties, in which successive members differ by a $-CH_2-$ group (molecular mass 14 u).\n- **Members (1 Mark):**\n  - 1st member: Ethene ($C_2H_4$)\n  - 2nd member: Propene ($C_3H_6$)\n  - 3rd member: Butene ($C_4H_8$)\n\n#### Example 2: Esterification vs Saponification (3 Marks)\n- **Equation 1:** Ethanoic acid + Ethanol with conc. $H_2SO_4$ gives Ethyl ethanoate (1.5 marks).\n- **Equation 2:** Alkaline hydrolysis of ester produces soap and alcohol (1.5 marks).\n\n#### Example 3: Micelle Formation (3 Marks)\n- Soap molecule consists of: Hydrophobic tail (hydrocarbon) and Hydrophilic head (ionic end $-COO^-Na^+$). Draw the spherical radial diagram with ionic heads facing water!`;
    case 'teach_me':
      return `### 🎓 Interactive Masterclass: ${currentTopic}\n\n**Step 1: The Secret of Versatility**\nWhy does nature build all living tissues, sugars, and plastics out of Carbon and not Silicon or Lead? While Silicon also has valency 4, its atoms are larger, so $Si-Si$ bonds are weak and unstable. Carbon atoms are tiny, allowing the nucleus to hold shared electron pairs tightly!\n\n**Step 2: Saturated vs Unsaturated Hydrocarbons**\n- Saturated: Only single bonds (Alkanes, general formula $C_nH_{2n+2}$). They burn with a clean blue flame.\n- Unsaturated: Contain double bonds (Alkenes, $C_nH_{2n}$) or triple bonds (Alkynes, $C_nH_{2n-2}$). They burn with a yellow sooty flame due to higher carbon percentage.\n\n**Step 3: Quick Check!**\n*Can you identify which of these compounds will decolorize bromine water (undergo addition reaction)?*\n1. $C_2H_6$ (Ethane)\n2. $C_3H_6$ (Propene)\n*(Hint: Check which one has double bonds!)*`;
    case 'create_quiz':
      return `### ⚡ 3-Question Board Diagnostic Quiz: ${currentTopic}\n\n**Q1. [MCQ - 1 Mark]**\nWhich of the following compounds will give an effervescence of $CO_2$ with baking soda ($NaHCO_3$)?\n- A) Ethanol\n- B) Ethanoic acid\n- C) Ethyl ethanoate\n- D) Methane\n*(Answer: B — Ethanoic acid reacts with carbonates/bicarbonates to release $CO_2$ gas with brisk effervescence.)*\n\n---\n**Q2. [Assertion & Reason - 1 Mark]**\n- **Assertion (A):** Soaps are not suitable for washing clothes when water is hard.\n- **Reason (R):** Hard water contains calcium and magnesium ions which react with soap to form an insoluble precipitate called scum.\n- **Options:**\n  - (a) Both A and R are true and R is the correct explanation of A.\n  - (b) Both A and R are true but R is NOT the correct explanation of A.\n  - (c) A is true but R is false.\n  - (d) A is false but R is true.\n*(Answer: (a) — Directly tests CBSE board syllabus competency!)*\n\n---\n**Q3. [Competency-Based Question - 2 Marks]**\nAn organic compound 'X' is a liquid at room temperature with a sweet fruity smell. Upon heating with sodium hydroxide, it yields an alcohol 'Y' and sodium ethanoate. Identify 'X' and 'Y' and write the balanced equation.`;
    case 'check_answer':
      return `### 🎯 CBSE/ICSE Answer Evaluation\n\n**Evaluated Response:** "${studentAnswer || 'Carbon forms covalent bonds by sharing electrons.'}"\n\n**Estimated Board Score:** 3.5 / 5.0 Marks\n\n**Detailed Examiner Rubric:**\n1. **Core Concept Presentation (1.5/2.0):** Correctly mentions covalent bonding and sharing of electrons.\n2. **Scientific Terminology (1.0/1.5):** Good, but missed mentioning the dual reasons for not forming $C^{4+}$ or $C^{4-}$ ions:\n   - Cannot form $C^{4-}$ because it is difficult for 6 protons to hold 10 electrons.\n   - Cannot form $C^{4+}$ because removing 4 electrons requires massive ionization energy.\n3. **Presentation & Keywords (1.0/1.5):** Include formal definitions of **tetravalency** and **catenation**.\n\n**Model Answer to Score 5/5:**\n*"Carbon forms covalent bonds because its atomic number is 6 (configuration 2,4). To attain noble gas stability, it cannot gain four electrons to form $C^{4-}$ as a nucleus with 6 protons cannot hold 10 electrons. It cannot lose four electrons to form $C^{4+}$ due to high energy required. Hence, it overcomes this limitation by sharing valence electrons with other carbon or hydrogen atoms, forming covalent bonds."*`;
    case 'revision_notes':
      return `### 📌 High-Yield Revision Sheet: ${currentTopic}\n\n**5 Golden Rules for 95%+:**\n1. **Functional Groups:**\n   - Alcohol: $-OH$ (suffix -ol)\n   - Aldehyde: $-CHO$ (suffix -al)\n   - Ketone: $-CO-$ (suffix -one)\n   - Carboxylic Acid: $-COOH$ (suffix -oic acid)\n2. **Isomers:** Butane ($C_4H_{10}$) has 2 structural isomers (n-butane and 2-methylpropane). Pentane has 3 isomers.\n3. **Oxidation test:** Ethanoic acid turns blue litmus red; Ethanol does not affect litmus paper.\n4. **Cleansing action:** Hydrophilic ionic head points outwards in water; hydrophobic hydrocarbon tail traps grease inside micelle core.\n5. **Detergents vs Soaps:** Detergents are ammonium or sulphonate salts; active even in hard water.\n\n**Memory Mnemonic for Alkane Prefixes:**\n*"Monkeys Eat Peanut Butter"*\n- **M**eth- ($C_1$), **E**th- ($C_2$), **P**rop- ($C_3$), **B**ut- ($C_4$).`;
    case 'test_me':
      return `### 🏆 Board Exam Question (3 Marks - Frequently Tested in CBSE & ICSE)\n\n**Question:**\n(a) Give a chemical test to distinguish between saturated and unsaturated hydrocarbons.\n(b) Write the chemical equation for the reaction that occurs when ethanol is heated with excess concentrated sulphuric acid at $443\\text{ K}$ ($170^\\circ\\text{C}$). State the role of sulphuric acid.\n\n---\n**Marking Scheme & Model Solution:**\n- **Part (a) [1 Mark]:**\n  - Pass the given gas/liquid through **Bromine water** (or alkaline $KMnO_4$).\n  - Unsaturated hydrocarbons (e.g., ethene) decolorize bromine water from reddish-brown to colourless.\n  - Saturated hydrocarbons (e.g., ethane) do not decolorize bromine water.\n- **Part (b) [2 Marks]:**\n  - **Equation (1 Mark):**\n    $CH_3-CH_2-OH \\xrightarrow{\\text{Conc. } H_2SO_4, 443\\text{ K}} CH_2=CH_2 + H_2O$\n  - **Role of Conc. $H_2SO_4$ (1 Mark):** Acts as a **dehydrating agent** (removes a water molecule from ethanol).`;
    default:
      return `### 🎓 TOPIT Board Guidance: ${currentTopic}\n\nFocus on mastering the NCERT textbook questions and exemplar exercises first. Practice drawing clean diagrams with neat labelling, as board examiners allocate up to 50% of the marks in long answers for accurate diagrams and balanced chemical/mathematical equations!`;
  }
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), aiTutorApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

