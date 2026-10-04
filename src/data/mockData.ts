import {
  Chapter,
  ConceptDetail,
  PracticeQuestion,
  PYQuestion,
  TestTemplate,
  PracticalExperiment,
  BoardUpdate,
  ResourceItem,
  UserProgress,
} from '../types';

export const INITIAL_CHAPTERS: Chapter[] = [
  {
    id: 'ch-carbon',
    title: 'Carbon & its Compounds',
    subject: 'Science',
    classLevel: 'Class 10',
    board: 'CBSE',
    weightageMarks: 6,
    totalTopics: 7,
    completionPercentage: 42,
    status: 'weak',
    highYield: true,
    pyqFrequencyCount: 14,
    summary: 'Covalent bonding, tetravalency, catenation, homologous series, functional groups, combustion, oxidation, esterification and cleansing action of soaps.',
    keyTopics: ['Versatile Nature of Carbon', 'Homologous Series', 'Nomenclature of Carbon Compounds', 'Chemical Properties of Ethanol & Ethanoic Acid', 'Soaps & Detergents'],
  },
  {
    id: 'ch-electricity',
    title: 'Electricity',
    subject: 'Science',
    classLevel: 'Class 10',
    board: 'CBSE',
    weightageMarks: 7,
    totalTopics: 8,
    completionPercentage: 68,
    status: 'improving',
    highYield: true,
    pyqFrequencyCount: 18,
    summary: 'Ohm’s law, resistance, resistivity factors, series and parallel resistor combinations, electric power and heating effect of electric current (Joule’s Law).',
    keyTopics: ['Electric Current & Potential Difference', 'Ohm’s Law & VI Graph', 'Factors affecting Resistance (Resistivity)', 'Resistors in Series & Parallel', 'Joule’s Law of Heating & Commercial Unit'],
  },
  {
    id: 'ch-light',
    title: 'Light: Reflection & Refraction',
    subject: 'Science',
    classLevel: 'Class 10',
    board: 'CBSE',
    weightageMarks: 7,
    totalTopics: 9,
    completionPercentage: 88,
    status: 'mastered',
    highYield: true,
    pyqFrequencyCount: 21,
    summary: 'Spherical mirrors, mirror formula, magnification, refraction at plane and spherical interfaces, lens formula, power of a lens and ray diagrams.',
    keyTopics: ['Concave & Convex Mirror Ray Diagrams', 'Mirror Formula & Sign Convention', 'Refractive Index & Snell’s Law', 'Convex & Concave Lens Formulations', 'Power of a Lens'],
  },
  {
    id: 'ch-chemical-reactions',
    title: 'Chemical Reactions & Equations',
    subject: 'Science',
    classLevel: 'Class 10',
    board: 'CBSE',
    weightageMarks: 5,
    totalTopics: 6,
    completionPercentage: 92,
    status: 'mastered',
    highYield: false,
    pyqFrequencyCount: 12,
    summary: 'Balancing chemical equations, combination, decomposition, displacement, double displacement, precipitation, redox reactions, corrosion and rancidity.',
    keyTopics: ['Balancing Redox & Decomposition Equations', 'Exothermic vs Endothermic Reactions', 'Types of Reactions with Examples', 'Oxidation & Reduction in Daily Life'],
  },
  {
    id: 'ch-life-processes',
    title: 'Life Processes',
    subject: 'Science',
    classLevel: 'Class 10',
    board: 'CBSE',
    weightageMarks: 9,
    totalTopics: 10,
    completionPercentage: 79,
    status: 'improving',
    highYield: true,
    pyqFrequencyCount: 22,
    summary: 'Nutrition (autotrophic & heterotrophic), cellular respiration (aerobic & anaerobic), human circulatory system, nephron structure and excretory mechanisms.',
    keyTopics: ['Photosynthesis & Stomata Peel Action', 'Aerobic vs Anaerobic Respiration Pathways', 'Human Heart Double Circulation', 'Structure & Function of Nephron'],
  },
  {
    id: 'ch-magnetic-effects',
    title: 'Magnetic Effects of Electric Current',
    subject: 'Science',
    classLevel: 'Class 10',
    board: 'CBSE',
    weightageMarks: 6,
    totalTopics: 7,
    completionPercentage: 51,
    status: 'weak',
    highYield: true,
    pyqFrequencyCount: 15,
    summary: 'Magnetic field lines, right-hand thumb rule, magnetic field due to solenoid, Fleming’s Left-Hand rule, electromagnetic induction principle and domestic circuits.',
    keyTopics: ['Right Hand Thumb Rule & Circular Loop', 'Magnetic Field inside a Solenoid', 'Fleming’s Left-Hand Rule', 'Domestic Electric Circuits & Fuse Function'],
  },
  {
    id: 'ch-quadratics',
    title: 'Quadratic Equations',
    subject: 'Mathematics',
    classLevel: 'Class 10',
    board: 'CBSE',
    weightageMarks: 6,
    totalTopics: 5,
    completionPercentage: 84,
    status: 'mastered',
    highYield: true,
    pyqFrequencyCount: 16,
    summary: 'Standard form ax^2 + bx + c = 0, factorization method, quadratic formula, nature of roots using discriminant D, and word problems.',
    keyTopics: ['Discriminant (D = b² - 4ac) & Nature of Roots', 'Factorization Technique', 'Quadratic Formula Application', 'Speed-Distance & Age Word Problems'],
  },
  {
    id: 'ch-trigonometry',
    title: 'Introduction to Trigonometry',
    subject: 'Mathematics',
    classLevel: 'Class 10',
    board: 'CBSE',
    weightageMarks: 8,
    totalTopics: 6,
    completionPercentage: 62,
    status: 'improving',
    highYield: true,
    pyqFrequencyCount: 24,
    summary: 'Trigonometric ratios of acute angles, values at 0, 30, 45, 60, 90 degrees, trigonometric identities (sin²θ + cos²θ = 1) and proof-based questions.',
    keyTopics: ['T-Ratios in a Right Triangle', 'Values Table for 0° to 90°', 'Core Pythagorean Identities', 'Standard Board Identity Proofs'],
  },
  {
    id: 'ch-triangles',
    title: 'Triangles',
    subject: 'Mathematics',
    classLevel: 'Class 10',
    board: 'CBSE',
    weightageMarks: 9,
    totalTopics: 7,
    completionPercentage: 54,
    status: 'weak',
    highYield: true,
    pyqFrequencyCount: 20,
    summary: 'Basic Proportionality Theorem (Thales Theorem) and its converse, criteria for similarity of triangles (AAA, SSS, SAS), and proof applications.',
    keyTopics: ['Basic Proportionality Theorem (BPT) Proof', 'Converse of BPT & Applications', 'Similarity Criteria (AAA, SSS, SAS)', 'High-Weightage Geometric Proofs'],
  },
  {
    id: 'ch-real-numbers',
    title: 'Real Numbers',
    subject: 'Mathematics',
    classLevel: 'Class 10',
    board: 'CBSE',
    weightageMarks: 6,
    totalTopics: 4,
    completionPercentage: 96,
    status: 'mastered',
    highYield: false,
    pyqFrequencyCount: 14,
    summary: 'Fundamental Theorem of Arithmetic, proving irrationality of √2, √3, √5, and HCF-LCM relationships.',
    keyTopics: ['Fundamental Theorem of Arithmetic', 'Proving √2, √3, √5 is Irrational', 'HCF(a,b) × LCM(a,b) = a × b Applications'],
  }
];

