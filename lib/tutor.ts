import { TutorAnswer } from './types';
export type { TutorAnswer } from './types';
import { ALL_TOPICS, TOPIC_MAP, searchTopics } from './data/index';

interface TutorEntry {
  keys: string[];
  simple: string;
  detailed: string;
  scientific: string;
  anatomy: string[];
  related: string[];
  visual: string[];
  quiz: { prompt: string; options: string[]; answer: number; explanation: string };
  sources: string[];
}

const E: TutorEntry[] = [
  {
    keys: ['muscle grow', 'lift weights', 'get bigger', 'hypertrophy from lifting', 'build muscle', 'muscles when i lift'],
    simple: 'When you lift weights you create tiny amounts of stress in muscle fibres. Your body repairs them slightly thicker and stronger than before, so the muscle gradually grows.',
    detailed: 'Strength training creates mechanical tension — the main growth signal. Inside the fibres, mechano-sensors trigger signalling pathways (mTORC1) that raise muscle protein synthesis. Over the next 24–48 hours, with enough amino acids from protein and enough total energy, synthesis exceeds breakdown and the fibre adds myofibrils in parallel, increasing thickness. Early strength gains are mostly nervous-system improvements; visible size follows weeks later as the structural adaptation accumulates.',
    scientific: 'Mechanical tension activates integrin/PKC and stretch-activated channels, elevating phosphatidic acid and activating mTORC1 (mechanistic target of rapamycin complex 1), which increases translation initiation. Satellite cells are activated, donate myonuclei, and support long-term myofibrillar accretion. The AKT–mTOR axis is upregulated by amino acids (leucine) and by growth factors such as IGF-1; myostatin/SMAD signalling is a negative regulator. Net hypertrophy requires sustained positive net protein balance over weeks to months — mechanical tension remains the dominant stimulus, with metabolic stress and muscle damage contributing less.',
    anatomy: ['muscular-sarcomere', 'muscular-hypertrophy', 'cell-ribosomes', 'nervous-motor-units'],
    related: ['nutrition-protein', 'exercise-hypertrophy', 'muscular-sliding-filament'],
    visual: ['Compare a muscle cross-section before and after 12 weeks of training in the Muscular System explorer', 'Open the Sarcomere topic to see actin–myosin overlap', 'Try the Muscle Identification quiz to anchor anatomy names'],
    quiz: { prompt: 'What is considered the primary stimulus for muscle hypertrophy?', options: ['Mechanical tension', 'Muscle damage alone', 'Sweat loss', 'Stretching'], answer: 0, explanation: 'Mechanical tension is the dominant growth stimulus; damage and metabolic stress may contribute but are not required.' },
    sources: ['Kenney WL et al. Physiology of Sport and Exercise, 8th ed.', 'Schoenfeld BJ. The mechanisms of muscle hypertrophy. JSCR 2010.'],
  },
  {
    keys: ['creatine work', 'creatine', 'creatine do', 'what does creatine'],
    simple: 'Creatine gives your muscles a bigger reserve of instant energy (phosphocreatine). That lets you push a bit harder and recover faster between short, intense efforts.',
    detailed: 'Your muscles regenerate ATP using phosphocreatine. Taking creatine monohydrate daily raises muscle phosphocreatine stores by roughly 15–40%. During short maximal efforts — sprints, heavy sets — you can regenerate ATP for slightly longer before power drops, and between sets the stores refill faster so more work gets done across a session. With resistance training, that extra training volume translates into slightly greater strength and lean mass gains.',
    scientific: 'The creatine kinase reaction (ADP + PCr ⇌ ATP + creatine) buffers cytosolic ATP during high flux. Supplementation increases total muscle creatine via SLC6A8/SLC6A8-mediated uptake, sodium- and insulin-sensitive. Higher PCr also accelerates PCr resynthesis during recovery (faster τ of PCr recovery), and cell swelling and satellite cell activity are proposed adjunct mechanisms. Strong evidence exists for repeated high-intensity performance and strength/lean mass with training; cognitive and clinical applications remain emerging research, not established.',
    anatomy: ['energy-atp-pc', 'energy-atp', 'muscular-sliding-filament'],
    related: ['supplement-creatine', 'exercise-strength', 'energy-contribution'],
    visual: ['Open the Energy Systems lab and watch the ATP-PC timeline animation', 'Compare the 0–10 s and 1–2 min energy contribution bars'],
    quiz: { prompt: 'How does creatine primarily help performance?', options: ['Burns fat directly', 'Increases phosphocreatine for faster ATP regeneration', 'Raises testosterone', 'Improves lung capacity'], answer: 1, explanation: 'More phosphocreatine means faster ATP regeneration during maximal efforts and quicker recovery between efforts.' },
    sources: ['Kreider RB et al. ISSN position stand: creatine. JISSN 2017.', 'ZUID: see Energy Systems module references.'],
  },
  {
    keys: ['heart rate increase', 'why does my heart rate', 'heart beat faster', 'heart rate go up'],
    simple: 'Your heart beats faster during exercise because working muscles need more oxygen. The heart pumps more blood each minute to deliver it.',
    detailed: 'Two things happen. First, your brain withdraws the “brake” (vagal/parasympathetic activity) on the heart — that happens within a second of starting. Second, sympathetic nerves and adrenaline actively speed the heart and make it contract harder. Meanwhile muscle arterioles dilate from local metabolites, so more of each heartbeat reaches the working muscles. Cardiac output = heart rate × stroke volume; both rise to meet demand.',
    scientific: 'Central command and group III/IV muscle afferents initiate autonomic adjustment. Vagal withdrawal increases SA node rate rapidly; sympathetic noradrenaline and circulating adrenaline act on β1-adrenergic receptors increasing funny-channel current (If) and Ca²⁺ handling, raising chronotropy and inotropy. Stroke volume rises via increased venous return (Frank–Starling) and contractility until ~40–50% VO₂max, after which heart-rate increases dominate further rises in cardiac output toward Qmax ≈ 20–25 L/min untrained, 35–40 L/min elite.',
    anatomy: ['cardio-heart-rate', 'cardio-cardiac-output', 'nervous-autonomic-nervous-system', 'endocrine-adrenaline'],
    related: ['cardio-blood-pressure', 'exercise-during', 'nervous-fight-or-flight'],
    visual: ['Open the Heart topic to trace the four chambers', 'View Cardiovascular System stats for resting vs maximal output'],
    quiz: { prompt: 'What is the first mechanism raising heart rate when exercise begins?', options: ['Vagal (parasympathetic) withdrawal', 'Increased blood pH', 'Rising lactate', 'Core temperature drop'], answer: 0, explanation: 'Withdrawal of vagal tone accelerates the SA node within about one second, before sympathetic activation peaks.' },
    sources: ['Hall JE. Guyton and Hall Textbook of Medical Physiology, 14th ed.', 'Kenney WL et al. Physiology of Sport and Exercise, 8th ed.'],
  },
  {
    keys: ['oxygen reach my muscles', 'how does oxygen get', 'oxygen travel', 'oxygen to muscles'],
    simple: 'You breathe oxygen into your lungs, it slips into your blood, attaches to haemoglobin in red blood cells, and the heart pumps it out to your muscles, where it jumps off and enters the muscle cells.',
    detailed: 'The path is: alveolus → capillary in the lung → binds haemoglobin in red cells → pulmonary vein → left heart → arteries → muscle capillary → tissue fluid → muscle cell → mitochondrion. Each step is passive diffusion driven by partial-pressure differences, except the pumping. In exercising muscle, capillaries recruit, temperature rises and pH falls — all of which help haemoglobin unload its oxygen exactly where it is needed.',
    scientific: 'Oxygen diffuses across the 0.5 µm respiratory membrane along a PO₂ gradient (alveolar ~100 mmHg → mixed venous ~40 mmHg). Binding is cooperative (Hill coefficient ~2.8), giving the sigmoid dissociation curve. In tissue, ↑temperature, ↑PCO₂, ↓pH and ↑2,3-BPG shift the curve right (Bohr effect), enhancing unloading. Fick: VO₂ = Q × (CaO₂ − CvO₂). Diffusing capacity increases with recruitment and distension of pulmonary capillaries during exercise.',
    anatomy: ['respiratory-gas-exchange', 'cardio-hemoglobin', 'cardio-capillaries', 'cell-mitochondria'],
    related: ['cardio-red-blood-cells', 'energy-oxygen-consumption', 'respiratory-alveoli'],
    visual: ['Follow the O₂ journey animation in the Cardiovascular System explorer', 'Compare lung and muscle capillary exchange in the Alveoli topic'],
    quiz: { prompt: 'What makes haemoglobin release oxygen more readily in exercising muscle?', options: ['Higher pH and lower temperature', 'Lower pH, higher CO₂ and temperature (Bohr effect)', 'Increased insulin', 'Lower blood pressure'], answer: 1, explanation: 'Acidosis, CO₂ and heat shift the oxygen–haemoglobin curve right, increasing unloading.' },
    sources: ['Hall JE. Guyton and Hall, 14th ed.', 'West JB. Respiratory Physiology, 11th ed.'],
  },
  {
    keys: ['out of breath', 'breathless', 'why do i breathe hard', 'breathing during exercise', 'why do i get tired'],
    simple: 'You breathe harder because your muscles are producing CO₂ and using oxygen faster. Breathing rises to expel CO₂ and bring in O₂ — it is your body’s ventilation keeping pace with metabolism.',
    detailed: 'Ventilation rises nearly linearly with exercise intensity, then climbs faster past the ventilatory threshold when buffers release extra CO₂. The medulla senses CO₂ and pH; at very high intensity the drive is enormous, and the sensation of breathlessness is largely the awareness of that respiratory drive.',
    scientific: 'Central chemoreceptors detect CSF H⁺ from CO₂ hydration; peripheral (carotid/aortic) bodies add hypoxic and further CO₂/pH drive. Ventilation can reach >150 L/min in trained athletes; respiratory muscle work may consume 10–16% of VO₂ at maximal effort and contribute to perceived effort.',
    anatomy: ['respiratory-respiratory-rate', 'respiratory-breathing-mechanics', 'energy-lactate-threshold'],
    related: ['respiratory-diaphragm', 'exercise-during', 'energy-lactate'],
    visual: ['Open the Respiratory System explorer to see the diaphragm contracting', 'Read Lung Volumes for tidal volume at rest vs max exercise'],
    quiz: { prompt: 'What is the main chemical driver of resting breathing rhythm?', options: ['Oxygen', 'Carbon dioxide (via pH)', 'Nitrogen', 'Glucose'], answer: 1, explanation: 'CO₂-derived H⁺ in the medulla is the dominant resting respiratory stimulus.' },
    sources: ['West JB. Respiratory Physiology.', 'Kenney WL et al. Physiology of Sport and Exercise.'],
  },
  {
    keys: ['sore', 'doms', 'soreness', 'ache after workout', 'why am i sore'],
    simple: 'Soreness after new or harder exercise — especially lowering phases — comes from tiny repair processes in muscle, not from “lactic acid”. It peaks 24–72 hours later and fades as your body adapts.',
    detailed: 'Unaccustomed exercise, particularly eccentric (lowering) work, disrupts some sarcomeres and membranes. Fluid, immune cells and repair signals follow, producing soreness, stiffness and temporary strength loss. The adaptation is protective: the same session hurts much less next time (repeated-bout effect). Light movement, sleep, food and time help most.',
    scientific: 'Eccentric loading produces non-uniform sarcomere strain, Z-line streaming and membrane disruption, followed by neutrophil/macrophage infiltration, oedema and bradykinin/prostaglandin sensitization of group III/IV afferents. Lactate is cleared within ~30–60 minutes and is not causal. Repeated-bout protection is neurally and structurally mediated, evident after a single eccentric session.',
    anatomy: ['injury-doms', 'immune-inflammation', 'muscular-muscle-contraction'],
    related: ['injury-recovery', 'exercise-recovery', 'immune-monocytes-macrophages'],
    visual: ['Compare concentric vs eccentric mechanics in Muscle Contraction Types', 'Review the recovery hierarchy in Recovery Science'],
    quiz: { prompt: 'DOMS is mainly associated with which type of contraction?', options: ['Concentric', 'Eccentric', 'Isometric', 'Passive'], answer: 1, explanation: 'Unaccustomed eccentric work produces the most micro-damage and soreness.' },
    sources: ['Cheung K et al. Delayed onset muscle soreness. Sports Med 2003.', 'Hyldahl RD, Hubal MJ. Lengthening our perspective. Front Physiol 2014.'],
  },
  {
    keys: ['lactate', 'lactic acid', 'lactate threshold'],
    simple: 'Lactate is a fuel your muscles make when they burn carbohydrate quickly. It is not a waste product — other muscles and the heart burn it for energy. Your “threshold” is the pace where it starts to pile up.',
    detailed: 'When glycolysis runs faster than mitochondria can process pyruvate, pyruvate becomes lactate and is shuttled out to be burned elsewhere or rebuilt into glucose by the liver. Above a certain intensity, production outruns clearance and blood lactate climbs steeply — that threshold is one of the best predictors of endurance performance and is highly trainable.',
    scientific: 'Lactate dehydrogenase equilibrates pyruvate/lactate while regenerating NAD⁺ for continued glycolysis. MCT1/MCT4 transporters mediate the intercellular lactate shuttle (Brooks). H⁺ accumulation from ATP hydrolysis, not lactate per se, drives acidosis. Threshold adaptations include mitochondrial biogenesis, MCT density, oxidative enzyme activity, and enhanced buffering via carnosine and bicarbonate systems.',
    anatomy: ['energy-lactate', 'energy-lactate-threshold', 'energy-glycolysis'],
    related: ['exercise-endurance', 'energy-oxidative', 'exercise-hiit'],
    visual: ['See the energy contribution timeline for where glycolysis dominates', 'Open Lactate Threshold for the 80–90% VO₂max comparison'],
    quiz: { prompt: 'What primarily causes acidosis in intense exercise?', options: ['Lactate itself', 'H⁺ accumulation from rapid ATP turnover', 'Fat oxidation', 'CO₂ in muscle'], answer: 1, explanation: 'Hydrogen ions from ATP hydrolysis outpace buffering; lactate formation actually consumes H⁺.' },
    sources: ['Brooks GA. Lactate shuttle. J Physiol 2009.', 'Kenney WL et al. Physiology of Sport and Exercise.'],
  },
  {
    keys: ['protein how much', 'protein per day', 'how much protein'],
    simple: 'Most active people do well with roughly 1.4–2.0 grams of protein per kilogram of body weight per day, spread across 3–5 meals of about 20–40 g each.',
    detailed: 'Protein needs rise with training, especially strength work and calorie deficits. The commonly cited evidence-based range for athletes is ~1.4–2.0 g/kg/day; older adults may benefit from slightly higher per-meal doses due to anabolic resistance. Total daily intake matters most; timing around workouts is a smaller detail.',
    scientific: 'Per-meal leucine threshold ~2–3 g maximizes MPS stimulation; the “muscle full” phenomenon limits further response until refractory feeding. Nitrogen balance and IAAO (indicator amino acid oxidation) studies underpin current recommendations. Whole food and supplemental protein produce equivalent outcomes at matched intakes.',
    anatomy: ['nutrition-protein', 'nutrition-protein-synthesis', 'cell-ribosomes'],
    related: ['muscular-hypertrophy', 'supplement-protein-powder', 'nutrition-calories'],
    visual: ['See Muscle Protein Synthesis vs Breakdown for the net-balance curve', 'Compare protein sources in the Nutrition library'],
    quiz: { prompt: 'Approximately how much protein per meal maximally stimulates muscle protein synthesis in most people?', options: ['5 g', '20–40 g', '100 g', 'It is unlimited'], answer: 1, explanation: 'About 20–40 g (0.3–0.5 g/kg) with ~2–3 g leucine saturates the acute response.' },
    sources: ['Thomas DT et al. AND/DC/ACSM Position Stand, 2016.', 'Norton LE, Layman DK. Leucine threshold. J Nutr 2006.'],
  },
  {
    keys: ['why am i tired', 'fatigue', 'tired during exercise'],
    simple: 'Fatigue has several sources: fuel running low, acid and metabolite build-up, and your brain dialling down effort to protect you. Usually it is a mix of all three.',
    detailed: 'Peripheral fatigue includes glycogen depletion, PCr depletion, H⁺ accumulation, extracellular K⁺ accumulation and impaired calcium release. Central fatigue is a reduction in voluntary neural drive — influenced by serotonin, dopamine, adenosine, inflammation and simply how hard the effort feels.',
    scientific: 'Task-dependence principle: the locus of fatigue depends on the task. Substrate depletion dominates prolonged endurance work; metabolite accumulation and excitation–contraction coupling failure dominate high-intensity efforts; central drive reduction contributes across modalities and is detectable as reduced voluntary activation (interpolated twitch technique).',
    anatomy: ['exercise-during', 'nervous-central-fatigue', 'energy-glycogen'],
    related: ['exercise-recovery', 'injury-overtraining', 'energy-lactate'],
    visual: ['Open Energy Systems to see fuel depletion timelines', 'Read Central Fatigue & Pain for the brain side of effort'],
    quiz: { prompt: 'Which factor dominates fatigue in prolonged endurance exercise?', options: ['Glycogen depletion', 'Blood pH rise', 'Excess oxygen', 'Ligament strain'], answer: 0, explanation: 'Muscle and liver glycogen depletion is a primary limiter in events beyond 60–90 minutes.' },
    sources: ['Kenney WL et al. Physiology of Sport and Exercise.', 'Noakes TD. Central governance model. Sports Med 2012.'],
  },
  {
    keys: ['burn fat', 'fat burning', 'lose fat', 'fat loss'],
    simple: 'Fat loss comes mainly from a sustained energy deficit — eating a bit less than you burn. Exercise improves health, preserves muscle and makes the deficit easier to create.',
    detailed: 'You cannot “burn fat from” a specific body area. Mobilized fat is used systemically. During exercise, fat oxidation peaks at ~45–65% VO₂max; higher intensities shift to carbohydrate. Total daily energy balance remains the determinant of fat mass change, with protein intake and resistance training preserving muscle while dieting.',
    scientific: 'Lipolysis (HSL/ATGL) liberates FFA transported on albumin; intramuscular triglyceride is a parallel source. CPT1 shuttles fatty acyl-CoA into mitochondria for β-oxidation. Energy flux and storage dynamics are governed by energy balance; EPOC adds ~6–15% of session energy — meaningful but modest.',
    anatomy: ['nutrition-energy-balance', 'energy-fat-oxidation', 'nutrition-calories'],
    related: ['exercise-endurance', 'nutrition-protein', 'endocrine-leptin'],
    visual: ['Open Fat Oxidation for the intensity-vs-fat-use curve', 'Review Energy Balance for adaptation effects'],
    quiz: { prompt: 'Where does fat oxidation peak as exercise intensity rises?', options: ['At maximal sprint', 'Around 45–65% VO₂max', 'Only at rest', 'It never changes'], answer: 1, explanation: 'Fat oxidation peaks at moderate intensity, then carbohydrate takes over as demand rises.' },
    sources: ['Kenney WL et al. Physiology of Sport and Exercise.', 'Achten J, Jeukendrup AE. Maximal fat oxidation. Int J Sports Med 2003.'],
  },
  {
    keys: ['why do we sleep', 'sleep and recovery', 'sleep important'],
    simple: 'Sleep is when your body does its deepest repair: growth hormone pulses, memory consolidates, immunity rebalances and the brain clears waste.',
    detailed: 'Restricting sleep measurably reduces strength, accuracy, reaction time and pain tolerance, and it disturbs appetite hormones. Most adults need 7–9 hours; athletes in heavy training often benefit from more.',
    scientific: 'Slow-wave sleep hosts the largest daily GH pulse and glymphatic clearance; REM supports procedural and emotional memory consolidation. Sleep restriction lowers leptin and raises ghrelin, increases cortisol and next-day perceived exertion, and blunts immune response to challenge.',
    anatomy: ['injury-sleep', 'endocrine-growth-hormone', 'endocrine-melatonin'],
    related: ['injury-recovery', 'exercise-recovery', 'nervous-cerebrum'],
    visual: ['Open Sleep in Injury & Recovery', 'Link to Growth Hormone for the sleep-pulse graph'],
    quiz: { prompt: 'When does the largest daily growth hormone pulse occur?', options: ['Midday', 'During slow-wave sleep', 'Immediately after eating', 'During maximal exercise'], answer: 1, explanation: '~70% of daily GH is released in early slow-wave sleep.' },
    sources: ['Walker M. Why We Sleep. 2017.', 'Fullagar HH et al. Sleep and athletic performance. Sports Med 2015.'],
  },
  {
    keys: ['sweat', 'why do i sweat', 'sweating'],
    simple: 'Sweat is your cooling system. Evaporating sweat carries heat away from your skin so your core temperature stays in a safe range.',
    detailed: 'Only ~20–25% of muscle energy becomes movement; the rest becomes heat. Eccrine glands release fluid that evaporates and cools you. Humidity reduces evaporation, which is why hot-humid days feel so hard — your heart must serve both muscle and skin.',
    scientific: 'Preoptic/anterior hypothalamic nuclei integrate thermosensory input and increase sympathetic cholinergic sudomotor output; sweat rate scales with core temperature rise and adapts (earlier onset, more dilute, higher volume) with heat acclimatization over 10–14 days. Sweat sodium varies 200–2,000 mg/L with genetics and acclimatization state.',
    anatomy: ['integumentary-thermoregulation', 'integumentary-dermis', 'exercise-during'],
    related: ['nutrition-hydration', 'nutrition-electrolytes', 'injury-hydration'],
    visual: ['Open the Skin explorer to see eccrine gland distribution', 'Read Thermoregulation for the heat-illness spectrum'],
    quiz: { prompt: 'Why is exercise harder in humid conditions?', options: ['Sweat cannot evaporate efficiently', 'Air contains less oxygen', 'Heart rate cannot rise', 'Muscles produce less ATP'], answer: 0, explanation: 'High humidity limits evaporation, reducing your main cooling route and raising cardiovascular strain.' },
    sources: ['Kenney WL et al. Physiology of Sport and Exercise.', 'ACSM Position Stand: Exertional heat illness. 2023.'],
  },
];

