import { topics, AnatomyTopic } from './data';

interface AIResponse {
  answer: string;
  relatedTopics: string[];
  confidence: number;
}

const knowledgeBase: Record<string, { answer: string; related: string[] }> = {
  'muscle growth': {
    answer: 'Muscle growth (hypertrophy) occurs through three primary mechanisms:\n\n1. **Mechanical Tension** — The primary driver. Heavy loads create tension that activates the mTOR pathway, triggering protein synthesis.\n\n2. **Metabolic Stress** — The "pump." Accumulation of metabolites (lactate, H+ ions) during high-rep sets causes cellular swelling that signals growth.\n\n3. **Muscle Damage** — Micro-tears from eccentric contractions activate satellite cells that donate nuclei to muscle fibers, increasing their growth capacity.\n\nFor optimal growth: train each muscle 2x/week, use varied rep ranges (5-30), consume 1.6-2.2g protein/kg/day, and ensure adequate recovery.',
    related: ['hypertrophy', 'muscle-fibers', 'protein-synthesis', 'recovery'],
  },
  'protein': {
    answer: 'Protein is essential for muscle repair and growth. Here are the key facts:\n\n• **Optimal intake:** 1.6-2.2g per kg of bodyweight daily\n• **Per meal:** 20-40g with at least 3g of leucine to maximally stimulate MPS\n• **Best sources:** Eggs, whey, chicken, beef, fish (highest biological value)\n• **Timing:** Total daily intake matters more than timing. The "anabolic window" is 4-6 hours, not 30 minutes.\n• **Before bed:** Casein protein (30-40g) can boost overnight MPS by ~22%\n\nProtein has a thermic effect of 20-30%, meaning your body burns more calories digesting it than carbs or fat.',
    related: ['nutrition-basics', 'hypertrophy', 'cells-intro'],
  },
  'creatine': {
    answer: 'Creatine monohydrate is the most evidence-backed supplement in sports science:\n\n• **Mechanism:** Increases phosphocreatine stores by 20-40%, enhancing the phosphagen energy system\n• **Benefits:** 5-15% strength increase, improved power output, enhanced recovery, cognitive benefits\n• **Dosing:** 3-5g/day maintenance (loading optional: 20g/day for 5-7 days)\n• **Safety:** Extensively studied with no adverse effects in healthy individuals\n• **Form:** Monohydrate is the best — other forms offer no proven advantage\n\nTake it consistently, any time of day. It works through saturation, not timing.',
    related: ['creatine', 'energy-systems', 'muscle-fibers'],
  },
  'fat loss': {
    answer: 'Fat loss follows the principle of energy balance — you must be in a caloric deficit:\n\n• **Moderate deficit:** 300-500 kcal below maintenance for sustainable loss (~0.5-1 lb/week)\n• **High protein:** 2.0-2.4g/kg to preserve muscle mass during a cut\n• **Resistance training:** Essential to signal muscle retention. Without it, up to 50% of weight lost can be muscle.\n• **Cardio:** Helpful for increasing deficit, but not required. NEAT (daily movement) is often underestimated.\n• **Metabolic adaptation:** Your metabolism slows during prolonged deficits. Refeeds and diet breaks help mitigate this.\n\nSpot reduction is a myth — you cannot target fat loss in specific areas.',
    related: ['nutrition-basics', 'energy-systems', 'recovery'],
  },
  'cardio': {
    answer: 'Cardiovascular training has profound benefits for health and performance:\n\n• **Zone 2 (60-70% max HR):** Builds aerobic base, increases mitochondrial density, improves fat oxidation. Should comprise ~80% of cardio volume.\n• **VO2 Max intervals (90-100% max HR):** 4x4 minute intervals improve maximum aerobic capacity. Include 1-2 sessions/week.\n• **Benefits:** Lower resting HR, improved blood lipids, reduced disease risk, better recovery between sets.\n• **For lifters:** Moderate cardio (2-3x/week, 20-30 min) enhances recovery without impairing strength gains.\n\nVO2 max is one of the strongest predictors of longevity — even more powerful than many medications.',
    related: ['vo2max', 'heart', 'cardiovascular', 'energy-systems'],
  },
  'sleep': {
    answer: 'Sleep is the most powerful recovery tool available:\n\n• **Duration:** 7-9 hours for most adults, 8-10 for athletes\n• **Deep sleep (NREM 3-4):** Growth hormone peaks, tissue repair accelerates, immune function strengthens\n• **REM sleep:** Motor learning consolidation, memory processing, cognitive recovery\n• **Impact of deprivation:** Even 1 hour less per night reduces MPS by ~18%, increases cortisol, impairs glucose metabolism\n\n**Tips:** Keep room cool (65-68°F), avoid screens 1hr before bed, maintain consistent schedule, limit caffeine after 2pm, consider magnesium glycinate (200-400mg) before bed.',
    related: ['recovery', 'hypertrophy', 'nervous-intro'],
  },
  'strength': {
    answer: 'Strength development involves both neural and muscular adaptations:\n\n**Neural Adaptations (first 4-8 weeks):**\n• Improved motor unit recruitment\n• Faster rate coding (firing frequency)\n• Better synchronization between fibers\n• Reduced neural inhibition\n\n**Muscular Adaptations (ongoing):**\n• Hypertrophy (increased cross-sectional area)\n• Improved tendon stiffness\n• Architectural changes (pennation angle)\n\n**Training principles:**\n• Progressive overload is essential\n• Heavy loads (85%+ 1RM) for maximal strength\n• Practice the specific lifts you want to improve\n• Frequency of 2-3x/week per movement pattern',
    related: ['nervous-intro', 'muscle-fibers', 'hypertrophy'],
  },
  'energy': {
    answer: 'Your body uses three energy systems to produce ATP:\n\n1. **Phosphagen (ATP-PCr):** 0-12 seconds of max effort. Think 1RM, 100m sprint. Creatine supplementation helps here.\n\n2. **Glycolytic (Anaerobic):** 15 seconds to ~2 minutes. Think 400m sprint, high-rep sets. Uses glucose/glycogen, produces lactate.\n\n3. **Oxidative (Aerobic):** 2+ minutes to hours. Think marathon, long training sessions. Uses fat, carbs, and protein with oxygen.\n\nAll three systems work simultaneously — the dominant one depends on intensity and duration. Train the system most relevant to your sport.',
    related: ['energy-systems', 'muscle-fibers', 'creatine', 'nutrition-basics'],
  },
  'joints': {
    answer: 'Joint health is critical for long-term training:\n\n• **Cartilage** has no blood supply — it receives nutrients through movement (synovial fluid circulation)\n• **Warm-ups** increase synovial fluid production, reducing friction\n• **Full ROM** training maintains joint mobility and strengthens connective tissue\n• **Common issues:** Tendinopathy (overuse), impingement (muscle imbalances), osteoarthritis (wear + genetics)\n\n**Prevention strategies:**\n• Always warm up properly (5-10 min)\n• Include mobility work\n• Balance agonist/antagonist training\n• Don\'t train through sharp pain\n• Allow adequate recovery between heavy sessions\n\nCollagen supplementation (10-15g + vitamin C, 30-60 min before training) may support tendon health.',
    related: ['skeletal-system', 'recovery', 'nutrition-basics'],
  },
  'testosterone': {
    answer: 'Testosterone is the primary anabolic hormone in both men and women:\n\n**Natural optimization:**\n• **Sleep:** 7-9 hours (sleep deprivation drops T by 10-15%)\n• **Heavy compound lifts:** Squats, deadlifts stimulate acute T increases\n• **Adequate fat intake:** Minimum 0.5g/kg/day (cholesterol is T precursor)\n• **Zinc & Vitamin D:** Deficiency significantly lowers T\n• **Manage stress:** Chronic cortisol suppresses testosterone\n• **Maintain healthy body fat:** Both very low and very high body fat reduce T\n\n**Myths:** Post-workout T spikes are temporary and do NOT significantly impact long-term muscle growth. Total daily levels matter more than acute fluctuations.',
    related: ['nutrition-basics', 'recovery', 'hypertrophy'],
  },
};