export const MOCK_CONCEPTS: Record<string, ConceptDetail> = {
  'ch-carbon': {
    id: 'concept-carbon',
    chapterId: 'ch-carbon',
    topicTitle: 'Carbon & its Compounds — Complete Concept Dossier',
    simpleExplanation:
      'Carbon has atomic number 6 and electronic configuration (2,4). Since it cannot gain 4 electrons (difficult for 6 protons to hold 10 electrons) nor lose 4 electrons (requires huge ionization energy), it shares valence electrons with other atoms. This sharing forms covalent bonds. Carbon forms millions of compounds due to two unique properties: Catenation (self-linking) and Tetravalency (4 bonding bonds).',
    detailedExplanation: [
      '1. Covalent Bond: A chemical bond formed by the sharing of an electron pair between two atoms. Carbon bonds with H, O, N, halogens, and S. Because covalent compounds do not form free ions, they are poor conductors of electricity and possess relatively low melting/boiling points.',
      '2. Catenation: The unique property of carbon atoms to link with one another via covalent bonds to form long linear chains, branched chains, or closed ring structures. Carbon-carbon single bonds are exceptionally strong (~348 kJ/mol) because the small size of carbon allows nuclei to hold shared pairs tightly.',
      '3. Homologous Series: A family of organic compounds sharing the same functional group and general formula, where each successive member differs by a -CH2- unit (14 u molar mass). Physical properties show a gradation as molecular mass rises, while chemical properties remain similar.',
      '4. Ethanol (C2H5OH) & Ethanoic Acid (CH3COOH): Ethanol reacts with sodium to release H2 gas with effervescence. Ethanoic acid reacts with carbonates/bicarbonates to release CO2 gas with brisk effervescence (crucial board distinction test).',
      '5. Esterification & Saponification: Reaction between ethanoic acid and ethanol in presence of conc. H2SO4 forms a sweet-smelling ester (ethyl ethanoate). Alkaline hydrolysis of an ester using NaOH produces soap and alcohol (saponification).',
      '6. Cleansing Action of Soap: Soap molecule has a hydrophilic ionic head (-COO-Na+) that interacts with water, and a hydrophobic hydrocarbon tail that dissolves in oil/grease. In water, these arrange radially into spherical structures called micelles, emulsifying oil for rinse.'
    ],
    quickRevisionBullets: [
      'Carbon always forms covalent bonds by sharing 4 electrons (Tetravalent).',
      'Catenation: Ability to form long C-C chains; Silicon does not do this effectively because Si-Si bonds are large and weak.',
      'Alkanes: CnH2n+2 (Single bond, saturated); Alkenes: CnH2n (Double bond, unsaturated); Alkynes: CnH2n-2 (Triple bond).',
      'Unsaturated hydrocarbons decolorize Bromine water; saturated hydrocarbons do not.',
      'Esterification catalyst: Concentrated H2SO4 (acts as dehydrating agent).',
      'Soaps form insoluble curdy white precipitate (scum) with Ca²⁺ and Mg²⁺ ions present in hard water; synthetic detergents do not.'
    ],
    formulas: [
      { name: 'General Formula of Alkanes', formula: 'C_n H_{2n+2}', note: 'Saturated hydrocarbons, undergo substitution with Cl2 in sunlight' },
      { name: 'General Formula of Alkenes', formula: 'C_n H_{2n}', note: 'Unsaturated with one double bond, undergo addition reaction with H2 (Ni catalyst)' },
      { name: 'General Formula of Alkynes', formula: 'C_n H_{2n-2}', note: 'Unsaturated with one triple bond' },
      { name: 'Esterification Equation', formula: 'CH_3COOH + C_2H_5OH \\xrightarrow{Conc.\\ H_2SO_4} CH_3COOC_2H_5 + H_2O', note: 'Formation of sweet-smelling Ethyl ethanoate' },
      { name: 'Saponification Reaction', formula: 'CH_3COOC_2H_5 + NaOH \\rightarrow CH_3COONa + C_2H_5OH', note: 'Preparation of sodium ethanoate (soap)' },
      { name: 'Oxidation of Ethanol', formula: 'CH_3CH_2OH \\xrightarrow{Alk.\\ KMnO_4 + \\Delta} CH_3COOH', note: 'Alkaline KMnO4 or acidified K2Cr2O7 acts as oxidizing agent' }
    ],
    solvedExamples: [
      {
        title: 'Chemical Test to Distinguish Ethanol and Ethanoic Acid',
        marks: 3,
        question: 'Suggest a safe chemical test to distinguish between Ethanol and Ethanoic Acid in the laboratory. Write balanced chemical equations for the reaction involved.',
        solutionSteps: [
          'Step 1 (Test Selection - 1 Mark): Add a pinch of Sodium bicarbonate (NaHCO3) or Sodium carbonate (Na2CO3) to equal volumes of each liquid.',
          'Step 2 (Observation - 1 Mark): Ethanoic acid reacts vigorously with brisk effervescence due to evolution of colorless, odorless carbon dioxide (CO2) gas, which turns lime water milky. Ethanol shows NO brisk effervescence.',
          'Step 3 (Chemical Equation - 1 Mark): CH3COOH + NaHCO3 → CH3COONa + H2O + CO2 ↑'
        ],
        markingTips: 'Do not simply say "litmus test" without specifying that ethanoic acid turns blue litmus red while neutral ethanol has no effect on blue litmus.'
      },
      {
        title: 'Isomerism in Butane',
        marks: 2,
        question: 'What are structural isomers? Draw the structures of the two isomers of butane (C4H10).',
        solutionSteps: [
          'Step 1 (Definition - 1 Mark): Compounds having the identical molecular formula but different structural arrangements of atoms are called structural isomers.',
          'Step 2 (Structures - 1 Mark): 1. n-butane (unbranched straight chain: CH3-CH2-CH2-CH3) and 2. Isobutane / 2-methylpropane (branched chain with central CH attached to three methyl groups).'
        ],
        markingTips: 'Always ensure all four bonds of each carbon are satisfied with hydrogens when drawing open structural formulas.'
      }
    ],
    tricksAndMnemonics: [
      {
        name: 'Alkane Prefix Order (C1 to C4)',
        phrase: 'Monkeys Eat Peanut Butter',
        explanation: 'M = Meth- (1), E = Eth- (2), P = Prop- (3), B = But- (4). From C5 onwards, standard Greek roots apply: Pent-, Hex-, Hept-, Oct-.'
      },
      {
        name: 'Micelle Structure Orientation',
        phrase: 'Water Loves the Head, Hates the Tail',
        explanation: 'Hydrophilic (water-loving) polar ionic head (-COO⁻Na⁺) always points outwards into aqueous medium. Hydrophobic (water-fearing) non-polar hydrocarbon tail tucks inward to dissolve grease.'
      }
    ]
  },
  'ch-electricity': {
    id: 'concept-electricity',
    chapterId: 'ch-electricity',
    topicTitle: 'Electricity — Complete Concept Dossier',
    simpleExplanation:
      'Electric current is the rate of flow of electric charges (electrons) through a conductor: I = Q/t. Potential difference (voltage) is the work done to move a unit positive charge between two points: V = W/Q. Ohm’s Law establishes that at constant temperature, current is directly proportional to voltage: V = IR.',
    detailedExplanation: [
      '1. Ohm’s Law: The electric current flowing through a metallic conductor is directly proportional to the potential difference applied across its ends, provided temperature and other physical conditions remain constant. The slope of a V-I graph gives the resistance R.',
      '2. Factors Affecting Resistance: Resistance R is directly proportional to conductor length l, inversely proportional to cross-sectional area A, and dependent on nature of material: R = ρ(l/A), where ρ is resistivity (in Ω·m). Resistivity is an intrinsic property that depends only on temperature and material, NOT on dimensions.',
      '3. Resistors in Series: Same current I flows through all resistors. Total potential difference is V = V1 + V2 + V3. Equivalent resistance: Req = R1 + R2 + R3. If one component fails, the entire circuit breaks.',
      '4. Resistors in Parallel: Same potential difference V exists across each branch. Total current is I = I1 + I2 + I3. Equivalent resistance: 1/Req = 1/R1 + 1/R2 + 1/R3. Req is always smaller than the smallest individual resistance.',
      '5. Joule’s Law of Heating: Heat produced in a resistor is directly proportional to the square of current, resistance, and time: H = I²Rt. Applied in electric irons, toasters, water heaters, and safety fuses.',
      '6. Commercial Unit of Energy: 1 kilowatt-hour (1 kWh) = 3.6 × 10⁶ Joules (also known as 1 "Board of Trade Unit").'
    ],
    quickRevisionBullets: [
      'Current I = Q/t (Ampere), 1 Ampere = 1 Coulomb / 1 second.',
      'Potential difference V = W/Q (Volt), 1 Volt = 1 Joule / 1 Coulomb.',
      'Resistivity ρ = R·A / l (Unit: Ω·m). Metals have very low resistivity (10⁻⁸ Ωm); insulators have high resistivity (10¹² to 10¹⁷ Ωm).',
      'Alloys (Nichrome, Manganin) have higher resistivity than constituent metals and do not oxidize (burn) readily at high temperatures, making them ideal for heating elements.',
      'In domestic wiring, parallel connection is used because: 1. Each appliance gets full mains voltage (220V). 2. Independent on/off switches. 3. Failure of one appliance does not disrupt others.',
      'Fuse wire has high resistance and low melting point, placed in series with the live wire.'
    ],
    formulas: [
      { name: 'Ohm’s Law', formula: 'V = I \\times R', note: 'V in Volts, I in Amperes, R in Ohms (Ω)' },
      { name: 'Resistance & Resistivity', formula: 'R = \\rho \\frac{l}{A} = \\rho \\frac{l}{\\pi r^2}', note: 'ρ is resistivity in Ω·m, l is length, A is cross-sectional area' },
      { name: 'Resistors in Series', formula: 'R_s = R_1 + R_2 + R_3', note: 'Current is identical through each resistor' },
      { name: 'Resistors in Parallel', formula: '1/R_p = 1/R_1 + 1/R_2 + 1/R_3', note: 'Voltage is identical across each parallel branch' },
      { name: 'Joule’s Heating Law', formula: 'H = I^2 R t = V I t = \\frac{V^2}{R} t', note: 'Heat energy in Joules' },
      { name: 'Electric Power', formula: 'P = V I = I^2 R = \\frac{V^2}{R}', note: 'Power in Watts (W)' },
      { name: 'Commercial Unit Conversion', formula: '1\\text{ kWh} = 1000\\text{ W} \\times 3600\\text{ s} = 3.6 \\times 10^6\\text{ J}', note: 'Frequently used in board electricity bill numericals' }
    ],
    solvedExamples: [
      {
        title: 'Resistivity and Wire Stretching Numerical (3 Marks)',
        marks: 3,
        question: 'A cylindrical wire of resistance R is drawn out so that its length is doubled while the material volume remains constant. What is the new resistance of the wire in terms of R?',
        solutionSteps: [
          'Step 1 (Volume Conservation - 1 Mark): Since volume V = A × l is constant, when new length l\' = 2l, the new cross-sectional area becomes A\' = A / 2.',
          'Step 2 (Formula Application - 1 Mark): Original resistance R = ρ(l / A). New resistance R\' = ρ(l\' / A\') = ρ(2l / (A/2)) = 4 × ρ(l / A).',
          'Step 3 (Final Conclusion - 1 Mark): Therefore, R\' = 4R. The resistance quadruples.'
        ],
        markingTips: 'Stating that area halves when length doubles is worth 1 full mark in the CBSE marking scheme. Do not skip this step!'
      }
    ],
    tricksAndMnemonics: [
      {
        name: 'Parallel Resistance Shortcut for 2 Resistors',
        phrase: 'Product over Sum',
        explanation: 'For two resistors in parallel: Rp = (R1 × R2) / (R1 + R2). If two identical resistors of value R are in parallel, Rp is simply R / 2.'
      }
    ]
  }
};

