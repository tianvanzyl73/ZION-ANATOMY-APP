import { Course, Quiz } from '../types';
import { MUSCLES } from './muscles';
import { BONES } from './skeletal';

const c = (x: Course) => x;

export const COURSES: Course[] = [
  c({
    id: 'course-foundations', title: 'Foundations of the Human Body', level: 'Beginner',
    description: 'Start at the cellular level and build up to organs and systems — the map of everything you are.',
    icon: 'cellular-outline',
    lessons: [
      { id: 'lesson-cells', title: 'The Cell: Unit of Life', minutes: 6, topicId: 'cell-overview', xp: 60,
        blocks: [
          { heading: 'You are built from cells', body: 'Your body is roughly 30 trillion cells working as a single organism. Each one takes in fuel, extracts energy, builds proteins, responds to signals and maintains its own internal environment.', bullets: ['Muscle cells specialize in contraction', 'Neurons specialize in signalling', 'Red blood cells specialize in oxygen transport'] },
          { heading: 'Organelles are departments', body: 'The nucleus stores instructions, mitochondria make ATP, ribosomes build proteins, and the membrane controls what enters and leaves. Specialization is about which department dominates.' },
        ],
        checkpoint: { prompt: 'Which organelle produces most of a cell’s ATP?', options: ['Ribosome', 'Mitochondrion', 'Nucleus', 'Lysosome'], answer: 1, explanation: 'Mitochondria oxidize carbohydrate and fat with oxygen to generate the bulk of cellular ATP.' } },
      { id: 'lesson-tissues', title: 'Four Tissues, Every Organ', minutes: 5, topicId: 'cell-tissue-types', xp: 60,
        blocks: [
          { heading: 'The four tissue types', body: 'Epithelial tissue covers and secretes; connective tissue supports (bone, tendon, fat, blood); muscle tissue contracts; nervous tissue signals. Every organ mixes these.', bullets: ['Bone and blood are both connective tissue', 'Tendons, ligaments and fascia differ mainly in fibre arrangement', 'Muscle is muscle tissue plus connective sheaths plus nerves'] },
        ],
        checkpoint: { prompt: 'Which tissue type includes bone, blood and tendon?', options: ['Epithelial', 'Connective', 'Muscular', 'Nervous'], answer: 1, explanation: 'Connective tissue includes bone, cartilage, blood, fat, tendons and ligaments — separated cells in abundant matrix.' } },
      { id: 'lesson-skeleton', title: 'The Living Skeleton', minutes: 7, topicId: 'skeletal-bone-tissue', xp: 70,
        blocks: [
          { heading: 'Bone is alive', body: 'Bone is a composite of collagen (flexible) and hydroxyapatite (rigid). It remodels continuously: osteoclasts remove, osteoblasts build, osteocytes sense strain. About 10% of your skeleton is replaced every year.' },
          { heading: 'Wolff’s law', body: 'Bone adapts to the loads placed on it. Heavy, fast and varied loading with rest and good nutrition builds density; disuse removes it.' },
        ],
        checkpoint: { prompt: 'Which cell dissolves old bone during remodeling?', options: ['Osteoblast', 'Osteoclast', 'Osteocyte', 'Chondrocyte'], answer: 1, explanation: 'Osteoclasts resorb bone; osteoblasts then fill the site with new matrix that mineralizes.' } },
      { id: 'lesson-heart', title: 'How Your Heart Actually Works', minutes: 6, topicId: 'cardio-heart', xp: 70,
        blocks: [
          { heading: 'Two pumps in one', body: 'The right side sends blood to the lungs to pick up oxygen; the left side drives it to the whole body. Four one-way valves keep flow moving forward.' },
          { heading: 'The numbers', body: 'At rest the heart moves ~5 L/min. In maximal exercise this can reach 20–25 L/min in untrained and 35–40 L/min in elite endurance athletes.' },
        ],
        checkpoint: { prompt: 'Which chamber pumps blood into the aorta?', options: ['Right atrium', 'Right ventricle', 'Left atrium', 'Left ventricle'], answer: 3, explanation: 'The left ventricle generates systemic pressure and ejects into the aorta through the aortic valve.' } },
      { id: 'lesson-lungs', title: 'Breathing and Gas Exchange', minutes: 6, topicId: 'respiratory-gas-exchange', xp: 70,
        blocks: [
          { heading: 'A surface the size of half a tennis court', body: '480 million alveoli give ~70 m² of exchange surface across a barrier only ~0.5 µm thick. Oxygen diffuses into blood; CO₂ diffuses out.' },
          { heading: 'Driven by gradients', body: 'No active pumping of gases — only partial-pressure differences. Alveolar PO₂ ~100 mmHg pulls oxygen in; tissue PO₂ ~20–40 mmHg pulls it out.' },
        ],
        checkpoint: { prompt: 'What primarily moves oxygen from alveoli into blood?', options: ['Active transport', 'Simple diffusion down a partial-pressure gradient', 'Ciliary action', 'Haemoglobin pumping'], answer: 1, explanation: 'Gases cross the respiratory membrane by simple diffusion, driven by partial pressure differences.' } },
    ],
  }),
  c({
    id: 'course-movement', title: 'Movement & Muscle Mechanics', level: 'Beginner',
    description: 'How muscle turns chemistry into force — fibres, sarcomeres, contraction and the exercises that train each major muscle.',
    icon: 'barbell-outline',
    lessons: [
      { id: 'lesson-sarcomere', title: 'Inside the Sarcomere', minutes: 7, topicId: 'muscular-sarcomere', xp: 70,
        blocks: [
          { heading: 'Z-disc to Z-disc', body: 'The sarcomere is the contractile unit. Myosin filaments sit centrally; actin filaments anchor to Z-discs. Overlap between them determines force.' },
          { heading: 'Length–tension', body: 'Force is maximal at resting length where cross-bridge overlap is optimal — too short or too long and force falls.' },
        ],
        checkpoint: { prompt: 'What shortens during contraction?', options: ['The A band', 'The I band and H zone', 'Myosin filaments', 'The Z-discs themselves'], answer: 1, explanation: 'Filaments do not shorten — they slide. The I band and H zone narrow as actin moves toward the centre.' } },
      { id: 'lesson-sliding', title: 'The Sliding Filament Cycle', minutes: 7, topicId: 'muscular-sliding-filament', xp: 70,
        blocks: [
          { heading: 'Five steps', body: 'ATP binds → myosin detaches. ATP hydrolysis → head cocks. Ca²⁺ exposes actin sites. Cross-bridge forms → power stroke. New ATP detaches and repeats.' },
          { heading: 'Calcium is the switch', body: 'Nerve signals release Ca²⁺ from the sarcoplasmic reticulum; ATP-powered pumps put it back. Relaxation costs energy too.' },
        ],
        checkpoint: { prompt: 'What exposes actin’s binding sites?', options: ['ATP binding to actin', 'Calcium binding troponin, shifting tropomyosin', 'Myosin phosphorylation', 'Lactic acid'], answer: 1, explanation: 'Ca²⁺ binds troponin, which moves tropomyosin off the myosin-binding sites on actin.' } },
      { id: 'lesson-fibres', title: 'Fibre Types and Why They Matter', minutes: 6, topicId: 'muscle-fibers', xp: 60,
        blocks: [
          { heading: 'Three types', body: 'Type I: slow, oxidative, fatigue-resistant. Type IIa: fast with mixed metabolism. Type IIx: fastest, most powerful, quickest to fatigue.' },
          { heading: 'Trainability', body: 'Training shifts IIx toward IIa, and every type grows. But baseline proportions are largely inherited.' },
        ],
        checkpoint: { prompt: 'Which fibre type is most fatigue-resistant?', options: ['Type I', 'Type IIa', 'Type IIx', 'All equally'], answer: 0, explanation: 'Type I fibres are rich in mitochondria and capillaries, built for sustained work.' } },
      { id: 'lesson-joints', title: 'Joints, Levers and Movement', minutes: 6, topicId: 'skeletal-joints', xp: 60,
        blocks: [
          { heading: 'Classification', body: 'Fibrous (immovable), cartilaginous (slight), synovial (free). Synovial subtypes — hinge, ball-and-socket, pivot, saddle, condyloid, plane — define the movements available.' },
          { heading: 'Lever advantage', body: 'Muscle insertions close to joints create speed and range at the cost of mechanical advantage. Your body is built for mobility, not maximum force.' },
        ],
        checkpoint: { prompt: 'The shoulder is which type of synovial joint?', options: ['Hinge', 'Ball and socket', 'Pivot', 'Saddle'], answer: 1, explanation: 'The shallow glenoid lets the humeral head move in all three planes — maximum mobility, less stability.' } },
    ],
  }),
  c({
    id: 'course-energy', title: 'Energy Systems & Performance', level: 'Intermediate',
    description: 'ATP, phosphagen power, glycolysis, oxidative metabolism, VO₂max and lactate — the engine room of performance.',
    icon: 'flash-outline',
    lessons: [
      { id: 'lesson-atp', title: 'ATP: The Currency', minutes: 6, topicId: 'energy-atp', xp: 70,
        blocks: [
          { heading: 'Not stored, constantly recycled', body: 'Muscle holds only seconds of maximal-work ATP. Three systems regenerate it continuously: phosphagen, glycolytic, oxidative.' },
          { heading: 'Scale', body: 'At rest you recycle roughly your body weight of ATP each day; maximal exercise multiplies that rate ~100×.' },
        ],
        checkpoint: { prompt: 'Why can’t you sprint on stored ATP alone?', options: ['ATP is too large to store', 'Muscle stores only seconds’ worth', 'ATP is used only at rest', 'Sprinting uses no ATP'], answer: 1, explanation: 'Only ~80–100 g of ATP/PCr exists in muscle — regeneration, not storage, sustains effort.' } },
      { id: 'lesson-systems', title: 'The Three Energy Systems', minutes: 8, topicId: 'energy-contribution', xp: 80,
        blocks: [
          { heading: 'Always a blend', body: 'All three systems contribute at any moment; the mix shifts with intensity and duration. 0–10 s phosphagen dominates, 10 s–2 min glycolysis, beyond ~2 min increasingly oxidative.' },
          { heading: 'Practical', body: 'Rest length determines which system you train. 30–60 s rest re-tests phosphagen; short rests stress glycolysis; long continuous work builds oxidative capacity.' },
        ],
        checkpoint: { prompt: 'A 400 m sprint draws most energy from:', options: ['Phosphagen only', 'Anaerobic glycolysis', 'Oxidative system', 'Protein metabolism'], answer: 1, explanation: 'The 400 m (~45–60 s) sits in the glycolytic-dominant zone with major phosphagen contribution at the start.' } },
      { id: 'lesson-vo2', title: 'VO₂max and Lactate Threshold', minutes: 8, topicId: 'energy-vo2max', xp: 80,
        blocks: [
          { heading: 'Ceiling vs fraction', body: 'VO₂max sets your ceiling; lactate threshold sets how close to it you can hold. Among similar-VO₂max athletes, threshold predicts the result.' },
          { heading: 'Training', body: 'VO₂max improves ~15–25% in sedentary people with training; threshold is far more trainable and shifts upward with specific work.' },
        ],
        checkpoint: { prompt: 'Which best predicts endurance performance among athletes with equal VO₂max?', options: ['Resting heart rate', 'Lactate threshold', 'Body mass index', 'Muscle mass'], answer: 1, explanation: 'The higher the threshold as a fraction of VO₂max, the faster the sustainable pace.' } },
      { id: 'lesson-fuelling', title: 'Fuel Use During Exercise', minutes: 7, topicId: 'exercise-during', xp: 70,
        blocks: [
          { heading: 'Crossover', body: 'At rest and low intensity fat dominates; as intensity rises carbohydrate takes over, until near-maximal work is almost entirely carbohydrate.' },
          { heading: 'Why glycogen matters', body: 'Depleting muscle glycogen after 60–90 min of hard work is “the wall” — fuelling delays it.' },
        ],
        checkpoint: { prompt: 'At very high intensity, which fuel dominates?', options: ['Fat', 'Carbohydrate', 'Protein', 'Ketones'], answer: 1, explanation: 'Carbohydrate yields ATP faster per unit oxygen — essential above ~85–90% VO₂max.' } },
    ],
  }),
  c({
    id: 'course-nutrition', title: 'Nutrition & Supplements, Evidence-Based', level: 'Intermediate',
    description: 'Protein, carbohydrate, hydration and the supplements with real evidence — clearly separated from marketing.',
    icon: 'nutrition-outline',
    lessons: [
      { id: 'lesson-protein', title: 'Protein Requirements for Active People', minutes: 7, topicId: 'nutrition-protein', xp: 70,
        blocks: [
          { heading: 'How much', body: '~1.4–2.0 g/kg/day is the commonly cited evidence-aligned range for active people. Per meal ~0.3–0.5 g/kg (≈20–40 g) maximizes the synthesis signal.' },
          { heading: 'Distribution and type', body: 'Spread over 3–5 meals. Source matters less than total — plant diets work with variety and enough total protein.' },
        ],
        checkpoint: { prompt: 'Which amino acid most strongly signals muscle protein synthesis?', options: ['Glycine', 'Leucine', 'Tryptophan', 'Alanine'], answer: 1, explanation: 'Leucine (~2–3 g per meal) is the key trigger for mTORC1-mediated translation.' } },
      { id: 'lesson-carbs', title: 'Carbohydrate and Performance', minutes: 6, topicId: 'nutrition-carbohydrates', xp: 70,
        blocks: [
          { heading: 'Scaling with training', body: 'From ~3–5 g/kg/day for light activity to 8–12 g/kg/day for very high endurance loads.' },
          { heading: 'During events', body: '30–60 g/h in events over ~60–90 min; up to ~90 g/h with mixed glucose+fructose in ultra events.' },
        ],
        checkpoint: { prompt: 'Mixed glucose and fructose helps because:', options: ['It tastes better', 'Different intestinal transporters allow higher total oxidation', 'Fructose is faster alone', 'It lowers insulin'], answer: 1, explanation: 'Using both SGLT1 and GLUT5 transport routes raises exogenous carbohydrate oxidation beyond glucose alone.' } },
      { id: 'lesson-hydration', title: 'Hydration Strategy', minutes: 5, topicId: 'nutrition-hydration', xp: 60,
        blocks: [
          { heading: 'Measure, don’t guess', body: 'Weigh before and after a session; each kg lost ≈ 1 L of sweat. Replace 125–150% of losses afterwards.' },
          { heading: 'Performance line', body: '2% body-mass loss reliably reduces endurance performance; 3–5% impairs strength and cognition.' },
        ],
        checkpoint: { prompt: 'Dehydration of what magnitude measurably reduces endurance performance?', options: ['0.5%', '1%', '2%', '5%'], answer: 2, explanation: 'Around 2% body-mass loss is the well-documented threshold for performance decline.' } },
      { id: 'lesson-creatine', title: 'Creatine: What the Evidence Says', minutes: 6, topicId: 'supplement-creatine', xp: 70,
        blocks: [
          { heading: 'Mechanism', body: 'Raises muscle phosphocreatine, speeding ATP regeneration during maximal efforts and between repeats.' },
          { heading: 'Evidence grade: strong', body: 'Benefits repeated sprints, strength and lean mass with training. Monohydrate is the benchmark form; timing matters less than consistency.' },
        ],
        checkpoint: { prompt: 'Which creatine form has the strongest evidence base?', options: ['Monohydrate', 'HCL', 'Buffered', 'Liquid'], answer: 0, explanation: 'Creatine monohydrate is the most studied; alternatives show no proven advantage.' } },
    ],
  }),
  c({
    id: 'course-clinical', title: 'Advanced Physiology & Recovery', level: 'Advanced',
    description: 'Hormonal control, nervous system integration, immunity, and recovery science at an advanced level.',
    icon: 'medkit-outline',
    lessons: [
      { id: 'lesson-hormones', title: 'The Hormonal Control Network', minutes: 9, topicId: 'endocrine-insulin', xp: 90,
        blocks: [
          { heading: 'Insulin and glucagon', body: 'Insulin stores (glucose uptake, glycogen, fat storage); glucagon mobilizes (glycogenolysis, gluconeogenesis). The ratio sets metabolic tone.' },
          { heading: 'Exercise interaction', body: 'Contraction recruits GLUT4 without insulin — the mechanistic reason exercise improves insulin sensitivity for 24–48 hours.' },
        ],
        checkpoint: { prompt: 'How does muscle take up glucose during exercise without much insulin?', options: ['It cannot', 'Contraction translocates GLUT4 transporters', 'Glucose diffuses freely', 'Glucagon opens channels'], answer: 1, explanation: 'Contraction-activated signalling moves GLUT4 to the membrane independently of insulin.' } },
      { id: 'lesson-neural', title: 'Neural Drive and Motor Units', minutes: 8, topicId: 'nervous-motor-units', xp: 90,
        blocks: [
          { heading: 'Size principle', body: 'Small fatigue-resistant units recruit first; large powerful units only at high force. Explosive intent recruits them sooner.' },
          { heading: 'Early strength gains are neural', body: 'Better recruitment, rate coding and coordination explain the rapid first-months strength rise.' },
        ],
        checkpoint: { prompt: 'Which factor raises force after all motor units are recruited?', options: ['Higher rate coding', 'Longer reflex arcs', 'More spindles', 'Reduced calcium'], answer: 0, explanation: 'Firing frequency (rate coding) increases force even at full recruitment.' } },
      { id: 'lesson-immunity', title: 'Exercise Immunology', minutes: 7, topicId: 'immune-recovery-immunity', xp: 80,
        blocks: [
          { heading: 'The J-curve', body: 'Moderate training is associated with fewer infections than sedentary living; extreme exertion transiently suppresses some immune functions.' },
          { heading: 'Open window', body: 'For 3–72 hours after exhaustive exercise some markers fall — manage with sleep, food, hygiene and stress control.' },
        ],
        checkpoint: { prompt: 'The “open window” refers to:', options: ['Muscle protein synthesis', 'A transient period of reduced immune function after exhaustive exercise', 'The anabolic window', 'Capillary recruitment'], answer: 1, explanation: 'Some immune functions are measurably reduced for hours after severe exertion.' } },
      { id: 'lesson-recovery', title: 'Recovery Science and Overtraining', minutes: 8, topicId: 'injury-recovery', xp: 80,
        blocks: [
          { heading: 'The hierarchy', body: 'Sleep, energy sufficiency and load management dominate. Tools — massage, compression, cold — provide modest transient effects.' },
          { heading: 'Overtraining', body: 'Prolonged performance decline with fatigue, mood and sleep disturbance. Prevention is planned recovery and honest monitoring.' },
        ],
        checkpoint: { prompt: 'Which recovery strategy has the strongest evidence?', options: ['Ice baths', 'Compression garments', 'Sleep', 'Massage guns'], answer: 2, explanation: 'Sleep is the foundation; the others show small, short-lived effects.' } },
    ],
  }),
];