const GREETINGS = ['hi', 'hello', 'hey', 'yo', 'sup', 'good morning', 'good evening'];

function scoreEntry(q: string, entry: TutorEntry): number {
  let score = 0;
  const lq = q.toLowerCase();
  for (const k of entry.keys) {
    if (lq.includes(k)) score += 30 - Math.min(10, k.length / 6);
  }
  const words = lq.split(/[^a-z0-9]+/).filter((w) => w.length > 3);
  for (const w of words) {
    if (entry.keys.some((k) => k.includes(w))) score += 12;
    if (entry.simple.toLowerCase().includes(w)) score += 2;
    if (entry.detailed.toLowerCase().includes(w)) score += 2;
  }
  return score;
}

function answerFromTopic(topicId: string): TutorAnswer | null {
  const t = TOPIC_MAP[topicId];
  if (!t) return null;
  const first = t.sections[0];
  const second = t.sections[1];
  return {
    question: t.title,
    simple: t.summary,
    detailed: `${first ? first.body : ''} ${second ? second.body : ''}`.trim() || t.summary,
    scientific: t.sections.map((s) => `${s.heading}: ${s.body}`).join('\n\n'),
    anatomy: [t.id, ...t.related.slice(0, 3)],
    relatedTopics: t.related.slice(0, 5),
    visual: [`Open the ${t.system} explorer to see ${t.title} in context`, `Review the “${t.sections[0]?.heading ?? 'Overview'}” section, then test yourself with a related quiz`],
    quiz: {
      prompt: `Which statement about ${t.title} is most accurate?`,
      options: [t.summary.split('. ')[0] + '.', t.facts[0] ?? 'It is part of the ' + t.system, `It has no relationship to ${t.system}`, 'It only functions at rest.'].filter((v, i, a) => a.indexOf(v) === i).slice(0, 4),
      answer: 0,
      explanation: t.summary,
    },
    sources: t.refs ?? ['ZION ANATOMY internal knowledge base — see topic references.'],
  };
}