export const MOCK_PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'pq-carbon-1',
    chapterId: 'ch-carbon',
    topic: 'Soaps and Detergents',
    type: 'assertion_reason',
    difficulty: 'Board-Level',
    question: 'Directions: In the following question, a statement of Assertion (A) is followed by a statement of Reason (R). Choose the correct option.',
    assertion: 'Soaps do not form lather easily with hard water and instead form a sticky curdy precipitate called scum.',
    reason: 'Hard water contains dissolved calcium and magnesium hydrogencarbonates, chlorides or sulphates which react with soap to form insoluble salts.',
    options: [
      'Both Assertion (A) and Reason (R) are true and Reason (R) is the correct explanation of Assertion (A).',
      'Both Assertion (A) and Reason (R) are true but Reason (R) is NOT the correct explanation of Assertion (A).',
      'Assertion (A) is true but Reason (R) is false.',
      'Assertion (A) is false but Reason (R) is true.'
    ],
    correctAnswer: 0,
    hint: 'Think about what ions are present in hard water and what happens when sodium stearate interacts with Ca²⁺ and Mg²⁺.',
    markingSchemeBreakdown: [
      { step: 'Correct option identification (Option A)', marks: 1 }
    ],
    explanation:
      'Soap molecules are sodium or potassium salts of long-chain carboxylic acids. When soap is added to hard water, Ca²⁺ and Mg²⁺ ions displace sodium/potassium to form insoluble calcium and magnesium salts of fatty acids (scum). Hence both A and R are true and R correctly explains A.',
    boardTags: ['CBSE 2024 Set 1', 'CBSE 2022 Term 2', 'Sample Paper 2025']
  },
  {
    id: 'pq-carbon-2',
    chapterId: 'ch-carbon',
    topic: 'Chemical Properties of Ethanol & Ethanoic Acid',
    type: 'short_answer',
    difficulty: 'Moderate',
    question:
      'An organic compound "A" of molecular formula C2H6O on heating with alkaline KMnO4 gives compound "B". Compound "A" on heating with concentrated H2SO4 at 443 K gives compound "C".\n(a) Identify compounds A, B and C.\n(b) Write balanced chemical equation for the formation of compound C from A and state the role of concentrated H2SO4.',
    correctAnswer: 'A is Ethanol (C2H5OH), B is Ethanoic acid (CH3COOH), C is Ethene (C2H4)',
    hint: 'Compound A with molecular formula C2H6O is a common alcohol. Concentrated sulfuric acid acts as a dehydrating agent at 443 K.',
    markingSchemeBreakdown: [
      { step: 'Identification of A (Ethanol) & B (Ethanoic acid)', marks: 1 },
      { step: 'Identification of C (Ethene)', marks: 0.5 },
      { step: 'Balanced equation: C2H5OH + conc H2SO4 (443 K) → C2H4 + H2O', marks: 1 },
      { step: 'Role of Conc. H2SO4: Dehydrating agent (removes water)', marks: 0.5 }
    ],
    explanation:
      'Ethanol (C2H5OH) is oxidized by alkaline KMnO4 to Ethanoic acid (CH3COOH). Ethanol on heating with conc. H2SO4 at 443 K undergoes dehydration to form Ethene (CH2=CH2). Conc. H2SO4 extracts a water molecule, acting as a dehydrating agent.',
    boardTags: ['CBSE 2023 All India', 'CBSE 2020 Delhi', 'High-Yield Concept']
  },
  {
    id: 'pq-carbon-3',
    chapterId: 'ch-carbon',
    topic: 'Homologous Series and Isomerism',
    type: 'case_based',
    difficulty: 'Board-Level',
    question:
      'Read the passage given below and answer the following questions:\n\nCarbon compounds are an essential part of our daily life. The ability of carbon to form four covalent bonds and link together in chains gives rise to millions of organic molecules. A student took 3 test tubes X, Y, and Z. Tube X contains Pentane, Tube Y contains Pentene, and Tube Z contains Pentyne.',
    casePassage:
      'A student investigates three hydrocarbons X, Y, and Z each having five carbon atoms. Hydrocarbon X is saturated, while hydrocarbons Y and Z are unsaturated having one double bond and one triple bond respectively. When bromine water is added to the tubes, a distinct decolorization is observed in some tubes.',
    subQuestions: [
      {
        question: '(i) Write the molecular formula and IUPAC name for Hydrocarbon X and Hydrocarbon Z.',
        correctAnswer: 'X is C5H12 (Pentane), Z is C5H8 (Pentyne)',
        marks: 1
      },
      {
        question: '(ii) In which of the tubes (X, Y, or Z) will bromine water be decolorized? Give reason.',
        correctAnswer: 'Tubes Y and Z will decolorize bromine water because unsaturated hydrocarbons undergo addition reactions with bromine.',
        marks: 1
      },
      {
        question: '(iii) Draw any two structural isomers of Hydrocarbon X (Pentane).',
        correctAnswer: 'n-pentane (CH3-CH2-CH2-CH2-CH3) and isopentane / 2-methylbutane (CH3-CH(CH3)-CH2-CH3)',
        marks: 2
      }
    ],
    correctAnswer: 'See sub-questions breakdown',
    hint: 'Alkanes formula is CnH2n+2, Alkynes is CnH2n-2. Unsaturated compounds with double/triple bonds decolorize reddish-brown bromine water.',
    markingSchemeBreakdown: [
      { step: 'Part (i) correct formulas for X and Z', marks: 1 },
      { step: 'Part (ii) identification of Y and Z with addition reaction reason', marks: 1 },
      { step: 'Part (iii) structural drawing of two isomers of pentane', marks: 2 }
    ],
    explanation:
      'Pentane has 3 isomers: n-pentane, isopentane (2-methylbutane), and neopentane (2,2-dimethylpropane). Unsaturated hydrocarbons Y (pentene) and Z (pentyne) rapidly react with bromine across their pi bonds, rendering the brown solution clear.',
    boardTags: ['CBSE 2024 Delhi Set 2', 'Competency Based 2025']
  },
  {
    id: 'pq-elec-1',
    chapterId: 'ch-electricity',
    topic: 'Resistors in Series and Parallel',
    type: 'numerical',
    difficulty: 'Board-Level',
    question:
      'A 6 Ω resistance wire is doubled on itself by folding. Calculate the new resistance of the wire. If this folded wire is then connected across a 3 V battery, find the electric current drawn from the battery.',
    correctAnswer: 'New resistance = 1.5 Ω, Current = 2.0 A',
    hint: 'When a wire is folded in half, its length becomes l/2 and its cross-sectional area becomes 2A. Alternatively, consider it as two halves of 3 Ω each connected in parallel.',
    markingSchemeBreakdown: [
      { step: 'Recognizing length becomes l/2 and area becomes 2A', marks: 1 },
      { step: 'Calculating new resistance: R\' = ρ(l/2)/(2A) = R/4 = 6/4 = 1.5 Ω', marks: 1 },
      { step: 'Applying Ohm’s Law I = V / R\' = 3 V / 1.5 Ω = 2 A', marks: 1 }
    ],
    explanation:
      'Original R = ρ(l/A) = 6 Ω. When folded in half, l\' = l/2 and A\' = 2A. Therefore R\' = ρ(l/2)/(2A) = (1/4)ρ(l/A) = 6 / 4 = 1.5 Ω. Using Ohm’s law I = V / R\' = 3 / 1.5 = 2.0 Amperes.',
    boardTags: ['CBSE 2023 Set 3', 'CBSE 2020 All India', 'Exemplar Numerical']
  },
  {
    id: 'pq-elec-2',
    chapterId: 'ch-electricity',
    topic: 'Joule’s Law and Electric Power',
    type: 'mcq',
    difficulty: 'Easy',
    question:
      'An electric kettle is rated 220 V, 1 kW. Which of the following fuse wires must be used for its safe operation?',
    options: ['1 A fuse', '2 A fuse', '3 A fuse', '5 A fuse'],
    correctAnswer: 3,
    hint: 'Calculate safe operating current using I = P / V and pick the nearest standard fuse rating above that current.',
    markingSchemeBreakdown: [
      { step: 'Calculating I = 1000 W / 220 V = 4.54 A and choosing 5 A fuse', marks: 1 }
    ],
    explanation:
      'Operating current I = P / V = 1000 / 220 ≈ 4.55 A. A fuse rated lower than 4.55 A (1A, 2A, 3A) will blow during normal operation. Therefore, a 5 A fuse is suitable.',
    boardTags: ['CBSE 2024 Set 1', 'NCERT Textbook In-Text']
  }
];

