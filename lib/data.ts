export interface RelatedTopic {
  id: string;
  title: string;
  category: string;
}

export interface AnatomyTopic {
  id: string;
  title: string;
  category: string;
  system: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  emoji: string;
  icon: string;
  color: string;
  summary: string;
  description: string;
  sections: { title: string; content: string }[];
  keyFacts: string[];
  fitnessRelevance: string;
  relatedTopics: RelatedTopic[];
  quizQuestions: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface BodyRegion {
  id: string;
  name: string;
  x: number; // percentage position on body
  y: number;
  width: number;
  height: number;
  topics: string[]; // topic IDs
  color: string;
}

export const bodyRegions: BodyRegion[] = [
  { id: 'head', name: 'Head & Brain', x: 38, y: 2, width: 24, height: 10, topics: ['brain', 'nervous-intro', 'motor-learning', 'epigenetics-training'], color: '#D4AF37' },
  { id: 'neck', name: 'Neck & Spine', x: 42, y: 12, width: 16, height: 6, topics: ['cervical-spine', 'thyroid', 'hormonal-responses'], color: '#C0A030' },
  { id: 'shoulders', name: 'Shoulders', x: 22, y: 17, width: 56, height: 7, topics: ['deltoids', 'rotator-cuff', 'shoulder-joint', 'biomechanics'], color: '#E8C547' },
  { id: 'chest', name: 'Chest & Heart', x: 32, y: 22, width: 36, height: 14, topics: ['heart', 'lungs', 'pectorals', 'cardiovascular', 'lactate-threshold'], color: '#FF6B6B' },
  { id: 'arms', name: 'Arms', x: 10, y: 20, width: 18, height: 28, topics: ['biceps', 'triceps', 'forearm', 'humerus', 'bfr-training', 'tendon-biology'], color: '#4ECDC4' },
  { id: 'arms-r', name: 'Arms', x: 72, y: 20, width: 18, height: 28, topics: ['biceps', 'triceps', 'forearm', 'humerus', 'bfr-training', 'tendon-biology'], color: '#4ECDC4' },
  { id: 'abdomen', name: 'Core & Abs', x: 34, y: 36, width: 32, height: 14, topics: ['core', 'rectus-abdominis', 'obliques', 'digestive', 'nutrient-periodization'], color: '#A29BFE' },
  { id: 'hips', name: 'Hips & Pelvis', x: 32, y: 48, width: 36, height: 8, topics: ['hip-flexors', 'pelvis', 'glutes', 'periodization'], color: '#FD79A8' },
  { id: 'legs', name: 'Legs', x: 28, y: 55, width: 20, height: 30, topics: ['quadriceps', 'hamstrings', 'femur', 'knee', 'tendon-biology', 'overtraining-syndrome'], color: '#00B894' },
  { id: 'legs-r', name: 'Legs', x: 52, y: 55, width: 20, height: 30, topics: ['quadriceps', 'hamstrings', 'femur', 'knee', 'tendon-biology', 'overtraining-syndrome'], color: '#00B894' },
  { id: 'calves', name: 'Calves & Feet', x: 30, y: 82, width: 18, height: 16, topics: ['gastrocnemius', 'achilles', 'ankle', 'advanced-supplements'], color: '#6C5CE7' },
  { id: 'calves-r', name: 'Calves & Feet', x: 52, y: 82, width: 18, height: 16, topics: ['gastrocnemius', 'achilles', 'ankle', 'advanced-supplements'], color: '#6C5CE7' },
];

export const topics: AnatomyTopic[] = [
  // ===== CELLS & TISSUES =====
  {
    id: 'cells-intro',
    title: 'Cells: The Building Blocks',
    category: 'Fundamentals',
    system: 'Cellular',
    level: 'beginner',
    emoji: '🔬',
    icon: 'cellular',
    color: '#6C5CE7',
    summary: 'Every structure in your body is built from cells. Understanding cellular biology is the foundation of understanding how your muscles grow, how energy is produced, and how your body adapts to training.',
    description: 'The human body contains approximately 37.2 trillion cells, each a microscopic factory performing thousands of chemical reactions every second. For fitness enthusiasts, understanding cells means understanding how muscles grow, how fat is burned, and how the body recovers from exercise.',
    sections: [
      { title: 'Cell Structure', content: 'Each cell is enclosed by a phospholipid membrane that controls what enters and exits. Inside, the cytoplasm houses organelles: the nucleus (DNA storage), mitochondria (energy production), ribosomes (protein synthesis), endoplasmic reticulum (protein folding), and Golgi apparatus (protein packaging). Muscle cells are unique—they are multinucleated, containing hundreds of nuclei per cell, which allows for massive protein synthesis capacity.' },
      { title: 'Cell Membrane & Signaling', content: 'The cell membrane is not just a barrier but a communication hub. Receptor proteins on the surface detect hormones like insulin, testosterone, and growth hormone. When you eat protein, amino acids trigger mTOR signaling pathways that tell muscle cells to increase protein synthesis. This is the molecular basis of muscle growth.' },
      { title: 'Cellular Adaptation to Exercise', content: 'When you lift weights, muscle cells experience mechanical tension, metabolic stress, and muscle damage. These stimuli activate satellite cells (muscle stem cells) that fuse with existing muscle fibers, donating their nuclei. More nuclei = greater capacity for protein synthesis = bigger muscles. This is why consistent training leads to progressive growth.' },
      { title: 'Energy Production in Cells', content: 'Cells produce ATP (adenosine triphosphate) through three pathways: the phosphagen system (instant energy, 10 seconds), glycolysis (moderate intensity, 2 minutes), and oxidative phosphorylation (endurance, unlimited duration). The mitochondria are the powerhouses—they use oxygen to convert glucose and fatty acids into ATP. Endurance training increases mitochondrial density by up to 50%.' },
    ],
    keyFacts: [
      '37.2 trillion cells in the human body',
      'Muscle cells can contain hundreds of nuclei',
      'Red blood cells live ~120 days',
      'Mitochondria have their own DNA',
      'Cells produce ~10 million ATP molecules per second',
    ],
    fitnessRelevance: 'Understanding cellular biology explains why progressive overload works, how muscles grow through satellite cell activation, why mitochondria density affects endurance, and how nutrition timing impacts cellular signaling for recovery.',
    relatedTopics: [
      { id: 'muscle-fibers', title: 'Muscle Fiber Types', category: 'Muscular' },
      { id: 'energy-systems', title: 'Energy Systems', category: 'Exercise Physiology' },
      { id: 'protein-synthesis', title: 'Protein Synthesis', category: 'Nutrition' },
      { id: 'mitochondria', title: 'Mitochondria & Endurance', category: 'Cellular' },
    ],
    quizQuestions: [
      { question: 'Approximately how many cells are in the human body?', options: ['3.7 trillion', '37.2 trillion', '372 trillion', '37 billion'], correct: 1, explanation: 'The human body contains approximately 37.2 trillion cells, each performing specialized functions.' },
      { question: 'What organelle is known as the "powerhouse of the cell"?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi apparatus'], correct: 2, explanation: 'Mitochondria produce ATP through oxidative phosphorylation, making them the primary energy producers.' },
      { question: 'What type of cells fuse with muscle fibers to promote growth?', options: ['Red blood cells', 'Satellite cells', 'White blood cells', 'Nerve cells'], correct: 1, explanation: 'Satellite cells are muscle stem cells that fuse with damaged muscle fibers, donating nuclei for increased protein synthesis.' },
    ],
  },
  // ===== MUSCULAR SYSTEM =====
  {
    id: 'muscle-fibers',
    title: 'Muscle Fiber Types',
    category: 'Muscular System',
    system: 'Muscular',
    level: 'intermediate',
    emoji: '💪',
    icon: 'barbell',
    color: '#FF6B6B',
    summary: 'Your muscles contain two primary fiber types—slow-twitch (Type I) and fast-twitch (Type II)—each with distinct properties that determine your athletic potential and training response.',
    description: 'Skeletal muscle is not a uniform tissue. It contains a mixture of fiber types, each optimized for different types of activity. The ratio of these fibers varies between individuals and muscle groups, influencing whether you excel at endurance or power activities.',
    sections: [
      { title: 'Type I: Slow-Twitch Fibers', content: 'Type I fibers are fatigue-resistant, rich in mitochondria and myoglobin (giving them a red color), and optimized for aerobic energy production. They generate force slowly but can sustain contractions for hours. Postural muscles like the soleus are ~80% Type I. These fibers are primarily recruited during low-intensity, long-duration activities like walking, jogging, and maintaining posture. They rely on fat oxidation and have high capillary density for oxygen delivery.' },
      { title: 'Type IIa: Fast-Oxidative Fibers', content: 'Type IIa fibers are the "intermediate" fibers—they can use both aerobic and anaerobic metabolism. They generate more force than Type I but fatigue faster. They are highly adaptable: endurance training makes them more oxidative (like Type I), while strength training makes them more glycolytic (like Type IIx). These fibers are crucial for middle-distance activities like 400m-800m running.' },
      { title: 'Type IIx: Fast-Glycolytic Fibers', content: 'Type IIx fibers are the most powerful but least fatigue-resistant. They have the largest diameter, highest glycogen stores, and greatest capacity for rapid force production. They rely almost entirely on anaerobic metabolism (glycolysis and phosphagen system). These fibers are recruited during maximal efforts: heavy lifting, sprinting, jumping. They fatigue within 30-60 seconds of maximal effort.' },
      { title: 'Fiber Type Distribution & Training', content: 'Most muscles contain roughly 50/50 mix of Type I and Type II fibers, but this varies widely between individuals. Elite sprinters may have 75%+ Type II in their leg muscles, while elite marathoners may have 80%+ Type I. Training cannot convert Type I to Type II or vice versa, but it can shift Type IIa ↔ Type IIx. Heavy resistance training increases Type IIx → IIa conversion, while detraining reverses this.' },
      { title: 'Hypertrophy by Fiber Type', content: 'Type II fibers have approximately 50% greater hypertrophy potential than Type I fibers. This is why power athletes tend to have more muscular physiques. However, Type I fibers DO grow with training—they just require higher volume and metabolic stress. Blood flow restriction training and high-rep sets to failure are particularly effective for Type I hypertrophy.' },
    ],
    keyFacts: [
      'Type I fibers are red (rich in myoglobin)',
      'Type IIx fibers generate 3-5x more force than Type I',
      'Fiber type ratio is largely genetic',
      'Type II fibers hypertrophy 50% more than Type I',
      'Soleus muscle is ~80% Type I fibers',
      'Eye muscles are the fastest contracting in the body',
    ],
    fitnessRelevance: 'Understanding fiber types helps you optimize training: heavy loads (1-5 reps) target Type IIx, moderate loads (6-12 reps) target Type IIa, and high-rep sets (15-30 reps) target Type I. Your fiber type composition influences your ideal training style and sport selection.',
    relatedTopics: [
      { id: 'cells-intro', title: 'Cell Biology Basics', category: 'Fundamentals' },
      { id: 'energy-systems', title: 'Energy Systems', category: 'Exercise Physiology' },
      { id: 'hypertrophy', title: 'Muscle Hypertrophy', category: 'Muscular' },
      { id: 'quadriceps', title: 'Quadriceps', category: 'Muscular' },
    ],
    quizQuestions: [
      { question: 'Which fiber type is most fatigue-resistant?', options: ['Type IIx', 'Type IIa', 'Type I', 'Type III'], correct: 2, explanation: 'Type I (slow-twitch) fibers are highly oxidative and can sustain contractions for hours without fatigue.' },
      { question: 'What percentage greater hypertrophy potential do Type II fibers have vs Type I?', options: ['10%', '25%', '50%', '100%'], correct: 2, explanation: 'Type II fibers have approximately 50% greater hypertrophy potential due to their larger diameter and greater myofibril content.' },
      { question: 'Can training convert Type I fibers to Type II?', options: ['Yes, with heavy training', 'Yes, with sprint training', 'No, but Type IIa/IIx can shift', 'No changes are possible'], correct: 2, explanation: 'Fiber type conversion between Type I and II is not possible, but Type IIa and IIx can shift based on training stimulus.' },
    ],
  },
  {
    id: 'hypertrophy',
    title: 'Muscle Hypertrophy Mechanisms',
    category: 'Muscular System',
    system: 'Muscular',
    level: 'advanced',
    emoji: '🏋️',
    icon: 'trending-up',
    color: '#FF8A5C',
    summary: 'Muscle growth occurs through three primary mechanisms: mechanical tension, metabolic stress, and muscle damage. Understanding these pathways allows you to optimize every training session for maximum growth.',
    description: 'Hypertrophy—the increase in muscle fiber size—is one of the most studied adaptations in exercise science. It involves complex molecular signaling, protein synthesis regulation, and structural remodeling of muscle tissue.',
    sections: [
      { title: 'Mechanical Tension', content: 'Mechanical tension is the primary driver of hypertrophy. When muscle fibers experience high levels of tension (from heavy loads or stretched positions), mechanosensors in the cell membrane activate the mTOR pathway. This triggers increased protein synthesis. The key is not just the weight—it is tension × time. Slow eccentrics and paused reps increase time under tension, amplifying the mechanical signal.' },
      { title: 'Metabolic Stress', content: 'Metabolic stress occurs when metabolites accumulate in the muscle during high-rep sets. Lactate, hydrogen ions, inorganic phosphate, and creatine cause cellular swelling (the "pump"). This swelling is detected by the cell as a threat to integrity, triggering anabolic signaling. Blood flow restriction training maximizes metabolic stress even with light weights. The burning sensation during high-rep sets is metabolic stress in action.' },
      { title: 'Muscle Damage', content: 'Eccentric contractions and novel exercises cause micro-tears in muscle fibers (exercise-induced muscle damage, EIMD). This damage activates satellite cells and inflammatory cascades that ultimately lead to repair and growth. However, excessive damage is counterproductive—it diverts resources to repair rather than growth. Moderate damage is optimal; you do NOT need to be sore to grow.' },
      { title: 'The mTOR Pathway', content: 'mTOR (mechanistic target of rapamycin) is the master regulator of muscle protein synthesis. It is activated by: mechanical tension, amino acids (especially leucine), insulin/IGF-1, and resistance training. When mTOR is activated, it phosphorylates p70S6K and 4E-BP1, which increase ribosomal biogenesis and translation initiation. This is the molecular cascade that turns a workout into new muscle protein.' },
      { title: 'Sarcoplasmic vs Myofibrillar Hypertrophy', content: 'Myofibrillar hypertrophy increases the contractile proteins (actin and myosin), making muscles stronger and denser. Sarcoplasmic hypertrophy increases the non-contractile elements (glycogen, water, enzymes), making muscles larger but not proportionally stronger. Powerlifters tend toward myofibrillar (heavy, low-rep training), while bodybuilders develop both types through varied rep ranges.' },
    ],
    keyFacts: [
      'mTOR is the master growth switch',
      'Protein synthesis elevates for 24-72 hours post-training',
      'Leucine is the key amino acid for mTOR activation (~3g threshold)',
      'Soreness ≠ growth (excessive damage is counterproductive)',
      'Muscle protein is constantly being broken down and rebuilt',
      'Net muscle gain requires MPS > MPB over time',
    ],
    fitnessRelevance: 'To maximize hypertrophy: use a variety of rep ranges (5-30), train each muscle 2x per week, ensure adequate protein (1.6-2.2g/kg), prioritize progressive overload, and manage recovery. The "pump" is not just cosmetic—it signals metabolic stress-driven growth.',
    relatedTopics: [
      { id: 'muscle-fibers', title: 'Muscle Fiber Types', category: 'Muscular' },
      { id: 'protein-synthesis', title: 'Protein Synthesis & Nutrition', category: 'Nutrition' },
      { id: 'cells-intro', title: 'Cell Biology', category: 'Fundamentals' },
      { id: 'energy-systems', title: 'Energy Systems', category: 'Exercise Physiology' },
    ],
    quizQuestions: [
      { question: 'What is the primary driver of muscle hypertrophy?', options: ['Metabolic stress', 'Muscle damage', 'Mechanical tension', 'Hormone levels'], correct: 2, explanation: 'While all three mechanisms contribute, mechanical tension is considered the primary driver of hypertrophy through mTOR activation.' },
      { question: 'How long does elevated protein synthesis last after training?', options: ['6-12 hours', '12-24 hours', '24-72 hours', '1 week'], correct: 2, explanation: 'Muscle protein synthesis remains elevated for 24-72 hours post-training, which is why training each muscle group 2x per week is optimal.' },
      { question: 'What amino acid is most critical for activating mTOR?', options: ['Glycine', 'Leucine', 'Glutamine', 'Arginine'], correct: 1, explanation: 'Leucine is the primary amino acid that activates mTOR signaling, with a threshold of approximately 3g per meal for maximal stimulation.' },
    ],
  },
  // ===== CARDIOVASCULAR =====
  {
    id: 'heart',
    title: 'The Heart: Your Engine',
    category: 'Cardiovascular',
    system: 'Cardiovascular',
    level: 'beginner',
    emoji: '❤️',
    icon: 'heart',
    color: '#FF6B6B',
    summary: 'The heart is a remarkable muscular organ that beats ~100,000 times per day, pumping blood through 60,000 miles of blood vessels. For athletes, cardiac adaptation is one of the most important training outcomes.',
    description: 'The heart is a four-chambered muscular pump that maintains blood circulation throughout the body. It has its own electrical system (the cardiac conduction system) and can beat independently of the nervous system. Exercise profoundly changes cardiac structure and function.',
    sections: [
      { title: 'Heart Anatomy', content: 'The heart has four chambers: two atria (receiving chambers) and two ventricles (pumping chambers). The left ventricle is the most muscular, generating enough pressure to push blood through the entire systemic circulation. The right ventricle pumps blood only to the lungs (lower pressure). Four valves prevent backflow: tricuspid, pulmonary, mitral, and aortic. The heart weighs 250-350g in adults.' },
      { title: 'Cardiac Output & Exercise', content: 'Cardiac output (Q) = Heart Rate × Stroke Volume. At rest, Q is ~5L/min. During intense exercise, it can reach 20-40L/min in trained athletes. This 4-8x increase is achieved through: increased heart rate (from 60 to 180-200 bpm), increased stroke volume (from 70ml to 120-200ml per beat), and redistribution of blood flow (from 15-20% to 80-85% going to working muscles).' },
      { title: 'Athlete\'s Heart', content: 'Endurance training causes eccentric hypertrophy—the heart chambers enlarge (especially the left ventricle), increasing stroke volume. This is why elite endurance athletes have resting heart rates of 30-40 bpm. Strength training causes concentric hypertrophy—thicker ventricular walls to handle pressure spikes during heavy lifting. Both adaptations are beneficial and reversible with detraining.' },
      { title: 'Blood Pressure & Exercise', content: 'During aerobic exercise, systolic BP rises proportionally to intensity (can reach 200+ mmHg), while diastolic BP stays stable or drops slightly. During heavy resistance training, BP can spike to extreme levels (up to 480/350 mmHg during leg press!). This is why proper breathing (never holding breath/Valsalva for too long) is critical during heavy lifting.' },
    ],
    keyFacts: [
      'Beats ~100,000 times per day',
      'Pumps ~7,500 liters of blood daily',
      'Blood vessels total ~60,000 miles',
      'Resting HR of elite athletes: 30-40 bpm',
      'Cardiac output can increase 8x during exercise',
      'The heart generates its own electrical impulses',
    ],
    fitnessRelevance: 'Cardiovascular fitness (VO2max) is one of the strongest predictors of longevity. Regular aerobic exercise strengthens the heart, lowers resting heart rate, improves blood lipid profiles, and reduces cardiovascular disease risk by 30-50%. Even resistance training improves cardiovascular health through different mechanisms.',
    relatedTopics: [
      { id: 'cardiovascular', title: 'Blood & Circulatory System', category: 'Cardiovascular' },
      { id: 'vo2max', title: 'VO2 Max & Aerobic Capacity', category: 'Exercise Physiology' },
      { id: 'energy-systems', title: 'Energy Systems', category: 'Exercise Physiology' },
      { id: 'blood-composition', title: 'Blood Composition', category: 'Cardiovascular' },
    ],
    quizQuestions: [
      { question: 'What is cardiac output?', options: ['Heart rate only', 'Heart rate × stroke volume', 'Blood pressure × heart rate', 'Stroke volume only'], correct: 1, explanation: 'Cardiac output = Heart Rate × Stroke Volume. It represents the total volume of blood pumped per minute.' },
      { question: 'What type of heart adaptation occurs with endurance training?', options: ['Concentric hypertrophy', 'Eccentric hypertrophy', 'No change', 'Heart atrophy'], correct: 1, explanation: 'Endurance training causes eccentric hypertrophy—chamber enlargement for greater stroke volume. Strength training causes concentric hypertrophy—wall thickening.' },
      { question: 'Approximately how many times does the heart beat per day?', options: ['10,000', '50,000', '100,000', '500,000'], correct: 2, explanation: 'The heart beats approximately 100,000 times per day, pumping about 7,500 liters of blood.' },
    ],
  },
  {
    id: 'cardiovascular',
    title: 'Blood & Circulatory System',
    category: 'Cardiovascular',
    system: 'Cardiovascular',
    level: 'beginner',
    emoji: '🩸',
    icon: 'pulse',
    color: '#E74C3C',
    summary: 'Blood is the body\'s transportation system—delivering oxygen, nutrients, hormones, and immune cells while removing waste. Understanding circulation is key to understanding recovery, nutrition timing, and performance.',
    description: 'The circulatory system consists of the heart, blood vessels (arteries, veins, capillaries), and blood itself. It serves as the body\'s highway system, ensuring every cell receives what it needs and waste products are removed efficiently.',
    sections: [
      { title: 'Blood Composition', content: 'Blood is 55% plasma (water, proteins, electrolytes, hormones) and 45% formed elements: red blood cells (erythrocytes, carry oxygen via hemoglobin), white blood cells (leukocytes, immune defense), and platelets (thrombocytes, clotting). A single drop of blood contains ~5 million RBCs, 7,000 WBCs, and 250,000 platelets. Total blood volume is ~5 liters in adults.' },
      { title: 'Arteries, Veins & Capillaries', content: 'Arteries carry blood away from the heart under high pressure—they have thick, elastic walls. Arterioles regulate blood flow to tissues via vasoconstriction/dilation. Capillaries are where exchange occurs—their walls are one cell thick, allowing oxygen, nutrients, and waste to pass through. Veins return blood to the heart under low pressure, using valves and muscle contractions (the "muscle pump") to fight gravity.' },
      { title: 'Blood Flow During Exercise', content: 'At rest, muscles receive ~15-20% of cardiac output. During exercise, this increases to 80-85%. Blood is redirected from the digestive system and kidneys to working muscles. This is why eating right before intense exercise can cause cramping—blood is being pulled away from digestion. The "muscle pump" during resistance training is caused by blood pooling in the working muscles faster than it can drain.' },
      { title: 'Recovery & Circulation', content: 'Post-exercise recovery depends heavily on circulation. Blood delivers amino acids for repair, removes metabolic waste (lactate, hydrogen ions), and brings immune cells to damaged tissue. Active recovery (light movement) maintains elevated blood flow, accelerating waste removal. This is why cooldowns, walking, and light activity on rest days improve recovery.' },
    ],
    keyFacts: [
      '~5 liters of blood in the average adult',
      'Blood completes a full circuit in ~60 seconds at rest',
      'RBCs live approximately 120 days',
      'Capillaries are only one cell thick',
      'The "muscle pump" helps return venous blood to the heart',
      'Blood flow to muscles increases 20x during exercise',
    ],
    fitnessRelevance: 'Circulation affects everything: nutrient delivery to muscles, waste removal, recovery speed, and the "pump" during training. Proper hydration maintains blood volume, warm-ups increase blood flow to muscles, and active recovery accelerates waste clearance.',
    relatedTopics: [
      { id: 'heart', title: 'The Heart', category: 'Cardiovascular' },
      { id: 'vo2max', title: 'VO2 Max', category: 'Exercise Physiology' },
      { id: 'hydration', title: 'Hydration Science', category: 'Nutrition' },
      { id: 'recovery', title: 'Recovery Physiology', category: 'Exercise Physiology' },
    ],
    quizQuestions: [
      { question: 'What percentage of blood goes to muscles during exercise?', options: ['15-20%', '40-50%', '60-70%', '80-85%'], correct: 3, explanation: 'During exercise, 80-85% of cardiac output is redirected to working muscles, up from 15-20% at rest.' },
      { question: 'How long does a red blood cell live?', options: ['30 days', '60 days', '120 days', '365 days'], correct: 2, explanation: 'Red blood cells have a lifespan of approximately 120 days before being recycled by the spleen and liver.' },
      { question: 'What is the "muscle pump" during exercise?', options: ['Heart pumping faster', 'Blood pooling in working muscles', 'Muscle contractions', 'Increased breathing'], correct: 1, explanation: 'The "pump" is caused by blood entering working muscles faster than it can drain, causing temporary swelling and vascularity.' },
    ],
  },
  // ===== ENERGY SYSTEMS =====
  {
    id: 'energy-systems',
    title: 'Energy Systems & ATP',
    category: 'Exercise Physiology',
    system: 'Metabolic',
    level: 'intermediate',
    emoji: '⚡',
    icon: 'flash',
    color: '#F39C12',
    summary: 'Your body uses three energy systems to produce ATP—the universal energy currency. Understanding when each system dominates allows you to train smarter, fuel properly, and optimize performance for your specific goals.',
    description: 'Every muscle contraction, every heartbeat, every thought requires ATP (adenosine triphosphate). The body has three pathways to produce it, each with different power outputs and durations. Training the right energy system for your sport is essential for peak performance.',
    sections: [
      { title: 'ATP: The Energy Currency', content: 'ATP (adenosine triphosphate) is the only form of energy your muscles can directly use. When ATP is hydrolyzed (broken down), it releases energy for muscle contraction. The body stores only ~100g of ATP at any time—enough for 2-3 seconds of maximal effort. Therefore, ATP must be constantly regenerated. The three energy systems exist solely to resupply ATP.' },
      { title: 'Phosphagen System (ATP-PCr)', content: 'The fastest energy system. Creatine phosphate (PCr) donates its phosphate group to ADP, instantly regenerating ATP. This system provides maximum power for 8-12 seconds—perfect for a 1RM lift, a 100m sprint, or a max vertical jump. The body stores ~120g of creatine phosphate. Supplementing with creatine monohydrate (3-5g/day) increases PCr stores by 20-40%, extending this system\'s capacity. Recovery takes 3-5 minutes.' },
      { title: 'Glycolytic System (Anaerobic)', content: 'When PCr stores deplete, glycolysis takes over. Glucose (from blood or muscle glycogen) is broken down into pyruvate, producing 2 ATP per glucose molecule. When oxygen is limited, pyruvate converts to lactate (NOT lactic acid—this is a common myth). Lactate is actually a fuel source, not a waste product. This system dominates from ~15 seconds to ~2 minutes of high-intensity effort. The burning sensation comes from hydrogen ion accumulation, not lactate.' },
      { title: 'Oxidative System (Aerobic)', content: 'The most complex and sustainable system. In the mitochondria, pyruvate, fatty acids, and amino acids are fully oxidized using oxygen. This produces 36-38 ATP per glucose molecule and 100+ ATP per fatty acid molecule. It dominates during activities lasting >2 minutes and is the primary system during rest and low-intensity exercise. Endurance training increases mitochondrial density, capillary density, and oxidative enzyme activity.' },
      { title: 'Energy System Continuum', content: 'All three systems work simultaneously—they are not "on/off" switches. The dominant system depends on intensity and duration. A 400m sprint is ~60% glycolytic, ~25% phosphagen, ~15% aerobic. A marathon is ~99% aerobic. A set of 10 heavy squats is ~50% phosphagen, ~40% glycolytic, ~10% aerobic. Training should target the energy system most relevant to your sport or goal.' },
    ],
    keyFacts: [
      'ATP is the only energy form muscles can use directly',
      'Body stores only ~100g of ATP (2-3 seconds of max effort)',
      'Creatine phosphate provides energy for 8-12 seconds',
      'Glycolysis produces 2 ATP per glucose molecule',
      'Aerobic system produces 36-38 ATP per glucose',
      'Lactate is a fuel, not a waste product',
      'Creatine supplementation increases PCr stores by 20-40%',
    ],
    fitnessRelevance: 'Energy system training is sport-specific: power athletes need phosphagen training (heavy singles, sprints), CrossFit athletes need glycolytic capacity (intervals, metcons), and endurance athletes need aerobic development (Zone 2 training, long slow distance). Creatine monohydrate is the most evidence-backed supplement for phosphagen system enhancement.',
    relatedTopics: [
      { id: 'cells-intro', title: 'Cell Biology & Mitochondria', category: 'Fundamentals' },
      { id: 'muscle-fibers', title: 'Muscle Fiber Types', category: 'Muscular' },
      { id: 'creatine', title: 'Creatine Supplementation', category: 'Supplements' },
      { id: 'nutrition-basics', title: 'Macronutrients & Energy', category: 'Nutrition' },
    ],
    quizQuestions: [
      { question: 'How long can the phosphagen system sustain maximal effort?', options: ['2-3 seconds', '8-12 seconds', '30-60 seconds', '2-5 minutes'], correct: 1, explanation: 'The phosphagen (ATP-PCr) system provides maximum power output for approximately 8-12 seconds before PCr stores are depleted.' },
      { question: 'How many ATP molecules does aerobic metabolism produce per glucose?', options: ['2', '8', '20', '36-38'], correct: 3, explanation: 'Aerobic (oxidative) metabolism fully oxidizes glucose in the mitochondria, producing 36-38 ATP per molecule.' },
      { question: 'What is lactate actually?', options: ['A waste product', 'A fuel source', 'A toxin', 'A protein'], correct: 1, explanation: 'Lactate is a fuel source, not a waste product. It can be converted back to glucose by the liver (Cori cycle) or used directly by the heart and other muscles as fuel.' },
    ],
  },
  // ===== SKELETAL =====
  {
    id: 'skeletal-system',
    title: 'The Skeletal System',
    category: 'Skeletal System',
    system: 'Skeletal',
    level: 'beginner',
    emoji: '🦴',
    icon: 'body',
    color: '#F5E6D3',
    summary: 'Your skeleton is not just a frame—it is a living, dynamic organ system that produces blood cells, stores minerals, and adapts to mechanical stress. Resistance training literally makes your bones stronger and denser.',
    description: 'The adult human skeleton consists of 206 bones, along with cartilage, ligaments, and tendons. Far from being inert scaffolding, bones are living organs that constantly remodel in response to mechanical stress—a principle known as Wolff\'s Law.',
    sections: [
      { title: 'Bone Structure', content: 'Bones have two types of tissue: cortical (compact) bone forms the hard outer shell (~80% of bone mass), while trabecular (spongy) bone forms the inner lattice structure (~20% of mass but highly metabolically active). The trabecular pattern aligns with stress lines—bones literally grow internal struts along the directions of force they experience. This is why weight-bearing exercise strengthens bones in specific patterns.' },
      { title: 'Wolff\'s Law & Bone Adaptation', content: 'Wolff\'s Law states that bone adapts to the loads placed upon it. When mechanical stress exceeds a threshold, osteoblasts (bone-building cells) are activated to deposit new bone matrix. Conversely, without stress (bed rest, zero gravity), osteoclasts (bone-resorbing cells) break down bone. This is why astronauts lose 1-2% bone density per month in space, and why resistance training is the best prevention for osteoporosis.' },
      { title: 'Bone Remodeling Cycle', content: 'Bone is constantly being broken down and rebuilt in a cycle lasting ~3-6 months. Osteoclasts resorb old bone, creating a pit. Osteoblasts then fill the pit with new osteoid (collagen matrix), which mineralizes with calcium and phosphate. Approximately 10% of the skeleton is being remodeled at any given time. Resistance training tips the balance toward formation; inactivity tips it toward resorption.' },
      { title: 'Joints & Connective Tissue', content: 'Joints are where bones meet. Synovial joints (knee, hip, shoulder) have cartilage surfaces, synovial fluid for lubrication, and a joint capsule. Ligaments connect bone to bone (stability). Tendons connect muscle to bone (force transmission). Cartilage has no blood supply—it receives nutrients through synovial fluid movement during exercise. This is why movement is essential for joint health.' },
    ],
    keyFacts: [
      '206 bones in the adult skeleton',
      'Babies are born with ~270 bones (many fuse)',
      'Femur is the longest and strongest bone',
      'Stapes (ear bone) is the smallest bone',
      'Bone is stronger than steel (pound for pound)',
      '~10% of skeleton remodels at any time',
      'Bone density peaks around age 30',
    ],
    fitnessRelevance: 'Resistance training is the most effective way to increase bone mineral density. Heavy compound lifts (squats, deadlifts) create the highest osteogenic stimulus. This is critical for preventing osteoporosis, especially in women post-menopause. Even in young athletes, adequate bone-loading exercise is essential for reaching peak bone mass.',
    relatedTopics: [
      { id: 'hypertrophy', title: 'Muscle Growth', category: 'Muscular' },
      { id: 'calcium-vitamin-d', title: 'Calcium & Vitamin D', category: 'Nutrition' },
      { id: 'knee', title: 'Knee Joint', category: 'Skeletal' },
      { id: 'recovery', title: 'Recovery & Adaptation', category: 'Exercise Physiology' },
    ],
    quizQuestions: [
      { question: 'How many bones does an adult human have?', options: ['186', '206', '226', '270'], correct: 1, explanation: 'Adults have 206 bones. Babies are born with ~270, but many fuse together during growth.' },
      { question: 'What is Wolff\'s Law?', options: ['Muscles grow with use', 'Bones adapt to mechanical stress', 'Joints need movement', 'Tendons strengthen with load'], correct: 1, explanation: 'Wolff\'s Law states that bone tissue adapts to the mechanical loads placed upon it—more stress leads to stronger bones, less stress leads to weaker bones.' },
      { question: 'What cells build new bone?', options: ['Osteoclasts', 'Osteoblasts', 'Chondrocytes', 'Fibroblasts'], correct: 1, explanation: 'Osteoblasts build new bone by depositing osteoid (collagen matrix) that mineralizes. Osteoclasts break down bone. The balance between these determines bone density.' },
    ],
  },
  // ===== NUTRITION =====
  {
    id: 'nutrition-basics',
    title: 'Macronutrients & Energy',
    category: 'Nutrition',
    system: 'Metabolic',
    level: 'beginner',
    emoji: '🥗',
    icon: 'nutrition',
    color: '#00B894',
    summary: 'Proteins, carbohydrates, and fats each play unique and essential roles in fueling performance, building muscle, and maintaining health. Understanding macros is the foundation of sports nutrition.',
    description: 'All food is composed of three macronutrients: protein (4 kcal/g), carbohydrates (4 kcal/g), and fat (9 kcal/g). Each serves distinct physiological functions, and the optimal ratio depends on your training goals, body composition, and performance demands.',
    sections: [
      { title: 'Protein: The Builder', content: 'Protein provides amino acids—the building blocks of muscle tissue. There are 20 amino acids, 9 of which are essential (must come from diet). For muscle growth, research shows 1.6-2.2g per kg of bodyweight per day is optimal. Leucine (found in whey, eggs, meat) is the key trigger for muscle protein synthesis via mTOR activation. Each meal should contain ~20-40g of protein with at least 3g of leucine to maximally stimulate MPS.' },
      { title: 'Carbohydrates: The Fuel', content: 'Carbohydrates are stored as glycogen in muscles (~400g) and liver (~100g). They are the preferred fuel for high-intensity exercise. Low glycogen = reduced performance, increased fatigue, and impaired recovery. For athletes training 1-2 hours daily, 5-7g/kg/day is recommended. For extreme endurance, up to 10-12g/kg/day. Timing matters: consuming carbs before training tops off glycogen, while post-training carbs replenish stores and spike insulin (which is anti-catabolic).' },
      { title: 'Fats: The Regulator', content: 'Dietary fat is essential for hormone production (testosterone, estrogen), cell membrane integrity, vitamin absorption (A, D, E, K), and inflammation regulation. Minimum intake should be ~0.5g/kg/day to maintain hormonal health. Omega-3 fatty acids (EPA/DHA from fish oil) reduce inflammation and may enhance muscle protein synthesis. During low-intensity exercise, fat is the primary fuel source—this is the basis of "fat-burning zone" training.' },
      { title: 'Caloric Balance & Body Composition', content: 'Weight change follows thermodynamics: calories in vs calories out. However, the composition of those calories matters enormously for body composition. A caloric surplus with adequate protein and resistance training builds muscle. A caloric deficit with high protein preserves muscle while losing fat. The "anabolic window" (eating protein within 30 min post-workout) is largely a myth—the total daily protein intake matters more than timing.' },
    ],
    keyFacts: [
      'Protein: 4 kcal/g, Fat: 9 kcal/g, Carbs: 4 kcal/g',
      'Muscles store ~400g glycogen, liver stores ~100g',
      'Optimal protein for muscle growth: 1.6-2.2g/kg/day',
      'Minimum fat intake: ~0.5g/kg/day for hormonal health',
      'Each meal needs ~3g leucine to maximally stimulate MPS',
      'The "anabolic window" is 4-6 hours, not 30 minutes',
    ],
    fitnessRelevance: 'Nutrition is the foundation of all fitness goals. Muscle growth requires a caloric surplus + adequate protein. Fat loss requires a caloric deficit + high protein to preserve muscle. Performance requires adequate carbohydrates for glycogen. No supplement can compensate for poor nutrition.',
    relatedTopics: [
      { id: 'protein-synthesis', title: 'Protein Synthesis', category: 'Nutrition' },
      { id: 'energy-systems', title: 'Energy Systems', category: 'Exercise Physiology' },
      { id: 'creatine', title: 'Creatine', category: 'Supplements' },
      { id: 'hydration', title: 'Hydration', category: 'Nutrition' },
    ],
    quizQuestions: [
      { question: 'How many calories per gram does fat provide?', options: ['4 kcal/g', '7 kcal/g', '9 kcal/g', '12 kcal/g'], correct: 2, explanation: 'Fat provides 9 kcal/g, making it the most energy-dense macronutrient. Protein and carbs each provide 4 kcal/g.' },
      { question: 'What is the optimal daily protein intake for muscle growth?', options: ['0.8g/kg', '1.0g/kg', '1.6-2.2g/kg', '3.0g/kg'], correct: 2, explanation: 'Research consistently shows 1.6-2.2g/kg/day is optimal for maximizing muscle protein synthesis and muscle growth.' },
      { question: 'How much glycogen can muscles store?', options: ['~100g', '~200g', '~400g', '~1000g'], correct: 2, explanation: 'Muscles store approximately 400g of glycogen, while the liver stores about 100g. Total glycogen stores provide ~2000 kcal of energy.' },
    ],
  },
  // ===== SUPPLEMENTS =====
  {
    id: 'creatine',
    title: 'Creatine: The Gold Standard',
    category: 'Supplements',
    system: 'Metabolic',
    level: 'intermediate',
    emoji: '💊',
    icon: 'flask',
    color: '#9B59B6',
    summary: 'Creatine monohydrate is the most researched and effective supplement in sports nutrition. It increases phosphocreatine stores, enhances power output, and may even benefit brain function.',
    description: 'Creatine is a naturally occurring compound (synthesized from arginine, glycine, and methionine) stored primarily in skeletal muscle as phosphocreatine. It is the single most evidence-backed supplement for improving strength, power, and muscle mass.',
    sections: [
      { title: 'How Creatine Works', content: 'Creatine is stored in muscles as phosphocreatine (PCr). During high-intensity exercise, PCr donates its phosphate group to ADP, rapidly regenerating ATP. By supplementing with creatine, you increase muscle PCr stores by 20-40%. This means: more reps at a given weight, faster recovery between sets, greater sprint performance, and ultimately more muscle growth over time due to increased training volume.' },
      { title: 'Dosing & Protocols', content: 'Two approaches: (1) Loading phase: 20g/day for 5-7 days (split into 4 doses), then 3-5g/day maintenance. This saturates muscles in ~1 week. (2) No loading: 3-5g/day consistently. This takes ~4 weeks to fully saturate muscles. Both approaches end at the same place. Creatine monohydrate is the most studied and cost-effective form. Other forms (HCl, ethyl ester, buffered) offer no proven advantage despite higher prices.' },
      { title: 'Benefits Beyond Muscle', content: 'Creatine has benefits beyond physical performance: improved cognitive function (especially under sleep deprivation), neuroprotection, reduced mental fatigue, potential antidepressant effects, improved bone density, and blood sugar management. The brain also uses PCr for energy—creatine supplementation increases brain creatine levels by 5-15%.' },
      { title: 'Safety & Myths', content: 'Creatine is one of the safest supplements ever studied. Long-term studies (5+ years) show no adverse effects on kidney function, liver function, or hydration status in healthy individuals. Common myths debunked: it does NOT cause dehydration (may actually improve hydration), does NOT cause hair loss (one poorly designed study, never replicated), does NOT cause kidney damage in healthy people, and the initial weight gain is water stored IN muscle cells (intracellular, making muscles look fuller, not bloated).' },
    ],
    keyFacts: [
      'Increases PCr stores by 20-40%',
      'Improves strength by 5-15% on average',
      '3-5g/day is the optimal maintenance dose',
      'Monohydrate is the best-studied form',
      'Benefits brain function and cognition',
      'Safe for long-term use (5+ years studied)',
      'Most researched supplement in sports science',
    ],
    fitnessRelevance: 'Creatine monohydrate should be the first supplement any serious trainee considers. It directly enhances the phosphagen energy system, allowing more work per training session. Over months and years, this additional volume translates to measurably greater muscle mass and strength gains.',
    relatedTopics: [
      { id: 'energy-systems', title: 'Energy Systems & ATP', category: 'Exercise Physiology' },
      { id: 'muscle-fibers', title: 'Muscle Fiber Types', category: 'Muscular' },
      { id: 'hypertrophy', title: 'Muscle Hypertrophy', category: 'Muscular' },
      { id: 'nutrition-basics', title: 'Nutrition Basics', category: 'Nutrition' },
    ],
    quizQuestions: [
      { question: 'What is the recommended daily maintenance dose of creatine?', options: ['1g/day', '3-5g/day', '10g/day', '20g/day'], correct: 1, explanation: '3-5g per day is the optimal maintenance dose for keeping muscle creatine stores saturated after an optional loading phase.' },
      { question: 'By how much can creatine increase muscle PCr stores?', options: ['5-10%', '10-15%', '20-40%', '50-100%'], correct: 2, explanation: 'Creatine supplementation increases muscle phosphocreatine stores by approximately 20-40%, depending on baseline levels.' },
      { question: 'Which form of creatine has the most research support?', options: ['Creatine HCl', 'Creatine ethyl ester', 'Creatine monohydrate', 'Buffered creatine'], correct: 2, explanation: 'Creatine monohydrate is by far the most researched form with hundreds of studies. Other forms have not demonstrated superior results despite higher prices.' },
    ],
  },
  // ===== EXERCISE PHYSIOLOGY =====
  {
    id: 'vo2max',
    title: 'VO2 Max & Aerobic Capacity',
    category: 'Exercise Physiology',
    system: 'Cardiovascular',
    level: 'advanced',
    emoji: '🫁',
    icon: 'analytics',
    color: '#3498DB',
    summary: 'VO2 max is the maximum rate at which your body can consume oxygen during exercise. It is one of the strongest predictors of both athletic performance and longevity.',
    description: 'VO2 max (maximal oxygen uptake) represents the upper limit of your aerobic energy system. It is determined by cardiac output, blood oxygen-carrying capacity, muscle capillary density, and mitochondrial function. It can be improved by 15-30% with proper training.',
    sections: [
      { title: 'What Determines VO2 Max?', content: 'VO2 max = Cardiac Output × Arteriovenous O2 Difference (Fick equation). The limiting factors are: (1) Central: heart\'s ability to pump blood (cardiac output), blood volume, hemoglobin concentration. (2) Peripheral: muscle capillary density, mitochondrial density, oxidative enzyme activity. In most people, central factors (cardiac output) are the primary limiter, which is why endurance training primarily increases stroke volume.' },
      { title: 'VO2 Max Values', content: 'Average untrained male: 35-45 ml/kg/min. Average untrained female: 27-35 ml/kg/min. Trained male athletes: 55-70 ml/kg/min. Elite endurance athletes: 70-90+ ml/kg/min. The highest recorded VO2 max is ~97.5 ml/kg/min (cross-country skier). Genetics account for ~50% of VO2 max variation, but training can improve it by 15-30% regardless of starting point.' },
      { title: 'Training to Improve VO2 Max', content: 'The most effective training methods: (1) High-intensity intervals at 90-100% VO2 max (4x4 min intervals with 3 min recovery is the gold standard protocol). (2) Threshold training at 80-90% VO2 max (tempo runs). (3) High-volume low-intensity training (Zone 2) builds the aerobic base that supports VO2 max improvements. The Norwegian 4x4 protocol is the most evidence-backed approach.' },
      { title: 'VO2 Max & Longevity', content: 'VO2 max is one of the strongest predictors of all-cause mortality. Each 1 MET increase in fitness (~3.5 ml/kg/min) reduces mortality risk by 8-17%. People in the highest fitness quartile have 50-70% lower mortality risk than those in the lowest. This makes VO2 max improvement one of the most impactful health interventions available—even more powerful than quitting smoking in some analyses.' },
    ],
    keyFacts: [
      'VO2 max can improve 15-30% with training',
      'Genetics account for ~50% of VO2 max variation',
      'Elite athletes: 70-90+ ml/kg/min',
      'Each 1 MET increase reduces mortality 8-17%',
      '4x4 interval training is the gold standard protocol',
      'VO2 max declines ~10% per decade after age 30 without training',
    ],
    fitnessRelevance: 'VO2 max training should be part of every fitness program, not just for endurance athletes. The longevity benefits alone make it essential. Include 1-2 sessions per week of high-intensity intervals at 90-100% of max heart rate.',
    relatedTopics: [
      { id: 'heart', title: 'The Heart', category: 'Cardiovascular' },
      { id: 'energy-systems', title: 'Energy Systems', category: 'Exercise Physiology' },
      { id: 'cardiovascular', title: 'Circulatory System', category: 'Cardiovascular' },
      { id: 'muscle-fibers', title: 'Muscle Fiber Types', category: 'Muscular' },
    ],
    quizQuestions: [
      { question: 'What does VO2 max measure?', options: ['Maximum heart rate', 'Maximum oxygen consumption', 'Maximum blood pressure', 'Maximum muscle strength'], correct: 1, explanation: 'VO2 max measures the maximum rate at which your body can consume and utilize oxygen during exercise—the ceiling of your aerobic capacity.' },
      { question: 'By how much can VO2 max improve with training?', options: ['5-10%', '15-30%', '50-100%', 'Cannot improve'], correct: 1, explanation: 'VO2 max can improve by 15-30% with proper training, regardless of genetic starting point.' },
      { question: 'What is the gold standard VO2 max training protocol?', options: ['Steady-state jogging', '4x4 minute intervals', 'Sprint intervals', 'Heavy weightlifting'], correct: 1, explanation: 'The Norwegian 4x4 protocol (4 minutes at 90-95% max HR, 3 minutes recovery, repeated 4 times) is the most evidence-backed method for improving VO2 max.' },
    ],
  },
  {
    id: 'recovery',
    title: 'Recovery & Adaptation',
    category: 'Exercise Physiology',
    system: 'Recovery',
    level: 'intermediate',
    emoji: '😴',
    icon: 'moon',
    color: '#8E44AD',
    summary: 'Training breaks you down—recovery builds you up. Understanding the science of recovery (sleep, nutrition, active recovery) is essential for maximizing adaptation and preventing overtraining.',
    description: 'The principle of supercompensation states that after training stress and adequate recovery, the body adapts to a higher level of performance. Without proper recovery, you enter a state of overreaching and eventually overtraining syndrome.',
    sections: [
      { title: 'The Supercompensation Model', content: 'Training creates a stress response: muscle damage, glycogen depletion, neural fatigue, and hormonal disruption. During recovery, the body doesn\'t just return to baseline—it overshoots (supercompensation) to handle future stress better. This is the fundamental mechanism of all training adaptation. The timing of your next session matters: train too soon and you dig deeper; wait too long and supercompensation fades.' },
      { title: 'Sleep: The Ultimate Recovery Tool', content: 'During deep sleep (NREM stages 3-4), growth hormone secretion peaks, protein synthesis increases, and tissue repair accelerates. REM sleep consolidates motor learning (skill acquisition). Sleep deprivation of even 1 hour per night reduces muscle protein synthesis by ~18% and increases cortisol. Elite athletes need 8-10 hours of sleep. Naps of 20-30 minutes can partially compensate for sleep debt.' },
      { title: 'Active vs Passive Recovery', content: 'Active recovery (light exercise at 30-60% of max effort) increases blood flow to damaged muscles, accelerating waste removal and nutrient delivery. Studies show active recovery reduces DOMS (delayed onset muscle soreness) by 20-30% compared to complete rest. Methods: walking, cycling, swimming, yoga, foam rolling. Passive recovery (complete rest) is appropriate only for acute injury or extreme fatigue.' },
      { title: 'Overtraining Syndrome', content: 'Overtraining occurs when training stress chronically exceeds recovery capacity. Symptoms: persistent fatigue, decreased performance, elevated resting heart rate, mood disturbances, frequent illness, sleep disruption, and loss of motivation. True overtraining syndrome takes months to develop and months to recover from. Prevention: periodize training, include deload weeks every 4-6 weeks, monitor resting HR and HRV, prioritize sleep, and manage life stress.' },
    ],
    keyFacts: [
      'Growth hormone peaks during deep NREM sleep',
      'Sleep deprivation reduces MPS by ~18%',
      'Active recovery reduces DOMS by 20-30%',
      'Deload every 4-6 weeks to prevent overtraining',
      'HRV (heart rate variability) tracks recovery status',
      'Elite athletes need 8-10 hours of sleep',
    ],
    fitnessRelevance: 'Recovery is not optional—it is where all adaptation happens. Prioritize sleep (8-10 hours), nutrition (protein + carbs post-workout), active recovery on rest days, and structured deload periods. Tracking HRV and resting heart rate can help you autoregulate training intensity.',
    relatedTopics: [
      { id: 'hypertrophy', title: 'Muscle Growth', category: 'Muscular' },
      { id: 'nutrition-basics', title: 'Nutrition', category: 'Nutrition' },
      { id: 'energy-systems', title: 'Energy Systems', category: 'Exercise Physiology' },
      { id: 'heart', title: 'Heart & Cardiovascular', category: 'Cardiovascular' },
    ],
    quizQuestions: [
      { question: 'When does growth hormone peak?', options: ['During exercise', 'After eating', 'During deep NREM sleep', 'During REM sleep'], correct: 2, explanation: 'Growth hormone secretion peaks during deep NREM sleep (stages 3-4), making quality sleep essential for muscle recovery and growth.' },
      { question: 'How often should you include deload weeks?', options: ['Every week', 'Every 2 weeks', 'Every 4-6 weeks', 'Never'], correct: 2, explanation: 'Deload weeks every 4-6 weeks allow accumulated fatigue to dissipate while maintaining fitness, preventing overtraining.' },
      { question: 'By how much does sleep deprivation reduce muscle protein synthesis?', options: ['~5%', '~10%', '~18%', '~50%'], correct: 2, explanation: 'Research shows that even modest sleep deprivation can reduce muscle protein synthesis by approximately 18%, significantly impairing recovery.' },
    ],
  },
  // ===== NERVOUS SYSTEM =====
  {
    id: 'nervous-intro',
    title: 'The Nervous System',
    category: 'Nervous System',
    system: 'Nervous',
    level: 'beginner',
    emoji: '🧠',
    icon: 'flash',
    color: '#FFEAA7',
    summary: 'The nervous system controls every movement, thought, and bodily function. For athletes, neural adaptations are often the first source of strength gains—before any muscle growth occurs.',
    description: 'The nervous system is the body\'s command center, consisting of the central nervous system (brain and spinal cord) and peripheral nervous system (nerves). It processes sensory information, generates movement commands, and regulates all involuntary functions.',
    sections: [
      { title: 'Central Nervous System', content: 'The brain contains ~86 billion neurons, each connected to thousands of others via synapses. The motor cortex generates voluntary movement commands, the cerebellum coordinates timing and precision, and the brainstem controls vital functions (breathing, heart rate). During exercise, the CNS must recruit the right muscles, in the right order, at the right time—a process called motor unit recruitment.' },
      { title: 'Motor Units & Strength', content: 'A motor unit = one motor neuron + all muscle fibers it innervates. Small motor units (few fibers) control fine movements (eyes, fingers). Large motor units (thousands of fibers) generate powerful movements (quads, glutes). The Henneman Size Principle states that motor units are recruited from smallest to largest. Heavy weights recruit the largest, most powerful motor units that lighter weights never reach.' },
      { title: 'Neural Adaptations to Training', content: 'In the first 4-8 weeks of strength training, most strength gains come from neural adaptations, NOT muscle growth: improved motor unit recruitment (activating more fibers), improved rate coding (firing faster), improved synchronization (fibers firing together), and reduced neural inhibition (overriding protective mechanisms). This is why beginners get stronger rapidly before visible muscle growth.' },
      { title: 'The Autonomic Nervous System', content: 'The sympathetic nervous system ("fight or flight") increases heart rate, blood pressure, and energy mobilization during exercise. The parasympathetic system ("rest and digest") promotes recovery. Training shifts the balance: acute exercise activates sympathetic dominance, while chronic training enhances parasympathetic tone at rest (lower resting HR, better recovery). HRV measures this balance—higher HRV indicates better recovery.' },
    ],
    keyFacts: [
      '86 billion neurons in the brain',
      'Nerve signals travel up to 268 mph',
      'First 4-8 weeks of strength gains are mostly neural',
      'Motor units are recruited smallest to largest',
      'The brain uses 20% of the body\'s oxygen',
      'HRV reflects autonomic nervous system balance',
    ],
    fitnessRelevance: 'Neural adaptations explain why beginners gain strength quickly, why heavy weights build more strength than light weights, and why skill practice improves performance. Training should include heavy compound movements to maximize neural recruitment and skill-specific practice for motor learning.',
    relatedTopics: [
      { id: 'muscle-fibers', title: 'Muscle Fiber Types', category: 'Muscular' },
      { id: 'brain', title: 'Brain Function', category: 'Nervous' },
      { id: 'recovery', title: 'Recovery & HRV', category: 'Exercise Physiology' },
      { id: 'heart', title: 'Heart & Autonomic Control', category: 'Cardiovascular' },
    ],
    quizQuestions: [
      { question: 'In the first 4-8 weeks of training, strength gains are primarily from:', options: ['Muscle growth', 'Neural adaptations', 'Bone density', 'Hormone changes'], correct: 1, explanation: 'Early strength gains (4-8 weeks) are predominantly neural: improved motor unit recruitment, rate coding, and synchronization—before significant hypertrophy occurs.' },
      { question: 'What principle governs motor unit recruitment order?', options: ['All-or-none law', 'Henneman Size Principle', 'Wolff\'s Law', 'Davis\'s Law'], correct: 1, explanation: 'The Henneman Size Principle states that motor units are recruited from smallest to largest, meaning heavy loads are needed to recruit the largest, most powerful units.' },
      { question: 'How many neurons does the human brain contain?', options: ['8.6 million', '86 million', '86 billion', '860 billion'], correct: 2, explanation: 'The human brain contains approximately 86 billion neurons, each forming thousands of synaptic connections with other neurons.' },
    ],
  },
  // ===== DIGESTIVE =====
  {
    id: 'digestive',
    title: 'Digestive System & Nutrient Absorption',
    category: 'Digestive System',
    system: 'Digestive',
    level: 'intermediate',
    emoji: '🔄',
    icon: 'refresh',
    color: '#A29BFE',
    summary: 'The digestive system breaks down food into absorbable nutrients that fuel every cell in your body. Understanding digestion helps optimize nutrient timing, meal composition, and supplement absorption.',
    description: 'The digestive tract is a 9-meter-long tube that mechanically and chemically processes food into absorbable nutrients. It involves coordinated actions of the mouth, stomach, small intestine, large intestine, liver, pancreas, and gallbladder.',
    sections: [
      { title: 'Digestion Process', content: 'Digestion begins in the mouth (mechanical chewing + salivary amylase for carbs). The stomach uses HCl (pH 1.5-3.5) and pepsin to break down proteins. The small intestine is where most absorption occurs—its villi and microvilli create a surface area of ~32 square meters. The pancreas releases digestive enzymes (lipase, protease, amylase) and bicarbonate. The liver produces bile for fat emulsification. Total transit time: 24-72 hours.' },
      { title: 'Protein Digestion', content: 'Proteins are broken down by: pepsin (stomach), trypsin and chymotrypsin (pancreas), and peptidases (intestinal brush border). The end products are amino acids and small peptides (di/tri-peptides), which are absorbed via active transport. Protein digestion efficiency is ~95% for animal proteins and ~80-85% for plant proteins. This is why animal proteins have higher biological value scores.' },
      { title: 'Gut Microbiome', content: 'The gut contains ~38 trillion bacteria (more than human cells!). These microbes produce short-chain fatty acids from fiber, synthesize vitamins (K, B12), regulate immune function, and influence mood via the gut-brain axis. A diverse microbiome is associated with better health outcomes. Exercise increases microbial diversity. Probiotics and prebiotic fiber support gut health.' },
      { title: 'Nutrient Timing & Digestion', content: 'Pre-workout meals should be consumed 2-3 hours before training (allow gastric emptying). Simple carbs 15-30 minutes before can provide quick energy. Post-workout, the digestive system is slightly suppressed (blood was diverted from gut to muscles), so easily digestible foods (whey protein, simple carbs) are ideal immediately after. Full meals can resume 1-2 hours post-training.' },
    ],
    keyFacts: [
      'Digestive tract is ~9 meters long',
      'Small intestine surface area: ~32 square meters',
      'Gut contains ~38 trillion bacteria',
      'Stomach pH: 1.5-3.5 (highly acidic)',
      'Total food transit time: 24-72 hours',
      'Animal protein digestibility: ~95%',
    ],
    fitnessRelevance: 'Understanding digestion helps you time meals around training, choose easily digestible pre-workout foods, understand why some protein sources are more bioavailable, and support gut health for overall performance and immunity.',
    relatedTopics: [
      { id: 'nutrition-basics', title: 'Macronutrients', category: 'Nutrition' },
      { id: 'protein-synthesis', title: 'Protein Synthesis', category: 'Nutrition' },
      { id: 'cardiovascular', title: 'Blood & Circulation', category: 'Cardiovascular' },
      { id: 'cells-intro', title: 'Cellular Absorption', category: 'Fundamentals' },
    ],
    quizQuestions: [
      { question: 'What is the approximate surface area of the small intestine?', options: ['3 sq meters', '10 sq meters', '32 sq meters', '100 sq meters'], correct: 2, explanation: 'The small intestine\'s villi and microvilli create a surface area of approximately 32 square meters for nutrient absorption.' },
      { question: 'What is the pH of stomach acid?', options: ['1.5-3.5', '4.0-5.0', '6.0-7.0', '7.5-8.5'], correct: 0, explanation: 'Stomach acid has a pH of 1.5-3.5, which is highly acidic. This acidity activates pepsin for protein digestion and kills most ingested bacteria.' },
      { question: 'How many bacteria live in the human gut?', options: ['38 million', '38 billion', '38 trillion', '380 trillion'], correct: 2, explanation: 'The gut microbiome contains approximately 38 trillion bacteria—actually more than the number of human cells in the body.' },
    ],
  },
  // ===== ADDITIONAL TOPICS =====
  {
    id: 'quadriceps',
    title: 'Quadriceps: The Powerhouse',
    category: 'Muscular System',
    system: 'Muscular',
    level: 'beginner',
    emoji: '🦵',
    icon: 'walk',
    color: '#00B894',
    summary: 'The quadriceps are the largest muscle group in the body, consisting of four heads that extend the knee. They are essential for squatting, jumping, running, and virtually all lower body movements.',
    description: 'The quadriceps femoris is a group of four muscles on the front of the thigh: vastus lateralis, vastus medialis, vastus intermedius, and rectus femoris. Together they form the most powerful muscle group in the human body.',
    sections: [
      { title: 'Anatomy of the Four Heads', content: 'Vastus Lateralis: the largest head, forms the outer thigh sweep. Vastus Medialis: the "teardrop" muscle near the knee, crucial for knee stability (especially the VMO—vastus medialis oblique). Vastus Intermedius: lies deep under rectus femoris, contributes to overall thigh mass. Rectus Femoris: the only quad that crosses the hip joint, contributing to both knee extension and hip flexion. It is the most injury-prone of the four.' },
      { title: 'Fiber Type Composition', content: 'The quadriceps are typically ~50-55% Type II fibers, making them responsive to both heavy and high-rep training. The vastus lateralis tends to be more fast-twitch (power), while the vastus medialis has more slow-twitch fibers (stability/endurance). This mixed composition means quads respond well to varied training: heavy squats AND high-rep leg extensions.' },
      { title: 'Training the Quads', content: 'Best exercises by EMG activation: barbell back squat (all heads), front squat (emphasizes vastus medialis), leg press (heavy loading), Bulgarian split squat (unilateral strength), leg extensions (rectus femoris isolation), hack squat (vastus lateralis emphasis), and sissy squats (rectus femoris stretch). For maximum development, combine compound movements (squats, leg press) with isolation (leg extensions) and unilateral work (lunges, split squats).' },
      { title: 'Common Injuries', content: 'Rectus femoris strain: common in sprinting and kicking. Patellar tendinopathy ("jumper\'s knee"): overuse of the quad tendon. Quad contusion: direct impact injury. IT band syndrome: tight vastus lateralis pulling on the IT band. Prevention: proper warm-up, progressive loading, adequate recovery, and addressing muscle imbalances between quads and hamstrings (ideal ratio: 3:2 quad:hamstring strength).' },
    ],
    keyFacts: [
      'Largest muscle group in the body',
      'Four heads: VL, VM, VI, RF',
      '~50-55% Type II fiber composition',
      'Rectus femoris crosses both hip and knee',
      'Can generate over 500N of force',
      'Ideal quad:hamstring ratio is 3:2',
    ],
    fitnessRelevance: 'Quads are essential for athletic performance (jumping, sprinting, changing direction) and aesthetics. They respond best to a combination of heavy compound lifts and higher-rep isolation work. Proper quad:hamstring balance prevents knee injuries.',
    relatedTopics: [
      { id: 'muscle-fibers', title: 'Muscle Fiber Types', category: 'Muscular' },
      { id: 'hypertrophy', title: 'Muscle Growth', category: 'Muscular' },
      { id: 'knee', title: 'Knee Joint', category: 'Skeletal' },
      { id: 'hamstrings', title: 'Hamstrings', category: 'Muscular' },
    ],
    quizQuestions: [
      { question: 'How many heads does the quadriceps have?', options: ['2', '3', '4', '5'], correct: 2, explanation: 'The quadriceps has four heads: vastus lateralis, vastus medialis, vastus intermedius, and rectus femoris.' },
      { question: 'Which quad head crosses both the hip and knee joints?', options: ['Vastus lateralis', 'Vastus medialis', 'Rectus femoris', 'Vastus intermedius'], correct: 2, explanation: 'The rectus femoris is unique among the quadriceps as it crosses both the hip and knee joints, contributing to hip flexion and knee extension.' },
      { question: 'What is the ideal quad to hamstring strength ratio?', options: ['1:1', '2:1', '3:2', '4:1'], correct: 2, explanation: 'The ideal quad:hamstring strength ratio is approximately 3:2. Imbalances increase the risk of ACL injuries and knee problems.' },
    ],
  },
  {
    id: 'hydration',
    title: 'Hydration Science',
    category: 'Nutrition',
    system: 'Metabolic',
    level: 'beginner',
    emoji: '💧',
    icon: 'water',
    color: '#74B9FF',
    summary: 'Water makes up 60% of your body weight and is essential for every physiological process. Even mild dehydration (2%) can reduce performance by up to 20%.',
    description: 'Hydration affects blood volume, thermoregulation, nutrient transport, joint lubrication, and cognitive function. For athletes, proper hydration is one of the simplest and most impactful performance enhancers.',
    sections: [
      { title: 'Water Balance', content: 'The body contains ~42 liters of water (60% of body weight). Daily water loss occurs through: urine (~1.5L), sweat (0.5-2L at rest, up to 3L/hour during exercise), breathing (~0.4L), and feces (~0.2L). These losses must be matched by intake from fluids, food (~20% of water intake), and metabolic water production.' },
      { title: 'Dehydration & Performance', content: 'Even 2% body weight loss from dehydration reduces aerobic performance by 10-20%, increases perceived exertion, impairs thermoregulation, and reduces cognitive function. At 3-4% dehydration, strength decreases by 5-10% and anaerobic performance drops. At 5%+, heat exhaustion risk increases dramatically. Thirst is a lagging indicator—by the time you feel thirsty, you are already 1-2% dehydrated.' },
      { title: 'Electrolytes', content: 'Sweat contains sodium (primary), potassium, chloride, magnesium, and calcium. During exercise lasting >60 minutes or in hot conditions, electrolyte replacement becomes important. Sodium is the most critical—it maintains blood volume and drives thirst. Sports drinks should contain 300-600mg sodium per liter. For most gym sessions under 60 minutes, plain water is sufficient.' },
      { title: 'Hydration Strategies', content: 'Pre-hydration: drink 5-7ml/kg 4 hours before exercise. During exercise: 150-350ml every 15-20 minutes. Post-exercise: drink 150% of fluid lost (weigh before and after to calculate). Monitor urine color: pale yellow = hydrated, dark yellow = dehydrated. Caffeine in moderate doses (<400mg) does NOT cause significant dehydration despite its mild diuretic effect.' },
    ],
    keyFacts: [
      'Body is ~60% water (~42 liters)',
      '2% dehydration = 10-20% performance loss',
      'Thirst is a lagging indicator',
      'Sweat can lose up to 3L/hour during intense exercise',
      'Sodium is the most important electrolyte',
      'Caffeine in moderation does NOT dehydrate significantly',
    ],
    fitnessRelevance: 'Proper hydration is the simplest performance enhancer available. Weigh yourself before and after training to calculate sweat rate. Drink before you are thirsty. For sessions under 60 minutes, water is sufficient. For longer sessions, add electrolytes.',
    relatedTopics: [
      { id: 'nutrition-basics', title: 'Macronutrients', category: 'Nutrition' },
      { id: 'energy-systems', title: 'Energy Systems', category: 'Exercise Physiology' },
      { id: 'cardiovascular', title: 'Blood & Circulation', category: 'Cardiovascular' },
      { id: 'recovery', title: 'Recovery', category: 'Exercise Physiology' },
    ],
    quizQuestions: [
      { question: 'At what dehydration level does performance significantly decline?', options: ['0.5%', '1%', '2%', '5%'], correct: 2, explanation: 'Even 2% body weight loss from dehydration can reduce aerobic performance by 10-20% and impair cognitive function.' },
      { question: 'Which electrolyte is most important during exercise?', options: ['Potassium', 'Calcium', 'Sodium', 'Magnesium'], correct: 2, explanation: 'Sodium is the primary electrolyte lost in sweat and is critical for maintaining blood volume, nerve function, and driving the thirst mechanism.' },
      { question: 'Does moderate caffeine intake cause significant dehydration?', options: ['Yes, always', 'Only in large doses', 'No, not significantly', 'Only during exercise'], correct: 2, explanation: 'Moderate caffeine intake (<400mg) has only a mild diuretic effect and does not cause significant dehydration. Regular consumers develop tolerance to the diuretic effect.' },
    ],
  },
  {
    id: 'deltoids',
    title: 'Deltoid Muscles',
    category: 'Muscular System',
    system: 'Muscular',
    level: 'beginner',
    emoji: '🏋️',
    icon: 'fitness',
    color: '#E17055',
    summary: 'The deltoids cap the shoulders with three distinct heads—front, side, and rear—each responsible for different arm movements. Well-developed delts create the coveted V-taper physique.',
    description: 'The deltoid muscle wraps around the shoulder joint in three distinct heads: anterior (front), lateral (side), and posterior (rear). Each head performs different movements and responds to different exercises.',
    sections: [
      { title: 'Three Heads of the Deltoid', content: 'Anterior Deltoid: performs shoulder flexion (raising arm forward) and internal rotation. Heavily involved in pressing movements. Often overdeveloped relative to other heads. Lateral Deltoid: performs shoulder abduction (raising arm to the side). Creates the "capped" shoulder look and contributes most to shoulder width. Posterior Deltoid: performs shoulder extension and external rotation. Most undertrained head, crucial for posture and shoulder health.' },
      { title: 'Training Each Head', content: 'Anterior: overhead press, front raises, incline bench press, push presses. Lateral: lateral raises (cable and dumbbell), upright rows, wide-grip lateral raises. Posterior: face pulls, reverse flyes, rear delt rows, band pull-aparts. For balanced development, most people need MORE rear and lateral delt work and LESS front delt work (since pressing already hits anterior delts heavily).' },
      { title: 'Shoulder Health & Injury Prevention', content: 'The shoulder is the most mobile but least stable joint. The rotator cuff (supraspinatus, infraspinatus, teres minor, subscapularis) stabilizes the joint during movement. Imbalances between deltoid strength and rotator cuff strength lead to impingement. Always warm up with external rotations, include face pulls in every upper body session, and avoid excessive behind-the-neck pressing.' },
    ],
    keyFacts: [
      'Three heads: anterior, lateral, posterior',
      'Lateral delt creates shoulder width',
      'Posterior delt is most undertrained',
      'Shoulder is the most mobile joint',
      'Rotator cuff has 4 muscles',
      'Face pulls are essential for shoulder health',
    ],
    fitnessRelevance: 'Balanced deltoid development creates the aesthetic V-taper and is crucial for upper body strength. Most lifters overtrain front delts and undertrain rear delts. Include lateral raises and face pulls in every program.',
    relatedTopics: [
      { id: 'hypertrophy', title: 'Muscle Growth', category: 'Muscular' },
      { id: 'muscle-fibers', title: 'Muscle Fiber Types', category: 'Muscular' },
      { id: 'skeletal-system', title: 'Skeletal System', category: 'Skeletal' },
      { id: 'pectoral-muscles', title: 'Chest Muscles', category: 'Muscular' },
    ],
    quizQuestions: [
      { question: 'Which deltoid head creates shoulder width?', options: ['Anterior', 'Lateral', 'Posterior', 'All equally'], correct: 1, explanation: 'The lateral (side) deltoid is primarily responsible for shoulder width and the "capped" look that creates the V-taper.' },
      { question: 'Which deltoid head is most commonly undertrained?', options: ['Anterior', 'Lateral', 'Posterior', 'None'], correct: 2, explanation: 'The posterior (rear) deltoid is the most undertrained head. Most pressing movements heavily work the anterior delt, while rear delts need dedicated exercises like face pulls and reverse flyes.' },
      { question: 'How many muscles make up the rotator cuff?', options: ['2', '3', '4', '5'], correct: 2, explanation: 'The rotator cuff consists of 4 muscles: supraspinatus, infraspinatus, teres minor, and subscapularis (SITS muscles).' },
    ],
  },
  // ===== ADVANCED & EXPERT TOPICS =====
  {
    id: 'periodization',
    title: 'Periodization: The Science of Programming',
    category: 'Exercise Physiology',
    system: 'Performance',
    level: 'advanced',
    emoji: '📊',
    icon: 'calendar',
    color: '#3498DB',
    summary: 'Periodization is the systematic planning of training variables over time to maximize performance while minimizing injury risk. It is the difference between random workouts and a scientifically structured program.',
    description: 'Periodization involves the planned manipulation of training variables—volume, intensity, frequency, and exercise selection—over time to optimize adaptation. It is based on the General Adaptation Syndrome (GAS) model proposed by Hans Selye and the principle of supercompensation.',
    sections: [
      { title: 'General Adaptation Syndrome (GAS)', content: 'Selye\'s GAS model describes three stages of stress response: (1) Alarm Phase — initial performance decrease due to novel stimulus, muscle damage, and fatigue. (2) Resistance Phase — body adapts, performance increases above baseline (supercompensation). (3) Exhaustion Phase — if stress continues without adequate recovery, performance declines and overtraining occurs. Periodization is the art of cycling through alarm and resistance phases while avoiding exhaustion.' },
      { title: 'Linear Periodization', content: 'The classical model: start with high volume/low intensity (hypertrophy phase, 8-12 reps), progress to moderate volume/moderate intensity (strength phase, 4-6 reps), then low volume/high intensity (peaking phase, 1-3 reps). This model works well for beginners and intermediates but becomes less effective for advanced athletes who need more frequent variation. Typical macrocycle: 12-16 weeks, with 3-4 week mesocycles.' },
      { title: 'Undulating Periodization (DUP)', content: 'Daily Undulating Periodization varies the training stimulus within each week rather than across months. Example: Monday = strength (3-5 reps), Wednesday = hypertrophy (8-12 reps), Friday = power (1-3 reps explosive). Research shows DUP produces superior strength gains compared to linear periodization in trained lifters because it provides more frequent exposure to each stimulus and prevents detraining of any single quality.' },
      { title: 'Block Periodization', content: 'Organizes training into focused blocks (2-4 weeks) that target specific adaptations: Accumulation (high volume, work capacity), Transmutation (sport-specific intensity), Realization (peaking/tapering). Each block builds on the previous one. This model is used by most elite strength athletes and is particularly effective when preparing for competition. The key principle: concentrated loading in one direction produces greater adaptation than dispersed loading.' },
      { title: 'The Taper & Peaking', content: 'A taper is a planned reduction in training volume (40-60% reduction) over 1-3 weeks before competition while maintaining intensity. Research shows tapers improve performance by 0.5-6% (significant at elite levels). Mechanisms: reduced fatigue reveals fitness, glycogen supercompensation, neuromuscular potentiation, hormonal optimization (testosterone:cortisol ratio improves). Common mistake: reducing intensity during taper. Keep the weight heavy, just do fewer sets.' },
    ],
    keyFacts: [
      'GAS model: Alarm → Resistance → Exhaustion',
      'DUP outperforms linear periodization in trained lifters',
      'Tapers reduce volume 40-60% while maintaining intensity',
      'Supercompensation window: 24-72 hours post-training',
      'Block periodization uses 2-4 week focused blocks',
      'Advanced athletes need more frequent variation',
    ],
    fitnessRelevance: 'Without periodization, progress stalls within 3-6 months. Structured programming prevents plateaus, manages fatigue, and ensures continuous progress. Even recreational lifters benefit from basic undulating periodization (varying rep ranges across the week).',
    relatedTopics: [
      { id: 'hypertrophy', title: 'Muscle Hypertrophy', category: 'Muscular' },
      { id: 'recovery', title: 'Recovery & Adaptation', category: 'Exercise Physiology' },
      { id: 'overtraining-syndrome', title: 'Overtraining Syndrome', category: 'Exercise Physiology' },
      { id: 'nervous-intro', title: 'Neural Adaptations', category: 'Nervous' },
    ],
    quizQuestions: [
      { question: 'What are the three stages of General Adaptation Syndrome?', options: ['Warm-up, Work, Cool-down', 'Alarm, Resistance, Exhaustion', 'Load, Adapt, Recover', 'Stress, Rest, Grow'], correct: 1, explanation: 'Selye\'s GAS model describes Alarm (initial stress response), Resistance (adaptation), and Exhaustion (overtraining if stress continues without recovery).' },
      { question: 'During a taper, what should be maintained?', options: ['Volume', 'Intensity', 'Frequency', 'Duration'], correct: 1, explanation: 'During a taper, intensity (weight on the bar) should be maintained while volume (number of sets/reps) is reduced by 40-60%. This preserves neuromuscular adaptations while reducing fatigue.' },
      { question: 'Which periodization model varies stimulus within each week?', options: ['Linear', 'Block', 'Daily Undulating (DUP)', 'Reverse'], correct: 2, explanation: 'Daily Undulating Periodization (DUP) varies the training focus across different days within the same week, providing more frequent exposure to each training quality.' },
    ],
  },
  {
    id: 'hormonal-responses',
    title: 'Hormonal Responses to Training',
    category: 'Endocrinology',
    system: 'Endocrine',
    level: 'expert',
    emoji: '🧪',
    icon: 'beaker',
    color: '#E91E63',
    summary: 'Exercise triggers a complex cascade of hormonal responses that drive adaptation. Understanding testosterone, growth hormone, cortisol, IGF-1, and insulin dynamics is crucial for optimizing training and recovery.',
    description: 'Hormones are chemical messengers that regulate virtually every aspect of physical performance and body composition. Resistance training, endurance training, nutrition, and sleep all profoundly influence hormonal profiles both acutely and chronically.',
    sections: [
      { title: 'Testosterone & Resistance Training', content: 'Acute testosterone response to resistance training: increases 15-30% during and immediately after heavy compound lifts (squats, deadlifts). This spike lasts 15-60 minutes. However, research by West & Phillips (2012) demonstrated that these acute spikes do NOT correlate with long-term muscle growth. What matters is baseline (resting) testosterone levels, which are influenced by: sleep quality, body fat percentage (both very low and very high reduce T), dietary fat intake, zinc/vitamin D status, and chronic stress management.' },
      { title: 'Growth Hormone (GH) & IGF-1', content: 'GH is released in pulses, primarily during deep sleep (largest pulse in first 2 hours). Resistance training with short rest periods (60-90s) and moderate loads (8-12 reps) produces the largest acute GH response. However, like testosterone, acute GH spikes have minimal impact on muscle growth. What matters more is IGF-1 (Insulin-like Growth Factor 1), which is produced by the liver in response to GH and directly stimulates muscle protein synthesis via the PI3K/Akt/mTOR pathway. IGF-1 levels are more responsive to nutrition (especially protein intake) than to training itself.' },
      { title: 'Cortisol: The Double-Edged Sword', content: 'Cortisol is a catabolic (muscle-breaking) stress hormone. Acute cortisol release during training is normal and even beneficial—it mobilizes energy stores. However, chronically elevated cortisol (from overtraining, poor sleep, chronic life stress) suppresses testosterone, impairs recovery, promotes fat storage (especially visceral), and breaks down muscle protein. The Testosterone:Cortisol (T:C) ratio is a key marker of anabolic status. Training sessions >75 minutes cause cortisol to rise significantly—this is why workouts should be focused and efficient.' },
      { title: 'Insulin & Nutrient Partitioning', content: 'Insulin is the most anabolic hormone in the body—it drives amino acids and glucose into muscle cells and suppresses muscle protein breakdown. Post-workout insulin spikes (from carbohydrate intake) are anti-catabolic, not directly anabolic. The key insight: insulin sensitivity is dramatically improved by resistance training. Trained muscles take up glucose 2-3x more efficiently than untrained muscles. This is why resistance training is the most powerful non-pharmaceutical intervention for type 2 diabetes and metabolic syndrome.' },
      { title: 'Hormonal Optimization Strategies', content: 'Evidence-based strategies: (1) Sleep 7-9 hours (sleep deprivation drops T by 10-15%). (2) Maintain 15-25% body fat for men (both extremes suppress T). (3) Eat adequate fat (0.5-1g/kg/day, cholesterol is a T precursor). (4) Manage stress (meditation, nature exposure reduce cortisol). (5) Zinc (30mg) and Vitamin D (2000-5000 IU) if deficient. (6) Avoid chronic caloric deficits >500 kcal (suppresses thyroid and T). (7) Heavy compound lifts for acute hormonal response. (8) Limit alcohol (suppresses T production for 24-48 hours).' },
    ],
    keyFacts: [
      'Acute T spikes post-training do NOT predict long-term growth',
      'GH peaks during first 2 hours of deep sleep',
      'Training >75 min significantly elevates cortisol',
      'Insulin sensitivity improves 2-3x with resistance training',
      'Sleep deprivation reduces testosterone by 10-15%',
      'T:C ratio is a key marker of anabolic status',
      'Both very low and very high body fat suppress testosterone',
    ],
    fitnessRelevance: 'Hormonal optimization is about lifestyle factors, not chasing acute post-workout spikes. Prioritize sleep, manage stress, maintain healthy body fat, eat adequate dietary fat, and ensure micronutrient sufficiency. These factors have 10x more impact on your hormonal profile than any training variable.',
    relatedTopics: [
      { id: 'recovery', title: 'Recovery & Sleep', category: 'Exercise Physiology' },
      { id: 'nutrition-basics', title: 'Macronutrients', category: 'Nutrition' },
      { id: 'overtraining-syndrome', title: 'Overtraining', category: 'Exercise Physiology' },
      { id: 'hypertrophy', title: 'Muscle Hypertrophy', category: 'Muscular' },
    ],
    quizQuestions: [
      { question: 'Do acute post-workout testosterone spikes predict long-term muscle growth?', options: ['Yes, strongly', 'Yes, moderately', 'No, research shows no correlation', 'Only in beginners'], correct: 2, explanation: 'Research by West & Phillips (2012) demonstrated that acute hormonal spikes post-training do NOT correlate with long-term muscle growth. Baseline hormone levels and lifestyle factors matter far more.' },
      { question: 'At what training duration does cortisol rise significantly?', options: ['30 minutes', '45 minutes', '75 minutes', '120 minutes'], correct: 2, explanation: 'Training sessions exceeding approximately 75 minutes cause significant cortisol elevation, which is why focused, efficient workouts are recommended.' },
      { question: 'How much does sleep deprivation reduce testosterone?', options: ['2-5%', '5-8%', '10-15%', '25-30%'], correct: 2, explanation: 'Research shows that even modest sleep restriction (5 hours vs 8 hours) can reduce testosterone levels by 10-15%, significantly impacting recovery and adaptation.' },
    ],
  },
  {
    id: 'biomechanics',
    title: 'Biomechanics & Leverage Systems',
    category: 'Biomechanics',
    system: 'Movement',
    level: 'expert',
    emoji: '⚙️',
    icon: 'cog',
    color: '#607D8B',
    summary: 'Your body is a system of levers. Understanding moment arms, torque, and force vectors explains why some exercises feel harder at certain points and how to optimize your training for maximum muscle stimulation.',
    description: 'Biomechanics applies the laws of physics to human movement. Every exercise involves muscles generating force to move bones around joints (fulcrums) against resistance. Understanding these principles allows you to select exercises based on their mechanical efficiency for targeting specific muscles.',
    sections: [
      { title: 'Lever Systems in the Body', content: 'The body uses three classes of levers: First class (rare) — fulcrum between effort and load (neck extension). Second class (rare) — load between fulcrum and effort (calf raise). Third class (most common) — effort between fulcrum and load (bicep curl, most exercises). Third-class levers are mechanically disadvantaged—they require MORE muscle force than the external load. This is why your biceps must generate ~8x the force of the dumbbell you are curling. This mechanical disadvantage is actually beneficial—it trades force for speed and range of motion.' },
      { title: 'Moment Arms & Torque', content: 'Torque = Force × Moment Arm (perpendicular distance from joint to force line). The exercise is hardest where the moment arm is longest. In a bicep curl, the hardest point is when the forearm is parallel to the ground (maximum moment arm). In a squat, the hardest point for the quads is at ~90° knee flexion. This is why "sticking points" exist—they are the points of maximum mechanical disadvantage. Understanding moment arms allows you to manipulate exercises: changing grip width, stance width, or torso angle shifts which muscles experience the greatest torque.' },
      { title: 'Force-Velocity Relationship', content: 'Muscles produce less force at higher velocities (concentric) and more force at lower velocities. This is why you can lower more weight than you can lift (eccentric > isometric > concentric strength). The practical application: eccentric-focused training (slow negatives) allows you to overload muscles with supramaximal loads, creating greater mechanical tension. This is the basis of "negatives" and accentuated eccentrics in advanced training.' },
      { title: 'Length-Tension Relationship', content: 'Muscles produce maximum force at their resting length (optimal overlap of actin and myosin filaments). At very short or very long lengths, force production decreases. This explains "strength curves": exercises are hardest at specific joint angles. Advanced technique: "lengthened partials" — training in the stretched position where muscles are longest. Recent research (Pedrosa et al., 2022) shows that training at long muscle lengths produces 1.5-2x more hypertrophy than training at short lengths. This is why deep squats build more muscle than partial squats.' },
      { title: 'Stretch-Mediated Hypertrophy', content: 'Training muscles at long lengths (stretched position) produces superior hypertrophy. Mechanisms: (1) Greater mechanical tension at long lengths, (2) Titin (a structural protein) acts as a mechanosensor when stretched, activating mTOR, (3) Fascicle length increases, adding sarcomeres in series. Practical applications: deep ROM on all exercises, deficit push-ups, Romanian deadlifts over regular deadlifts for hamstrings, overhead tricep extensions over pushdowns, incline curls over preacher curls. This is one of the most important recent findings in hypertrophy research.' },
    ],
    keyFacts: [
      'Most body movements are third-class levers (mechanically disadvantaged)',
      'Biceps must generate ~8x the force of the weight being curled',
      'Exercises are hardest where the moment arm is longest',
      'Eccentric strength > Isometric > Concentric',
      'Training at long muscle lengths produces 1.5-2x more hypertrophy',
      'Titin acts as a mechanosensor when muscles are stretched',
    ],
    fitnessRelevance: 'Understanding biomechanics allows you to select exercises that maximally load target muscles through their full range of motion. Prioritize exercises that load muscles at long lengths (stretched position) and use full ROM. This is the most evidence-based approach to exercise selection.',
    relatedTopics: [
      { id: 'hypertrophy', title: 'Muscle Hypertrophy', category: 'Muscular' },
      { id: 'muscle-fibers', title: 'Muscle Fiber Types', category: 'Muscular' },
      { id: 'skeletal-system', title: 'Skeletal System', category: 'Skeletal' },
      { id: 'nervous-intro', title: 'Neural Control', category: 'Nervous' },
    ],
    quizQuestions: [
      { question: 'What type of lever system is most common in the human body?', options: ['First class', 'Second class', 'Third class', 'Fourth class'], correct: 2, explanation: 'Third-class levers (effort between fulcrum and load) are most common in the body. They are mechanically disadvantaged but trade force for speed and range of motion.' },
      { question: 'Training at long muscle lengths produces how much more hypertrophy vs short lengths?', options: ['Same amount', '25% more', '50-100% more', '300% more'], correct: 2, explanation: 'Recent research shows training at long muscle lengths (stretched position) produces approximately 1.5-2x (50-100%) more hypertrophy than training at short muscle lengths.' },
      { question: 'Where is a bicep curl hardest?', options: ['At the top', 'At the bottom', 'When forearm is parallel to ground', 'Equally hard throughout'], correct: 2, explanation: 'A bicep curl is hardest when the forearm is parallel to the ground because this is where the moment arm (perpendicular distance from elbow to weight) is longest, creating maximum torque.' },
    ],
  },
  {
    id: 'bfr-training',
    title: 'Blood Flow Restriction Training',
    category: 'Exercise Physiology',
    system: 'Metabolic',
    level: 'advanced',
    emoji: '🩸',
    icon: 'pulse',
    color: '#C0392B',
    summary: 'BFR training uses cuffs to partially restrict blood flow during low-load exercise, producing hypertrophy comparable to heavy training. It is one of the most powerful tools for rehabilitation and advanced training.',
    description: 'Blood Flow Restriction (BFR) training involves applying a pneumatic cuff or wrap to the proximal portion of a limb to partially restrict venous return while maintaining arterial inflow. When combined with low-load exercise (20-30% 1RM), it produces muscle growth comparable to traditional heavy training through unique physiological mechanisms.',
    sections: [
      { title: 'How BFR Works', content: 'The cuff partially occludes venous return (blood leaving the muscle) while allowing arterial inflow (blood entering). This creates blood pooling in the muscle, causing extreme metabolic stress and cellular swelling without heavy loads. The resulting hypoxia (low oxygen) forces fast-twitch fibers to activate early (they normally require heavy loads), and metabolite accumulation triggers growth signaling pathways. The "pump" achieved with BFR is far greater than normal training.' },
      { title: 'Mechanisms of BFR Hypertrophy', content: 'BFR triggers hypertrophy through multiple pathways: (1) Metabolic stress — extreme accumulation of lactate, H+, and inorganic phosphate activates mTOR-independent growth pathways. (2) Cellular swelling — blood pooling causes mechanical stretch on cell membranes, activating anabolic signaling. (3) Fast-twitch recruitment — hypoxia forces Type II fibers to activate at low loads. (4) Growth hormone response — BFR training produces 290x greater GH response than the same exercise without BFR. (5) Satellite cell activation — BFR increases satellite cell proliferation and myonuclear addition.' },
      { title: 'BFR Protocols', content: 'Standard protocol: 30-50% arterial occlusion pressure (AOP) for upper body, 50-80% for lower body. Exercise at 20-30% 1RM. Rep scheme: 30-15-15-15 (75 total reps) with 30-second rest between sets. Keep cuffs inflated during rest periods. Total time under occlusion: 10-15 minutes maximum. Frequency: can be used 2-4x per week per muscle group. Cuff width matters: wider cuffs (5-10cm) are more effective and safer than narrow wraps.' },
      { title: 'Applications & Safety', content: 'Primary applications: (1) Rehabilitation — maintain/build muscle when heavy loading is contraindicated (post-surgery, joint injuries). (2) Deload weeks — maintain stimulus without joint stress. (3) Accessory work — add volume without systemic fatigue. (4) Older adults — build muscle without heavy loads. Safety: BFR is safe for healthy individuals when protocols are followed. Contraindications: history of DVT, severe hypertension, pregnancy, sickle cell trait. Never occlude for >15 minutes continuously.' },
    ],
    keyFacts: [
      'BFR with 20-30% 1RM produces similar hypertrophy to 70%+ 1RM',
      'Growth hormone response is 290x greater with BFR',
      'Occlude for maximum 15 minutes continuously',
      'Standard rep scheme: 30-15-15-15',
      'Wider cuffs (5-10cm) are more effective and safer',
      'Particularly valuable for rehabilitation and deload weeks',
    ],
    fitnessRelevance: 'BFR is a game-changer for: training around injuries, adding volume without joint stress, deload weeks, and maximizing metabolic stress. It allows you to grow muscle with very light weights, making it invaluable for longevity in training.',
    relatedTopics: [
      { id: 'hypertrophy', title: 'Muscle Hypertrophy', category: 'Muscular' },
      { id: 'energy-systems', title: 'Energy Systems', category: 'Exercise Physiology' },
      { id: 'cardiovascular', title: 'Circulatory System', category: 'Cardiovascular' },
      { id: 'recovery', title: 'Recovery', category: 'Exercise Physiology' },
    ],
    quizQuestions: [
      { question: 'What percentage of 1RM is typically used with BFR training?', options: ['10-15%', '20-30%', '50-60%', '70-80%'], correct: 1, explanation: 'BFR training typically uses 20-30% of 1RM, yet produces hypertrophy comparable to traditional training at 70%+ 1RM through metabolic stress and cellular swelling mechanisms.' },
      { question: 'How much greater is the growth hormone response with BFR vs without?', options: ['2x', '10x', '100x', '290x'], correct: 3, explanation: 'Research shows BFR training can produce a growth hormone response approximately 290 times greater than the same exercise performed without blood flow restriction.' },
      { question: 'What is the maximum recommended continuous occlusion time?', options: ['5 minutes', '10 minutes', '15 minutes', '30 minutes'], correct: 2, explanation: 'Continuous occlusion should not exceed 15 minutes to prevent tissue damage. After 15 minutes, cuffs should be released to restore normal blood flow.' },
    ],
  },
  {
    id: 'overtraining-syndrome',
    title: 'Overtraining Syndrome: Recognition & Prevention',
    category: 'Exercise Physiology',
    system: 'Recovery',
    level: 'advanced',
    emoji: '⚠️',
    icon: 'warning',
    color: '#FF5722',
    summary: 'Overtraining syndrome (OTS) is a severe condition where chronic training stress exceeds recovery capacity, leading to prolonged performance decrements lasting weeks to months. Recognizing the early warning signs is critical.',
    description: 'Overtraining exists on a spectrum: Functional Overreaching (planned, short-term, leads to supercompensation) → Non-Functional Overreaching (unplanned, performance decline, requires 2-4 weeks recovery) → Overtraining Syndrome (severe, multi-system dysfunction, requires months to recover). Understanding where you are on this spectrum is essential for long-term progress.',
    sections: [
      { title: 'The Overtraining Continuum', content: 'Functional Overreaching (FOR): Intentional short-term increase in training stress, followed by planned recovery. Results in supercompensation (performance increase). Duration: 1-2 weeks of increased stress + 1 week deload. Non-Functional Overreaching (NFOR): Unplanned accumulation of fatigue without adequate recovery. Performance stagnates or declines. Recovery requires 2-4 weeks. Overtraining Syndrome (OTS): Severe, prolonged maladaptation affecting multiple body systems. Performance decline persists for >2 months despite rest. May require 3-12 months for full recovery. Affects ~10% of elite endurance athletes and ~5% of strength athletes at some point.' },
      { title: 'Physiological Markers of OTS', content: 'Sympathetic OTS (more common in strength athletes): elevated resting heart rate, increased blood pressure, irritability, insomnia, decreased appetite. Parasympathetic OTS (more common in endurance athletes): decreased resting heart rate, fatigue, depression, apathy, loss of motivation. Common markers across both types: decreased testosterone:cortisol ratio, elevated inflammatory markers (IL-6, CRP), suppressed immune function (frequent illness), decreased HRV (heart rate variability), altered sleep architecture, decreased glycogen stores.' },
      { title: 'Monitoring & Prevention', content: 'Daily monitoring tools: (1) Resting heart rate — track every morning, >7 bpm above baseline for 3+ days suggests overreaching. (2) HRV (Heart Rate Variability) — decreasing trend indicates sympathetic dominance and insufficient recovery. Use apps like EliteHRV or Oura. (3) Grip strength — simple proxy for CNS fatigue. Test with dynamometer every morning. (4) Mood/motivation questionnaire — POMS (Profile of Mood States) or simple 1-10 scale. (5) Training log — track performance trends. Three consecutive sessions of declining performance warrants a deload.' },
      { title: 'Recovery from Overtraining', content: 'If OTS is suspected: (1) Complete rest or very light activity for 1-4 weeks. (2) Gradually reintroduce training at 50% volume, building back over 4-8 weeks. (3) Address all recovery factors: sleep (9-10 hours), nutrition (increase calories, especially carbs), stress management. (4) Blood work to check: testosterone, cortisol, thyroid, iron, vitamin D, inflammatory markers. (5) Psychological support — OTS often co-occurs with depression and anxiety. Prevention is always better than cure: periodize training, include regular deloads, and listen to your body.' },
    ],
    keyFacts: [
      'OTS recovery can take 3-12 months',
      'Affects ~10% of elite endurance athletes',
      'Resting HR >7 bpm above baseline for 3+ days = warning sign',
      'HRV decline is the most sensitive early marker',
      'Sympathetic OTS: elevated HR, irritability, insomnia',
      'Parasympathetic OTS: low HR, fatigue, depression',
    ],
    fitnessRelevance: 'Every serious trainee should monitor resting HR and/or HRV daily. Include deload weeks every 4-6 weeks. If performance declines for 3+ consecutive sessions, take a rest day. Overtraining is far easier to prevent than to recover from.',
    relatedTopics: [
      { id: 'recovery', title: 'Recovery & Adaptation', category: 'Exercise Physiology' },
      { id: 'hormonal-responses', title: 'Hormonal Responses', category: 'Endocrinology' },
      { id: 'periodization', title: 'Periodization', category: 'Exercise Physiology' },
      { id: 'nervous-intro', title: 'Nervous System', category: 'Nervous' },
    ],
    quizQuestions: [
      { question: 'How long can full recovery from Overtraining Syndrome take?', options: ['1-2 weeks', '2-4 weeks', '3-12 months', 'It is permanent'], correct: 2, explanation: 'Full recovery from Overtraining Syndrome can take 3-12 months, which is why prevention through proper periodization and monitoring is so critical.' },
      { question: 'What is the most sensitive early marker of overreaching?', options: ['Muscle soreness', 'Body weight', 'HRV decline', 'Appetite changes'], correct: 2, explanation: 'Heart Rate Variability (HRV) decline is the most sensitive early marker of insufficient recovery and impending overreaching, often declining before performance drops.' },
      { question: 'Sympathetic overtraining is more common in which athletes?', options: ['Endurance athletes', 'Strength athletes', 'Yoga practitioners', 'Swimmers'], correct: 1, explanation: 'Sympathetic overtraining (elevated HR, irritability, insomnia) is more common in strength/power athletes, while parasympathetic overtraining (low HR, fatigue, depression) is more common in endurance athletes.' },
    ],
  },
  {
    id: 'lactate-threshold',
    title: 'Lactate Threshold & Anaerobic Capacity',
    category: 'Exercise Physiology',
    system: 'Metabolic',
    level: 'expert',
    emoji: '🔥',
    icon: 'flame',
    color: '#FF9800',
    summary: 'Lactate threshold is the exercise intensity at which lactate accumulates faster than it can be cleared. It is a better predictor of endurance performance than VO2 max and can be significantly improved with targeted training.',
    description: 'Lactate is not a waste product—it is a fuel source and signaling molecule. The "burn" during intense exercise comes from hydrogen ion accumulation, not lactate itself. Understanding lactate dynamics is essential for optimizing both endurance and high-intensity performance.',
    sections: [
      { title: 'Lactate Physiology', content: 'Lactate is produced continuously, even at rest (blood lactate ~1 mmol/L). During exercise, production increases proportionally to intensity. The Lactate Threshold (LT1, first threshold) occurs at ~2 mmol/L — the point where production first exceeds baseline clearance. The Critical Lactate Threshold (LT2, MLSS — Maximum Lactate Steady State) occurs at ~4 mmol/L — the maximum intensity where production and clearance are balanced. Above LT2, lactate accumulates exponentially and fatigue rapidly ensues. LT2 typically occurs at 83-88% of VO2 max in trained athletes.' },
      { title: 'Why Lactate Threshold Matters More Than VO2 Max', content: 'Two athletes can have identical VO2 max values but vastly different performance if one has a higher lactate threshold. Example: Athlete A has VO2 max of 65 ml/kg/min with LT at 85% (= 55.25 ml/kg/min sustainable). Athlete B has VO2 max of 65 with LT at 75% (= 48.75 ml/kg/min sustainable). Athlete A will consistently outperform B despite identical VO2 max. Elite marathoners can sustain 88-92% of VO2 max — their lactate threshold is extremely high relative to their aerobic capacity.' },
      { title: 'Training to Improve Lactate Threshold', content: 'Three evidence-based approaches: (1) Tempo/Threshold Training: 20-40 minutes at LT2 intensity (85-90% max HR, "comfortably hard"). This directly improves lactate clearance capacity by increasing mitochondrial density and MCT1/MCT4 transporters. (2) Over-Under Intervals: alternate between just below and just above LT2 (e.g., 3 min at 95% LT + 2 min at 105% LT). This trains the body to clear lactate at high intensities. (3) High-Volume Zone 2: builds the aerobic base that supports lactate clearance. The 80/20 rule: 80% easy (below LT1), 20% hard (at or above LT2).' },
      { title: 'Lactate as a Signaling Molecule', content: 'Recent research has revealed lactate is not just a fuel but a signaling molecule: it promotes mitochondrial biogenesis (via PGC-1α activation), stimulates VEGF production (improving capillary density), enhances brain-derived neurotrophic factor (BDNF, improving cognitive function), and acts as a gluconeogenic substrate (Cori cycle). This is why lactate-producing exercise (intervals, tempo work) has unique benefits beyond what pure aerobic training provides.' },
    ],
    keyFacts: [
      'LT1 occurs at ~2 mmol/L, LT2 at ~4 mmol/L',
      'Lactate threshold is a better performance predictor than VO2 max',
      'Elite marathoners sustain 88-92% of VO2 max',
      'Lactate promotes mitochondrial biogenesis',
      '80/20 rule: 80% easy, 20% hard training',
      'Lactate is a fuel and signaling molecule, not waste',
    ],
    fitnessRelevance: 'For CrossFit athletes, runners, cyclists, and anyone doing metabolic conditioning, lactate threshold training is essential. Include 1-2 threshold sessions per week and build a strong aerobic base with Zone 2 training. The ability to sustain high intensities without lactate accumulation is what separates good athletes from great ones.',
    relatedTopics: [
      { id: 'vo2max', title: 'VO2 Max', category: 'Exercise Physiology' },
      { id: 'energy-systems', title: 'Energy Systems', category: 'Exercise Physiology' },
      { id: 'heart', title: 'Cardiac Output', category: 'Cardiovascular' },
      { id: 'muscle-fibers', title: 'Muscle Fiber Types', category: 'Muscular' },
    ],
    quizQuestions: [
      { question: 'At what blood lactate level does the critical threshold (LT2/MLSS) typically occur?', options: ['1 mmol/L', '2 mmol/L', '4 mmol/L', '8 mmol/L'], correct: 2, explanation: 'The critical lactate threshold (LT2 or Maximum Lactate Steady State) typically occurs at approximately 4 mmol/L, representing the maximum intensity where lactate production and clearance are balanced.' },
      { question: 'Which is a better predictor of endurance performance?', options: ['VO2 max', 'Lactate threshold', 'Resting heart rate', 'Body weight'], correct: 1, explanation: 'Lactate threshold is a better predictor of endurance performance than VO2 max because it determines what percentage of VO2 max an athlete can sustain for extended periods.' },
      { question: 'What does lactate promote in addition to being a fuel source?', options: ['Muscle damage', 'Mitochondrial biogenesis', 'Fat storage', 'Protein breakdown'], correct: 1, explanation: 'Lactate promotes mitochondrial biogenesis through PGC-1α activation, making it a signaling molecule that drives aerobic adaptation beyond just being a fuel source.' },
    ],
  },
  {
    id: 'tendon-biology',
    title: 'Tendon Biology & Adaptation',
    category: 'Biomechanics',
    system: 'Connective Tissue',
    level: 'expert',
    emoji: '🔗',
    icon: 'link',
    color: '#795548',
    summary: 'Tendons connect muscle to bone and are critical for force transmission, energy storage, and injury prevention. They adapt much slower than muscle, creating a dangerous mismatch that causes many training injuries.',
    description: 'Tendons are dense connective tissues composed primarily of Type I collagen arranged in parallel fibers. They transmit muscle force to bones, store elastic energy (like springs), and provide proprioceptive feedback. Understanding tendon biology is essential for injury prevention and long-term training sustainability.',
    sections: [
      { title: 'Tendon Structure & Function', content: 'Tendons are composed of: Type I collagen (95% of collagen content) arranged in hierarchical bundles (fibrils → fibers → fascicles → tendon). Tenocytes (tendon cells) maintain and remodel the matrix. The tendon-bone junction (enthesis) is the weakest point and most common injury site. Tendons have poor blood supply (especially the midportion), which is why they heal slowly. The Achilles tendon, for example, has a watershed area of minimal blood flow 2-6cm above the heel—this is where most ruptures occur.' },
      { title: 'The Muscle-Tendon Mismatch', content: 'Muscle adapts rapidly (weeks to months) while tendon adapts slowly (months to years). This creates a dangerous window where muscles can generate more force than tendons can safely transmit. This is the primary mechanism behind tendinopathies in new lifters who increase load too quickly. The solution: progressive loading over months, not weeks. Tendons require 24-72 hours between heavy loading sessions for collagen synthesis to occur. Training tendons daily actually DECREASES collagen synthesis due to suppressed tenocyte activity.' },
      { title: 'Tendinopathy: Degeneration, Not Inflammation', content: 'Modern research has shown that chronic tendon pain (tendinopathy) is NOT primarily inflammatory—it is a degenerative process characterized by disorganized collagen, increased ground substance, and neovascularization (new blood vessel growth). This is why anti-inflammatories (NSAIDs, ice) provide only temporary relief and may actually impair long-term healing. The gold standard treatment is progressive tendon loading (eccentric or heavy slow resistance training) which stimulates collagen remodeling and restores tendon structure over 12+ weeks.' },
      { title: 'Tendon Training Protocols', content: 'For tendon health and stiffness: (1) Heavy Slow Resistance (HSR): 3-4 sets of 6-8 reps with 3-second eccentric and 3-second concentric. Load: 70-85% 1RM. Frequency: 3x/week. (2) Isometric holds: 45-second holds at 70% MVC (maximum voluntary contraction). Excellent for pain relief (analgesic effect lasts 4-6 hours). (3) Plyometrics: develop tendon stiffness and elastic energy storage. (4) Collagen supplementation: 10-15g hydrolyzed collagen + 50mg vitamin C, 30-60 minutes before training. This timing ensures amino acids are available during the loading-induced blood flow increase.' },
    ],
    keyFacts: [
      'Tendons adapt 3-6x slower than muscle',
      'Tendons need 24-72 hours between heavy loading',
      'Tendinopathy is degeneration, not inflammation',
      'NSAIDs may impair long-term tendon healing',
      'Heavy slow resistance training is gold standard for tendinopathy',
      'Collagen + vitamin C 30-60 min before training supports tendon health',
      'Achilles tendon has a watershed area of minimal blood flow',
    ],
    fitnessRelevance: 'Every serious lifter should include tendon-specific loading: heavy slow eccentrics, isometric holds, and progressive loading. Never increase training load faster than your tendons can adapt. Collagen supplementation before training is one of the few supplements with strong evidence for connective tissue health.',
    relatedTopics: [
      { id: 'skeletal-system', title: 'Skeletal System', category: 'Skeletal' },
      { id: 'biomechanics', title: 'Biomechanics', category: 'Biomechanics' },
      { id: 'recovery', title: 'Recovery', category: 'Exercise Physiology' },
      { id: 'hypertrophy', title: 'Muscle Growth', category: 'Muscular' },
    ],
    quizQuestions: [
      { question: 'How much slower do tendons adapt compared to muscle?', options: ['Same speed', '2x slower', '3-6x slower', '10x slower'], correct: 2, explanation: 'Tendons adapt 3-6 times slower than muscle tissue, creating a dangerous window where muscles can generate more force than tendons can safely transmit.' },
      { question: 'What is the primary pathology in chronic tendinopathy?', options: ['Inflammation', 'Degeneration', 'Infection', 'Calcification'], correct: 1, explanation: 'Modern research shows tendinopathy is primarily a degenerative process (disorganized collagen, increased ground substance) rather than inflammatory, which is why anti-inflammatories provide limited long-term benefit.' },
      { question: 'When should collagen be taken to support tendon health?', options: ['Before bed', 'With meals', '30-60 min before training', 'Immediately after training'], correct: 2, explanation: 'Taking 10-15g collagen + vitamin C 30-60 minutes before training ensures amino acids are circulating during the exercise-induced increase in tendon blood flow, maximizing delivery to the tissue.' },
    ],
  },
  {
    id: 'motor-learning',
    title: 'Motor Learning & Skill Acquisition',
    category: 'Nervous System',
    system: 'Nervous',
    level: 'expert',
    emoji: '🎯',
    icon: 'aim',
    color: '#FF6F00',
    summary: 'Learning complex movements involves three stages of motor learning. Understanding how the brain acquires, consolidates, and automates motor skills allows you to learn exercises faster and coach more effectively.',
    description: 'Motor learning is the process by which the brain acquires and refines movement patterns. It involves changes in the motor cortex, cerebellum, basal ganglia, and spinal cord. The principles of motor learning apply to everything from learning a squat to mastering an Olympic lift.',
    sections: [
      { title: 'Fitts & Posner Three-Stage Model', content: 'Stage 1 — Cognitive: The learner understands WHAT to do. Performance is inconsistent, error-prone, and requires intense concentration. The learner needs clear instructions, demonstrations, and external cues ("push the floor away"). Many errors, slow performance. Stage 2 — Associative: The learner refines HOW to do it. Performance becomes more consistent. The learner detects and corrects their own errors. Practice becomes more efficient. Internal cues become useful ("squeeze your glutes"). Stage 3 — Autonomous: The skill becomes automatic. Performance is consistent and efficient with minimal conscious effort. The learner can perform while talking or under pressure. This stage takes thousands of repetitions over months to years.' },
      { title: 'Internal vs External Focus of Attention', content: 'Research by Gabriele Wulf has consistently shown that an EXTERNAL focus of attention (focusing on the effect of the movement on the environment) produces superior performance and learning compared to an INTERNAL focus (focusing on body movements). Examples: External: "Push the floor away" (squat), "Throw the bar to the ceiling" (press), "Spread the floor" (sumo deadlift). Internal: "Extend your knees" (squat), "Contract your deltoids" (press). The constrained action hypothesis explains this: external focus allows the motor system to self-organize, while internal focus disrupts automatic processes.' },
      { title: 'Practice Structure: Blocked vs Random', content: 'Blocked practice: repeating the same skill many times in a row (e.g., 20 squats, then 20 deadlifts). Random practice: mixing different skills (e.g., squat, deadlift, press, squat, press, deadlift). Counterintuitively, random practice produces BETTER long-term learning despite WORSE performance during practice. This is called the "contextual interference effect." The struggle during random practice forces deeper processing and stronger memory formation. For skill acquisition, mix exercises rather than doing all sets of one exercise before moving on.' },
      { title: 'Sleep & Motor Memory Consolidation', content: 'Motor skills are consolidated during sleep, particularly during Stage 2 NREM sleep (sleep spindles) and REM sleep. Studies show 20-30% improvement in motor skill performance after a night of sleep, without any additional practice. Sleep deprivation impairs motor learning by 40-50%. Napping after practice can enhance consolidation. The practical implication: practice complex skills when fresh (beginning of workout), and prioritize sleep for skill acquisition. Skills learned in the evening may consolidate better due to proximity to sleep.' },
    ],
    keyFacts: [
      'Three stages: Cognitive → Associative → Autonomous',
      'External focus outperforms internal focus consistently',
      'Random practice produces better learning than blocked practice',
      'Sleep improves motor skill performance by 20-30%',
      'Sleep deprivation impairs motor learning by 40-50%',
      'Autonomous stage requires thousands of repetitions',
    ],
    fitnessRelevance: 'When learning new exercises: start with clear demonstrations and external cues, practice with varied exercises (not just blocked sets), be patient through the cognitive stage, and prioritize sleep. Coaches should use external cues and allow self-organization rather than over-cueing.',
    relatedTopics: [
      { id: 'nervous-intro', title: 'Nervous System Basics', category: 'Nervous' },
      { id: 'recovery', title: 'Sleep & Recovery', category: 'Exercise Physiology' },
      { id: 'biomechanics', title: 'Biomechanics', category: 'Biomechanics' },
      { id: 'muscle-fibers', title: 'Muscle Fiber Types', category: 'Muscular' },
    ],
    quizQuestions: [
      { question: 'Which type of focus produces superior motor learning?', options: ['Internal focus', 'External focus', 'No focus', 'Both are equal'], correct: 1, explanation: 'Research consistently shows external focus of attention (focusing on the effect of movement on the environment) produces superior performance and learning compared to internal focus.' },
      { question: 'Which practice structure produces better long-term learning?', options: ['Blocked practice', 'Random practice', 'No practice', 'Both are equal'], correct: 1, explanation: 'Random practice (mixing different skills) produces better long-term learning despite worse performance during practice. This "contextual interference effect" forces deeper processing.' },
      { question: 'How much does sleep improve motor skill performance?', options: ['5-10%', '10-15%', '20-30%', '50-100%'], correct: 2, explanation: 'Studies show 20-30% improvement in motor skill performance after a night of sleep, without any additional practice, due to motor memory consolidation during Stage 2 NREM and REM sleep.' },
    ],
  },
  {
    id: 'epigenetics-training',
    title: 'Epigenetics: How Training Changes Your Genes',
    category: 'Fundamentals',
    system: 'Cellular',
    level: 'expert',
    emoji: '🧬',
    icon: 'git-branch',
    color: '#00BCD4',
    summary: 'Exercise doesn\'t just change your body—it changes how your genes are expressed. Epigenetic modifications from training can affect gene expression for years and may even be passed to offspring.',
    description: 'Epigenetics refers to chemical modifications to DNA that change gene expression without altering the genetic code itself. Exercise induces epigenetic changes that activate genes for mitochondrial biogenesis, fat oxidation, inflammation control, and muscle growth. These changes represent the molecular basis of training adaptation.',
    sections: [
      { title: 'DNA Methylation & Exercise', content: 'DNA methylation adds methyl groups to cytosine bases, typically silencing gene expression. Exercise REMOVES methyl groups from genes involved in metabolism and muscle function, activating them. A single bout of exercise changes methylation patterns on thousands of genes. Remarkably, these changes can persist for hours to days after exercise. Regular training creates cumulative epigenetic changes that explain why trained individuals respond differently to the same stimulus as untrained individuals.' },
      { title: 'Histone Modification', content: 'DNA is wrapped around histone proteins. Acetylation of histones "opens" chromatin, making genes accessible for transcription. Exercise increases histone acetylation at genes controlling: PGC-1α (mitochondrial biogenesis), GLUT4 (glucose transport), VEGF (blood vessel growth), and inflammatory regulators. HDAC inhibitors (histone deacetylase inhibitors) are naturally produced during exercise and are being studied as potential anti-aging compounds. This is one mechanism by which exercise slows aging.' },
      { title: 'Epigenetic Memory of Exercise', content: 'Muscle cells retain epigenetic "memory" of previous training even after detraining. When previously trained individuals resume exercise, they regain muscle and fitness faster than true beginners—partly due to retained myonuclei, but also due to persistent epigenetic marks. Research by Lindholm et al. (2014) showed that 3 months of one-legged training created epigenetic changes that persisted after 9 months of detraining. This "muscle memory" at the epigenetic level means your previous training benefits you for years, even if you take extended breaks.' },
      { title: 'Transgenerational Effects', content: 'Emerging evidence suggests exercise-induced epigenetic changes can be passed to offspring. Children of parents who exercised regularly show improved metabolic health, better insulin sensitivity, and enhanced cognitive function—even when the exercise occurred before conception. Paternal exercise appears to affect offspring brain development through changes in sperm epigenetics. Maternal exercise during pregnancy improves offspring cardiovascular health and brain development. This makes exercise not just a personal health intervention but a generational one.' },
    ],
    keyFacts: [
      'A single exercise session changes methylation on thousands of genes',
      'Exercise removes methyl groups from metabolic genes, activating them',
      'Epigenetic marks from training persist for months after detraining',
      'Exercise-induced epigenetic changes may be passed to offspring',
      'Histone acetylation activates genes for mitochondrial biogenesis',
      'Epigenetic changes are one mechanism of exercise\'s anti-aging effects',
    ],
    fitnessRelevance: 'Your training history creates lasting epigenetic changes that benefit you for years. Even if you take extended breaks from training, your "epigenetic memory" helps you regain fitness faster than true beginners. This is powerful motivation to maintain consistent training—every session creates positive molecular changes.',
    relatedTopics: [
      { id: 'cells-intro', title: 'Cell Biology', category: 'Fundamentals' },
      { id: 'muscle-fibers', title: 'Muscle Fiber Types', category: 'Muscular' },
      { id: 'hypertrophy', title: 'Muscle Hypertrophy', category: 'Muscular' },
      { id: 'energy-systems', title: 'Energy Systems', category: 'Exercise Physiology' },
    ],
    quizQuestions: [
      { question: 'What does exercise do to DNA methylation of metabolic genes?', options: ['Increases methylation', 'Removes methylation (activates)', 'No effect', 'Destroys DNA'], correct: 1, explanation: 'Exercise removes methyl groups from genes involved in metabolism and muscle function, activating them. This is one of the primary mechanisms by which exercise changes gene expression.' },
      { question: 'How long do epigenetic changes from training persist after detraining?', options: ['Hours', 'Days', 'Months', 'They are permanent'], correct: 2, explanation: 'Research shows epigenetic marks from training can persist for months after detraining, contributing to "muscle memory" and faster re-adaptation when training resumes.' },
      { question: 'Can exercise-induced epigenetic changes be passed to offspring?', options: ['No, never', 'Only from mothers', 'Only from fathers', 'Yes, from both parents'], correct: 3, explanation: 'Emerging evidence shows exercise-induced epigenetic changes can be transmitted to offspring from both parents, affecting metabolic health, brain development, and cardiovascular function.' },
    ],
  },
  {
    id: 'advanced-supplements',
    title: 'Advanced Supplementation Science',
    category: 'Supplements',
    system: 'Metabolic',
    level: 'advanced',
    emoji: '💊',
    icon: 'flask',
    color: '#7B1FA2',
    summary: 'Beyond creatine, several supplements have strong evidence for enhancing performance: beta-alanine, citrulline malate, caffeine, and nitrates. Understanding their mechanisms allows strategic use for maximum benefit.',
    description: 'The supplement industry is rife with hype, but a handful of supplements have robust scientific support. This topic covers the evidence-based supplements beyond creatine that can meaningfully enhance training performance and recovery.',
    sections: [
      { title: 'Beta-Alanine: The Buffer', content: 'Beta-alanine increases muscle carnosine levels by 40-80% over 4-12 weeks. Carnosine buffers hydrogen ions (H+) during high-intensity exercise, delaying the drop in pH that causes fatigue. Effective for efforts lasting 1-4 minutes (400m-1500m running, high-rep sets, CrossFit WODs). Dosing: 3.2-6.4g/day for 4+ weeks (loading required). The tingling sensation (paresthesia) is harmless—split doses to minimize. Does NOT help with single max efforts or pure endurance. Most effective for activities where H+ accumulation limits performance.' },
      { title: 'Citrulline Malate: The Pump & Performance Enhancer', content: 'Citrulline is converted to arginine in the kidneys, increasing nitric oxide (NO) production more effectively than arginine itself. NO dilates blood vessels, increasing blood flow to working muscles. Benefits: improved muscular endurance (more reps per set), enhanced "pump," reduced muscle soreness (40% reduction in DOMS), and improved nutrient delivery. Dosing: 6-8g citrulline malate (2:1 ratio), 30-60 minutes before training. One of the few pre-workout ingredients with consistent evidence for acute performance enhancement.' },
      { title: 'Caffeine: The Most Effective Legal Performance Enhancer', content: 'Caffeine enhances performance through multiple mechanisms: adenosine receptor blockade (reduces perceived effort), increased dopamine (improves motivation), enhanced calcium release from sarcoplasmic reticulum (improves muscle contraction), and increased fat oxidation (spares glycogen). Benefits: 2-6% improvement in endurance, 2-5% improvement in strength/power, reduced perceived exertion. Optimal dose: 3-6mg/kg bodyweight, 30-60 minutes pre-exercise. Higher doses (>9mg/kg) increase side effects without additional benefit. Habituation reduces but does not eliminate the ergogenic effect.' },
      { title: 'Dietary Nitrates (Beetroot Juice)', content: 'Nitrates (NO3-) are converted to nitrites (NO2-) by oral bacteria, then to nitric oxide (NO) in the acidic environment of the stomach and exercising muscle. NO improves mitochondrial efficiency (reduces oxygen cost of exercise by 3-5%), enhances blood flow, and improves muscle contractility. Benefits: 1-3% improvement in endurance performance, particularly in 4-30 minute efforts. Dosing: 300-600mg nitrate (500ml beetroot juice or concentrated shot), 2-3 hours before exercise. Avoid antibacterial mouthwash—it kills the oral bacteria needed for nitrate conversion.' },
      { title: 'Supplements That DON\'T Work (Despite Marketing)', content: 'BCAAs: If protein intake is adequate (1.6g+/kg), BCAAs provide no additional benefit. Glutamine: No evidence for muscle growth or immune function in healthy athletes. Testosterone boosters (tribulus, fenugreek, D-aspartic acid): No meaningful effect on testosterone in healthy individuals. Fat burners (L-carnitine, CLA, green tea extract): Effects are trivial (<1% body fat change over months). HMB: May help in complete beginners or during caloric restriction, but minimal benefit for trained individuals with adequate protein. Save your money and invest in the evidence-based supplements: creatine, caffeine, beta-alanine, citrulline, and nitrates.' },
    ],
    keyFacts: [
      'Beta-alanine: 3.2-6.4g/day for 4+ weeks, buffers H+ ions',
      'Citrulline malate: 6-8g pre-workout, reduces DOMS by 40%',
      'Caffeine: 3-6mg/kg, improves performance 2-6%',
      'Beetroot juice: reduces oxygen cost by 3-5%',
      'BCAAs are unnecessary with adequate protein intake',
      'Most "testosterone boosters" have no meaningful effect',
    ],
    fitnessRelevance: 'The evidence-based supplement stack for most athletes: creatine monohydrate (daily), caffeine (pre-workout), citrulline malate (pre-workout), beta-alanine (daily, if doing high-intensity work 1-4 min duration), and beetroot juice (before endurance events). Everything else is likely a waste of money.',
    relatedTopics: [
      { id: 'creatine', title: 'Creatine', category: 'Supplements' },
      { id: 'energy-systems', title: 'Energy Systems', category: 'Exercise Physiology' },
      { id: 'nutrition-basics', title: 'Nutrition Basics', category: 'Nutrition' },
      { id: 'lactate-threshold', title: 'Lactate Threshold', category: 'Exercise Physiology' },
    ],
    quizQuestions: [
      { question: 'How long does beta-alanine supplementation take to be effective?', options: ['Immediately', '1-2 days', '4-12 weeks', '6 months'], correct: 2, explanation: 'Beta-alanine requires 4-12 weeks of consistent supplementation (3.2-6.4g/day) to significantly increase muscle carnosine levels by 40-80%.' },
      { question: 'What is the optimal caffeine dose for performance?', options: ['1mg/kg', '3-6mg/kg', '10-15mg/kg', '20mg/kg'], correct: 1, explanation: 'The optimal caffeine dose for performance enhancement is 3-6mg per kg of bodyweight, taken 30-60 minutes before exercise. Higher doses increase side effects without additional benefit.' },
      { question: 'Which supplement reduces DOMS by approximately 40%?', options: ['BCAAs', 'Glutamine', 'Citrulline malate', 'HMB'], correct: 2, explanation: 'Citrulline malate (6-8g pre-workout) has been shown to reduce delayed onset muscle soreness (DOMS) by approximately 40%, likely through improved blood flow and waste removal.' },
    ],
  },
  {
    id: 'nutrient-periodization',
    title: 'Nutrient Periodization: Fueling for Adaptation',
    category: 'Nutrition',
    system: 'Metabolic',
    level: 'expert',
    emoji: '🍽️',
    icon: 'restaurant',
    color: '#4CAF50',
    summary: 'Just as training should be periodized, nutrition should vary based on training phases, goals, and session types. Strategic manipulation of carbohydrate availability can amplify specific training adaptations.',
    description: 'Nutrient periodization involves strategically varying macronutrient intake to match training demands and amplify specific adaptations. It moves beyond "eat the same thing every day" to a more sophisticated approach that maximizes the benefits of each training session.',
    sections: [
      { title: 'Train Low, Compete High', content: '"Train Low" refers to training with low glycogen availability to amplify mitochondrial adaptations. Methods: fasted morning training, twice-daily training (second session with depleted glycogen), or sleeping low (training hard in evening, restricting carbs overnight, then training again fasted). Research shows train-low approaches increase mitochondrial enzyme content, fat oxidation capacity, and glycogen storage efficiency by 2-3x compared to always training with full glycogen. However, train-low reduces training intensity—use it strategically for easy/aerobic sessions, NOT for high-intensity or strength work.' },
      { title: 'Carbohydrate Periodization by Session Type', content: 'High-intensity sessions (intervals, heavy lifting, competition): HIGH carb availability (eat carbs before and during). These sessions require glycogen and performance quality matters. Low-intensity sessions (Zone 2, recovery, mobility): LOW carb availability (fasted or low-carb before). These sessions benefit from amplified fat oxidation and mitochondrial signaling. Competition/taper: HIGH carb (carb-load 48-72 hours before). Rest days: MODERATE carb (match intake to reduced expenditure). This approach ensures high-quality performance when it matters while amplifying adaptations during easier sessions.' },
      { title: 'Protein Periodization', content: 'Protein needs vary by training phase: Hypertrophy phase (high volume): 2.0-2.2g/kg/day, spread across 4-5 meals of 30-40g. Strength/peaking phase (high intensity, lower volume): 1.6-1.8g/kg/day is sufficient. Cutting phase (caloric deficit): 2.3-3.1g/kg/day to preserve muscle mass (higher end for leaner individuals). Deload/recovery week: maintain 1.8-2.0g/kg to support repair. Pre-sleep casein (30-40g) increases overnight MPS by 22% and is particularly valuable during hypertrophy phases and cutting phases.' },
      { title: 'Nutrient Timing Around Training', content: 'Pre-training (1-3 hours before): balanced meal with carbs + protein. If training fasted, performance will suffer for high-intensity work. Intra-training: for sessions >90 minutes, 30-60g carbs/hour (glucose:fructose 2:1 ratio for maximum absorption). Post-training: the "anabolic window" is wider than previously thought (4-6 hours), but consuming protein (30-40g) and carbs within 1-2 hours is practical and supports recovery. For same-day double sessions, rapid glycogen replenishment (1.2g carbs/kg/hour for 4 hours) is critical.' },
    ],
    keyFacts: [
      'Train-low amplifies mitochondrial adaptations 2-3x',
      'High-intensity sessions need high carb availability',
      'Cutting phase protein: 2.3-3.1g/kg/day',
      'Pre-sleep casein increases overnight MPS by 22%',
      'Glucose:fructose 2:1 ratio maximizes carb absorption',
      'The anabolic window is 4-6 hours, not 30 minutes',
    ],
    fitnessRelevance: 'Stop eating the same thing every day. Match your carbohydrate intake to your training intensity: high carbs for hard days, low carbs for easy days. Increase protein during cutting phases. Use train-low strategies for aerobic sessions. This sophisticated approach maximizes both performance and adaptation.',
    relatedTopics: [
      { id: 'nutrition-basics', title: 'Macronutrients', category: 'Nutrition' },
      { id: 'energy-systems', title: 'Energy Systems', category: 'Exercise Physiology' },
      { id: 'periodization', title: 'Training Periodization', category: 'Exercise Physiology' },
      { id: 'lactate-threshold', title: 'Lactate Threshold', category: 'Exercise Physiology' },
    ],
    quizQuestions: [
      { question: 'What does "train low" refer to?', options: ['Low altitude training', 'Training with low glycogen', 'Low intensity training', 'Low body fat training'], correct: 1, explanation: '"Train low" refers to training with low glycogen availability (fasted, or after depleting glycogen) to amplify mitochondrial adaptations and fat oxidation capacity.' },
      { question: 'What protein intake is recommended during a cutting phase?', options: ['1.0-1.2g/kg', '1.6-1.8g/kg', '2.3-3.1g/kg', '4.0g/kg'], correct: 2, explanation: 'During caloric restriction, protein needs increase to 2.3-3.1g/kg/day to preserve muscle mass, with the higher end recommended for leaner individuals.' },
      { question: 'What glucose:fructose ratio maximizes carbohydrate absorption during exercise?', options: ['1:1', '2:1', '3:1', '4:1'], correct: 1, explanation: 'A 2:1 glucose:fructose ratio maximizes carbohydrate absorption because they use different intestinal transporters (SGLT1 and GLUT5), allowing total absorption rates of up to 90g/hour vs 60g/hour for glucose alone.' },
    ],
  },
  {
    id: 'advanced-neuroanatomy',
    title: 'Advanced Neuroanatomy: Motor Control & Proprioception',
    category: 'Nervous System',
    system: 'Neural',
    level: 'expert',
    emoji: '🧠',
    icon: 'brain',
    color: '#9C27B0',
    summary: 'Explore the intricate neural circuits governing movement, from cortical motor planning to spinal reflex arcs. Understand proprioceptive feedback, motor unit recruitment strategies, and the neural basis of skill acquisition.',
    description: 'The nervous system orchestrates movement through hierarchical control: cortical planning, cerebellar coordination, basal ganglia modulation, brainstem integration, and spinal execution. This expert path examines the neuroanatomical substrates of motor control, proprioceptive feedback loops, and neural adaptations to training.',
    sections: [
      {
        title: 'Cortical Motor Areas & Movement Planning',
        content: 'The primary motor cortex (M1) executes movements via the corticospinal tract, but movement planning occurs in premotor and supplementary motor areas. The premotor cortex integrates sensory information to guide movements, while the supplementary motor area sequences complex movements. Mirror neurons in these regions fire both when performing and observing actions, forming the basis of motor learning through visualization. The motor homunculus maps body parts to cortical regions, with hands and face occupying disproportionate area due to fine motor control requirements. Neuroplasticity allows cortical reorganization: skilled musicians show enlarged hand representations, while amputees experience cortical remapping causing phantom limb sensations.'
      },
      {
        title: 'Cerebellar Coordination & Error Correction',
        content: 'The cerebellum contains more neurons than the entire cerebral cortex despite being only 10% of brain volume. It functions as a forward model, predicting movement outcomes and correcting errors in real-time. The cerebellar circuit receives copies of motor commands (efference copy) and sensory feedback, comparing intended vs. actual movement. Discrepancies trigger corrective signals via the thalamus back to motor cortex. This explains why cerebellar damage causes ataxia (uncoordinated movement) without weakness. The cerebellum also contributes to motor learning: during skill acquisition, cerebellar activity increases as errors are detected and corrected. With practice, movements become automated and cerebellar dependence decreases, freeing cognitive resources.'
      },
      {
        title: 'Proprioceptive Systems & Sensory Integration',
        content: 'Proprioception—the sense of body position—relies on three receptor types: muscle spindles (length/velocity), Golgi tendon organs (tension), and joint receptors (angle). Muscle spindles contain intrafusal fibers innervated by gamma motor neurons that adjust spindle sensitivity. During voluntary contraction, alpha-gamma coactivation maintains spindle sensitivity despite muscle shortening. Golgi tendon organs trigger autogenic inhibition at high forces, protecting against tendon rupture. This protective mechanism can be overridden with training, explaining strength gains without hypertrophy. The dorsal column-medial lemniscus pathway transmits proprioceptive information to the somatosensory cortex, while spinocerebellar tracts provide unconscious proprioception for movement correction.'
      },
      {
        title: 'Spinal Reflex Arcs & Motor Unit Recruitment',
        content: 'Spinal reflexes enable rapid responses without cortical processing. The monosynaptic stretch reflex (e.g., knee jerk) involves Ia afferents from muscle spindles directly synapsing on alpha motor neurons, causing contraction within 30-50ms. Polysynaptic reflexes like the withdrawal reflex involve interneurons for more complex responses. Motor units are recruited according to Henneman\'s size principle: smaller, low-threshold units (Type I fibers) activate first, with larger, high-threshold units (Type II) recruited as force demands increase. This orderly recruitment ensures smooth force gradation. Rate coding (firing frequency) further modulates force: frequencies above 50Hz cause tetanic contraction. Ballistic movements bypass size principle, preferentially recruiting high-threshold units for explosive power.'
      },
      {
        title: 'Neural Adaptations to Strength Training',
        content: 'Early strength gains (first 4-8 weeks) occur without hypertrophy, driven by neural adaptations: increased motor unit recruitment, improved synchronization, enhanced rate coding, and reduced neural inhibition. The cross-education effect—strength gains in the untrained limb during unilateral training—demonstrates central neural adaptations. Cortical excitability increases with training, expanding motor representations of trained muscles. Spinal adaptations include increased H-reflex amplitude (enhanced reflex response) and reduced presynaptic inhibition. These neural changes explain why strength is skill-specific: practicing a movement pattern improves neural efficiency for that specific task. Detraining reverses neural adaptations faster than muscular adaptations, explaining rapid strength loss during inactivity.'
      },
      {
        title: 'Clinical Applications: Neural Inhibition & Pain',
        content: 'Arthrogenic muscle inhibition (AMI) occurs after joint injury, causing reflexive quadriceps weakness despite intact muscle. Joint effusion and pain trigger inhibitory reflexes via group III/IV afferents, reducing motor neuron excitability. This protective mechanism prevents further damage but impedes rehabilitation. Strategies to overcome AMI include: cryotherapy (reduces afferent discharge), TENS (gate control theory blocks pain signals), and isometric contractions (bypass inhibitory circuits). Chronic pain causes cortical reorganization: the motor representation of painful areas shrinks, and movement patterns become guarded. Graded motor imagery and mirror therapy can reverse these changes by retraining cortical maps without provoking pain.'
      }
    ],
    keyFacts: [
      'Cerebellum contains 50% of brain neurons despite 10% volume',
      'Stretch reflex latency: 30-50ms (faster than voluntary reaction)',
      'Motor units recruited in size order: Type I → Type IIa → Type IIx',
      'Cross-education effect: 10-15% strength gain in untrained limb',
      'Alpha-gamma coactivation maintains spindle sensitivity during contraction',
      'Neural adaptations account for 90% of early strength gains',
      'Mirror neurons fire during action observation and execution',
      'Arthrogenic muscle inhibition can reduce quad strength by 60% post-injury'
    ],
    fitnessRelevance: 'Understanding neuroanatomy optimizes training: visualization activates motor circuits (useful during injury), unilateral training produces bilateral neural adaptations, and skill practice enhances cerebellar efficiency. Recognizing neural inhibition explains post-injury weakness and guides rehabilitation. Advanced lifters can override protective mechanisms (Golgi tendon organ inhibition) through training, accessing greater force production.',
    relatedTopics: [
      { id: 'motor-learning', title: 'Motor Learning & Skill Acquisition', category: 'Nervous System' },
      { id: 'muscle-fibers', title: 'Muscle Fiber Types', category: 'Muscular System' },
      { id: 'biomechanics', title: 'Biomechanics & Leverage Systems', category: 'Biomechanics' },
      { id: 'recovery', title: 'Recovery & Adaptation', category: 'Exercise Physiology' }
    ],
    quizQuestions: [
      {
        question: 'A powerlifter visualizes their deadlift routine before attempting a PR. Which neural mechanism explains the performance benefit?',
        options: ['Increased muscle temperature', 'Mirror neuron activation priming motor circuits', 'Enhanced glycogen availability', 'Reduced cortisol levels'],
        correct: 1,
        explanation: 'Mirror neurons in premotor and supplementary motor areas fire during both action execution and observation/visualization. This mental rehearsal activates the same neural circuits used in actual performance, priming motor pathways and enhancing movement efficiency.'
      },
      {
        question: 'During a heavy squat, a lifter experiences sudden quadriceps weakness despite no pain. What neural mechanism likely explains this?',
        options: ['Muscle fiber fatigue', 'Golgi tendon organ autogenic inhibition', 'Depleted phosphocreatine stores', 'Reduced motor cortex activation'],
        correct: 1,
        explanation: 'Golgi tendon organs detect excessive tension and trigger autogenic inhibition via Ib inhibitory interneurons, reducing alpha motor neuron excitability to protect against tendon rupture. This protective mechanism can be overridden with training, explaining why experienced lifters can access greater force production.'
      },
      {
        question: 'A patient with cerebellar damage can generate normal force but cannot perform smooth, coordinated movements. What is this condition called?',
        options: ['Paresis', 'Ataxia', 'Spasticity', 'Rigidity'],
        correct: 1,
        explanation: 'Ataxia (lack of coordination) results from cerebellar damage. The cerebellum functions as a forward model, predicting movement outcomes and correcting errors. Without this error-correction system, movements become uncoordinated despite intact strength, demonstrating the cerebellum\'s role in movement quality rather than force production.'
      },
      {
        question: 'After ACL reconstruction, a patient shows 40% quadriceps weakness despite full effort and no pain. What explains this?',
        options: ['Muscle atrophy', 'Arthrogenic muscle inhibition', 'Peripheral nerve damage', 'Reduced motivation'],
        correct: 1,
        explanation: 'Arthrogenic muscle inhibition (AMI) occurs when joint effusion and mechanoreceptor damage trigger inhibitory reflexes via group III/IV afferents, reducing motor neuron excitability. This reflexive weakness protects the joint but impedes rehabilitation, requiring specific interventions like cryotherapy and isometric contractions to overcome.'
      },
      {
        question: 'Which training method best enhances rate coding (motor unit firing frequency)?',
        options: ['High-volume hypertrophy training', 'Ballistic/explosive movements', 'Slow eccentrics', 'Isometric holds'],
        correct: 1,
        explanation: 'Ballistic and explosive movements require rapid force development, training the nervous system to increase motor unit firing frequency (rate coding). Frequencies above 50Hz cause tetanic contraction, maximizing force output. This neural adaptation explains why power training improves rate of force development more effectively than slow, controlled movements.'
      }
    ],
  },
  {
    id: 'endocrine-regulation',
    title: 'Endocrine Regulation & Hormonal Signaling Cascades',
    category: 'Endocrinology',
    system: 'Hormonal',
    level: 'expert',
    emoji: '🧪',
    icon: 'flask',
    color: '#E91E63',
    summary: 'Master the complex hormonal cascades governing metabolism, growth, and adaptation. Explore receptor biology, signal transduction, feedback loops, and the molecular mechanisms by which hormones orchestrate physiological responses to training.',
    description: 'The endocrine system coordinates long-term adaptations through hormonal signaling. This expert path examines hormone synthesis, receptor binding, intracellular signal transduction, and feedback regulation. Understanding these mechanisms reveals how training manipulates hormonal environments to drive muscle growth, fat loss, and performance enhancement.',
    sections: [
      {
        title: 'Hypothalamic-Pituitary Axes: Master Regulators',
        content: 'The hypothalamus integrates neural and hormonal signals, releasing hormones that control pituitary secretion. The HPG (hypothalamic-pituitary-gonadal) axis regulates testosterone: GnRH pulses trigger LH/FSH release, stimulating Leydig cells (testes) to produce testosterone. Negative feedback occurs when testosterone inhibits GnRH/LH. The HPA (hypothalamic-pituitary-adrenal) axis controls cortisol: CRH triggers ACTH release, stimulating adrenal cortex cortisol production. Chronic stress or overtraining dysregulates these axes, suppressing testosterone and elevating cortisol. The GH/IGF-1 axis operates differently: GHRH stimulates GH release, which acts on liver to produce IGF-1. GH secretion is pulsatile, with largest pulses during deep sleep. Understanding these axes explains why sleep deprivation, caloric restriction, and psychological stress impair anabolic hormone production.'
      },
      {
        title: 'Steroid Hormone Receptors & Genomic Actions',
        content: 'Testosterone, estrogen, and cortisol are steroid hormones derived from cholesterol. They cross cell membranes and bind intracellular receptors, forming hormone-receptor complexes that act as transcription factors. Testosterone binds androgen receptors (AR), which dimerize and bind androgen response elements (AREs) on DNA, upregulating genes for protein synthesis (mTOR, IGF-1) and satellite cell proliferation. AR density varies by tissue: skeletal muscle has high AR expression, explaining testosterone\'s anabolic effects. Cortisol binds glucocorticoid receptors (GR), activating catabolic genes (ubiquitin ligases, myostatin) while suppressing anabolic genes. The testosterone:cortisol ratio determines net protein balance. Interestingly, AR sensitivity increases with resistance training, explaining enhanced anabolic response in trained individuals. Selective androgen receptor modulators (SARMs) exploit tissue-specific AR isoforms to promote muscle growth without prostate effects.'
      },
      {
        title: 'Insulin Signaling & Nutrient Partitioning',
        content: 'Insulin is the master anabolic hormone, activating the PI3K/Akt/mTOR pathway to stimulate protein synthesis and suppress proteolysis. Upon binding its receptor, insulin triggers IRS-1 phosphorylation, activating PI3K, which converts PIP2 to PIP3. PIP3 recruits Akt to the membrane, where it\'s phosphorylated and activated. Akt then activates mTORC1 (promoting protein synthesis) and inhibits FoxO transcription factors (suppressing muscle breakdown). Insulin also translocates GLUT4 glucose transporters to cell membranes, facilitating glucose uptake. Resistance training enhances insulin sensitivity by increasing GLUT4 expression and Akt activity, explaining why lifting weights improves glycemic control. However, chronic hyperinsulinemia (from overeating) causes insulin resistance via negative feedback: excess insulin triggers serine phosphorylation of IRS-1, impairing signaling. This explains why lean individuals partition nutrients to muscle while obese individuals store them as fat.'
      },
      {
        title: 'Catecholamines: Acute Performance Modulators',
        content: 'Epinephrine and norepinephrine (catecholamines) are released from adrenal medulla during exercise, triggering fight-or-flight responses. They bind adrenergic receptors: α1 (vasoconstriction), β1 (increased heart rate/contractility), β2 (bronchodilation, glycogenolysis). Catecholamines enhance performance by: increasing cardiac output (β1), mobilizing glucose via glycogen phosphorylase activation (β2), and increasing lipolysis via hormone-sensitive lipase (β2). They also enhance neural drive by increasing motor unit recruitment and firing frequency. Caffeine amplifies catecholamine effects by blocking adenosine receptors (which normally inhibit catecholamine release). However, chronic stress causes receptor downregulation, reducing catecholamine sensitivity. This explains why overtrained athletes show blunted epinephrine response to exercise, impairing performance.'
      },
      {
        title: 'Thyroid Hormones: Metabolic Rate Regulators',
        content: 'Thyroid hormones (T3/T4) regulate basal metabolic rate by controlling mitochondrial biogenesis and uncoupling protein expression. TSH from pituitary stimulates thyroid T4 production; peripheral deiodinases convert T4 to active T3. T3 binds nuclear receptors, upregulating Na+/K+ ATPase (consuming 20% of resting energy) and uncoupling proteins (generating heat). Hypothyroidism reduces metabolic rate by 30-50%, causing fatigue and weight gain. Hyperthyroidism increases metabolic rate, causing weight loss and heat intolerance. Caloric restriction suppresses T3 production (adaptive thermogenesis), explaining metabolic adaptation during dieting. Resistance training can partially counteract this by maintaining lean mass and T3 levels. Selenium and iodine are essential for thyroid function; deficiencies impair hormone synthesis.'
      },
      {
        title: 'Myokines: Muscle as an Endocrine Organ',
        content: 'Skeletal muscle secretes hormones (myokines) that mediate systemic adaptations. IL-6, released during exercise, has paradoxical effects: acutely, it promotes lipolysis and glucose uptake (metabolic); chronically elevated, it causes muscle wasting (catabolic). Irisin, released during exercise, promotes white-to-brown fat conversion (browning), increasing thermogenesis. Myostatin inhibits muscle growth by suppressing satellite cell proliferation; myostatin mutations cause massive hypertrophy (Belgian Blue cattle). Follistatin naturally inhibits myostatin, suggesting therapeutic potential. BDNF (brain-derived neurotrophic factor), released from muscle during exercise, crosses blood-brain barrier to promote neurogenesis and cognitive function. This explains exercise\'s antidepressant effects. Understanding myokines reveals why muscle mass correlates with longevity: muscle is not just contractile tissue but a metabolic and endocrine organ essential for health.'
      }
    ],
    keyFacts: [
      'Testosterone increases AR sensitivity, enhancing anabolic response in trained individuals',
      'Insulin activates PI3K/Akt/mTOR pathway, stimulating protein synthesis',
      'Catecholamines increase motor unit recruitment and firing frequency',
      'IL-6 released during exercise promotes lipolysis (acute) but causes muscle wasting (chronic)',
      'Myostatin mutations cause 2-3x normal muscle mass',
      'Thyroid hormones regulate 20% of resting energy expenditure via Na+/K+ ATPase',
      'Chronic stress causes catecholamine receptor downregulation',
      'Muscle secretes BDNF, explaining exercise\'s cognitive benefits'
    ],
    fitnessRelevance: 'Understanding endocrine regulation optimizes training and nutrition: timing protein intake to coincide with post-exercise insulin sensitivity, managing stress to preserve testosterone:cortisol ratio, and recognizing that muscle is an endocrine organ secreting health-promoting myokines. Advanced lifters can manipulate hormonal environments through periodization, nutrition timing, and recovery strategies to maximize adaptations.',
    relatedTopics: [
      { id: 'hormonal-responses', title: 'Hormonal Responses to Training', category: 'Endocrinology' },
      { id: 'hypertrophy', title: 'Muscle Hypertrophy Mechanisms', category: 'Muscular System' },
      { id: 'nutrition-basics', title: 'Macronutrients & Energy', category: 'Nutrition' },
      { id: 'overtraining-syndrome', title: 'Overtraining Syndrome', category: 'Exercise Physiology' }
    ],
    quizQuestions: [
      {
        question: 'A bodybuilder follows a very low-calorie diet for 12 weeks and notices reduced training performance and libido. Blood work shows low T3 and testosterone. What explains this?',
        options: ['Dehydration', 'Suppression of HPG and thyroid axes due to energy deficit', 'Electrolyte imbalance', 'Overtraining syndrome'],
        correct: 1,
        explanation: 'Severe caloric restriction suppresses the HPG axis (reducing GnRH → LH → testosterone) and thyroid axis (reducing T4 → T3 conversion) as adaptive responses to conserve energy. This explains why aggressive dieting impairs performance, libido, and metabolic rate. Refeeds and diet breaks help restore hormonal function.'
      },
      {
        question: 'An athlete takes 30g whey protein post-workout. Which signaling pathway is primarily activated to stimulate muscle protein synthesis?',
        options: ['MAPK/ERK pathway', 'PI3K/Akt/mTOR pathway', 'JAK/STAT pathway', 'NF-κB pathway'],
        correct: 1,
        explanation: 'Amino acids (especially leucine) and insulin activate the PI3K/Akt/mTOR pathway. Akt phosphorylates and activates mTORC1, which then phosphorylates p70S6K and 4E-BP1, initiating translation of muscle proteins. This is the primary anabolic signaling cascade driving post-exercise muscle protein synthesis.'
      },
      {
        question: 'A powerlifter drinks coffee before a max attempt. How does caffeine enhance performance at the molecular level?',
        options: ['Increases ATP production', 'Blocks adenosine receptors, amplifying catecholamine effects', 'Directly stimulates muscle contraction', 'Increases oxygen delivery'],
        correct: 1,
        explanation: 'Caffeine is an adenosine receptor antagonist. Adenosine normally inhibits catecholamine release; by blocking adenosine receptors, caffeine amplifies epinephrine/norepinephrine effects, increasing neural drive, motor unit recruitment, and perceived energy. This explains caffeine\'s ergogenic effects without directly affecting muscle metabolism.'
      },
      {
        question: 'A patient with myostatin gene mutation would likely exhibit:',
        options: ['Muscle atrophy', 'Normal muscle mass', '2-3x normal muscle mass', 'Increased fat mass'],
        correct: 2,
        explanation: 'Myostatin inhibits muscle growth by suppressing satellite cell proliferation and differentiation. Loss-of-function mutations remove this inhibition, causing massive hypertrophy (2-3x normal muscle mass) as seen in Belgian Blue cattle and rare human cases. This demonstrates myostatin\'s role as a negative regulator of muscle growth.'
      },
      {
        question: 'During a marathon, a runner\'s muscles release IL-6. What is the primary metabolic effect of this myokine?',
        options: ['Promotes muscle protein synthesis', 'Stimulates lipolysis and glucose uptake', 'Causes muscle damage', 'Inhibits fat oxidation'],
        correct: 1,
        explanation: 'IL-6 released from contracting muscle during endurance exercise promotes lipolysis (fat breakdown) and glucose uptake to fuel prolonged activity. This acute IL-6 release is metabolic and beneficial. However, chronically elevated IL-6 (from overtraining or inflammation) becomes catabolic, promoting muscle wasting via ubiquitin-proteasome pathway activation.'
      }
    ],
  },
  {
    id: 'exercise-biochemistry',
    title: 'Exercise Biochemistry & Energy Transfer',
    category: 'Exercise Physiology',
    system: 'Metabolic',
    level: 'expert',
    emoji: '⚡',
    icon: 'zap',
    color: '#FF5722',
    summary: 'Dive deep into metabolic pathways governing ATP production. Master the Krebs cycle, electron transport chain, substrate utilization, and the biochemistry of fatigue. Understand how training manipulates cellular energetics to enhance performance.',
    description: 'Exercise biochemistry examines the molecular mechanisms of energy transfer, from phosphocreatine hydrolysis to oxidative phosphorylation. This expert path explores metabolic pathways, enzyme regulation, substrate competition, and the biochemistry of fatigue, revealing how training optimizes cellular energetics.',
    sections: [
      {
        title: 'Phosphocreatine System: Immediate Energy',
        content: 'The phosphocreatine (PCr) system provides immediate ATP via the creatine kinase reaction: PCr + ADP + H+ ↔ ATP + Cr. This reaction is near-equilibrium, meaning it rapidly responds to ATP demand. Creatine kinase exists in two isoforms: mitochondrial CK (replenishes PCr during recovery) and cytosolic CK (regenerates ATP during contraction). The PCr system sustains maximal effort for 8-12 seconds before depletion. Creatine supplementation increases PCr stores by 20-40%, extending high-intensity capacity. PCr resynthesis requires oxidative metabolism: half-life is 30-60 seconds, explaining why rest intervals of 3-5 minutes optimize repeated sprint performance. The PCr system also buffers H+ ions (consumes H+ during ATP regeneration), delaying acidosis.'
      },
      {
        title: 'Glycolysis: Anaerobic ATP Production',
        content: 'Glycolysis converts glucose/glycogen to pyruvate, producing 2 ATP per glucose (3 ATP from glycogen due to bypassing hexokinase step). Key regulatory enzymes: phosphofructokinase-1 (PFK-1, rate-limiting), activated by AMP/ADP and inhibited by ATP/citrate. During high-intensity exercise, pyruvate production exceeds mitochondrial capacity, causing pyruvate conversion to lactate via lactate dehydrogenase (LDH). This regenerates NAD+, allowing glycolysis to continue. Contrary to popular belief, lactate is not a waste product but a fuel: it\'s oxidized by heart and slow-twitch fibers, and converted to glucose in liver (Cori cycle). The "burn" during intense exercise comes from H+ accumulation (from ATP hydrolysis), not lactate. Buffering systems (bicarbonate, carnosine) neutralize H+, delaying fatigue.'
      },
      {
        title: 'Krebs Cycle: Central Metabolic Hub',
        content: 'The Krebs cycle (citric acid cycle) occurs in mitochondrial matrix, oxidizing acetyl-CoA to CO2 while generating NADH, FADH2, and GTP. Acetyl-CoA enters from pyruvate (glycolysis), fatty acids (β-oxidation), or amino acids. Key regulatory points: citrate synthase (inhibited by ATP/NADH), isocitrate dehydrogenase (activated by ADP/Ca2+), and α-ketoglutarate dehydrogenase (inhibited by succinyl-CoA). Ca2+ released during muscle contraction activates Krebs cycle enzymes, matching ATP production to demand. The cycle generates 3 NADH, 1 FADH2, and 1 GTP per acetyl-CoA. These electron carriers feed the electron transport chain, where most ATP is produced. Anaplerotic reactions (e.g., pyruvate carboxylase) replenish cycle intermediates, preventing depletion during prolonged exercise.'
      },
      {
        title: 'Electron Transport Chain & Oxidative Phosphorylation',
        content: 'The electron transport chain (ETC) consists of 4 complexes in the inner mitochondrial membrane. NADH donates electrons to Complex I, FADH2 to Complex II. Electrons flow through Complexes III and IV, ultimately reducing O2 to H2O. This electron flow pumps H+ from matrix to intermembrane space, creating electrochemical gradient (proton motive force). ATP synthase (Complex V) uses this gradient to phosphorylate ADP to ATP (chemiosmosis). Each NADH yields ~2.5 ATP, each FADH2 yields ~1.5 ATP. Total ATP from glucose: 30-32 ATP (vs. 2 from glycolysis alone). Uncoupling proteins (UCPs) allow H+ to leak back without ATP synthesis, generating heat (thermogenesis). This explains why some individuals have higher metabolic rates. Cyanide inhibits Complex IV, halting ATP production and causing rapid death—demonstrating ETC\'s essential role.'
      },
      {
        title: 'Fat Oxidation: β-Oxidation Pathway',
        content: 'Fatty acids are activated to acyl-CoA and transported into mitochondria via carnitine shuttle (rate-limiting step: CPT-1). β-oxidation removes 2-carbon units as acetyl-CoA, generating NADH and FADH2 per cycle. A 16-carbon palmitate yields 8 acetyl-CoA, 7 NADH, and 7 FADH2, producing 106 ATP (vs. 30-32 from glucose). However, fat oxidation is slower than carbohydrate oxidation due to: (1) slower mobilization from adipose, (2) transport limitations (albumin binding, membrane diffusion), (3) mitochondrial entry (carnitine shuttle), and (4) oxygen requirement (fat oxidation requires more O2 per ATP). This explains why fat oxidation dominates at low intensities (<65% VO2max) but cannot sustain high intensities. Training increases mitochondrial density and CPT-1 activity, enhancing fat oxidation capacity.'
      },
      {
        title: 'Biochemistry of Fatigue',
        content: 'Fatigue is multifactorial, involving peripheral (muscle) and central (neural) mechanisms. Peripheral fatigue: (1) PCr depletion reduces ATP resynthesis rate, (2) H+ accumulation inhibits PFK-1 and cross-bridge cycling, (3) Pi (inorganic phosphate from ATP hydrolysis) impairs Ca2+ release from sarcoplasmic reticulum, (4) glycogen depletion limits glycolysis. Central fatigue: (1) serotonin accumulation in brain increases perceived effort, (2) ammonia from AMP deamination crosses blood-brain barrier, causing fatigue, (3) branched-chain amino acid (BCAA) depletion increases tryptophan uptake (serotonin precursor). Caffeine blocks adenosine receptors (reducing perceived effort), while BCAAs compete with tryptophan for brain uptake (reducing serotonin). Understanding fatigue biochemistry guides interventions: creatine (PCr), beta-alanine (buffering), caffeine (adenosine), and carbohydrate (glycogen sparing).'
      }
    ],
    keyFacts: [
      'PCr resynthesis half-life: 30-60 seconds (requires oxidative metabolism)',
      'Glycolysis produces 2 ATP/glucose, 3 ATP/glycogen',
      'Krebs cycle generates 3 NADH + 1 FADH2 + 1 GTP per acetyl-CoA',
      'Complete glucose oxidation yields 30-32 ATP',
      'Palmitate (16-carbon fat) yields 106 ATP',
      'Fat oxidation requires more O2 per ATP than carbohydrate',
      'H+ accumulation (not lactate) causes the "burn" during intense exercise',
      'Central fatigue involves serotonin accumulation and ammonia production'
    ],
    fitnessRelevance: 'Understanding exercise biochemistry optimizes training and supplementation: creatine extends PCr system capacity, beta-alanine buffers H+ to delay glycolytic fatigue, carbohydrate ingestion spares glycogen during endurance events, and caffeine reduces central fatigue. Training adaptations (increased mitochondria, enzymes, capillaries) enhance oxidative capacity, allowing higher intensities before fatigue.',
    relatedTopics: [
      { id: 'energy-systems', title: 'Energy Systems & ATP', category: 'Exercise Physiology' },
      { id: 'lactate-threshold', title: 'Lactate Threshold & Anaerobic Capacity', category: 'Exercise Physiology' },
      { id: 'creatine', title: 'Creatine: The Gold Standard', category: 'Supplements' },
      { id: 'advanced-supplements', title: 'Advanced Supplementation Science', category: 'Supplements' }
    ],
    quizQuestions: [
      {
        question: 'A sprinter performs 6x100m sprints with 30-second rest. Performance declines after the 3rd sprint. What is the primary biochemical limitation?',
        options: ['Glycogen depletion', 'Incomplete PCr resynthesis', 'Lactic acid accumulation', 'Dehydration'],
        correct: 1,
        explanation: 'PCr resynthesis requires oxidative metabolism with a half-life of 30-60 seconds. With only 30-second rest, PCr stores are not fully replenished, reducing ATP resynthesis rate for subsequent sprints. Optimal rest for repeated sprints is 3-5 minutes to allow complete PCr recovery.'
      },
      {
        question: 'During a 400m sprint, an athlete experiences severe muscle burn. What is the primary cause of this sensation?',
        options: ['Lactate accumulation', 'H+ accumulation from ATP hydrolysis', 'Ammonia production', 'Reactive oxygen species'],
        correct: 1,
        explanation: 'The "burn" during intense exercise is caused by H+ accumulation from ATP hydrolysis (ATP → ADP + Pi + H+), not lactate. Lactate production actually consumes H+ (pyruvate + NADH + H+ → lactate + NAD+), partially buffering acidosis. The H+ ions inhibit glycolytic enzymes and impair cross-bridge cycling, contributing to fatigue.'
      },
      {
        question: 'A marathon runner "hits the wall" at mile 20. What biochemical event primarily explains this?',
        options: ['Lactic acid buildup', 'Glycogen depletion forcing reliance on slower fat oxidation', 'Dehydration', 'Electrolyte imbalance'],
        correct: 1,
        explanation: 'Glycogen stores (~2000 kcal) are depleted after ~20 miles of marathon running. The body must then rely primarily on fat oxidation, which produces ATP more slowly and requires more oxygen. This forces a reduction in pace ("hitting the wall"). Carbohydrate loading and in-race fueling delay glycogen depletion.'
      },
      {
        question: 'Why does fat oxidation dominate at low exercise intensities but cannot sustain high intensities?',
        options: ['Fat stores are limited', 'Fat oxidation is too slow and requires more oxygen per ATP', 'Fat cannot enter muscle cells', 'Fat oxidation produces lactic acid'],
        correct: 1,
        explanation: 'Fat oxidation is slower than carbohydrate oxidation due to: mobilization from adipose, transport limitations, mitochondrial entry (carnitine shuttle), and higher oxygen requirement per ATP produced. At high intensities, ATP demand exceeds fat oxidation capacity, forcing reliance on faster carbohydrate metabolism.'
      },
      {
        question: 'Cyanide poisoning causes rapid death by inhibiting which component of energy production?',
        options: ['Glycolysis', 'Krebs cycle', 'Complex IV of electron transport chain', 'ATP synthase'],
        correct: 2,
        explanation: 'Cyanide binds to cytochrome c oxidase (Complex IV), blocking electron transfer to oxygen. This halts the electron transport chain, preventing ATP production via oxidative phosphorylation. Cells can only produce 2 ATP via glycolysis, insufficient to sustain vital functions, causing rapid death.'
      }
    ],
  },
  {
    id: 'cardiopulmonary-physiology',
    title: 'Cardiopulmonary Physiology: Gas Exchange & Transport',
    category: 'Cardiovascular',
    system: 'Cardiorespiratory',
    level: 'expert',
    emoji: '❤️',
    icon: 'heart',
    color: '#F44336',
    summary: 'Master the integrated cardiopulmonary system governing oxygen delivery. Explore respiratory mechanics, gas exchange, cardiac output regulation, and the Fick equation. Understand how training optimizes oxygen transport from atmosphere to mitochondria.',
    description: 'The cardiopulmonary system delivers oxygen from atmosphere to mitochondria through integrated respiratory and cardiovascular function. This expert path examines ventilation, diffusion, transport, and utilization, revealing the physiological limits and training adaptations that determine aerobic performance.',
    sections: [
      {
        title: 'Respiratory Mechanics & Ventilation',
        content: 'Ventilation (VE) = tidal volume (VT) × breathing frequency (f). At rest: VE = 0.5L × 12 = 6 L/min. During maximal exercise: VE = 3L × 40 = 120 L/min. Inspiration is active (diaphragm, external intercostals), expiration is passive at rest but active during exercise (internal intercostals, abdominals). Lung volumes: tidal volume (0.5L), inspiratory reserve (3L), expiratory reserve (1.2L), residual volume (1.2L). Vital capacity = 4.7L. Dead space (150ml) is air that doesn\'t participate in gas exchange (conducting airways). Alveolar ventilation = (VT - dead space) × f. During exercise, VT increases before f, optimizing alveolar ventilation. At high intensities, rapid shallow breathing increases dead space ventilation, reducing efficiency.'
      },
      {
        title: 'Gas Exchange: Fick\'s Law of Diffusion',
        content: 'Gas exchange occurs via diffusion across the alveolar-capillary membrane according to Fick\'s Law: Vgas = (A × D × ΔP) / T, where A = surface area (70m²), D = diffusion coefficient, ΔP = partial pressure gradient, T = membrane thickness. O2 diffuses from alveoli (PO2 = 100 mmHg) to pulmonary capillaries (PO2 = 40 mmHg). CO2 diffuses opposite direction (PCO2 = 46 → 40 mmHg). CO2 diffuses 20x faster than O2 due to higher solubility, explaining why CO2 exchange is rarely limiting. Diffusion capacity increases during exercise as more capillaries open (recruitment) and blood flow increases. At altitude, reduced atmospheric PO2 decreases ΔP, impairing O2 diffusion and causing hypoxemia. Pulmonary edema increases T (thickness), also impairing diffusion.'
      },
      {
        title: 'Oxygen Transport: Hemoglobin & Dissociation Curves',
        content: 'O2 is transported primarily bound to hemoglobin (98.5%), with 1.5% dissolved in plasma. Each hemoglobin molecule carries 4 O2 molecules. O2 content = (1.34 × Hb × SaO2) + (0.003 × PO2). Normal: (1.34 × 15 g/dL × 0.98) + (0.003 × 100) = 20 mL O2/dL blood. The O2-hemoglobin dissociation curve is sigmoidal due to cooperative binding: binding of first O2 increases affinity for subsequent O2. At PO2 = 100 mmHg (lungs), saturation = 98%. At PO2 = 40 mmHg (tissues), saturation = 75%, meaning 25% of O2 is unloaded. Right shift (decreased affinity, enhanced unloading) occurs with: increased temperature, CO2, H+, and 2,3-DPG (Bohr effect). This is adaptive: exercising muscles are hot, acidic, and produce CO2, promoting O2 release. Left shift (increased affinity) occurs in lungs, promoting O2 loading.'
      },
      {
        title: 'Cardiac Output & Distribution',
        content: 'Cardiac output (Q) = heart rate (HR) × stroke volume (SV). Rest: Q = 70 bpm × 70 mL = 5 L/min. Max exercise: Q = 190 bpm × 120 mL = 22.8 L/min (elite athletes: 35-40 L/min). SV increases with exercise intensity up to 40-50% VO2max, then plateaus. Further Q increases come from HR. The Frank-Starling mechanism: increased venous return stretches ventricles, increasing contractility and SV. During exercise, sympathetic activation increases HR and contractility, while parasympathetic withdrawal allows HR to rise. Blood flow distribution changes dramatically: at rest, muscles receive 15-20% of Q; during exercise, 80-85%. This occurs via sympathetic vasoconstriction in splanchnic/renal beds and local vasodilation in active muscles (metabolic autoregulation: adenosine, K+, H+, NO).'
      },
      {
        title: 'Fick Equation & VO2 Determinants',
        content: 'VO2 = Q × (a-vO2 difference), where Q = cardiac output and a-vO2 difference = arterial O2 content - venous O2 content. This equation reveals that VO2 is limited by O2 delivery (Q × CaO2) or O2 extraction (a-vO2 difference). In healthy individuals, VO2max is primarily limited by cardiac output (central limitation), not extraction. Evidence: increasing O2 content (blood doping) increases VO2max, but only if cardiac output is adequate. Elite endurance athletes have massive SV (120-140 mL vs. 70 mL untrained), enabling Q of 35-40 L/min. Their a-vO2 difference is also enhanced (15-17 mL/dL vs. 12-14 mL/dL) due to increased capillary density and mitochondrial volume. Training increases both central (cardiac output) and peripheral (extraction) factors, but cardiac output shows greater plasticity.'
      },
      {
        title: 'Ventilatory Thresholds & Exercise Prescription',
        content: 'Ventilatory threshold 1 (VT1, ~50-60% VO2max): ventilation increases disproportionately to CO2 production, reflecting lactate buffering (H+ + HCO3- → H2CO3 → CO2 + H2O). VT1 approximates lactate threshold 1 (LT1). Ventilatory threshold 2 (VT2, ~80-90% VO2max): ventilation increases disproportionately to O2 consumption, reflecting metabolic acidosis driving hyperventilation. VT2 approximates lactate threshold 2 (MLSS). These thresholds guide training zones: Zone 1 (<VT1): easy/recovery, Zone 2 (VT1-VT2): tempo/threshold, Zone 3 (>VT2): intervals/VO2max. The talk test estimates VT1: if you can speak comfortably, you\'re below VT1. VT2 corresponds to "comfortably hard" effort where speaking is difficult. Training at/around these thresholds improves lactate clearance and buffering capacity.'
      }
    ],
    keyFacts: [
      'Maximal ventilation: 120 L/min (vs. 6 L/min at rest)',
      'Alveolar surface area: 70 m² (tennis court)',
      'CO2 diffuses 20x faster than O2',
      'Hemoglobin carries 98.5% of O2 (1.5% dissolved)',
      'O2 content = 20 mL O2/dL blood (normal)',
      'Elite athlete cardiac output: 35-40 L/min (vs. 20-25 L/min untrained)',
      'Bohr effect: acidosis/heat/CO2 shift O2 dissociation curve right, enhancing unloading',
      'VO2max primarily limited by cardiac output, not extraction'
    ],
    fitnessRelevance: 'Understanding cardiopulmonary physiology optimizes aerobic training: training at ventilatory thresholds improves lactate clearance, increasing time to exhaustion. Altitude training increases hemoglobin, enhancing O2 carrying capacity. Blood doping exploits the same principle (illegally). Recognizing that VO2max is primarily cardiac-limited explains why endurance training focuses on increasing stroke volume through volume accumulation (Zone 2 training).',
    relatedTopics: [
      { id: 'vo2max', title: 'VO2 Max & Aerobic Capacity', category: 'Exercise Physiology' },
      { id: 'lactate-threshold', title: 'Lactate Threshold & Anaerobic Capacity', category: 'Exercise Physiology' },
      { id: 'heart', title: 'The Heart: Your Engine', category: 'Cardiovascular' },
      { id: 'cardiovascular', title: 'Blood & Circulatory System', category: 'Cardiovascular' }
    ],
    quizQuestions: [
      {
        question: 'An elite cyclist has VO2max of 75 mL/kg/min and cardiac output of 35 L/min. What primarily limits further VO2max improvement?',
        options: ['Mitochondrial density', 'Cardiac output', 'Hemoglobin concentration', 'Capillary density'],
        correct: 1,
        explanation: 'In healthy individuals, VO2max is primarily limited by cardiac output (O2 delivery), not extraction or utilization. Elite athletes already have near-maximal extraction (a-vO2 difference ~17 mL/dL). Further VO2max increases require increased cardiac output, which is limited by maximal stroke volume and heart rate.'
      },
      {
        question: 'During intense exercise, a runner\'s muscle PO2 drops to 20 mmHg. According to the O2-hemoglobin dissociation curve, what percentage of O2 is unloaded?',
        options: ['25%', '50%', '75%', '90%'],
        correct: 2,
        explanation: 'At PO2 = 40 mmHg (resting tissue), hemoglobin saturation is 75% (25% unloaded). At PO2 = 20 mmHg (exercising muscle), saturation drops to ~35%, meaning 65% of O2 is unloaded. The right shift from heat, acidosis, and CO2 (Bohr effect) further enhances unloading, potentially reaching 75-80% extraction.'
      },
      {
        question: 'A coach uses the "talk test" to prescribe training intensity. If an athlete can speak comfortably but not sing, they are likely:',
        options: ['Below VT1 (Zone 1)', 'Between VT1 and VT2 (Zone 2)', 'Above VT2 (Zone 3)', 'At VO2max'],
        correct: 1,
        explanation: 'The talk test estimates ventilatory threshold 1 (VT1). Comfortable conversation indicates below VT1 (Zone 1, easy). Able to speak but not sing indicates VT1-VT2 (Zone 2, tempo/threshold). Difficulty speaking indicates above VT2 (Zone 3, hard intervals). This simple test approximates lactate thresholds without blood sampling.'
      },
      {
        question: 'At altitude (3000m), an athlete\'s arterial PO2 drops to 60 mmHg. What is the primary consequence?',
        options: ['Increased ventilation', 'Reduced hemoglobin saturation and O2 content', 'Increased cardiac output', 'Enhanced O2 extraction'],
        correct: 1,
        explanation: 'At PO2 = 60 mmHg, hemoglobin saturation drops to ~90% (vs. 98% at sea level), reducing O2 content from 20 to 18 mL O2/dL. This decreases O2 delivery, impairing aerobic performance. The body compensates with increased ventilation and eventual increased hemoglobin production (altitude acclimatization), but performance remains reduced.'
      },
      {
        question: 'During a marathon, a runner\'s ventilation increases disproportionately to CO2 production at mile 15. This indicates:',
        options: ['Ventilatory threshold 1 (VT1)', 'Ventilatory threshold 2 (VT2)', 'Respiratory compensation point', 'Maximal ventilation'],
        correct: 0,
        explanation: 'VT1 occurs when ventilation increases disproportionately to CO2 production, reflecting lactate buffering (H+ + HCO3- → CO2). This extra CO2 drives ventilation. VT1 approximates lactate threshold 1 and typically occurs at 50-60% VO2max. Recognizing this threshold helps prescribe training zones and predict endurance performance.'
      }
    ],
  },
  {
    id: 'musculoskeletal-biomechanics',
    title: 'Musculoskeletal Biomechanics: Force Production & Joint Mechanics',
    category: 'Biomechanics',
    system: 'Musculoskeletal',
    level: 'expert',
    emoji: '⚙️',
    icon: 'settings',
    color: '#795548',
    summary: 'Analyze the mechanical principles governing human movement. Explore force-length-velocity relationships, joint kinetics, ground reaction forces, and the biomechanics of injury. Apply physics to optimize performance and prevent injury.',
    description: 'Biomechanics applies mechanical principles to biological systems. This expert path examines muscle mechanics, joint kinetics, ground reaction forces, and injury mechanisms, revealing how physics governs human movement and how training optimizes mechanical efficiency.',
    sections: [
      {
        title: 'Force-Length Relationship: Optimal Sarcomere Length',
        content: 'Muscle force depends on sarcomere length due to actin-myosin overlap. At optimal length (2.0-2.2 μm), maximal cross-bridge formation occurs, producing peak force. At short lengths (<1.5 μm), actin filaments overlap, interfering with cross-bridge formation. At long lengths (>3.0 μm), overlap decreases, reducing cross-bridge number. The ascending limb (short lengths) shows steep force increase with length; the descending limb (long lengths) shows gradual force decrease. Passive tension from titin and connective tissue increases exponentially at long lengths, contributing to total force. This explains why exercises are hardest at specific joint angles: the bicep curl is hardest at 90° elbow flexion (optimal bicep length). Training at long muscle lengths (stretch-mediated hypertrophy) may be superior because mechanical tension is highest when sarcomeres are stretched.'
      },
      {
        title: 'Force-Velocity Relationship: Concentric vs. Eccentric',
        content: 'Concentric force decreases with increasing velocity: at Vmax (maximal shortening velocity), force = 0. This occurs because cross-bridge cycling rate limits force production at high speeds. Eccentric force increases with velocity (up to a point): muscles can produce 1.3-1.5x more force eccentrically than isometrically. This occurs because cross-bridges are forcibly stretched, and titin (elastic protein) contributes passive force. The force-velocity relationship explains why: (1) you can lower more weight than you can lift, (2) eccentric training produces greater muscle damage (higher forces), (3) power = force × velocity, so maximal power occurs at intermediate loads (~30-50% 1RM). Hill\'s equation models this relationship: (F + a)(V + b) = (F0 + a)b, where F0 = isometric force, a and b are constants.'
      },
      {
        title: 'Joint Kinetics: Moments, Powers, and Work',
        content: 'Joint moment (torque) = force × moment arm. During a squat, the knee extensor moment must counteract the external moment from ground reaction force. Joint power = moment × angular velocity. Positive power (concentric) generates energy; negative power (eccentric) absorbs energy. During walking, the ankle generates positive power during push-off (concentric plantarflexion), while the knee absorbs energy during landing (eccentric extension). Joint work = power × time. The stretch-shortening cycle (SSC) exploits elastic energy: eccentric loading stores energy in tendons, which is released during subsequent concentric action, enhancing force and efficiency. This explains why countermovement jumps are higher than squat jumps: the eccentric phase pre-stretches muscles and tendons, enhancing concentric performance.'
      },
      {
        title: 'Ground Reaction Forces & Injury Mechanics',
        content: 'Newton\'s 3rd law: every action has equal/opposite reaction. Ground reaction force (GRF) is the force exerted by ground on body. During running, vertical GRF peaks at 2-3x body weight. The loading rate (how quickly force is applied) is more important than peak force for injury: high loading rates increase stress fracture risk. Rearfoot strikers show impact transients (sharp initial peak), while forefoot strikers have smoother force curves. This explains why forefoot striking may reduce injury risk. ACL injuries occur during deceleration/cutting when knee is near full extension and valgus. The mechanism: quadriceps pull tibia anteriorly (anterior shear), while hamstrings pull posteriorly (protective). Quadriceps dominance (high quad:hamstring ratio) increases ACL risk. Neuromuscular training (plyometrics, landing mechanics) reduces ACL injury by 50-70%.'
      },
      {
        title: 'Tendon Mechanics & Elastic Energy Storage',
        content: 'Tendons behave as nonlinear springs: initial "toe region" (crimp straightening) is compliant, followed by linear region (collagen stretching) with high stiffness. Tendon stiffness affects force transmission: stiff tendons transmit force rapidly (beneficial for explosive movements), while compliant tendons absorb energy (beneficial for shock absorption). The Achilles tendon stores 35-40 J of elastic energy during running, reducing metabolic cost by 50%. Tendon stiffness increases with heavy resistance training (increased collagen cross-linking) and decreases with immobilization. This explains why plyometric training improves running economy: stiffer tendons store/release energy more efficiently. However, excessive stiffness increases injury risk (tendon rupture), while excessive compliance reduces force transmission. Optimal stiffness is task-specific.'
      },
      {
        title: 'Biomechanics of Resistance Training',
        content: 'Exercise selection should consider: (1) moment arm changes through ROM (exercises are hardest where moment arm is longest), (2) strength curve matching (accommodating resistance like bands/chains match ascending strength curves), (3) stability requirements (free weights > machines for stabilizer activation), (4) bilateral deficit (sum of single-leg forces > bilateral force, suggesting neural inhibition during bilateral exercises). The sticking point in lifts occurs where mechanical disadvantage is greatest: in bench press, this is 5-10 cm off chest (longest moment arm); in squat, it\'s just above parallel (quadriceps at mechanical disadvantage). Understanding these principles allows exercise modification: board presses train the sticking point, pause squats eliminate stretch reflex, and deficit deadlifts increase ROM at the weakest point.'
      }
    ],
    keyFacts: [
      'Optimal sarcomere length: 2.0-2.2 μm (maximal cross-bridge overlap)',
      'Eccentric force: 1.3-1.5x isometric force',
      'Maximal power occurs at 30-50% 1RM (intermediate load/velocity)',
      'Running GRF: 2-3x body weight',
      'Achilles tendon stores 35-40 J elastic energy during running',
      'ACL injury risk reduced 50-70% with neuromuscular training',
      'Bilateral deficit: single-leg sum > bilateral force',
      'Sticking point occurs where moment arm is longest (mechanical disadvantage)'
    ],
    fitnessRelevance: 'Biomechanics optimizes exercise selection and technique: training at long muscle lengths (stretch-mediated hypertrophy), using accommodating resistance to match strength curves, and understanding injury mechanisms to prevent them. Recognizing that eccentric force exceeds concentric explains the value of eccentric overload training. Ground reaction force analysis guides running form modifications to reduce injury risk.',
    relatedTopics: [
      { id: 'biomechanics', title: 'Biomechanics & Leverage Systems', category: 'Biomechanics' },
      { id: 'tendon-biology', title: 'Tendon Biology & Adaptation', category: 'Biomechanics' },
      { id: 'hypertrophy', title: 'Muscle Hypertrophy Mechanisms', category: 'Muscular System' },
      { id: 'advanced-neuroanatomy', title: 'Advanced Neuroanatomy', category: 'Nervous System' }
    ],
    quizQuestions: [
      {
        question: 'A powerlifter uses bands on their squat. What biomechanical principle does this exploit?',
        options: ['Force-velocity relationship', 'Accommodating resistance to match ascending strength curve', 'Stretch-shortening cycle', 'Bilateral facilitation'],
        correct: 1,
        explanation: 'Bands provide accommodating resistance: resistance increases as the lifter ascends (bands stretch), matching the ascending strength curve (mechanical advantage increases with knee extension). This overloads the top portion of the lift where the lifter is strongest, maximizing tension throughout the ROM.'
      },
      {
        question: 'An athlete can lower 150 kg eccentrically but can only lift 120 kg concentrically. What explains this difference?',
        options: ['Greater motor unit recruitment eccentrically', 'Cross-bridges are forcibly stretched eccentrically, producing higher force', 'Eccentric contractions use more ATP', 'Eccentric contractions are faster'],
        correct: 1,
        explanation: 'During eccentric contractions, cross-bridges are forcibly stretched while attached, producing higher force (1.3-1.5x isometric). Additionally, titin (elastic protein) contributes passive force when stretched. This allows muscles to absorb more energy eccentrically than they can generate concentrically.'
      },
      {
        question: 'A runner switches from rearfoot to forefoot striking. What biomechanical change occurs?',
        options: ['Increased peak GRF', 'Reduced loading rate and impact transient', 'Increased knee extension moment', 'Reduced ankle plantarflexor demand'],
        correct: 1,
        explanation: 'Forefoot striking eliminates the impact transient (sharp initial GRF peak) and reduces loading rate by using ankle plantarflexors to absorb impact eccentrically. This may reduce stress fracture risk. However, it increases Achilles tendon and calf demand, potentially increasing injury risk in those structures.'
      },
      {
        question: 'A countermovement jump is 10% higher than a squat jump. What explains this?',
        options: ['Greater muscle activation', 'Stretch-shortening cycle storing elastic energy', 'Reduced gravity during countermovement', 'Increased motor unit recruitment'],
        correct: 1,
        explanation: 'The countermovement (eccentric phase) pre-stretches muscles and tendons, storing elastic energy that is released during the concentric phase. This stretch-shortening cycle enhances force production and jump height. The eccentric phase also triggers stretch reflex, increasing motor unit recruitment.'
      },
      {
        question: 'An athlete\'s single-leg press is 80 kg each leg, but bilateral press is only 140 kg (not 160 kg). This demonstrates:',
        options: ['Bilateral facilitation', 'Bilateral deficit', 'Muscle fatigue', 'Poor technique'],
        correct: 1,
        explanation: 'Bilateral deficit occurs when the sum of single-leg forces exceeds bilateral force. This is attributed to neural inhibition during bilateral exercises (reduced motor unit recruitment) and/or postural stability limitations. Bilateral deficit is common in untrained individuals but decreases with training, suggesting neural adaptation.'
      }
    ],
  },
  {
    id: 'cellular-molecular-biology',
    title: 'Cellular & Molecular Biology: Signal Transduction & Gene Expression',
    category: 'Fundamentals',
    system: 'Cellular',
    level: 'expert',
    emoji: '🔬',
    icon: 'microscope',
    color: '#00BCD4',
    summary: 'Explore the molecular mechanisms governing cellular adaptation. Master signal transduction pathways, gene expression regulation, protein synthesis, and the molecular basis of hypertrophy. Understand how mechanical and metabolic signals are transduced into cellular responses.',
    description: 'Cellular and molecular biology examines the intracellular mechanisms by which exercise triggers adaptation. This expert path explores signal transduction cascades, transcriptional regulation, translational control, and the molecular basis of muscle growth, fat loss, and metabolic adaptation.',
    sections: [
      {
        title: 'Mechanotransduction: Converting Force to Signals',
        content: 'Mechanical tension is transduced into biochemical signals via mechanosensors: integrins (connect extracellular matrix to cytoskeleton), focal adhesion kinase (FAK), and stretch-activated ion channels. When muscle fibers are stretched or contracted, these sensors activate signaling cascades. Integrins cluster at focal adhesions, recruiting FAK, which autophosphorylates and activates downstream pathways (MAPK, PI3K/Akt). The costamere (protein complex linking sarcomeres to cell membrane) transmits force laterally, distributing mechanical stress. Disruption of costameres (as in muscular dystrophy) impairs mechanotransduction, causing muscle wasting. Titin, the giant elastic protein, also acts as a mechanosensor: its kinase domain activates when stretched, triggering hypertrophic signaling.'
      },
      {
        title: 'mTOR Signaling: Master Regulator of Protein Synthesis',
        content: 'mTOR (mechanistic target of rapamycin) exists in two complexes: mTORC1 (rapamycin-sensitive, promotes protein synthesis) and mTORC2 (rapamycin-insensitive, regulates cytoskeleton). mTORC1 is activated by: (1) growth factors (insulin/IGF-1 → PI3K/Akt → mTORC1), (2) amino acids (leucine → Rag GTPases → mTORC1 lysosomal translocation), (3) mechanical tension (integrins/FAK → mTORC1), and (4) energy status (AMPK inhibits mTORC1 when ATP is low). Once activated, mTORC1 phosphorylates p70S6K (enhances translation) and 4E-BP1 (releases eIF4E to initiate translation). Rapamycin inhibits mTORC1, suppressing protein synthesis—demonstrating mTOR\'s essential role. However, chronic mTOR activation causes feedback inhibition (S6K inhibits IRS-1), explaining why constant feeding doesn\'t maximize growth. Pulsatile activation (via meals and training) is optimal.'
      },
      {
        title: 'Transcriptional Regulation: Turning Genes On/Off',
        content: 'Exercise activates transcription factors that regulate gene expression. PGC-1α (peroxisome proliferator-activated receptor gamma coactivator 1-alpha) is the master regulator of mitochondrial biogenesis. It\'s activated by AMPK (energy stress) and p38 MAPK (mechanical stress), then translocates to nucleus to coactivate NRF-1/2 and ERRα, increasing mitochondrial gene expression. NF-κB (nuclear factor kappa-light-chain-enhancer of activated B cells) is activated by inflammatory cytokines and ROS, promoting catabolic gene expression (ubiquitin ligases, myostatin). The balance between PGC-1α (anabolic) and NF-κB (catabolic) determines net adaptation. Chronic inflammation (obesity, overtraining) shifts balance toward NF-κB, impairing adaptation. MyoD and myogenin are muscle-specific transcription factors that activate satellite cell differentiation and muscle gene expression during regeneration.'
      },
      {
        title: 'Translational Control: Ribosome Biogenesis & Efficiency',
        content: 'Protein synthesis requires not just mRNA but also ribosomes (translation machinery). Ribosome biogenesis is rate-limiting for protein synthesis and is regulated by mTORC1 (promotes rRNA transcription) and c-Myc (transcription factor). Resistance training increases ribosome number within 24-48 hours, enhancing translational capacity. This explains why repeated training sessions produce cumulative hypertrophy: each session increases ribosome number, amplifying subsequent protein synthesis responses. Translation initiation is regulated by eIF2α (phosphorylation inhibits initiation) and eIF4E (bound by 4E-BP1 until mTORC1 phosphorylates 4E-BP1). Elongation is regulated by eEF2 (phosphorylation by eEF2K inhibits elongation; AMPK activates eEF2K during energy stress, slowing translation to conserve ATP). This explains why training in energy deficit impairs hypertrophy.'
      },
      {
        title: 'Ubiquitin-Proteasome System: Protein Breakdown',
        content: 'Muscle protein breakdown (MPB) occurs primarily via the ubiquitin-proteasome system (UPS). E3 ubiquitin ligases (MuRF1, MAFbx/atrogin-1) tag proteins with ubiquitin, targeting them for degradation by the 26S proteasome. These ligases are upregulated by: (1) glucocorticoids (cortisol), (2) inflammatory cytokines (TNF-α, IL-6), (3) FoxO transcription factors (activated when Akt is inactive), and (4) myostatin. Insulin and IGF-1 suppress MPB by activating Akt, which phosphorylates and inhibits FoxO. This explains why protein feeding (stimulating insulin) reduces MPB. The net protein balance = MPS - MPB. Resistance training increases both MPS and MPB, but MPS exceeds MPB, resulting in net gain. However, in catabolic states (fasting, immobilization, disease), MPB exceeds MPS, causing atrophy.'
      },
      {
        title: 'Epigenetic Regulation: Beyond DNA Sequence',
        content: 'Epigenetic modifications alter gene expression without changing DNA sequence. DNA methylation (adding methyl groups to cytosine) typically silences genes. Exercise demethylates promoters of metabolic genes (PGC-1α, PDK4), increasing expression. Histone modifications (acetylation, methylation) alter chromatin accessibility: acetylation opens chromatin (active genes), while deacetylation closes it (silenced genes). HDACs (histone deacetylases) remove acetyl groups, silencing genes. Exercise inhibits HDACs, promoting gene expression. MicroRNAs (miRNAs) are small non-coding RNAs that bind mRNA and inhibit translation. miR-1 and miR-133 are muscle-specific miRNAs that regulate hypertrophy: miR-1 suppresses IGF-1, while miR-133 promotes differentiation. Exercise alters miRNA expression, contributing to adaptation. These epigenetic mechanisms explain why training history affects future responses (muscle memory) and why adaptations persist after detraining.'
      }
    ],
    keyFacts: [
      'mTORC1 integrates growth factors, amino acids, mechanical tension, and energy status',
      'PGC-1α is the master regulator of mitochondrial biogenesis',
      'Ribosome biogenesis increases within 24-48 hours of training',
      'MuRF1 and MAFbx are the primary E3 ubiquitin ligases in muscle atrophy',
      'FoxO transcription factors activate catabolic genes when Akt is inactive',
      'Exercise demethylates promoters of metabolic genes, increasing expression',
      'miR-1 suppresses IGF-1, while miR-133 promotes muscle differentiation',
      'Chronic inflammation shifts balance from PGC-1α (anabolic) to NF-κB (catabolic)'
    ],
    fitnessRelevance: 'Understanding molecular biology reveals why training and nutrition work: mechanical tension activates mTORC1 to stimulate protein synthesis, amino acids (especially leucine) amplify this signal, and insulin suppresses protein breakdown. Recognizing that ribosome biogenesis is rate-limiting explains why consistent training produces cumulative gains. Epigenetic mechanisms explain muscle memory and why previous training benefits persist after detraining.',
    relatedTopics: [
      { id: 'hypertrophy', title: 'Muscle Hypertrophy Mechanisms', category: 'Muscular System' },
      { id: 'epigenetics-training', title: 'Epigenetics: How Training Changes Your Genes', category: 'Fundamentals' },
      { id: 'endocrine-regulation', title: 'Endocrine Regulation & Hormonal Signaling', category: 'Endocrinology' },
      { id: 'cells-intro', title: 'Cells: The Building Blocks', category: 'Fundamentals' }
    ],
    quizQuestions: [
      {
        question: 'A bodybuilder takes 5g leucine with their post-workout meal. How does leucine activate mTORC1?',
        options: ['Binds directly to mTORC1', 'Activates Rag GTPases, promoting mTORC1 lysosomal translocation', 'Increases insulin secretion', 'Inhibits AMPK'],
        correct: 1,
        explanation: 'Leucine is sensed by intracellular amino acid sensors (SLC38A9, Sestrin2), which activate Rag GTPases. Rag GTPases then recruit mTORC1 to the lysosomal surface, where it\'s activated by Rheb (a small GTPase activated by growth factors). This dual activation (amino acids + growth factors) maximally stimulates mTORC1 and protein synthesis.'
      },
      {
        question: 'An athlete trains in a caloric deficit and notices impaired muscle growth. What molecular mechanism explains this?',
        options: ['Reduced testosterone', 'AMPK activation inhibiting mTORC1 and activating eEF2K', 'Increased cortisol', 'Reduced ribosome number'],
        correct: 1,
        explanation: 'Energy deficit activates AMPK (cellular energy sensor), which inhibits mTORC1 (reducing protein synthesis) and activates eEF2K (phosphorylating eEF2, slowing translation elongation). This conserves ATP during energy stress but impairs hypertrophy. This explains why muscle growth is optimized in caloric surplus.'
      },
      {
        question: 'A patient with muscular dystrophy shows progressive muscle wasting. What molecular defect contributes to this?',
        options: ['Reduced mTORC1 activation', 'Disrupted costameres impairing mechanotransduction', 'Excessive myostatin', 'Reduced ribosome biogenesis'],
        correct: 1,
        explanation: 'Muscular dystrophy involves mutations in dystrophin or associated proteins, disrupting the costamere (complex linking sarcomeres to cell membrane). This impairs mechanotransduction (force sensing) and causes membrane fragility, leading to repeated damage and impaired regeneration. The loss of mechanotransduction also reduces anabolic signaling, contributing to wasting.'
      },
      {
        question: 'During immobilization after injury, a patient\'s muscle atrophies. What transcription factor is primarily responsible?',
        options: ['MyoD', 'FoxO', 'PGC-1α', 'NF-κB'],
        correct: 1,
        explanation: 'Immobilization reduces Akt activity (due to lack of mechanical and growth factor signaling), allowing FoxO transcription factors to translocate to the nucleus and activate catabolic genes (MuRF1, MAFbx). These E3 ubiquitin ligases tag muscle proteins for degradation by the proteasome, causing atrophy. Resistance training and protein feeding activate Akt, inhibiting FoxO and preventing atrophy.'
      },
      {
        question: 'An endurance athlete takes resveratrol (a SIRT1 activator). What molecular effect does this have?',
        options: ['Activates mTORC1', 'Inhibits HDACs, promoting gene expression', 'Increases ribosome biogenesis', 'Suppresses myostatin'],
        correct: 1,
        explanation: 'SIRT1 is a NAD+-dependent deacetylase (class III HDAC) that removes acetyl groups from histones and transcription factors. Resveratrol activates SIRT1, which deacetylates PGC-1α (increasing its activity) and FoxO (altering its target gene specificity). This promotes mitochondrial biogenesis and metabolic adaptation, mimicking some effects of endurance training.'
      }
    ],
  },
  {
    id: 'recovery-adaptation-science',
    title: 'Recovery & Adaptation Science: Supercompensation & Periodization Theory',
    category: 'Exercise Physiology',
    system: 'Recovery',
    level: 'expert',
    emoji: '🔄',
    icon: 'refresh',
    color: '#4CAF50',
    summary: 'Master the science of recovery and adaptation. Explore supercompensation theory, fitness-fatigue model, periodization models, and the biology of overtraining. Learn to optimize training stress and recovery to maximize long-term adaptation.',
    description: 'Recovery and adaptation science examines how the body responds to training stress and recovers to achieve supercompensation. This expert path explores theoretical models, biological mechanisms, and practical applications of periodization to optimize long-term performance.',
    sections: [
      {
        title: 'Supercompensation Theory: The Classic Model',
        content: 'Supercompensation theory (Yakovlev, 1950s) proposes that training depletes resources (glycogen, contractile proteins), causing fatigue and performance decline. During recovery, the body not only restores but overshoots baseline (supercompensation), temporarily enhancing performance. The timing of the next session is critical: training during supercompensation produces cumulative gains, training too early (incomplete recovery) causes overtraining, training too late (after supercompensation fades) causes detraining. The supercompensation window varies by system: glycogen (24-48 hours), protein synthesis (24-72 hours), neural recovery (48-72 hours). This model explains why training frequency matters: too frequent prevents recovery, too infrequent misses the supercompensation window. However, the classic model is oversimplified: different systems recover at different rates, and adaptations are not uniform.'
      },
      {
        title: 'Fitness-Fatigue Model: A More Nuanced View',
        content: 'The fitness-fatigue model (Banister, 1975) proposes that training produces both fitness (positive adaptation) and fatigue (negative effect). Performance = baseline + fitness - fatigue. Fitness develops slowly but persists longer; fatigue develops rapidly but dissipates faster. After a training session, fatigue dominates initially (performance decline), but as fatigue dissipates, fitness is revealed (performance increase). This explains why performance often improves after a taper or deload: fatigue dissipates while fitness is maintained. The model uses impulse-response mathematics: each training session produces fitness and fatigue impulses with different time constants. Optimal performance occurs when fitness is high and fatigue is low (after taper). This model guides periodization: accumulate training stress (building fitness despite fatigue), then taper (reducing fatigue to reveal fitness).'
      },
      {
        title: 'General Adaptation Syndrome (GAS): Selye\'s Framework',
        content: 'Hans Selye\'s GAS (1956) describes three stages of stress response: (1) Alarm: initial shock, performance declines due to fatigue and muscle damage. (2) Resistance: body adapts, performance increases above baseline (supercompensation). (3) Exhaustion: if stress continues without adequate recovery, adaptation mechanisms fail, performance declines, and overtraining occurs. GAS applies to all stressors (physical, psychological, environmental) and explains why chronic stress (work, relationships, poor sleep) impairs training adaptation: the body\'s adaptive capacity is finite. The model emphasizes that stress is not inherently bad—controlled stress with adequate recovery produces adaptation. However, uncontrolled or excessive stress leads to exhaustion. This framework underlies periodization: cyclically vary stress to stay in the resistance phase and avoid exhaustion.'
      },
      {
        title: 'Periodization Models: Linear, Undulating, Block',
        content: 'Linear periodization (Matveyev, 1960s): progressive increase in intensity with decrease in volume over macrocycle (typically 1 year). Phases: hypertrophy (high volume, low intensity) → strength (moderate volume, moderate intensity) → power/peaking (low volume, high intensity) → transition (active rest). Undulating periodization (daily/weekly variation): varies load and volume more frequently, preventing stagnation. Example: heavy day (5 reps), moderate day (10 reps), light day (15 reps) within the same week. Block periodization (Verkhoshansky, 1980s): concentrated loading in specific blocks (3-4 weeks) targeting specific adaptations. Blocks: accumulation (volume, work capacity) → transmutation (intensity, sport-specific) → realization (peaking, taper). Each block builds on previous, with residual effects persisting. Block periodization is superior for advanced athletes who need focused stimuli, while linear/undulating work better for beginners/intermediates.'
      },
      {
        title: 'Biology of Overtraining: Mechanisms & Markers',
        content: 'Overtraining syndrome (OTS) involves multiple mechanisms: (1) Autonomic dysfunction: sympathetic overtraining (elevated resting HR, insomnia, irritability) or parasympathetic overtraining (depressed HR, fatigue, apathy). (2) Endocrine disruption: reduced testosterone:cortisol ratio, blunted GH response, altered thyroid function. (3) Immune suppression: reduced NK cell activity, increased URTI incidence. (4) Neurotransmitter imbalance: increased serotonin (fatigue), decreased dopamine (motivation). (5) Metabolic disturbance: glycogen depletion, amino acid imbalances (glutamine, BCAA). Markers of overtraining: persistent performance decline (>2 weeks), elevated resting HR, reduced HRV, mood disturbance (POMS profile), increased CK (muscle damage), elevated cortisol, reduced testosterone. Prevention: periodize training, include deload weeks (every 4-6 weeks), monitor HRV and mood, ensure adequate sleep and nutrition. Treatment: complete rest (2-4 weeks), then gradual return with reduced volume/intensity.'
      },
      {
        title: 'Tapering: Peaking for Performance',
        content: 'Tapering is a planned reduction in training load before competition to optimize performance. Meta-analyses show tapers improve performance by 0.5-6% (significant at elite levels). Optimal taper characteristics: duration 7-21 days (longer for longer events), volume reduction 40-60%, maintain intensity (reduce volume, not load), frequency reduction 20-50%. Exponential decay tapers (rapid initial reduction, then gradual) are superior to linear tapers. Mechanisms: (1) glycogen supercompensation (increased stores), (2) increased muscle power (enhanced neuromuscular function), (3) reduced muscle damage/inflammation, (4) improved psychological readiness. The fitness-fatigue model explains tapering: reducing training load allows fatigue to dissipate while fitness is maintained, revealing peak performance. Common mistake: reducing intensity during taper. Intensity must be maintained to preserve neuromuscular adaptations; only volume and frequency should decrease.'
      }
    ],
    keyFacts: [
      'Supercompensation window: 24-72 hours (varies by system)',
      'Fitness develops slowly but persists; fatigue develops fast but dissipates',
      'GAS stages: Alarm → Resistance → Exhaustion',
      'Block periodization: Accumulation → Transmutation → Realization',
      'Overtraining markers: performance decline >2 weeks, elevated resting HR, reduced HRV',
      'Taper duration: 7-21 days, volume reduction 40-60%, maintain intensity',
      'Tapers improve performance 0.5-6%',
      'Deload every 4-6 weeks to prevent overtraining'
    ],
    fitnessRelevance: 'Understanding recovery science optimizes training programming: periodization prevents overtraining by cyclically varying stress, tapers reveal peak performance by reducing fatigue, and monitoring (HRV, mood, performance) detects early overtraining signs. Recognizing that fitness and fatigue coexist explains why performance often improves after rest days or deload weeks. Advanced athletes use block periodization to focus on specific adaptations.',
    relatedTopics: [
      { id: 'periodization', title: 'Periodization: The Science of Programming', category: 'Exercise Physiology' },
      { id: 'overtraining-syndrome', title: 'Overtraining Syndrome', category: 'Exercise Physiology' },
      { id: 'recovery', title: 'Recovery & Adaptation', category: 'Exercise Physiology' },
      { id: 'hormonal-responses', title: 'Hormonal Responses to Training', category: 'Endocrinology' }
    ],
    quizQuestions: [
      {
        question: 'An athlete follows a 12-week training program and notices performance plateauing in week 10. According to the fitness-fatigue model, what should they do?',
        options: ['Increase training volume', 'Take a deload week to reduce fatigue', 'Switch to different exercises', 'Increase protein intake'],
        correct: 1,
        explanation: 'The fitness-fatigue model suggests that accumulated fatigue is masking fitness gains. A deload week (reduced volume/intensity) allows fatigue to dissipate while maintaining fitness, revealing improved performance. This is the principle behind periodization: accumulate stress, then reduce to reveal adaptation.'
      },
      {
        question: 'A powerlifter tapers for 2 weeks before competition, reducing volume by 50% but also reducing intensity by 30%. What is the likely outcome?',
        options: ['Optimal performance', 'Suboptimal performance due to detraining', 'Overtraining', 'Injury'],
        correct: 1,
        explanation: 'Tapers should reduce volume (40-60%) but maintain intensity to preserve neuromuscular adaptations. Reducing intensity causes detraining (loss of neural drive, motor unit recruitment). The athlete will likely perform below potential due to reduced neural efficiency. Optimal taper: maintain heavy loads, reduce sets/reps.'
      },
      {
        question: 'An endurance athlete shows persistent performance decline, elevated resting HR, and mood disturbance for 3 weeks. What is the most likely diagnosis?',
        options: ['Acute fatigue', 'Functional overreaching', 'Non-functional overreaching', 'Overtraining syndrome'],
        correct: 2,
        explanation: 'Non-functional overreaching (NFOR) involves performance decline lasting 2-4 weeks with fatigue markers (elevated HR, mood disturbance). If this persists >2 months despite rest, it becomes overtraining syndrome (OTS). The athlete is in NFOR and needs 2-4 weeks of reduced training to recover. Early intervention prevents progression to OTS.'
      },
      {
        question: 'According to GAS, what happens if training stress continues without adequate recovery?',
        options: ['Enhanced adaptation', 'Plateau', 'Exhaustion stage', 'Supercompensation'],
        correct: 2,
        explanation: 'GAS describes three stages: Alarm (initial fatigue), Resistance (adaptation), and Exhaustion (if stress continues without recovery). In the Exhaustion stage, adaptive mechanisms fail, performance declines, and overtraining occurs. This emphasizes the importance of periodization: cyclically vary stress to stay in the Resistance phase and avoid Exhaustion.'
      },
      {
        question: 'A coach uses block periodization for an elite sprinter. What is the correct sequence of blocks?',
        options: ['Realization → Transmutation → Accumulation', 'Accumulation → Transmutation → Realization', 'Transmutation → Accumulation → Realization', 'Accumulation → Realization → Transmutation'],
        correct: 1,
        explanation: 'Block periodization follows: Accumulation (high volume, build work capacity and general fitness) → Transmutation (moderate volume, high intensity, sport-specific adaptations) → Realization (low volume, maximal intensity, peaking and taper for competition). Each block builds on residual effects from the previous block.'
      }
    ],
  },
  {
    id: 'evidence-based-supplementation',
    title: 'Evidence-Based Supplementation: Advanced Protocols & Interactions',
    category: 'Supplements',
    system: 'Nutritional',
    level: 'expert',
    emoji: '💊',
    icon: 'pill',
    color: '#9C27B0',
    summary: 'Master advanced supplementation strategies with evidence-based protocols. Explore nutrient timing, synergistic combinations, individual variability, and the molecular mechanisms of ergogenic aids. Separate science from marketing hype.',
    description: 'Evidence-based supplementation examines the scientific literature on ergogenic aids, separating effective supplements from marketing hype. This expert path explores advanced protocols, nutrient interactions, individual variability, and the molecular mechanisms underlying supplement efficacy.',
    sections: [
      {
        title: 'Creatine: Beyond the Basics',
        content: 'Creatine monohydrate is the most researched supplement, but advanced protocols optimize efficacy. Loading phase: 0.3g/kg/day for 5-7 days (20g/day for 70kg person), then maintenance 0.03g/kg/day (3-5g/day). Loading saturates muscles in 1 week vs. 4 weeks without loading. Timing: post-workout may be slightly superior (insulin enhances uptake), but total daily intake matters most. Responders vs. non-responders: individuals with low baseline creatine (vegetarians, elderly) respond more. Muscle fiber type matters: Type II fibers store more creatine, so power athletes benefit more. Synergistic combinations: creatine + carbohydrate (insulin enhances uptake), creatine + beta-alanine (complementary mechanisms: PCr vs. buffering), creatine + HMB (anti-catabolic + anabolic). Advanced applications: creatine for cognitive function (brain also uses PCr), creatine for elderly (sarcopenia prevention), creatine during immobilization (reduces atrophy).'
      },
      {
        title: 'Caffeine: Individual Variability & Advanced Use',
        content: 'Caffeine efficacy varies 2-6% performance improvement, but individual response ranges from 0-15% due to genetics. CYP1A2 gene variants: fast metabolizers (AA genotype) benefit most, slow metabolizers (AC/CC) may experience impaired performance. ADORA2A gene variants affect anxiety response: high-anxiety variants may experience jitteriness, impairing fine motor skills. Optimal dose: 3-6 mg/kg, 60 minutes pre-exercise. Higher doses (>9 mg/kg) increase side effects without additional benefit. Habituation: chronic use reduces adenosine receptor density, diminishing effects. Strategy: use caffeine strategically (competition, key sessions), not daily, to maintain sensitivity. Withdrawal 4-7 days before important events to resensitize. Caffeine + carbohydrate: synergistic effect (caffeine enhances glucose absorption). Caffeine + creatine: no interference (old myth debunked). Caffeine + sodium bicarbonate: complementary (central vs. peripheral fatigue).'
      },
      {
        title: 'Beta-Alanine: Buffering Capacity & Protocols',
        content: 'Beta-alanine increases muscle carnosine, which buffers H+ ions during high-intensity exercise. Carnosine is a dipeptide (beta-alanine + histidine); beta-alanine is rate-limiting. Supplementation: 3.2-6.4g/day for 4-12 weeks increases carnosine 40-80%. Slow-release formulations reduce paresthesia (tingling). Responders: individuals with low baseline carnosine (vegetarians, sprinters) benefit most. Efficacy: improves performance in 1-4 minute efforts (400m-1500m running, rowing, swimming, high-rep resistance training). Does not benefit single max efforts or pure endurance. Synergistic combinations: beta-alanine + creatine (complementary: buffering + PCr), beta-alanine + sodium bicarbonate (intracellular + extracellular buffering). Advanced protocol: load for 4 weeks before competition, then maintain with 1.2g/day. Timing: with meals (insulin enhances uptake). Washout: carnosine returns to baseline in 6-15 weeks after cessation.'
      },
      {
        title: 'Nitrate/Beetroot Juice: NO Pathway & Performance',
        content: 'Dietary nitrate (NO3-) is reduced to nitrite (NO2-) by oral bacteria, then to nitric oxide (NO) in acidic/hypoxic conditions (stomach, exercising muscle). NO enhances performance by: (1) vasodilation (increased blood flow), (2) improved mitochondrial efficiency (reduced O2 cost of ATP production), (3) enhanced calcium handling (improved contractility). Dose: 300-600 mg nitrate (500 mL beetroot juice or concentrated shot), 2-3 hours pre-exercise. Avoid mouthwash (kills oral bacteria needed for conversion). Efficacy: 1-3% improvement in 4-30 minute efforts (time trials, rowing, cycling). Responders: recreational athletes benefit more than elite (already optimized). Non-responders: individuals with high baseline nitrate intake (vegetables) show less benefit. Chronic loading: 3-5 days of daily nitrate before competition may enhance effects. Contraindications: hypotension (NO lowers BP), kidney stones (oxalate content).'
      },
      {
        title: 'Sodium Bicarbonate: Extracellular Buffering',
        content: 'Sodium bicarbonate (NaHCO3) increases extracellular buffering capacity, enhancing H+ efflux from muscle during high-intensity exercise. Dose: 0.3g/kg, 60-120 minutes pre-exercise (with carbohydrate to reduce GI distress). Efficacy: 1-3% improvement in 1-7 minute efforts (400m-1500m running, rowing, swimming, repeated sprints). Side effects: GI distress (bloating, diarrhea) in 50% of users. Strategies to reduce GI issues: split dose (0.2g/kg 2 hours before + 0.1g/kg 30 minutes before), take with carbohydrate, use enteric-coated capsules. Synergistic combinations: bicarbonate + beta-alanine (extracellular + intracellular buffering), bicarbonate + caffeine (peripheral + central fatigue). Individual variability: some individuals are "responders" (significant benefit) while others are "non-responders" (no benefit or impaired performance). Test in training before competition. Advanced protocol: chronic loading (0.5g/kg/day for 5 days) may reduce acute GI issues.'
      },
      {
        title: 'Emerging Supplements & Future Directions',
        content: 'Emerging supplements with promising evidence: (1) Ketone esters: provide exogenous ketones, sparing glycogen and enhancing endurance. Expensive ($30/dose) and taste terrible, but may benefit ultra-endurance. (2) Urolithin A: enhances mitophagy (removal of damaged mitochondria), improving mitochondrial function. Early research shows 10-15% endurance improvement. (3) Epicatechin (dark chocolate): inhibits myostatin, increases follistatin, potentially enhancing hypertrophy. Human data limited. (4) Ashwagandha: adaptogen reducing cortisol, improving testosterone and strength. Meta-analyses show 5-10% strength improvement. (5) Rhodiola rosea: adaptogen reducing fatigue and improving endurance. (6) Citrulline malate: enhances NO production, reduces fatigue, improves pumps. 6-8g pre-workout. Supplements with limited evidence despite popularity: BCAAs (unnecessary with adequate protein), glutamine (no benefit in healthy athletes), testosterone boosters (tribulus, fenugreek—no meaningful effect), fat burners (minimal effect). Always prioritize: sleep, nutrition, training, then evidence-based supplements.'
      }
    ],
    keyFacts: [
      'Creatine loading: 0.3g/kg/day for 5-7 days, then 0.03g/kg/day maintenance',
      'Caffeine: CYP1A2 fast metabolizers benefit most, slow metabolizers may be impaired',
      'Beta-alanine: 3.2-6.4g/day for 4-12 weeks increases carnosine 40-80%',
      'Nitrate: 300-600 mg, 2-3 hours pre-exercise, avoid mouthwash',
      'Sodium bicarbonate: 0.3g/kg causes GI distress in 50% of users',
      'Ketone esters: $30/dose, may benefit ultra-endurance',
      'Urolithin A: enhances mitophagy, 10-15% endurance improvement',
      'Always prioritize: sleep > nutrition > training > supplements'
    ],
    fitnessRelevance: 'Evidence-based supplementation optimizes performance: creatine for power/strength, caffeine for neural drive, beta-alanine for buffering, nitrate for efficiency, bicarbonate for high-intensity efforts. Understanding individual variability (genetics, baseline status) explains why some athletes benefit while others don\'t. Advanced protocols (loading, timing, combinations) maximize efficacy. Always test supplements in training before competition.',
    relatedTopics: [
      { id: 'creatine', title: 'Creatine: The Gold Standard', category: 'Supplements' },
      { id: 'advanced-supplements', title: 'Advanced Supplementation Science', category: 'Supplements' },
      { id: 'nutrition-basics', title: 'Macronutrients & Energy', category: 'Nutrition' },
      { id: 'exercise-biochemistry', title: 'Exercise Biochemistry & Energy Transfer', category: 'Exercise Physiology' }
    ],
    quizQuestions: [
      {
        question: 'A vegetarian powerlifter starts creatine supplementation. Why might they experience greater benefits than a meat-eating counterpart?',
        options: ['Better absorption', 'Lower baseline creatine stores', 'Higher muscle fiber count', 'Faster metabolism'],
        correct: 1,
        explanation: 'Vegetarians have lower baseline muscle creatine stores (no dietary creatine from meat). Supplementation increases stores more dramatically (40-50% vs. 20-30% in meat-eaters), producing greater performance improvements. This demonstrates the principle that individuals with lower baseline status benefit most from supplementation.'
      },
      {
        question: 'An athlete takes caffeine before a competition but performs worse than expected. Genetic testing reveals they have the CYP1A2 AC genotype. What does this mean?',
        options: ['Fast metabolizer, needs higher dose', 'Slow metabolizer, may experience impaired performance', 'Non-responder, no benefit', 'Allergic reaction'],
        correct: 1,
        explanation: 'CYP1A2 AC genotype indicates slow caffeine metabolism. Caffeine persists longer, potentially causing anxiety, jitteriness, and impaired fine motor skills. Slow metabolizers may experience neutral or negative effects from caffeine. Genetic testing can guide personalized supplementation strategies.'
      },
      {
        question: 'A 400m runner uses both beta-alanine and sodium bicarbonate. What is the rationale for this combination?',
        options: ['Synergistic effect on ATP production', 'Complementary buffering: intracellular (carnosine) + extracellular (bicarbonate)', 'Enhanced NO production', 'Reduced perceived effort'],
        correct: 1,
        explanation: 'Beta-alanine increases intracellular buffering (carnosine buffers H+ inside muscle), while sodium bicarbonate enhances extracellular buffering (bicarbonate buffers H+ in blood, enhancing H+ efflux from muscle). This complementary approach maximizes acidosis delay during 1-4 minute high-intensity efforts.'
      },
      {
        question: 'An endurance athlete uses beetroot juice but notices no benefit. What is the most likely explanation?',
        options: ['Incorrect timing', 'High baseline nitrate intake from vegetables', 'Genetic non-responder', 'Insufficient dose'],
        correct: 1,
        explanation: 'Individuals with high baseline nitrate intake (from vegetables like spinach, arugula, beets) show less benefit from supplementation because their NO pathway is already optimized. Nitrate supplementation benefits recreational athletes more than elite athletes (already optimized) and individuals with low vegetable intake more than high vegetable consumers.'
      },
      {
        question: 'A CrossFit athlete experiences severe GI distress after taking 0.3g/kg sodium bicarbonate. What strategy could reduce this?',
        options: ['Take with protein', 'Split dose: 0.2g/kg 2 hours before + 0.1g/kg 30 minutes before', 'Reduce dose to 0.1g/kg', 'Take on empty stomach'],
        correct: 1,
        explanation: 'Split dosing reduces acute GI distress by avoiding a large osmotic load. Taking 0.2g/kg 2 hours before allows partial absorption, then 0.1g/kg 30 minutes before tops up buffering capacity. Taking with carbohydrate also reduces GI issues. This strategy maintains efficacy while improving tolerability.'
      }
    ],
  },
  {
    id: 'sport-injuries',
    title: 'Sport Injuries: Mechanisms, Prevention & Rehabilitation',
    category: 'Sports Medicine',
    system: 'Musculoskeletal',
    level: 'expert',
    emoji: '🏥',
    icon: 'medical',
    color: '#E74C3C',
    summary: 'Master the science of athletic injuries from acute trauma to chronic overuse. Understand injury mechanisms, tissue healing timelines, rehabilitation protocols, and evidence-based return-to-play criteria. Learn to prevent injuries through biomechanical analysis and proper programming.',
    description: 'Sport injuries represent the intersection of biomechanics, physiology, and tissue biology. This comprehensive course examines injury mechanisms (acute vs. chronic), tissue healing phases, common athletic injuries by body region, rehabilitation principles, and return-to-sport decision-making. Understanding injuries allows coaches and athletes to prevent them through proper programming and recognize them early for optimal outcomes.',
    sections: [
      {
        title: 'Injury Classification & Mechanisms',
        content: 'Injuries are classified by: (1) Onset: Acute (sudden, single event—ACL tear, fracture) vs. Chronic/Overuse (gradual, repetitive microtrauma—tendinopathy, stress fracture). (2) Tissue type: Muscular (strain, contusion), Tendinous (tendinopathy, rupture), Ligamentous (sprain), Bony (fracture, stress fracture), Cartilaginous (meniscus tear, osteochondral defect). (3) Severity: Grade I (mild, minimal tissue damage), Grade II (moderate, partial tear), Grade III (severe, complete rupture). Injury mechanisms include: direct trauma (contact injuries), indirect trauma (non-contact, excessive force), repetitive microtrauma (overuse), and intrinsic factors (anatomical variations, muscle imbalances, previous injury). The "envelope of function" concept (Dye, 2005) suggests each tissue has a load tolerance range—loading within this range maintains homeostasis, while exceeding it causes injury. Understanding this envelope guides rehabilitation: gradual loading expands the envelope over time.'
      },
      {
        title: 'Tissue Healing Phases & Timelines',
        content: 'Tissue healing occurs in overlapping phases: (1) Inflammatory phase (0-7 days): hemorrhage, edema, phagocytosis of debris. Goals: control inflammation (RICE—Rest, Ice, Compression, Elevation), protect tissue. (2) Proliferative phase (7-21 days): fibroblast proliferation, collagen synthesis (Type III, weak), angiogenesis. Goals: early controlled motion, prevent adhesions, stimulate collagen alignment. (3) Remodeling phase (21 days-12 months): collagen maturation (Type III → Type I), cross-linking, increased tensile strength. Goals: progressive loading, restore function, prevent re-injury. Tissue-specific timelines: Muscle (2-8 weeks), Tendon (12-16 weeks), Ligament (6-12 months), Bone (6-12 weeks), Cartilage (limited healing capacity). Understanding these phases guides rehabilitation: early mobilization during proliferation enhances collagen alignment, while premature loading during inflammation disrupts healing. The "optimal loading" principle balances protection with mechanical stimulation.'
      },
      {
        title: 'Common Acute Injuries: ACL, Hamstring, Ankle Sprain',
        content: 'ACL injuries: 70% non-contact, occurring during deceleration/cutting with knee near full extension and valgus. Mechanism: quadriceps pull tibia anteriorly (anterior shear), while hamstrings pull posteriorly (protective). Risk factors: quadriceps dominance (high quad:hamstring ratio), ligament dominance (reduced neuromuscular control), leg dominance (asymmetry), trunk dominance (poor core control). Prevention: neuromuscular training (plyometrics, landing mechanics) reduces ACL injury 50-70%. Hamstring strains: most common in sprinting, occurring during late swing phase when hamstrings eccentrically decelerate knee extension. Risk factors: previous injury (2-6x increased risk), strength imbalances (hamstring:quadriceps ratio <0.6), poor flexibility, fatigue. Prevention: Nordic hamstring curls reduce injury 51%, eccentric strength training, proper warm-up. Ankle sprains: 85% lateral (inversion), involving ATFL (anterior talofibular ligament). Risk factors: previous sprain, reduced proprioception, poor footwear. Prevention: proprioceptive training (balance board, single-leg stance) reduces recurrence 50%, taping/bracing for high-risk sports.'
      },
      {
        title: 'Overuse Injuries: Tendinopathy, Stress Fractures, Impingement',
        content: 'Tendinopathy: degenerative condition (not inflammatory) characterized by disorganized collagen, increased ground substance, and neovascularization. Mechanism: repetitive loading exceeding tendon capacity causes microdamage accumulation. Risk factors: training errors (rapid volume/intensity increases), biomechanical factors (poor alignment), systemic factors (age, diabetes, fluoroquinolones). Treatment: progressive tendon loading (eccentric or heavy slow resistance), not rest or anti-inflammatories. Stress fractures: bone fatigue failure from repetitive submaximal loading. Mechanism: osteoclast activity exceeds osteoblast activity, causing microcracks that propagate. Risk factors: training errors, low bone density, female athlete triad (low energy availability, menstrual dysfunction, low bone density), poor footwear. Treatment: activity modification (6-8 weeks), gradual return, address underlying factors (nutrition, bone health). Shoulder impingement: compression of rotator cuff tendons under acromion during overhead activities. Mechanism: subacromial space narrowing from inflammation, bone spurs, or poor scapular mechanics. Treatment: rotator cuff strengthening, scapular stabilization, activity modification.'
      },
      {
        title: 'Rehabilitation Principles: Progressive Loading & Functional Recovery',
        content: 'Rehabilitation follows evidence-based principles: (1) Progressive loading: gradual increase in load, volume, and complexity to stimulate tissue adaptation without re-injury. Start with isometrics (pain-free), progress to isotonic (concentric → eccentric), then plyometric/sport-specific. (2) Pain monitoring: pain during exercise should be ≤3/10 and resolve within 24 hours. Pain >3/10 or persisting >24 hours indicates overload. (3) Functional progression: restore ROM → strength → power → sport-specific skills → return to play. (4) Criteria-based progression: advance based on objective measures (strength symmetry >90%, hop tests, movement quality), not time alone. (5) Psychological readiness: fear of re-injury (kinesiophobia) impairs return to sport. Address through gradual exposure, education, and confidence building. Advanced techniques: blood flow restriction (BFR) training maintains muscle during immobilization, isometric holds reduce tendon pain (analgesic effect), and neuromuscular electrical stimulation (NMES) prevents atrophy.'
      },
      {
        title: 'Return-to-Play Decision Making & Injury Prevention Programming',
        content: 'Return-to-play (RTP) decisions require multidimensional assessment: (1) Medical clearance: tissue healing complete, no pain/swelling. (2) Functional testing: strength symmetry >90% (isokinetic dynamometry), hop tests (single-leg hop, triple hop, crossover hop >90% limb symmetry index), movement quality (no compensations). (3) Sport-specific testing: sport drills at progressive intensity (50% → 75% → 100%). (4) Psychological readiness: ACL-RSI scale >56/100 indicates readiness. (5) Graduated return: return to training (non-contact) → return to team training (contact) → return to competition. Premature RTP increases re-injury risk 4-7x. Injury prevention programs should be sport-specific and address identified risk factors. Example: FIFA 11+ program (soccer) reduces injuries 30-50% through neuromuscular training, core stability, and plyometrics. Programming principles: include in warm-up (compliance), progress difficulty, emphasize quality over quantity, maintain throughout season.'
      }
    ],
    keyFacts: [
      'ACL injuries: 70% non-contact, neuromuscular training reduces risk 50-70%',
      'Hamstring strains: previous injury increases risk 2-6x, Nordic curls reduce 51%',
      'Tendinopathy is degenerative, not inflammatory—treat with loading, not rest',
      'Stress fractures: osteoclast activity exceeds osteoblast, 6-8 weeks activity modification',
      'Tissue healing: inflammatory (0-7 days), proliferative (7-21 days), remodeling (21 days-12 months)',
      'RTP criteria: strength symmetry >90%, hop tests >90%, psychological readiness >56/100',
      'Pain during rehab should be ≤3/10 and resolve within 24 hours',
      'Premature RTP increases re-injury risk 4-7x'
    ],
    fitnessRelevance: 'Understanding sport injuries allows coaches to: (1) prevent injuries through proper programming and biomechanical analysis, (2) recognize injuries early for optimal outcomes, (3) guide rehabilitation with evidence-based protocols, (4) make objective RTP decisions to prevent re-injury. Knowledge of tissue healing timelines prevents premature return and optimizes long-term athletic development.',
    relatedTopics: [
      { id: 'tendon-biology', title: 'Tendon Biology & Adaptation', category: 'Biomechanics' },
      { id: 'musculoskeletal-biomechanics', title: 'Musculoskeletal Biomechanics', category: 'Biomechanics' },
      { id: 'recovery-adaptation-science', title: 'Recovery & Adaptation Science', category: 'Exercise Physiology' },
      { id: 'advanced-neuroanatomy', title: 'Advanced Neuroanatomy', category: 'Nervous System' }
    ],
    quizQuestions: [
      {
        question: 'A soccer player sustains a non-contact ACL injury during a cutting maneuver. Video analysis shows the knee was near full extension with valgus collapse. What biomechanical mechanism most likely caused the injury?',
        options: ['Excessive tibial internal rotation', 'Quadriceps-induced anterior tibial shear with insufficient hamstring co-contraction', 'Direct impact to lateral knee', 'Excessive knee flexion moment'],
        correct: 1,
        explanation: 'Non-contact ACL injuries typically occur when the quadriceps contract forcefully with the knee near extension, pulling the tibia anteriorly (anterior shear). Without adequate hamstring co-contraction to counteract this (posterior pull), the ACL is overloaded. Valgus collapse increases strain on the ACL. This mechanism explains why quadriceps dominance is a risk factor.'
      },
      {
        question: 'A runner presents with gradual onset lateral hip pain over 6 weeks. MRI shows tendinopathy of the gluteus medius tendon with neovascularization but no inflammation. What is the most appropriate treatment?',
        options: ['Complete rest for 4 weeks', 'NSAIDs and ice', 'Progressive tendon loading program (eccentric/heavy slow resistance)', 'Corticosteroid injection'],
        correct: 2,
        explanation: 'Tendinopathy is a degenerative condition (disorganized collagen, neovascularization), not inflammatory. Rest and anti-inflammatories provide only temporary relief and may impair long-term healing. Progressive tendon loading stimulates collagen remodeling and restores tendon structure over 12+ weeks. Corticosteroid injections provide short-term pain relief but increase long-term recurrence risk.'
      },
      {
        question: 'A basketball player is 6 months post-ACL reconstruction. Strength testing shows 85% limb symmetry index (LSI) on quadriceps isokinetic testing. Hop testing shows 88% LSI on single-leg hop. The athlete feels ready to return. What is the appropriate recommendation?',
        options: ['Return to full competition immediately', 'Continue rehabilitation until LSI >90% on all tests', 'Return to non-contact training only', 'Return to competition with brace'],
        correct: 1,
        explanation: 'Evidence-based RTP criteria require >90% LSI on strength and functional tests to minimize re-injury risk. At 85-88% LSI, the athlete has a 4-7x increased re-injury risk. Continuing rehabilitation until criteria are met (typically 9-12 months post-ACL) optimizes outcomes. Premature RTP based on time or subjective readiness alone increases re-injury and contralateral ACL injury risk.'
      },
      {
        question: 'A track athlete develops shin pain that worsens with running and is localized to a specific point on the tibia. X-ray is negative, but bone scan shows increased uptake. What is the diagnosis and appropriate management?',
        options: ['Medial tibial stress syndrome (shin splints), continue training with ice', 'Stress fracture, 6-8 weeks activity modification', 'Compartment syndrome, surgical fasciotomy', 'Periostitis, NSAIDs and stretching'],
        correct: 1,
        explanation: 'Localized bone pain with positive bone scan (increased osteoblastic activity) indicates a stress fracture, not medial tibial stress syndrome (which is diffuse). Stress fractures require 6-8 weeks of activity modification (non-weight-bearing or cross-training) to allow bone healing. Continuing training risks progression to complete fracture. Address underlying factors: training errors, bone density, nutrition (calcium, vitamin D), and female athlete triad if applicable.'
      },
      {
        question: 'During hamstring strain rehabilitation, an athlete reports pain of 4/10 during Nordic curls that persists for 36 hours post-session. What adjustment should be made?',
        options: ['Increase load to build tolerance', 'Reduce load/volume to maintain pain ≤3/10 resolving within 24 hours', 'Switch to complete rest', 'Add NSAIDs to manage pain'],
        correct: 1,
        explanation: 'The pain monitoring model suggests rehabilitation pain should be ≤3/10 during exercise and resolve within 24 hours. Pain of 4/10 persisting 36 hours indicates overload, risking re-injury or delayed healing. Reducing load/volume maintains the stimulus for adaptation while respecting tissue tolerance. Complete rest causes detraining, and NSAIDs may impair long-term healing by suppressing the inflammatory phase necessary for tissue repair.'
      }
    ],
  },
  {
    id: 'applied-biomechanics',
    title: 'Applied Biomechanics: Sport-Specific Movement Analysis',
    category: 'Biomechanics',
    system: 'Movement Science',
    level: 'expert',
    emoji: '🏃',
    icon: 'walk',
    color: '#3498DB',
    summary: 'Apply biomechanical principles to analyze and optimize sport-specific movements. Master inverse dynamics, movement efficiency, technique analysis, and performance enhancement through biomechanical optimization. Understand how physics governs athletic performance across running, jumping, throwing, and lifting.',
    description: 'Applied biomechanics translates theoretical principles into practical sport applications. This course examines movement analysis techniques, sport-specific biomechanics (running, jumping, throwing, lifting), performance optimization through technique refinement, and injury prevention through biomechanical intervention. Understanding applied biomechanics allows coaches to enhance performance and reduce injury risk through evidence-based technique modifications.',
    sections: [
      {
        title: 'Inverse Dynamics: Quantifying Joint Loads',
        content: 'Inverse dynamics calculates internal joint forces and moments from external measurements (ground reaction forces, motion capture). The process: (1) measure kinematics (joint angles, velocities, accelerations) via motion capture, (2) measure ground reaction forces (GRF) via force plates, (3) apply Newton-Euler equations segment-by-segment from distal to proximal. For each segment: ΣF = ma (linear) and ΣM = Iα (angular). This reveals joint reaction forces (bone-on-bone compression) and net joint moments (muscle torque). Example: during squat, inverse dynamics shows knee extensor moment must counteract external flexion moment from GRF. Applications: identify injury mechanisms (excessive joint loads), optimize technique (reduce joint stress), and design rehabilitation (progressive loading). Limitations: assumes rigid body segments, cannot distinguish individual muscle forces (requires EMG-driven models or optimization).'
      },
      {
        title: 'Running Biomechanics: Economy & Injury Prevention',
        content: 'Running economy (RE) is the oxygen cost at a given submaximal speed—better RE means less energy for same pace. Biomechanical factors affecting RE: (1) Stride length/frequency: self-selected is typically optimal, but excessive overstriding increases braking forces and reduces RE. (2) Vertical oscillation: excessive vertical motion wastes energy; elite runners have minimal vertical displacement. (3) Ground contact time: shorter contact time correlates with better RE (stiffer tendons, more elastic energy return). (4) Foot strike: rearfoot striking shows impact transient (sharp GRF peak), forefoot striking eliminates this but increases Achilles/calf load. Neither is universally superior—transition gradually if changing. (5) Cadence: increasing cadence 5-10% reduces loading rate and may prevent injury without impairing RE. Injury prevention: high loading rates (>60 BW/s) increase stress fracture risk. Interventions: increase cadence, transition to forefoot strike (gradually), improve hip extension strength (reduces overstriding).'
      },
      {
        title: 'Jumping Biomechanics: Maximizing Vertical Displacement',
        content: 'Vertical jump height depends on takeoff velocity: h = v²/2g. To maximize velocity, maximize impulse (force × time) during push-off. Biomechanical strategies: (1) Countermovement depth: deeper countermovement (squat depth) increases time for force production, but excessive depth reduces force due to mechanical disadvantage. Optimal depth is individual-specific (~90° knee flexion for most). (2) Arm swing: contributes 10-15% to jump height by increasing push-off force (arms accelerate upward, pulling body up via shoulder muscles) and enhancing lower body force production (neural facilitation). (3) Stretch-shortening cycle (SSC): rapid eccentric-concentric transition enhances force via elastic energy storage and stretch reflex. Minimize amortization phase (transition time) to <0.2s. (4) Triple extension: coordinated ankle, knee, and hip extension maximizes force application time. Training: plyometrics enhance SSC efficiency, strength training increases force capacity, technique practice optimizes coordination. Common errors: excessive knee valgus (reduces force, increases ACL risk), premature arm swing (reduces coordination), slow amortization (loses elastic energy).'
      },
      {
        title: 'Throwing & Striking Biomechanics: Kinetic Chain Sequencing',
        content: 'Throwing and striking rely on proximal-to-distal sequencing: force generated by large proximal segments (legs, trunk) transfers to smaller distal segments (arm, hand), amplifying velocity. Baseball pitching sequence: (1) stride leg drives forward, (2) pelvis rotates toward target, (3) trunk rotates, (4) shoulder internally rotates, (5) elbow extends, (6) wrist flexes. Each segment accelerates and then decelerates, transferring energy to the next. The "kinetic chain" concept: disruption at any link reduces performance and increases injury risk. Example: poor trunk rotation forces shoulder to compensate, increasing rotator cuff stress. Biomechanical analysis: angular velocities peak sequentially (pelvis → trunk → shoulder → elbow → wrist), with each peak occurring just before the next segment\'s peak. Training: enhance sequencing through medicine ball throws, rotational exercises, and sport-specific drills. Injury prevention: strengthen decelerator muscles (posterior shoulder, rotator cuff) to handle eccentric loads during follow-through.'
      },
      {
        title: 'Lifting Biomechanics: Deadlift, Squat, Bench Press Optimization',
        content: 'Deadlift: bar path should be vertical over mid-foot (center of pressure) to minimize moment arms. Common errors: bar drifting forward (increases low back moment), excessive lumbar flexion (increases disc shear), hip hiking (reduces leg drive). Optimization: cue "push floor away" (leg drive), "chest up" (thoracic extension), "pull slack out of bar" (pre-tension). Squat: knee tracking over toes (not excessive valgus/varus), torso angle matches femur length (longer femurs = more forward lean). Moment analysis: deeper squats increase knee extensor moment but reduce low back stress (more upright torso). Stance width: wider stance reduces ROM but increases hip adductor/abductor demand. Bench press: bar path is not vertical but follows a J-curve (toward face during descent, toward feet during ascent) to optimize shoulder mechanics. Grip width: wider grip reduces ROM but increases shoulder stress; narrow grip increases triceps demand. Arch: reduces ROM and places pecs in mechanically advantageous position (more horizontal adduction). Safety: avoid excessive arch (lumbar compression), maintain scapular retraction (shoulder stability).'
      },
      {
        title: 'Biomechanical Interventions: Technique Modification & Equipment Optimization',
        content: 'Technique modification follows a systematic process: (1) Identify performance limitation or injury risk through video analysis and/or motion capture. (2) Determine biomechanical cause (e.g., excessive knee valgus during landing). (3) Select intervention (cueing, strength training, mobility work). (4) Implement with feedback (video, verbal cues, external focus). (5) Reassess to verify improvement. Example: runner with patellofemoral pain shows excessive hip adduction during stance. Intervention: hip abductor/external rotator strengthening + cue "push knees out" during running. Equipment optimization: footwear affects performance and injury risk. Minimalist shoes strengthen foot muscles but increase Achilles/calf load; maximalist shoes reduce impact but may impair proprioception. Cycling: bike fit affects power and injury risk—saddle height affects knee moments, handlebar position affects back stress. Swimming: hand entry angle affects propulsion; excessive shoulder internal rotation during catch increases impingement risk. Technology: wearable sensors (IMUs, pressure insoles) provide real-time biomechanical feedback outside the lab.'
      }
    ],
    keyFacts: [
      'Inverse dynamics calculates joint forces from GRF and motion capture',
      'Running economy: self-selected stride length is typically optimal',
      'Increasing cadence 5-10% reduces loading rate without impairing economy',
      'Countermovement jump: arm swing contributes 10-15% to jump height',
      'Stretch-shortening cycle: amortization phase should be <0.2s',
      'Throwing: proximal-to-distal sequencing amplifies distal velocity',
      'Deadlift: bar path should be vertical over mid-foot',
      'Bench press: bar follows J-curve, not vertical path'
    ],
    fitnessRelevance: 'Applied biomechanics enhances performance and prevents injury through technique optimization. Coaches can: (1) analyze movement to identify inefficiencies, (2) modify technique to reduce joint stress, (3) optimize equipment (footwear, bike fit), (4) design sport-specific strength training targeting biomechanical weaknesses. Understanding biomechanics separates good coaches from great—evidence-based technique refinement produces immediate performance gains.',
    relatedTopics: [
      { id: 'musculoskeletal-biomechanics', title: 'Musculoskeletal Biomechanics', category: 'Biomechanics' },
      { id: 'sport-injuries', title: 'Sport Injuries', category: 'Sports Medicine' },
      { id: 'physics-of-movement', title: 'Physics of Human Movement', category: 'Physics' },
      { id: 'motor-learning', title: 'Motor Learning & Skill Acquisition', category: 'Nervous System' }
    ],
    quizQuestions: [
      {
        question: 'A distance runner has poor running economy despite high VO2max. Video analysis reveals excessive vertical oscillation and overstriding. What biomechanical intervention would most improve economy?',
        options: ['Increase stride length further', 'Increase cadence 5-10% and cue "run tall" to reduce vertical oscillation', 'Switch to forefoot striking immediately', 'Add heavy squats to increase leg stiffness'],
        correct: 1,
        explanation: 'Excessive vertical oscillation wastes energy (lifting body mass unnecessarily), and overstriding increases braking forces. Increasing cadence 5-10% reduces overstriding without requiring conscious stride length modification. Cueing "run tall" promotes upright posture and reduces vertical motion. These interventions address the identified biomechanical inefficiencies directly. Immediate foot strike changes risk injury, and heavy squats may help but don\'t address the primary issues.'
      },
      {
        question: 'A volleyball player\'s vertical jump is 10 cm below expected based on leg strength testing. Video analysis shows slow amortization phase (0.4s) during countermovement. What training intervention would most improve jump height?',
        options: ['Increase squat strength', 'Plyometric training emphasizing rapid eccentric-concentric transition', 'Increase body mass', 'Static stretching before jumping'],
        correct: 1,
        explanation: 'Slow amortization phase (>0.2s) dissipates elastic energy stored during the eccentric phase, reducing the stretch-shortening cycle benefit. Plyometric training (depth jumps, hurdle hops) emphasizes rapid transitions (<0.2s), enhancing SSC efficiency and elastic energy utilization. While strength is important, the athlete already has adequate strength—the limitation is SSC efficiency. Increasing body mass would reduce jump height (h = v²/2g, more mass requires more force for same velocity).'
      },
      {
        question: 'A baseball pitcher presents with posterior shoulder pain. Biomechanical analysis shows reduced trunk rotation velocity, forcing the shoulder to compensate with excessive internal rotation. What is the most appropriate intervention?',
        options: ['Strengthen rotator cuff', 'Improve trunk rotation power through medicine ball throws and rotational exercises', 'Reduce pitching volume', 'Modify pitching mechanics to reduce shoulder stress'],
        correct: 1,
        explanation: 'The kinetic chain disruption at the trunk forces the shoulder to compensate, increasing injury risk. Strengthening the trunk rotators and improving rotational power restores proper sequencing, reducing shoulder stress. While rotator cuff strengthening is important, it doesn\'t address the root cause. Reducing volume is temporary, and modifying mechanics without addressing the strength deficit won\'t restore proper sequencing.'
      },
      {
        question: 'A powerlifter\'s deadlift stalls at 250 kg. Video analysis shows the bar drifts 5 cm forward during the lift, increasing low back moment. What cue would most effectively correct this?',
        options: ['"Arch your back harder"', '"Push the floor away" to emphasize leg drive and keep bar close', '"Pull with your arms"', '"Lean back at the top"'],
        correct: 1,
        explanation: 'Bar drift forward increases the moment arm at the low back, increasing stress and reducing efficiency. Cueing "push the floor away" emphasizes leg drive (quadriceps extension) rather than back extension, keeping the bar closer to the body (vertical path over mid-foot). This reduces low back moment and allows greater force application. "Arch harder" may increase lumbar compression, "pull with arms" is ineffective (arms are cables, not prime movers), and "lean back" is a finishing cue that doesn\'t address the drift.'
      },
      {
        question: 'A cyclist presents with anterior knee pain. Bike fit analysis shows saddle height is 2 cm too low, causing excessive knee flexion at bottom dead center. What biomechanical consequence explains the pain?',
        options: ['Increased hip flexor demand', 'Increased patellofemoral joint reaction force due to excessive knee flexion moment', 'Reduced power output', 'Increased Achilles tendon strain'],
        correct: 1,
        explanation: 'Low saddle height increases knee flexion angle at bottom dead center, increasing the knee extensor moment arm and patellofemoral joint reaction force (up to 7x body weight during cycling). This excessive compression causes anterior knee pain (patellofemoral pain syndrome). Raising the saddle 2 cm reduces knee flexion, decreasing joint reaction force while maintaining power output. Proper saddle height allows 25-35° knee flexion at bottom dead center.'
      }
    ],
  },
  {
    id: 'physics-of-movement',
    title: 'Physics of Human Movement: Mechanics, Energy & Thermodynamics',
    category: 'Physics',
    system: 'Biophysics',
    level: 'expert',
    emoji: '⚛️',
    icon: 'nuclear',
    color: '#9B59B6',
    summary: 'Apply fundamental physics principles to understand human movement. Master Newton\'s laws, work-energy theorem, momentum, rotational mechanics, fluid dynamics, and thermodynamics. Understand how physical laws govern athletic performance, equipment design, and environmental interactions.',
    description: 'Physics provides the fundamental laws governing all human movement. This course applies classical mechanics, thermodynamics, and fluid dynamics to athletic performance, revealing how physical principles limit and enable movement. Understanding physics allows coaches to optimize performance through evidence-based technique refinement, equipment selection, and environmental adaptation.',
    sections: [
      {
        title: 'Newton\'s Laws of Motion: Foundation of Biomechanics',
        content: 'Newton\'s three laws govern all human movement: (1) Law of Inertia: objects resist changes in motion (F = 0 → a = 0). Application: heavier athletes are harder to accelerate/decelerate (advantage in contact sports, disadvantage in agility). Moment of inertia (I = mr²) determines rotational resistance—figure skaters reduce I by pulling arms in to spin faster. (2) Law of Acceleration: F = ma (force causes acceleration). Application: to maximize acceleration (sprinting, jumping), maximize force and minimize mass. Ground reaction force (GRF) propels body: F_GRF - mg = ma. Elite sprinters produce 2-3x body weight GRF. (3) Law of Reaction: every action has equal/opposite reaction. Application: GRF is the reaction to foot pushing on ground. Swimming: water pushes back as hands push water. Understanding these laws explains why: lighter athletes accelerate faster, heavier athletes have more momentum, and technique (force direction) matters as much as force magnitude.'
      },
      {
        title: 'Work, Energy & Power: The Currency of Performance',
        content: 'Work (W = F·d) is force applied through distance. Kinetic energy (KE = ½mv²) is energy of motion; potential energy (PE = mgh) is energy of position. Work-energy theorem: W = ΔKE + ΔPE. Application: jumping converts muscular work to PE (height). Sprinting converts work to KE (velocity). Power (P = W/t = F·v) is rate of work. Maximizing power requires optimizing force-velocity tradeoff: high force at low velocity (powerlifting) vs. low force at high velocity (sprinting). Maximal power occurs at intermediate loads (~30-50% 1RM). Conservation of energy: total mechanical energy (KE + PE) is conserved in absence of non-conservative forces (friction, air resistance). Pole vault converts KE (run-up) to elastic PE (pole bend) to gravitational PE (height). Efficiency: human muscles are ~25% efficient (75% of metabolic energy becomes heat). This explains why we overheat during exercise and need thermoregulation.'
      },
      {
        title: 'Momentum & Impulse: Changing Motion',
        content: 'Momentum (p = mv) is quantity of motion. Impulse (J = F·Δt) changes momentum: J = Δp. To maximize impulse (and thus velocity change), maximize force and/or time. Application: jumping—longer push-off time (deeper countermovement) increases impulse and jump height. Follow-through in throwing/striking increases contact time, maximizing impulse. Conservation of momentum: in collisions, total momentum is conserved. Application: football tackle—momentum of both players determines post-collision velocity. Elastic collisions (billiard balls) conserve KE; inelastic collisions (tackling) convert KE to heat/deformation. Coefficient of restitution (e) measures elasticity: e = 1 (perfectly elastic) to e = 0 (perfectly inelastic). Sports balls: tennis ball e ≈ 0.85, baseball e ≈ 0.55. Understanding impulse explains why: follow-through matters, softer surfaces reduce injury (increase Δt, reduce F), and plyometrics enhance performance (rapid force application).'
      },
      {
        title: 'Rotational Mechanics: Torque, Angular Momentum & Stability',
        content: 'Rotational motion parallels linear motion: torque (τ = r × F) causes angular acceleration (τ = Iα), where I = moment of inertia. Angular momentum (L = Iω) is conserved in absence of external torques. Application: figure skater pulls arms in (reduces I) to spin faster (increases ω, L constant). Divers tuck to rotate faster, extend to slow rotation for entry. Stability: base of support (BOS) and center of mass (COM) determine stability. COM must remain over BOS to maintain balance. Wider BOS and lower COM increase stability (sumo stance vs. narrow stance). Equilibrium: static (no motion) vs. dynamic (constant velocity). Levers: body uses third-class levers (effort between fulcrum and load), which are mechanically disadvantaged but allow speed/ROM. Mechanical advantage = effort arm/load arm. Understanding rotational mechanics explains: why longer limbs are harder to rotate (higher I), why follow-through increases ball velocity (longer lever arm), and why balance is harder with eyes closed (reduced sensory feedback for COM control).'
      },
      {
        title: 'Fluid Dynamics: Air & Water Resistance',
        content: 'Fluid resistance (drag) opposes motion through air or water. Drag force: F_D = ½ρv²C_DA, where ρ = fluid density, v = velocity, C_D = drag coefficient, A = frontal area. Drag increases with velocity squared—doubling speed quadruples drag. This explains why cycling/swimming speed plateaus despite increased power. Streamlining reduces C_D (aerodynamic position in cycling, body position in swimming). Drafting reduces drag by 30-50% (cycling, speed skating). Lift force (perpendicular to flow) enables flight and swimming propulsion. Bernoulli\'s principle: faster fluid flow = lower pressure. Airfoil shape (wing, hand in swimming) creates pressure differential, generating lift. Magnus effect: spinning ball curves due to asymmetric airflow (curveball, topspin in tennis). Buoyancy: Archimedes\' principle—buoyant force equals weight of displaced fluid. Swimmers with higher body fat float better (lower density). Understanding fluid dynamics explains: why cyclists tuck, why swimmers shave, why golf balls have dimples (turbulent boundary layer reduces drag), and why altitude affects ball flight (lower air density = less drag).'
      },
      {
        title: 'Thermodynamics & Heat Transfer: Temperature Regulation',
        content: 'First law of thermodynamics: energy is conserved (ΔU = Q - W). Human muscles are ~25% efficient—75% of metabolic energy becomes heat. During exercise, heat production can exceed 1000 W. Heat transfer mechanisms: (1) Conduction: direct contact (ice pack, cold water immersion). (2) Convection: fluid movement (wind, water flow). Wind chill increases heat loss. (3) Radiation: electromagnetic waves (infrared). Accounts for 60% of heat loss at rest. (4) Evaporation: phase change (sweat → vapor). Most effective during exercise but requires low humidity. High humidity impairs evaporation, increasing heat illness risk. Thermoregulation: hypothalamus controls body temperature via vasodilation (increase skin blood flow), sweating, and behavioral responses. Hyperthermia: core temp >40°C causes protein denaturation, CNS dysfunction, and death. Hypothermia: core temp <35°C impairs muscle function, causes arrhythmias. Acclimatization: 7-14 days of heat exposure increases plasma volume, sweat rate, and reduces sweat sodium concentration. Understanding thermodynamics explains: why we overheat during exercise, why humidity matters more than temperature, why cold water immersion reduces muscle temperature faster than ice packs, and why altitude training is harder (lower air density = less convective cooling).'
      }
    ],
    keyFacts: [
      'Newton\'s 2nd law: F = ma, maximize force and minimize mass for acceleration',
      'Power = Force × Velocity, maximal at 30-50% 1RM',
      'Human muscles are ~25% efficient (75% becomes heat)',
      'Drag increases with velocity squared (double speed = 4x drag)',
      'Angular momentum conservation: reduce moment of inertia to spin faster',
      'Evaporation is most effective heat loss mechanism during exercise',
      'Heat acclimatization takes 7-14 days',
      'Drafting reduces drag 30-50% in cycling/swimming'
    ],
    fitnessRelevance: 'Physics principles explain performance limitations and optimization strategies. Coaches can: (1) optimize technique to maximize force application (Newton\'s laws), (2) enhance power output through force-velocity training, (3) reduce drag through equipment and position optimization, (4) manage heat stress through understanding thermodynamics. Physics separates evidence-based coaching from guesswork—understanding why techniques work allows intelligent modification for individual athletes.',
    relatedTopics: [
      { id: 'applied-biomechanics', title: 'Applied Biomechanics', category: 'Biomechanics' },
      { id: 'musculoskeletal-biomechanics', title: 'Musculoskeletal Biomechanics', category: 'Biomechanics' },
      { id: 'exercise-biochemistry', title: 'Exercise Biochemistry', category: 'Exercise Physiology' },
      { id: 'energy-systems', title: 'Energy Systems & ATP', category: 'Exercise Physiology' }
    ],
    quizQuestions: [
      {
        question: 'A sprinter wants to improve acceleration. According to Newton\'s second law (F = ma), which strategy would be most effective?',
        options: ['Increase body mass to generate more momentum', 'Maximize ground reaction force while maintaining optimal body mass', 'Reduce ground contact time regardless of force', 'Increase stride length at all costs'],
        correct: 1,
        explanation: 'Acceleration = Force/mass. To maximize acceleration, the athlete must maximize force production (through strength training and technique) while maintaining optimal body mass (not too heavy, which reduces acceleration; not too light, which reduces force capacity). Increasing mass without proportional force increase reduces acceleration. Reducing contact time without maintaining force reduces impulse. Excessive stride length causes overstriding and braking forces.'
      },
      {
        question: 'A cyclist produces 300 W of power but only achieves 35 km/h instead of expected 40 km/h. Wind tunnel testing reveals a high drag coefficient (C_D = 0.9 vs. optimal 0.6). What intervention would most improve speed?',
        options: ['Increase power output to 400 W', 'Optimize aerodynamic position to reduce C_D to 0.6', 'Reduce body mass', 'Increase cadence'],
        correct: 1,
        explanation: 'At high speeds, drag dominates resistance (F_D ∝ v²). Reducing C_D from 0.9 to 0.6 reduces drag by 33%, allowing higher speed at same power. Increasing power to 400 W (33% increase) would only increase speed by ~10% (since v ∝ P^(1/3) when drag dominates). Aerodynamic optimization is more effective than power increase at high speeds. Body mass affects climbing, not flat speed. Cadence doesn\'t directly affect aerodynamics.'
      },
      {
        question: 'A football player (100 kg) running at 8 m/s tackles a stationary player (80 kg). Assuming perfectly inelastic collision (they move together), what is their post-collision velocity?',
        options: ['4.4 m/s', '5.3 m/s', '8.0 m/s', '2.2 m/s'],
        correct: 0,
        explanation: 'Conservation of momentum: m₁v₁ + m₂v₂ = (m₁ + m₂)v_f. (100 kg)(8 m/s) + (80 kg)(0 m/s) = (100 + 80 kg)v_f. 800 kg·m/s = 180 kg × v_f. v_f = 4.4 m/s. The combined mass moves at 4.4 m/s in the direction of the initial player. This demonstrates why momentum (mass × velocity) determines collision outcomes.'
      },
      {
        question: 'A marathon runner collapses with core temperature 41°C on a hot, humid day (35°C, 90% humidity). What is the primary mechanism of heat illness?',
        options: ['Inadequate conduction', 'Impaired evaporation due to high humidity', 'Excessive radiation absorption', 'Insufficient convection'],
        correct: 1,
        explanation: 'During exercise, evaporation is the primary heat loss mechanism. High humidity (90%) means air is nearly saturated with water vapor, impairing sweat evaporation. Sweat drips off without evaporating, providing minimal cooling. The body continues producing heat (metabolic + environmental), but cannot dissipate it, causing core temperature to rise to dangerous levels (>40°C). This causes protein denaturation, CNS dysfunction, and potentially death. Low humidity at same temperature would allow evaporation and prevent heat illness.'
      },
      {
        question: 'A figure skater spins at 2 rev/s with arms extended (I = 3 kg·m²). She pulls arms in, reducing I to 1 kg·m². What is her new spin rate?',
        options: ['4 rev/s', '6 rev/s', '8 rev/s', '1 rev/s'],
        correct: 1,
        explanation: 'Conservation of angular momentum: L = Iω is constant (no external torques). I₁ω₁ = I₂ω₂. (3 kg·m²)(2 rev/s) = (1 kg·m²)(ω₂). ω₂ = 6 rev/s. By reducing moment of inertia by 3x (pulling mass closer to rotation axis), angular velocity increases 3x to conserve angular momentum. This principle applies to diving (tuck position), gymnastics (layout vs. tuck), and any rotational sport.'
      }
    ],
  },
];