// ---------- Quiz bank ----------

function pick<T>(arr: T[], n: number, offset = 0): T[] {
  const out: T[] = [];
  for (let i = 0; i < n && i < arr.length; i++) out.push(arr[(i + offset) % arr.length]);
  return out;
}

const boneQuestions = BONES.map((b, i) => ({
  id: `bone-${b.id}`,
  prompt: `Which bone is described as: “${b.subtitle}” — ${b.summary.split('.')[0].toLowerCase()}?`,
  options: [b.title, ...pick(BONES.filter((o) => o.id !== b.id), 3, i + 1).map((o) => o.title)],
  answer: 0,
  explanation: `${b.title}: ${b.summary}`,
  domain: 'skeletal' as const,
  kind: 'identification' as const,
}));

const muscleQuestions = MUSCLES.map((m, i) => ({
  id: `mus-${m.id}`,
  prompt: `Which muscle originates at “${m.origin.split('.')[0]}” and inserts at “${m.insertion.split('.')[0]}”?`,
  options: [m.title, ...pick(MUSCLES.filter((o) => o.id !== m.id), 3, i + 2).map((o) => o.title)],
  answer: 0,
  explanation: `${m.title}: origin ${m.origin} Insertion: ${m.insertion}`,
  domain: 'muscular' as const,
  kind: 'identification' as const,
}));