export const MOCK_PYQS: PYQuestion[] = [
  {
    id: 'pyq-1',
    chapterId: 'ch-carbon',
    topic: 'Esterification and Saponification',
    subject: 'Science',
    classLevel: 'Class 10',
    board: 'CBSE',
    year: 2024,
    set: 'Delhi Set-1 (Q28)',
    marks: 3,
    questionType: 'short_answer',
    difficulty: 'Board-Level',
    question:
      '(a) What happens when ethanoic acid reacts with ethanol in the presence of an acid catalyst? Write the chemical equation for the reaction.\n(b) How can ethanol be converted back from the product formed in part (a)? Name the process and write the equation.',
    conceptsTested: ['Esterification', 'Saponification', 'Role of Conc. H2SO4', 'Alkaline Hydrolysis'],
    historicalFrequencyNotes:
      'Tested in 5 of the last 7 CBSE board exams (2024, 2023, 2022 Term 2, 2020 Delhi, 2019 All India). Consistently carries 3 to 5 marks.',
    frequencyScore: 'Very High',
    officialSolution:
      '(a) A sweet-smelling compound called ethyl ethanoate (ester) is formed.\nCH3COOH + C2H5OH --(Conc. H2SO4)--> CH3COOC2H5 + H2O\n(b) By heating the ester with sodium hydroxide (alkaline hydrolysis). This process is known as Saponification.\nCH3COOC2H5 + NaOH ----> CH3COONa + C2H5OH',
    markingBreakdown: [
      { step: 'Product name (ester/ethyl ethanoate) + balanced equation with acid catalyst', marks: 1.5 },
      { step: 'Name of process (Saponification) + balanced alkaline hydrolysis equation', marks: 1.5 }
    ]
  },
  {
    id: 'pyq-2',
    chapterId: 'ch-carbon',
    topic: 'Catenation & Tetravalency',
    subject: 'Science',
    classLevel: 'Class 10',
    board: 'CBSE',
    year: 2023,
    set: 'All India Set-2 (Q19)',
    marks: 2,
    questionType: 'short_answer',
    difficulty: 'Moderate',
    question:
      'State two reasons why carbon can neither form C4+ cations nor C4- anions, but forms covalent compounds by sharing electrons.',
    conceptsTested: ['Nuclear Charge vs Electron count', 'Ionization Energy', 'Covalent Nature'],
    historicalFrequencyNotes:
      'Tested 6 times across 2018–2024. Examiners consider this a foundational conceptual benchmark.',
    frequencyScore: 'Very High',
    officialSolution:
      '1. It could gain four electrons forming C4- anion. But it would be difficult for the nucleus with six protons to hold on to ten electrons, that is, four extra electrons.\n2. It could lose four electrons forming C4+ cation. But it would require a large amount of energy to remove four electrons leaving behind a carbon cation with six protons in its nucleus holding on to just two electrons.',
    markingBreakdown: [
      { step: 'Reason for not forming C4- (protons unable to hold 10 electrons)', marks: 1 },
      { step: 'Reason for not forming C4+ (enormous ionization energy required)', marks: 1 }
    ]
  },
  {
    id: 'pyq-3',
    chapterId: 'ch-electricity',
    topic: 'Factors Affecting Resistance',
    subject: 'Science',
    classLevel: 'Class 10',
    board: 'CBSE',
    year: 2024,
    set: 'Outside Delhi Set-3 (Q31)',
    marks: 3,
    questionType: 'numerical',
    difficulty: 'Board-Level',
    question:
      'A copper wire has diameter 0.5 mm and resistivity of 1.6 × 10⁻⁸ Ω·m. What will be the length of this wire to make its resistance 10 Ω? How much does the resistance change if the diameter is doubled?',
    conceptsTested: ['Resistivity formula R = ρl/A', 'Cross-sectional area of wire', 'Inverse square relation of R with diameter'],
    historicalFrequencyNotes:
      'Appeared in 2024, 2022, 2019, 2018. A classic standard numerical in CBSE Board physics section.',
    frequencyScore: 'High',
    officialSolution:
      'Radius r = 0.5/2 mm = 0.25 × 10⁻³ m.\nArea A = πr² = 3.14 × (0.25 × 10⁻³)² ≈ 1.96 × 10⁻⁷ m².\nl = (R × A) / ρ = (10 × 1.96 × 10⁻⁷) / (1.6 × 10⁻⁸) ≈ 122.5 m.\nSince R ∝ 1/d², if diameter is doubled, resistance becomes 1/4th of original value (i.e. 2.5 Ω).',
    markingBreakdown: [
      { step: 'Calculation of area A and formula rearrangement for length l', marks: 1.5 },
      { step: 'Accurate value of length l ≈ 122.5 m (or 122.7 m)', marks: 0.5 },
      { step: 'Reasoning and calculation that resistance becomes R/4 = 2.5 Ω', marks: 1 }
    ]
  },
  {
    id: 'pyq-4',
    chapterId: 'ch-light',
    topic: 'Mirror Formula & Ray Diagrams',
    subject: 'Science',
    classLevel: 'Class 10',
    board: 'CBSE',
    year: 2023,
    set: 'Delhi Set-1 (Q33)',
    marks: 5,
    questionType: 'long_answer',
    difficulty: 'Board-Level',
    question:
      'An object 4 cm in height is placed at 15 cm in front of a concave mirror of focal length 10 cm.\n(a) At what distance from the mirror should a screen be placed to obtain a sharp image?\n(b) Find the size and nature of the image formed.\n(c) Draw a neat ray diagram to show image formation in this case.',
    conceptsTested: ['Sign convention for concave mirror', 'Mirror formula 1/v + 1/u = 1/f', 'Magnification m = -v/u = h\'/h', 'Standard ray diagram rules'],
    historicalFrequencyNotes:
      'Concave/Convex mirror numerical with ray diagram is tested in 80% of board paper sets over the last decade.',
    frequencyScore: 'Very High',
    officialSolution:
      'u = -15 cm, f = -10 cm, h = +4 cm.\n1/v = 1/f - 1/u = -1/10 - (-1/15) = -1/10 + 1/15 = -1/30 cm.\nv = -30 cm (Screen should be placed 30 cm in front of the mirror).\nm = -v/u = -(-30)/(-15) = -2.\nh\' = m × h = -2 × 4 = -8 cm.\nNature: Real, inverted, and magnified.\nRay diagram: Ray parallel to principal axis passes through F; ray passing through C reflects back along same path; intersect at 30 cm.',
    markingBreakdown: [
      { step: 'Applying mirror formula with proper signs to find v = -30 cm', marks: 2 },
      { step: 'Calculating magnification and image height h\' = -8 cm with nature stated', marks: 1.5 },
      { step: 'Accurate labelled ray diagram with arrows showing direction', marks: 1.5 }
    ]
  }
];