const defaultResponse: { answer: string; related: string[] } = {
  answer: 'That\'s a great question! While I don\'t have a specific answer for that topic in my knowledge base, here are some general tips:\n\n• **Consistency** is the #1 factor in fitness success\n• **Progressive overload** drives all adaptation\n• **Recovery** is where growth happens\n• **Nutrition** supports everything — you can\'t out-train a bad diet\n\nTry asking about: muscle growth, protein, creatine, fat loss, cardio, sleep, strength, energy systems, joints, or testosterone.',
  related: ['nutrition-basics', 'energy-systems', 'recovery', 'hypertrophy'],
};

export const askAITutor = (question: string): AIResponse => {
  const q = question.toLowerCase();

  // Find best matching topic
  let bestMatch: string | null = null;
  let bestScore = 0;

  for (const [key, value] of Object.entries(knowledgeBase)) {
    const keywords = key.split(' ');
    let score = 0;
    for (const kw of keywords) {
      if (q.includes(kw)) score += 2;
    }
    // Also check if the question contains related terms
    if (q.includes('grow') && key.includes('growth')) score += 3;
    if (q.includes('build') && key.includes('growth')) score += 2;
    if (q.includes('lose') && key.includes('loss')) score += 3;
    if (q.includes('weight') && key.includes('loss')) score += 2;
    if (q.includes('supplement') && key.includes('creatine')) score += 2;
    if (q.includes('rest') && key.includes('sleep')) score += 2;
    if (q.includes('recover') && key.includes('sleep')) score += 2;
    if (q.includes('aerobic') && key.includes('cardio')) score += 2;
    if (q.includes('endurance') && key.includes('cardio')) score += 2;
    if (q.includes('atp') && key.includes('energy')) score += 3;
    if (q.includes('bone') && key.includes('joints')) score += 2;
    if (q.includes('knee') && key.includes('joints')) score += 2;
    if (q.includes('hormone') && key.includes('testosterone')) score += 2;
    if (q.includes('macro') && key.includes('protein')) score += 2;
    if (q.includes('diet') && key.includes('protein')) score += 2;
    if (q.includes('lift') && key.includes('strength')) score += 2;
    if (q.includes('power') && key.includes('strength')) score += 2;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = key;
    }
  }

  if (bestMatch && bestScore >= 2) {
    const response = knowledgeBase[bestMatch];
    return {
      answer: response.answer,
      relatedTopics: response.related,
      confidence: Math.min(0.95, 0.5 + bestScore * 0.1),
    };
  }

  return {
    answer: defaultResponse.answer,
    relatedTopics: defaultResponse.related,
    confidence: 0.3,
  };
};

export const suggestedQuestions = [
  'How do muscles grow?',
  'How much protein do I need?',
  'Does creatine work?',
  'Best way to lose fat?',
  'How to improve cardio?',
  'Why is sleep important?',
  'How to get stronger?',
  'What are energy systems?',
  'How to protect joints?',
  'How to boost testosterone naturally?',
];