const conceptQuestions = [
  { id: 'cq1', prompt: 'What is the primary driver of muscle hypertrophy?', options: ['Metabolic stress alone', 'Mechanical tension', 'Muscle damage alone', 'Lactic acid accumulation'], answer: 1, explanation: 'Mechanical tension is considered the primary stimulus; other factors may contribute.', domain: 'muscular' as const, kind: 'concept' as const },
  { id: 'cq2', prompt: 'During maximal exercise, oxygen extraction in muscle can rise to what fraction of arterial oxygen?', options: ['25%', '50%', '75%+', 'It cannot change'], answer: 2, explanation: 'Arteriovenous O₂ difference widens substantially — trained muscle can extract 75% or more.', domain: 'cardiovascular' as const, kind: 'concept' as const },
  { id: 'cq3', prompt: 'What does the diaphragm do during inspiration?', options: ['Relaxes upward', 'Contracts downward and flattens', 'Rotates the ribs', 'Nothing — intercostals do all the work'], answer: 1, explanation: 'Contraction flattens the dome, enlarging the thorax and lowering pressure so air flows in.', domain: 'respiratory' as const, kind: 'concept' as const },
  { id: 'cq4', prompt: 'Which statement about lactate is correct?', options: ['Lactate causes all muscle soreness', 'Lactate is a fuel and shuttle between cells', 'Lactate stays in muscle forever', 'Lactate is only produced at rest'], answer: 1, explanation: 'Modern physiology views lactate as a valuable fuel and transport form of energy between cells.', domain: 'energy' as const, kind: 'concept' as const },
  { id: 'cq5', prompt: 'The autonomic nervous system branch that slows heart rate is:', options: ['Sympathetic', 'Parasympathetic (vagal)', 'Somatic', 'Enteric'], answer: 1, explanation: 'Vagal (parasympathetic) activity slows the sinoatrial node; withdrawal of it raises heart rate.', domain: 'nervous' as const, kind: 'concept' as const },
  { id: 'cq6', prompt: 'Which hormone is released by fat cells in proportion to fat stores?', options: ['Ghrelin', 'Leptin', 'Insulin', 'Cortisol'], answer: 1, explanation: 'Leptin signals long-term energy stores to the hypothalamus.', domain: 'endocrine' as const, kind: 'concept' as const },
  { id: 'cq7', prompt: 'Where does most nutrient absorption occur?', options: ['Stomach', 'Small intestine', 'Large intestine', 'Oesophagus'], answer: 1, explanation: 'Villi and microvilli give the small intestine ~250 m² of absorbing surface.', domain: 'digestive' as const, kind: 'concept' as const },
  { id: 'cq8', prompt: 'Which cells coordinate adaptive immunity by killing infected cells directly?', options: ['Neutrophils', 'Cytotoxic T cells', 'Red blood cells', 'Platelets'], answer: 1, explanation: 'CD8+ cytotoxic T cells recognize and kill infected or abnormal cells.', domain: 'immune' as const, kind: 'concept' as const },
  { id: 'cq9', prompt: 'What triggers muscle contraction at the molecular level?', options: ['Calcium binding troponin', 'ATP binding actin', 'Lactic acid release', 'Potassium influx'], answer: 0, explanation: 'Ca²⁺ binds troponin, shifting tropomyosin and exposing myosin-binding sites on actin.', domain: 'muscular' as const, kind: 'concept' as const },
  { id: 'cq10', prompt: 'VO₂max is best defined as:', options: ['Maximum heart rate', 'Maximum oxygen consumed per minute', 'Maximum lung volume', 'Anaerobic power'], answer: 1, explanation: 'VO₂max is maximal oxygen uptake per minute — the aerobic ceiling.', domain: 'energy' as const, kind: 'concept' as const },
  { id: 'cq11', prompt: 'Which supplement has strong evidence for repeated high-intensity performance?', options: ['BCAA', 'Creatine monohydrate', 'Glutamine', 'Tribulus'], answer: 1, explanation: 'Creatine monohydrate has among the strongest evidence bases in sports nutrition.', domain: 'supplement' as const, kind: 'concept' as const },
  { id: 'cq12', prompt: 'DOMS typically peaks:', options: ['Immediately after exercise', '24–72 hours later', 'One week later', 'During warm-up'], answer: 1, explanation: 'Soreness peaks 24–72 h post-exercise and resolves within 3–7 days.', domain: 'injury' as const, kind: 'concept' as const },
];