export const MOCK_TESTS: TestTemplate[] = [
  {
    id: 'test-quick-carbon',
    title: 'Quick Sprint: Carbon Compounds Mastery',
    type: 'quick',
    durationMinutes: 10,
    totalMarks: 10,
    questionsCount: 5,
    subject: 'Science',
    chapterName: 'Carbon & its Compounds',
    description: 'High-speed diagnostic test focusing on functional groups, homologous series, and chemical equations.',
    difficulty: 'Moderate'
  },
  {
    id: 'test-ch-electricity',
    title: 'Chapter Test: Electricity Numerical & Theory',
    type: 'chapter',
    durationMinutes: 30,
    totalMarks: 25,
    questionsCount: 10,
    subject: 'Science',
    chapterName: 'Electricity',
    description: 'Covers Ohm’s law, series/parallel combinations, and Joule’s heating numericals with step marking.',
    difficulty: 'Board-Level'
  },
  {
    id: 'test-weak-diagnostic',
    title: 'Personalized Weak-Topic Test',
    type: 'weak_topic',
    durationMinutes: 20,
    totalMarks: 20,
    questionsCount: 8,
    subject: 'Science',
    chapterName: 'Carbon Compounds & Magnetic Effects',
    description: 'Custom generated test targeted at your current lowest accuracy topics (Carbon Compounds & Magnetic Effects).',
    difficulty: 'Board-Level'
  },
  {
    id: 'test-pyq-drill',
    title: 'PYQ 5-Year High Frequency Drill',
    type: 'pyq',
    durationMinutes: 45,
    totalMarks: 35,
    questionsCount: 12,
    subject: 'Science',
    description: 'Exact questions that have appeared in 3 or more CBSE board examinations between 2019 and 2024.',
    difficulty: 'Board-Level'
  },
  {
    id: 'test-full-board-mock',
    title: 'CBSE Class 10 Full Syllabus Mock Board Examination',
    type: 'full_syllabus',
    durationMinutes: 90,
    totalMarks: 80,
    questionsCount: 39,
    subject: 'Science',
    description: 'Standard 80-mark board examination format: Section A (MCQs & A/R), Section B (Short 2M), Section C (Short 3M), Section D (Long 5M), Section E (Case-based 4M).',
    difficulty: 'Board-Level'
  }
];