export const TUTOR_SUGGESTIONS = [
  'What happens to my muscles when I lift weights?',
  'How does creatine work?',
  'Why does my heart rate increase when I exercise?',
  'How does oxygen reach my muscles?',
  'Why do I get out of breath so fast?',
  'Why am I sore the day after training?',
  'How much protein do I actually need?',
  'How does my body use fat as fuel?',
  'Why do we sweat when we exercise?',
  'What is lactate and why does it matter?',
];

export function askTutor(question: string): TutorAnswer {
  const q = question.trim();
  const lq = q.toLowerCase();

  if (!q) {
    return {
      question: 'Ask me anything about the human body',
      simple: 'Try asking about muscles, bones, energy, hormones, supplements, recovery — anything in anatomy and physiology.',
      detailed: 'ZION EDUCATOR searches a curated knowledge base of the human body — from cells to systems — and answers in three depths: simple, detailed and scientific.',
      scientific: 'The tutor performs keyword and semantic scoring across a structured corpus of anatomy, physiology and exercise-science entries, then composes layered explanations with linked structures and self-test questions.',
      anatomy: [], relatedTopics: ['cell-overview', 'cardio-heart', 'muscular-sarcomere'],
      visual: ['Explore the body explorer to see systems in place', 'Try a course lesson for structured learning'],
      quiz: { prompt: 'What are the three depths of every ZION answer?', options: ['Simple, detailed, scientific', 'Fast, slow, medium', 'Basic, medium, expert only', 'Yes, no, maybe'], answer: 0, explanation: 'Every answer can be read at three depths so you can go as deep as you like.' },
      sources: ['ZION ANATOMY knowledge base.'],
    };
  }

  const best = E.map((entry) => ({ entry, score: scoreEntry(q, entry) })).sort((a, b) => b.score - a.score)[0];

  if (best && best.score > 14) {
    const e = best.entry;
    return {
      question: q,
      simple: e.simple,
      detailed: e.detailed,
      scientific: e.scientific,
      anatomy: e.anatomy,
      relatedTopics: e.related,
      visual: e.visual,
      quiz: e.quiz,
      sources: e.sources,
    };
  }

  // Fall back to knowledge-base search
  const hits = searchTopics(q, 3);
  if (hits.length) {
    const primary = hits[0];
    const built = answerFromTopic(primary.id);
    if (built) {
      const others = hits.slice(1).map((h) => h.id);
      return { ...built, relatedTopics: [...built.relatedTopics, ...others].slice(0, 6) };
    }
  }

  const words = lq.split(/[^a-z0-9]+/).filter((w) => w.length > 3);
  const domainGuess = ALL_TOPICS.find((t) => words.some((w) => t.title.toLowerCase().includes(w) || t.tags.some((tag) => tag.includes(w))));
  if (domainGuess) {
    const built = answerFromTopic(domainGuess.id);
    if (built) return built;
  }

  return {
    question: q,
    simple: `I could not find a confident match for that question in my knowledge base yet — but I can answer questions about any structure, system, hormone, nutrient, supplement or physiological process in ZION ANATOMY.`,
    detailed: `Try naming the structure or process directly — for example “hamstring”, “VO₂max”, “insulin”, “creatine”, “lactate”, “diaphragm” or “bone density”. Every topic in the app is searchable and linked to related topics so you can follow the thread.`,
    scientific: 'The tutor ranks curated entries by keyword and tag overlap. When confidence is low, it defers rather than speculating — an intentional guard against unsupported claims. Explore the Systems library or use Search to find the topic, then ask again with a specific term.',
    anatomy: [], relatedTopics: ['cell-overview', 'cardio-heart', 'energy-atp', 'muscular-sarcomere'],
    visual: ['Open Search and type a body part, hormone or supplement', 'Start a course for a guided path through the body'],
    quiz: { prompt: 'What should you do if the tutor cannot answer confidently?', options: ['Ask with a more specific anatomy or physiology term', 'Assume the answer is no', 'Repeat the same question', 'Ask about unrelated topics'], answer: 0, explanation: 'Specific terms route your question directly into the knowledge base.' },
    sources: ['ZION ANATOMY knowledge base.'],
  };
}

export function isGreeting(q: string): boolean {
  const lq = q.trim().toLowerCase();
  return GREETINGS.some((g) => lq === g || lq === g + '?' || lq.length < 3);
}