export const categories = [
  { id: 'all', name: 'All Topics', icon: 'grid', color: '#D4AF37' },
  { id: 'Fundamentals', name: 'Fundamentals', icon: 'school', color: '#6C5CE7' },
  { id: 'Muscular System', name: 'Muscular', icon: 'barbell', color: '#FF6B6B' },
  { id: 'Skeletal System', name: 'Skeletal', icon: 'body', color: '#F5E6D3' },
  { id: 'Cardiovascular', name: 'Cardiovascular', icon: 'heart', color: '#E74C3C' },
  { id: 'Exercise Physiology', name: 'Exercise Phys', icon: 'analytics', color: '#3498DB' },
  { id: 'Nutrition', name: 'Nutrition', icon: 'nutrition', color: '#00B894' },
  { id: 'Supplements', name: 'Supplements', icon: 'flask', color: '#9B59B6' },
  { id: 'Nervous System', name: 'Nervous', icon: 'flash', color: '#FFEAA7' },
  { id: 'Digestive System', name: 'Digestive', icon: 'refresh', color: '#A29BFE' },
  { id: 'Biomechanics', name: 'Biomechanics', icon: 'cog', color: '#607D8B' },
  { id: 'Endocrinology', name: 'Endocrinology', icon: 'beaker', color: '#E91E63' },
  { id: 'Sports Medicine', name: 'Sports Medicine', icon: 'medical', color: '#E74C3C' },
  { id: 'Physics', name: 'Physics', icon: 'nuclear', color: '#9B59B6' },
];