export const MOCK_PRACTICALS: PracticalExperiment[] = [
  {
    id: 'exp-acid-base',
    title: 'Action of Dilute Acid on Zinc Metal & Gas Evolution',
    classLevel: 'Class 10',
    subject: 'Science',
    objective: 'To study the reaction of zinc granules with dilute sulphuric acid and test the evolved hydrogen gas.',
    apparatus: ['Test tube', 'Test tube stand', 'Delivery tube', 'Water trough containing soap solution', 'Burning splinter / candle', 'Clamp stand'],
    chemicalsOrMaterials: ['Zinc metal granules', 'Dilute Sulphuric acid (H2SO4)', 'Soap solution'],
    procedure: [
      { stepNumber: 1, title: 'Granule Placement', instruction: 'Take about 5 ml of dilute sulphuric acid in a clean, dry test tube and add a few pieces of clean zinc granules to it.' },
      { stepNumber: 2, title: 'Observe Reaction', instruction: 'Observe the vigorous effervescence on the surface of zinc granules as hydrogen gas begins to bubble out.' },
      { stepNumber: 3, title: 'Soap Bubble Delivery', instruction: 'Pass the gas being evolved through the delivery tube into a trough filled with soap solution.' },
      { stepNumber: 4, title: 'Pop Sound Test', instruction: 'Bring a burning candle near a gas-filled soap bubble as it rises into the air.' }
    ],
    observations: [
      { trialOrParam: 'Surface of Zinc Granules', observation: 'Brisk effervescence with continuous tiny gas bubbles formed.', inference: 'Chemical displacement reaction is actively taking place.' },
      { trialOrParam: 'Soap Solution Trough', observation: 'Bubbles filled with gas float upward through the solution.', inference: 'The evolved gas is lighter than air and insoluble in water.' },
      { trialOrParam: 'Flame Contact', observation: 'The bubble bursts with a characteristic sharp "POP" sound and blue flame.', inference: 'Confirms the presence of Hydrogen (H2) gas.' }
    ],
    resultsAndConclusion:
      'Active metals like Zinc react with dilute mineral acids to produce zinc sulphate salt and displace Hydrogen gas:\nZn(s) + H2SO4(aq) → ZnSO4(aq) + H2(g) ↑',
    precautions: [
      'Handle dilute sulphuric acid with care; do not inhale escaping vapors.',
      'Ensure the delivery tube does not dip into the acid in the reaction tube, but stays above the liquid level.',
      'Keep the burning candle at arm’s length during the pop sound test.'
    ],
    vivaVoce: [
      {
        question: 'Why does hydrogen gas make a pop sound when burned?',
        answer: 'Hydrogen gas is highly flammable. When it mixes with oxygen in the air and ignites, a rapid combustion occurs, releasing energy and creating a miniature shockwave that sounds like a "pop".',
        examinerTip: 'Always mention that it is the rapid combustion of H2 with atmospheric O2 that creates the pressure wave.'
      },
      {
        question: 'What happens if we use dilute nitric acid (HNO3) instead of dilute H2SO4 with zinc?',
        answer: 'Nitric acid is a strong oxidizing agent. It oxidizes the hydrogen produced to water (H2O) and itself gets reduced to any of the nitrogen oxides (N2O, NO, NO2). Only very dilute HNO3 with Mg and Mn produces H2 gas.',
        examinerTip: 'A favorite 1-mark question in both board theory papers and practical viva!'
      }
    ]
  },
  {
    id: 'exp-ohms-law',
    title: 'Verification of Ohm’s Law and Determination of Resistance',
    classLevel: 'Class 10',
    subject: 'Science',
    objective: 'To determine the resistance per cm of a given wire by plotting a graph of potential difference versus current.',
    apparatus: ['Resistance wire of unknown resistance', 'DC Ammeter (0-1.5A)', 'DC Voltmeter (0-3V)', 'Rheostat (variable resistor)', 'Battery eliminator or dry cells', 'Plug key', 'Connecting wires', 'Metre scale'],
    chemicalsOrMaterials: ['Sandpaper to clean connecting wire leads'],
    procedure: [
      { stepNumber: 1, title: 'Circuit Assembly', instruction: 'Connect the battery, ammeter, unknown resistance wire, rheostat, and key in series. Connect the voltmeter in parallel across the resistance wire.' },
      { stepNumber: 2, title: 'Polarity Check', instruction: 'Ensure positive terminals of both ammeter and voltmeter connect towards the positive terminal of the power source.' },
      { stepNumber: 3, title: 'Readings taking', instruction: 'Insert the key and slide rheostat to obtain 5 distinct sets of ammeter (I) and voltmeter (V) readings.' },
      { stepNumber: 4, title: 'Graph Plotting', instruction: 'Plot V along the Y-axis and I along the X-axis. Draw the best-fit straight line passing through the origin.' }
    ],
    observations: [
      { trialOrParam: 'Reading 1', observation: 'V = 0.5 V, I = 0.25 A', inference: 'V / I = 2.0 Ω' },
      { trialOrParam: 'Reading 2', observation: 'V = 1.0 V, I = 0.50 A', inference: 'V / I = 2.0 Ω' },
      { trialOrParam: 'Reading 3', observation: 'V = 1.5 V, I = 0.74 A', inference: 'V / I = 2.03 Ω' },
      { trialOrParam: 'Reading 4', observation: 'V = 2.0 V, I = 1.00 A', inference: 'V / I = 2.0 Ω' }
    ],
    resultsAndConclusion:
      'The V-I graph is a straight line passing through the origin. This verifies Ohm’s Law (V ∝ I). The slope of the V-I graph gives the resistance of the given wire: R = ΔV / ΔI = 2.0 Ω.',
    precautions: [
      'The key should be inserted only while taking observations to avoid heating of the wire, which would change its resistance.',
      'Ammeter must always be in series and voltmeter in parallel with proper polarities.',
      'Check zero error of ammeter and voltmeter before starting.'
    ],
    vivaVoce: [
      {
        question: 'Why should the current not be passed through the circuit for a long time?',
        answer: 'Continuous current causes Joule heating (H = I²Rt). As temperature increases, the resistance of metallic wire increases, causing the V-I curve to deviate from a straight line.',
        examinerTip: 'Emphasize the constant temperature condition specified in Ohm’s law statement.'
      },
      {
        question: 'Why is an ammeter connected in series and a voltmeter in parallel?',
        answer: 'An ideal ammeter has very low resistance so it does not alter the circuit current. A voltmeter has very high resistance so it draws negligible current from the branch across which voltage is being measured.',
        examinerTip: 'Mention "low internal resistance" for ammeter and "high internal resistance" for voltmeter.'
      }
    ]
  },
  {
    id: 'exp-saponification',
    title: 'Preparation of Soap in the Laboratory (Saponification)',
    classLevel: 'Class 10',
    subject: 'Science',
    objective: 'To prepare soap by the alkaline hydrolysis of vegetable oil using sodium hydroxide.',
    apparatus: ['250 ml beaker', 'Glass rod', 'Tripod stand and wire gauze', 'Bunsen burner', 'Filter paper or mold', 'Measuring cylinder'],
    chemicalsOrMaterials: ['Castor oil or Cottonseed oil (20 ml)', '20% Sodium Hydroxide (NaOH) solution (30 ml)', 'Sodium chloride (common salt)', 'Distilled water', 'Red and Blue litmus papers'],
    procedure: [
      { stepNumber: 1, title: 'Mixture Preparation', instruction: 'Take 20 ml of castor oil in a 250 ml beaker and add 30 ml of 20% NaOH solution with continuous stirring.' },
      { stepNumber: 2, title: 'Gentle Heating', instruction: 'Heat the mixture gently over a wire gauze while stirring constantly with a glass rod for 15-20 minutes until a thick pasty mass forms.' },
      { stepNumber: 3, title: 'Salting Out', instruction: 'Add 5-10 grams of common salt (NaCl) to the boiling mass and stir well, then allow it to cool.' },
      { stepNumber: 4, title: 'Separation', instruction: 'Soap precipitates out and floats on top. Filter the solid soap and test its nature with litmus paper.' }
    ],
    observations: [
      { trialOrParam: 'During Heating', observation: 'Oil and alkali react to form a thick, creamy white paste.', inference: 'Hydrolysis of ester linkages into fatty acid sodium salts and glycerol.' },
      { trialOrParam: 'On Adding NaCl', observation: 'Solid soap separates out completely from the aqueous solution.', inference: 'Salting out occurs due to common ion effect and decreased solubility.' },
      { trialOrParam: 'Litmus Test', observation: 'Red litmus paper turns blue; blue litmus remains blue.', inference: 'Soap solution is basic/alkaline in nature.' }
    ],
    resultsAndConclusion:
      'Soap is successfully prepared by the alkaline hydrolysis of vegetable oil (an ester of glycerol with fatty acids) with NaOH. Glycerol remains in the mother liquor.\nVegetable Oil + NaOH → Soap (Sodium Stearate/Palmitate) + Glycerol.',
    precautions: [
      'Do not boil the reaction mixture vigorously to avoid bumping or splashing of caustic soda.',
      'Avoid skin contact with concentrated NaOH solution as it is corrosive.',
      'Ensure complete precipitation by adding adequate NaCl before filtration.'
    ],
    vivaVoce: [
      {
        question: 'What is the role of adding sodium chloride (common salt) in soap preparation?',
        answer: 'Common salt is added for "salting out" the soap. It decreases the solubility of soap in the mixture, causing it to precipitate out completely from the solution.',
        examinerTip: 'Examiners look for the technical term "Salting out".'
      },
      {
        question: 'What is the byproduct of the saponification reaction?',
        answer: 'Glycerol (propane-1,2,3-triol), an alcohol containing three hydroxyl groups.',
        examinerTip: 'Remember the formula: CH2OH-CHOH-CH2OH.'
      }
    ]
  }
];

