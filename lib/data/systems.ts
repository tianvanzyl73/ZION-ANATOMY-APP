import { SystemInfo, Region } from '../types';

export const SYSTEMS: SystemInfo[] = [
  {
    id: 'skeletal',
    name: 'Skeletal System',
    short: 'Skeletal',
    tagline: 'The living scaffold',
    overview:
      '206 bones in the adult human form a living, constantly remodeling framework that supports the body, protects organs, stores minerals, and manufactures blood cells. Bone is dynamic tissue — it responds to loading by becoming denser and to disuse by thinning.',
    stats: [
      { label: 'Adult bones', value: '206' },
      { label: 'Joints', value: '~360' },
      { label: 'Skeleton mass', value: '~15% BW' },
      { label: 'Remodel cycle', value: '~10 yr' },
    ],
    color: '#E8E3D5',
    icon: 'body-outline',
    structures: ['skull', 'mandible', 'vertebral-column', 'rib-cage', 'sternum', 'clavicle', 'scapula', 'humerus', 'radius', 'ulna', 'carpals', 'pelvis', 'femur', 'patella', 'tibia', 'fibula', 'tarsals', 'bone-tissue', 'bone-marrow', 'joints', 'ligaments', 'tendons', 'cartilage'],
  },
  {
    id: 'muscular',
    name: 'Muscular System',
    short: 'Muscular',
    tagline: 'Force, movement, heat',
    overview:
      'More than 600 skeletal muscles convert chemical energy into mechanical force. Each muscle crosses at least one joint and pulls on its bony attachment, while connective tissue sheaths transmit force and nerves set the timing and magnitude of every contraction.',
    stats: [
      { label: 'Skeletal muscles', value: '600+' },
      { label: 'Body mass', value: '~40%' },
      { label: 'Fiber types', value: 'I, IIa, IIx' },
      { label: 'Sarcomere', value: '2.2–2.6 µm' },
    ],
    color: '#C4554F',
    icon: 'barbell-outline',
    structures: ['pectoralis-major', 'deltoid', 'biceps-brachii', 'triceps-brachii', 'brachioradialis', 'forearm-flexors', 'rectus-abdominis', 'external-oblique', 'erector-spinae', 'trapezius', 'latissimus-dorsi', 'gluteus-maximus', 'quadriceps', 'hamstrings', 'adductors', 'gastrocnemius', 'soleus', 'tibialis-anterior', 'sarcomere', 'muscle-fibers', 'neuromuscular-junction', 'sliding-filament'],
  },
  {
    id: 'nervous',
    name: 'Nervous System',
    short: 'Nervous',
    tagline: 'The body’s electrical network',
    overview:
      'Roughly 86 billion neurons wired through trillions of synapses detect, integrate, and respond to information. The brain and spinal cord form the central nervous system; nerves to the periphery form the somatic and autonomic branches that control movement, organs, and arousal.',
    stats: [
      { label: 'Neurons', value: '~86 billion' },
      { label: 'Synapses', value: '~100 trillion' },
      { label: 'Signal speed', value: 'up to 120 m/s' },
      { label: 'Brain use', value: '~20% O₂' },
    ],
    color: '#E7C67C',
    icon: 'flash-outline',
    structures: ['cerebrum', 'cerebellum', 'brainstem', 'spinal-cord', 'peripheral-nerves', 'autonomic-nervous-system', 'neurons', 'neurotransmitters', 'synapse', 'motor-units', 'reflexes', 'proprioception'],
  },
  {
    id: 'cardiovascular',
    name: 'Cardiovascular System',
    short: 'Cardio',
    tagline: 'Transport highway',
    overview:
      'A four-chambered pump and ~100,000 km of vessels deliver oxygen, fuel, hormones, and heat while removing carbon dioxide and waste. Cardiac output, blood volume, and vessel caliber are continuously adjusted to meet metabolic demand.',
    stats: [
      { label: 'Resting HR', value: '60–80 bpm' },
      { label: 'Stroke volume', value: '~70 mL' },
      { label: 'Blood volume', value: '~5 L' },
      { label: 'Vessel length', value: '~100,000 km' },
    ],
    color: '#C43B3B',
    icon: 'heart-outline',
    structures: ['heart', 'arteries', 'veins', 'capillaries', 'blood-pressure', 'heart-rate', 'cardiac-output', 'red-blood-cells', 'hemoglobin', 'white-blood-cells', 'platelets', 'plasma', 'blood-clotting', 'blood-types'],
  },
  {
    id: 'respiratory',
    name: 'Respiratory System',
    short: 'Respiratory',
    tagline: 'Gas exchange engine',
    overview:
      'The airway tree conducts air through ~23 generations of branching tubes to ~480 million alveoli, where oxygen and carbon dioxide diffuse across a membrane thinner than a red blood cell. The diaphragm is the primary muscle of ventilation.',
    stats: [
      { label: 'Alveoli', value: '~480 million' },
      { label: 'Membrane', value: '~0.5 µm' },
      { label: 'Resting rate', value: '12–20 /min' },
      { label: 'Lung surface', value: '~70 m²' },
    ],
    color: '#5FA8D3',
    icon: 'leaf-outline',
    structures: ['airway', 'lungs', 'alveoli', 'diaphragm', 'breathing-mechanics', 'gas-exchange', 'respiratory-rate', 'lung-volumes'],
  },
  {
    id: 'digestive',
    name: 'Digestive System',
    short: 'Digestive',
    tagline: 'Fuel processing plant',
    overview:
      'A 9-metre tube plus accessory organs breaks food into absorbable molecules. Mechanical work, pH chemistry, enzymes, bile, and a vast microbiome cooperate so nutrients reach the bloodstream and waste is compacted for excretion.',
    stats: [
      { label: ' tract length', value: '~9 m' },
      { label: 'Small intestine', value: '~6 m' },
      { label: 'Transit time', value: '24–72 h' },
      { label: 'Microbes', value: '~38 trillion' },
    ],
    color: '#D9A05B',
    icon: 'restaurant-outline',
    structures: ['mouth', 'stomach', 'small-intestine', 'large-intestine', 'liver', 'gallbladder', 'pancreas', 'digestive-enzymes', 'absorption'],
  },
  {
    id: 'endocrine',
    name: 'Endocrine System',
    short: 'Endocrine',
    tagline: 'Chemical messengers',
    overview:
      'Ductless glands release hormones into the blood to coordinate metabolism, growth, reproduction, stress, and circadian rhythm. Hormones act slowly but persistently, and respond strongly to training, nutrition, sleep, and stress.',
    stats: [
      { label: 'Major hormones', value: '50+' },
      { label: 'Insulin peak', value: '~30–45 min' },
      { label: 'Cortisol peak', value: '~6–8 am' },
      { label: 'GH pulse', value: '~every 2–3 h' },
    ],
    color: '#9C7BD1',
    icon: 'color-filter-outline',
    structures: ['insulin', 'glucagon', 'testosterone', 'estrogen', 'growth-hormone', 'cortisol', 'adrenaline', 'thyroid-hormones', 'melatonin', 'leptin', 'ghrelin', 'igf-1', 'endorphins'],
  },
  {
    id: 'immune',
    name: 'Immune & Lymphatic System',
    short: 'Immune',
    tagline: 'Defense and drainage',
    overview:
      'Innate cells respond within minutes while adaptive lymphocytes learn specific threats and remember them. The lymphatic system drains interstitial fluid, transports fats, and provides the highways where immune cells patrol.',
    stats: [
      { label: 'WBC count', value: '4–11 ×10⁹/L' },
      { label: 'Lymph nodes', value: '~600' },
      { label: 'Antibodies', value: '~10¹⁰ types' },
      { label: 'Spleen filter', value: '~150 mL/min' },
    ],
    color: '#6FBF8F',
    icon: 'shield-checkmark-outline',
    structures: ['neutrophils', 'lymphocytes', 'monocytes-macrophages', 'antibodies', 't-cells', 'b-cells', 'inflammation', 'innate-immunity', 'adaptive-immunity'],
  },
  {
    id: 'urinary',
    name: 'Urinary System',
    short: 'Urinary',
    tagline: 'Filtration and balance',
    overview:
      'Two million nephrons filter ~180 L of plasma daily, reclaiming water and electrolytes while excreting urea and acids. The kidneys also regulate blood pressure, pH, and produce hormones for red cell production and bone mineral control.',
    stats: [
      { label: 'Nephrons', value: '~1M/kidney' },
      { label: 'Filtered daily', value: '~180 L' },
      { label: 'Urine output', value: '1–2 L/day' },
      { label: 'Bladder capacity', value: '400–600 mL' },
    ],
    color: '#B7C94C',
    icon: 'water-outline',
    structures: ['kidneys', 'nephron', 'ureters-bladder'],
  },
  {
    id: 'reproductive',
    name: 'Reproductive System',
    short: 'Reproductive',
    tagline: 'Continuity of life',
    overview:
      'Gonads produce gametes and sex hormones that drive secondary characteristics, fertility, and influence body composition, bone density, and training recovery. The system is controlled by the hypothalamic–pituitary–gonadal axis.',
    stats: [
      { label: 'Sperm/day', value: '~100 million' },
      { label: 'Egg supply', value: '~1–2 million at birth' },
      { label: 'Cycle', value: '~24–32 days' },
      { label: 'Testosterone', value: '300–1000 ng/dL' },
    ],
    color: '#D98CB3',
    icon: 'infinite-outline',
    structures: ['testes', 'ovaries', 'hpg-axis'],
  },
  {
    id: 'integumentary',
    name: 'Integumentary System',
    short: 'Skin',
    tagline: 'The living barrier',
    overview:
      'The skin is the largest organ — roughly 2 m² and 4 kg. It blocks pathogens, limits water loss, regulates temperature through sweat and blood flow, senses the environment, and synthesizes vitamin D precursor.',
    stats: [
      { label: 'Area', value: '~1.5–2 m²' },
      { label: 'Sweat glands', value: '2–4 million' },
      { label: 'Epidermis turnover', value: '~40 days' },
      { label: 'Touch receptors', value: '~4 per mm² fingertip' },
    ],
    color: '#C98A5E',
    icon: 'hand-left-outline',
    structures: ['epidermis', 'dermis', 'thermoregulation', 'vitamin-d-skin'],
  },
];