const supplementQuestions = [
  { id: 'sq1', prompt: 'Beta-alanine works by increasing which buffering compound in muscle?', options: ['Carnosine', 'Creatine', 'Bicarbonate only', 'Haemoglobin'], answer: 0, explanation: 'Beta-alanine is the rate-limiting precursor of muscle carnosine, an intracellular buffer.', domain: 'supplement' as const, kind: 'applied' as const },
  { id: 'sq2', prompt: 'Caffeine’s main ergogenic mechanism is:', options: ['Building muscle directly', 'Adenosine receptor antagonism reducing perceived effort', 'Increasing glycogen storage', 'Raising testosterone'], answer: 1, explanation: 'Blocking adenosine lowers perceived exertion — one of the most replicated effects in sport science.', domain: 'supplement' as const, kind: 'applied' as const },
  { id: 'sq3', prompt: 'Who should NOT take iron supplements without testing?', options: ['Everyone can safely take iron', 'People with normal or high iron status — overload is harmful', 'Only vegetarians', 'Only men'], answer: 1, explanation: 'Iron overload is dangerous; supplementation should follow testing and professional guidance.', domain: 'supplement' as const, kind: 'applied' as const },
  { id: 'sq4', prompt: 'Vitamin D is best described as:', options: ['An energy source', 'A hormone precursor essential for calcium absorption', 'A protein', 'A carbohydrate'], answer: 1, explanation: 'After activation it functions as a hormone regulating calcium and phosphate absorption.', domain: 'supplement' as const, kind: 'applied' as const },
  { id: 'sq5', prompt: 'Evidence for collagen supplementation for tendons is currently:', options: ['Strong and conclusive', 'Limited/preliminary', 'Proven harmful', 'Equivalent to surgery'], answer: 1, explanation: 'Small studies show changes in synthesis markers; no strong evidence yet for injury outcomes.', domain: 'supplement' as const, kind: 'applied' as const },
];