export const MOCK_BOARD_UPDATES: BoardUpdate[] = [
  {
    id: 'up-1',
    title: 'CBSE Official: Class 10 & 12 Annual Board Examination Date Sheet Announcement',
    board: 'CBSE',
    date: 'February 2026',
    category: 'Datesheet',
    summary:
      'The Central Board of Secondary Education has scheduled the annual theory examinations for Class 10 and 12 starting mid-February. Science & Mathematics examinations will have adequate gap days for structured revision.',
    impactOnStudents:
      'Review your syllabus completion status now. Focus on high-yield chapters (Electricity, Light, Carbon Compounds, Trigonometry) during the initial revision sprint.',
    officialSourceUrl: 'https://cbse.gov.in',
    officialSourceName: 'CBSE Examination Controller Directorate (cbse.gov.in)',
    isUrgent: true
  },
  {
    id: 'up-2',
    title: 'CBSE Notification: Competency-Focused Questions Weightage Increased to 50%',
    board: 'CBSE',
    date: 'Official Circular',
    category: 'Syllabus Change',
    summary:
      'In alignment with National Education Policy (NEP) 2020, question papers will comprise 50% Competency-Focused Questions in the form of MCQs, Case-Based Questions, and Source-Based Integrated Assessment.',
    impactOnStudents:
      'Rote memorization will not fetch top marks. Practice Assertion-Reasoning and Case Study passages from TOPIT’s Practice engine.',
    officialSourceUrl: 'https://cbseacademic.nic.in',
    officialSourceName: 'CBSE Academic Branch (cbseacademic.nic.in)',
    isUrgent: true
  },
  {
    id: 'up-3',
    title: 'CISCE Update: ICSE & ISC Practical Examination & Internal Assessment Guidelines',
    board: 'ICSE',
    date: 'Official Advisory',
    category: 'Practical Exam',
    summary:
      'Council for the Indian School Certificate Examinations issues updated internal assessment norms and laboratory experiment evaluation criteria for Class 10 ICSE Science components.',
    impactOnStudents:
      'Ensure laboratory journals and observation tables are duly verified. Review TOPIT’s Practical Lab viva questions for each prescribed experiment.',
    officialSourceUrl: 'https://cisce.org',
    officialSourceName: 'Council for the Indian School Certificate Examinations (cisce.org)'
  },
  {
    id: 'up-4',
    title: 'CBSE Release: Official Sample Question Papers (SQP) & Marking Schemes Published',
    board: 'CBSE',
    date: 'Official Release',
    category: 'Sample Paper',
    summary:
      'Official Sample Question Papers for all major academic subjects of Classes 10 & 12 along with itemized step marking schemes are released on the official portal.',
    impactOnStudents:
      'Solve the official SQP under timed conditions. Review step-wise mark distribution to avoid losing marks on presentation.',
    officialSourceUrl: 'https://cbseacademic.nic.in',
    officialSourceName: 'CBSE Academic Portal (cbseacademic.nic.in)'
  }
];