export const REGIONS: Region[] = [
  { id: 'head-neck', name: 'Head & Neck', blurb: 'Cranium, face, brain housing, airway entrance and cervical spine.', topics: ['skeletal-skull', 'nervous-cerebrum', 'nervous-cerebellum', 'respiratory-airway', 'muscular-trapezius', 'skeletal-mandible'], cx: 150, cy: 44, rx: 20, ry: 24 },
  { id: 'brain-ns', name: 'Brain & Nervous System', blurb: 'Central command: cerebrum, cerebellum, brainstem and spinal cord.', topics: ['nervous-cerebrum', 'nervous-cerebellum', 'nervous-brainstem', 'nervous-spinal-cord', 'nervous-neurons', 'nervous-autonomic-nervous-system'], cx: 150, cy: 40, rx: 14, ry: 14 },
  { id: 'spine', name: 'Spine', blurb: '33 vertebrae protecting the spinal cord and transmitting load.', topics: ['skeletal-vertebral-column', 'nervous-spinal-cord', 'muscular-erector-spinae', 'skeletal-joints'], cx: 150, cy: 116, rx: 11, ry: 42 },
  { id: 'shoulders', name: 'Shoulders', blurb: 'Highly mobile ball-and-socket joint stabilized by the rotator cuff.', topics: ['skeletal-clavicle', 'skeletal-scapula', 'muscular-deltoid', 'skeletal-joints', 'injury-shoulder-impingement'], cx: 112, cy: 84, rx: 17, ry: 15 },
  { id: 'chest', name: 'Chest', blurb: 'Heart, lungs, great vessels and the thoracic rib cage.', topics: ['cardio-heart', 'respiratory-lungs', 'skeletal-rib-cage', 'muscular-pectoralis-major', 'respiratory-diaphragm'], cx: 150, cy: 110, rx: 33, ry: 26 },
  { id: 'back', name: 'Back', blurb: 'Posterior chain from trapezius to erector spinae and latissimus.', topics: ['muscular-trapezius', 'muscular-latissimus-dorsi', 'muscular-erector-spinae', 'skeletal-vertebral-column'], cx: 150, cy: 142, rx: 37, ry: 32 },
  { id: 'arms-hands', name: 'Arms & Hands', blurb: 'Elbow hinge, forearm rotators, and 27 bones per hand.', topics: ['skeletal-humerus', 'skeletal-radius', 'skeletal-ulna', 'muscular-biceps-brachii', 'muscular-triceps-brachii', 'muscular-forearm-flexors'], cx: 105, cy: 150, rx: 16, ry: 44 },
  { id: 'abdomen', name: 'Abdomen', blurb: 'Digestive organs, kidneys, pancreas and the core wall.', topics: ['digestive-stomach', 'digestive-small-intestine', 'digestive-liver', 'urinary-kidneys', 'muscular-rectus-abdominis', 'digestive-pancreas'], cx: 150, cy: 164, rx: 31, ry: 24 },
  { id: 'pelvis', name: 'Pelvis', blurb: 'Pelvic girdle, hip joints, bladder and reproductive organs.', topics: ['skeletal-pelvis', 'muscular-gluteus-maximus', 'urinary-ureters-bladder', 'reproductive-testes', 'muscular-adductors'], cx: 150, cy: 180, rx: 28, ry: 17 },
  { id: 'legs-feet', name: 'Legs & Feet', blurb: 'The body’s engine: quads, hamstrings, calves and 26 bones per foot.', topics: ['skeletal-femur', 'skeletal-tibia', 'muscular-quadriceps', 'muscular-hamstrings', 'muscular-gastrocnemius', 'muscular-soleus', 'skeletal-patella'], cx: 150, cy: 258, rx: 30, ry: 62 },
];