function shuffleDeterministic<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function rotateOptions(q: { id: string; prompt: string; options: string[]; answer: number; explanation: string; domain?: any; kind?: any }) {
  const shift = q.id.length % q.options.length;
  const opts = [...q.options.slice(shift), ...q.options.slice(0, shift)];
  const newAnswer = (q.answer - shift + q.options.length) % q.options.length;
  return { ...q, options: opts, answer: newAnswer };
}

export const QUIZZES: Quiz[] = [
  {
    id: 'quiz-bone-id', title: 'Bone Identification Test', description: 'Identify bones from their anatomy and function. 10 questions.', minutes: 6,
    domains: ['skeletal'],
    questions: shuffleDeterministic(boneQuestions, 7).slice(0, 10).map(rotateOptions),
  },
  {
    id: 'quiz-muscle-id', title: 'Muscle Identification Test', description: 'Identify muscles from origin and insertion. 10 questions.', minutes: 7,
    domains: ['muscular'],
    questions: shuffleDeterministic(muscleQuestions, 11).slice(0, 10).map(rotateOptions),
  },
  {
    id: 'quiz-systems', title: 'Systems & Physiology', description: 'Concepts across cardiovascular, respiratory, nervous and endocrine systems.', minutes: 6,
    domains: ['cardiovascular', 'respiratory', 'nervous', 'endocrine'],
    questions: shuffleDeterministic(conceptQuestions.filter((q) => ['cq1', 'cq2', 'cq3', 'cq5', 'cq6', 'cq7', 'cq8', 'cq9', 'cq10'].includes(q.id)), 5).map(rotateOptions),
  },
  {
    id: 'quiz-energy', title: 'Energy Systems Exam', description: 'ATP, glycolysis, oxidative metabolism, lactate and VO₂max.', minutes: 5,
    domains: ['energy'],
    questions: shuffleDeterministic([conceptQuestions[3], conceptQuestions[9], conceptQuestions[8], {
      id: 'eq1', prompt: 'The ATP-PC system can power maximal work for approximately:', options: ['2 seconds', '10 seconds', '2 minutes', '1 hour'], answer: 1, explanation: 'Phosphocreatine stores sustain ~10 seconds of maximal effort.', domain: 'energy' as const, kind: 'concept' as const,
    }, {
      id: 'eq2', prompt: 'Aerobic metabolism of one glucose yields approximately:', options: ['2 ATP', '4 ATP', '30–32 ATP', '100 ATP'], answer: 2, explanation: 'Glycolysis nets 2, Krebs 2, oxidative phosphorylation ~26–28.', domain: 'energy' as const, kind: 'concept' as const,
    }, {
      id: 'eq3', prompt: 'Fat oxidation typically peaks at what fraction of VO₂max?', options: ['10–20%', '45–65%', '85–95%', '100%'], answer: 1, explanation: 'Peak fat oxidation occurs around 45–65% VO₂max, higher in trained athletes.', domain: 'energy' as const, kind: 'concept' as const,
    }, {
      id: 'eq4', prompt: 'The Krebs cycle primarily produces:', options: ['ATP directly in large amounts', 'NADH and FADH₂ electron carriers', 'Lactate', 'Glucose'], answer: 1, explanation: 'Its main output is reduced electron carriers that feed the electron transport chain.', domain: 'energy' as const, kind: 'concept' as const,
    }], 3).map(rotateOptions),
  },
  {
    id: 'quiz-supplements', title: 'Supplement Evidence Quiz', description: 'Sort evidence from marketing across common supplements.', minutes: 5,
    domains: ['supplement'],
    questions: [...supplementQuestions, conceptQuestions[10]].map(rotateOptions),
  },
  {
    id: 'quiz-timed-exam', title: 'Timed Full-Body Exam', description: 'Mixed 15-question timed exam across every system.', minutes: 8,
    domains: ['skeletal', 'muscular', 'cardiovascular', 'respiratory', 'nervous', 'endocrine', 'energy', 'nutrition', 'supplement', 'injury', 'immune'],
    questions: shuffleDeterministic([...boneQuestions, ...muscleQuestions, ...conceptQuestions, ...supplementQuestions], 23).slice(0, 15).map(rotateOptions),
  },
];