export const MOCK_RESOURCES: ResourceItem[] = [
  {
    id: 'res-ncert-science-10',
    title: 'NCERT Science Textbook (Class 10) — Official Chapters & Solutions',
    category: 'NCERT Textbook',
    subject: 'Science',
    classLevel: 'Class 10',
    board: 'CBSE',
    format: 'PDF',
    pagesOrItems: '16 Chapters',
    description: 'The national standard reference text approved by NCERT for Class 10 Board Examinations.',
    verifiedSource: 'NCERT Official Repository (ncert.nic.in)'
  },
  {
    id: 'res-ncert-exemplar-10',
    title: 'NCERT Exemplar Problems — Science Class 10 (High HOTS & MCQs)',
    category: 'NCERT Exemplar',
    subject: 'Science',
    classLevel: 'Class 10',
    board: 'CBSE',
    format: 'Interactive',
    pagesOrItems: '450+ High HOTS Questions',
    description: 'High Order Thinking Skill problems directly adapted by CBSE paper setters for Section D and E.',
    verifiedSource: 'NCERT Exemplar Portal (ncert.nic.in)'
  },
  {
    id: 'res-cbse-sqp-science',
    title: 'Official CBSE Class 10 Science Sample Question Paper & Marking Scheme',
    category: 'Official Sample Paper',
    subject: 'Science',
    classLevel: 'Class 10',
    board: 'CBSE',
    format: 'Document',
    pagesOrItems: '39 Questions with Step Marking',
    description: 'Official blueprint with question-by-question marks allocation and model examiner answers.',
    verifiedSource: 'CBSE Academic (cbseacademic.nic.in)'
  },
  {
    id: 'res-maths-formula-sheet',
    title: 'TOPIT Class 10 Mathematics Complete Formula Handbook & Theorems',
    category: 'Formula Handbook',
    subject: 'Mathematics',
    classLevel: 'Class 10',
    board: 'CBSE',
    format: 'PDF',
    pagesOrItems: '18 Pages / 120 Formulas',
    description: 'Consolidated formulas for Algebra, Trigonometry, Coordinate Geometry, Surface Areas & Statistics.',
    verifiedSource: 'TOPIT Academic Editorial Team'
  }
];

export const INITIAL_USER_PROGRESS: UserProgress = {
  overallReadiness: 74,
  studyTimeHours: 48.5,
  questionsSolved: 1280,
  testsCompleted: 24,
  accuracy: 82.4,
  streakDays: 14,
  targetPercentage: 95,
  weakTopics: [
    {
      name: 'Carbon & its Compounds',
      subject: 'Science',
      accuracy: 42,
      chapterId: 'ch-carbon',
      recommendedAction: '15-min Formula & Nomenclature review + 12 PYQ targeted drill'
    },
    {
      name: 'Magnetic Effects of Electric Current',
      subject: 'Science',
      accuracy: 51,
      chapterId: 'ch-magnetic-effects',
      recommendedAction: 'Fleming’s Left-Hand rule simulation + 8 Solenoid Assertion-Reasoning questions'
    },
    {
      name: 'Triangles (Similarity Proofs)',
      subject: 'Mathematics',
      accuracy: 54,
      chapterId: 'ch-triangles',
      recommendedAction: 'Basic Proportionality Theorem derivation + 6 step-marking board problems'
    }
  ],
  strongTopics: [
    { name: 'Real Numbers', subject: 'Mathematics', accuracy: 96, chapterId: 'ch-real-numbers' },
    { name: 'Chemical Reactions & Equations', subject: 'Science', accuracy: 92, chapterId: 'ch-chemical-reactions' },
    { name: 'Light: Reflection & Refraction', subject: 'Science', accuracy: 88, chapterId: 'ch-light' },
    { name: 'Quadratic Equations', subject: 'Mathematics', accuracy: 84, chapterId: 'ch-quadratics' }
  ],
  recentTestScores: [
    { testTitle: 'Quick Sprint: Carbon Compounds', date: 'Yesterday', score: 6, total: 10, percentage: 60, timeTaken: '8m 45s' },
    { testTitle: 'Chapter Test: Electricity', date: '3 days ago', score: 21, total: 25, percentage: 84, timeTaken: '26m 10s' },
    { testTitle: 'Full Syllabus Science Speed Mock', date: 'Last Sunday', score: 68, total: 80, percentage: 85, timeTaken: '82m 00s' },
    { testTitle: 'Triangles & Trigonometry Test', date: '6 days ago', score: 14, total: 20, percentage: 70, timeTaken: '18m 30s' }
  ],
  mistakeDistribution: [
    { type: 'Conceptual Gaps', percentage: 45, count: 18, advice: 'Revise core principles and formal definitions before attempting questions.' },
    { type: 'Calculation & Sign Errors', percentage: 30, count: 12, advice: 'Double-check positive/negative signs in mirror formula and resistivity units.' },
    { type: 'Misreading Question Requirements', percentage: 15, count: 6, advice: 'Underline keywords such as "unsaturated", "insoluble", or "not true".' },
    { type: 'Time Pressure / Rush', percentage: 10, count: 4, advice: 'Allocate strictly 1.5 minutes per MCQ and 5 minutes per 3-mark question.' }
  ]
};
