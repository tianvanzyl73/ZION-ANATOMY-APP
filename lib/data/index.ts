import { Topic, Flashcard, MuscleTopic, SupplementTopic } from '../types';
import { SKELETAL_TOPICS } from './skeletal';
import { MUSCLE_TOPICS, MUSCLES } from './muscles';
import { CARDIO_TOPICS, RESPIRATORY_TOPICS, NERVOUS_TOPICS } from './physiology';
import { ENDOCRINE_TOPICS, DIGESTIVE_TOPICS, IMMUNE_TOPICS, URINARY_TOPICS, REPRODUCTIVE_TOPICS, SKIN_TOPICS, CELL_TOPICS } from './physiology2';
import { ENERGY_TOPICS, EXERCISE_TOPICS } from './energy';
import { NUTRITION_TOPICS, SUPPLEMENT_TOPICS } from './nutrition';
import { INJURY_TOPICS } from './injuries';

export const ALL_TOPICS: Topic[] = [
  ...SKELETAL_TOPICS,
  ...MUSCLE_TOPICS,
  ...CARDIO_TOPICS,
  ...RESPIRATORY_TOPICS,
  ...NERVOUS_TOPICS,
  ...ENDOCRINE_TOPICS,
  ...DIGESTIVE_TOPICS,
  ...IMMUNE_TOPICS,
  ...URINARY_TOPICS,
  ...REPRODUCTIVE_TOPICS,
  ...SKIN_TOPICS,
  ...CELL_TOPICS,
  ...ENERGY_TOPICS,
  ...EXERCISE_TOPICS,
  ...NUTRITION_TOPICS,
  ...SUPPLEMENT_TOPICS,
  ...INJURY_TOPICS,
];

export const TOPIC_MAP: Record<string, Topic> = Object.fromEntries(ALL_TOPICS.map((t) => [t.id, t]));

export function getTopic(id: string): Topic | undefined {
  return TOPIC_MAP[id];
}

export function topicsForSystem(systemId: string): Topic[] {
  return ALL_TOPICS.filter((t) => t.domain === systemId);
}

export function systemTopicIds(systemId: string): string[] {
  return topicsForSystem(systemId).map((t) => t.id);
}

export function isMuscle(t: Topic): t is MuscleTopic {
  return t.domain === 'muscular' && (t as MuscleTopic).origin !== undefined;
}

export function isSupplement(t: Topic): t is SupplementTopic {
  return t.domain === 'supplement';
}

export function searchTopics(query: string, limit = 40): Topic[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  const scored = ALL_TOPICS.map((t) => {
    const title = t.title.toLowerCase();
    const sub = (t.subtitle ?? '').toLowerCase();
    const tags = t.tags.join(' ').toLowerCase();
    const summary = t.summary.toLowerCase();
    let score = 0;
    for (const term of terms) {
      if (title === term) score += 60;
      else if (title.startsWith(term)) score += 40;
      else if (title.includes(term)) score += 25;
      if (sub.includes(term)) score += 12;
      if (tags.includes(term)) score += 20;
      if (t.system.toLowerCase().includes(term)) score += 10;
      if (summary.includes(term)) score += 8;
      const bodyHit = t.sections.some((s) => s.body.toLowerCase().includes(term));
      if (bodyHit) score += 4;
    }
    return { t, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.t.title.localeCompare(b.t.title));
  return scored.slice(0, limit).map((x) => x.t);
}

export function relatedTopics(topic: Topic, limit = 8): Topic[] {
  const seen = new Set<string>([topic.id]);
  const out: Topic[] = [];
  for (const id of topic.related) {
    const t = TOPIC_MAP[id];
    if (t && !seen.has(t.id)) {
      out.push(t);
      seen.add(t.id);
    }
  }
  for (const other of ALL_TOPICS) {
    if (out.length >= limit) break;
    if (seen.has(other.id)) continue;
    const sharesTag = other.tags.some((tag) => topic.tags.includes(tag));
    if (sharesTag && other.domain === topic.domain) {
      out.push(other);
      seen.add(other.id);
    }
  }
  return out.slice(0, limit);
}

export const FLASHCARDS: Flashcard[] = ALL_TOPICS.map((t) => ({
  id: `fc-${t.id}`,
  front: t.title,
  back: t.summary,
  domain: t.domain,
}));

export const DOMAIN_LABELS: Record<string, string> = {
  skeletal: 'Skeletal',
  muscular: 'Muscular',
  nervous: 'Nervous',
  cardiovascular: 'Cardiovascular',
  respiratory: 'Respiratory',
  digestive: 'Digestive',
  endocrine: 'Endocrine',
  immune: 'Immune',
  urinary: 'Urinary',
  reproductive: 'Reproductive',
  integumentary: 'Skin',
  cell: 'Cell Biology',
  energy: 'Energy',
  nutrition: 'Nutrition',
  supplement: 'Supplements',
  injury: 'Injury & Recovery',
  exercise: 'Exercise',
};