export const getTopicById = (id: string): AnatomyTopic | undefined => {
  return topics.find(t => t.id === id);
};

export const getTopicsByCategory = (category: string): AnatomyTopic[] => {
  if (category === 'all') return topics;
  return topics.filter(t => t.category === category);
};

export const getTopicsByLevel = (level: string): AnatomyTopic[] => {
  return topics.filter(t => t.level === level);
};

export const searchTopics = (query: string): AnatomyTopic[] => {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return topics.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.summary.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q) ||
    t.system.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.keyFacts.some(f => f.toLowerCase().includes(q))
  );
};

export const getAllQuizQuestions = (): { topic: AnatomyTopic; question: QuizQuestion }[] => {
  const all: { topic: AnatomyTopic; question: QuizQuestion }[] = [];
  topics.forEach(topic => {
    topic.quizQuestions.forEach(q => {
      all.push({ topic, question: q });
    });
  });
  return all;
};

export const getLearningPath = (): { level: string; title: string; description: string; topics: AnatomyTopic[] }[] => {
  return [
    {
      level: 'beginner',
      title: 'Foundation',
      description: 'Start with the basics of human anatomy and physiology',
      topics: topics.filter(t => t.level === 'beginner'),
    },
    {
      level: 'intermediate',
      title: 'Intermediate',
      description: 'Deepen your understanding of body systems and exercise science',
      topics: topics.filter(t => t.level === 'intermediate'),
    },
    {
      level: 'advanced',
      title: 'Advanced',
      description: 'Master complex physiological concepts and mechanisms',
      topics: topics.filter(t => t.level === 'advanced'),
    },
    {
      level: 'expert',
      title: 'Expert',
      description: 'Explore cutting-edge research and advanced applications',
      topics: topics.filter(t => t.level === 'expert'),
    },
  ];
};