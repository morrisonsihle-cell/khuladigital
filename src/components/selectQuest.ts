'use client';

export type QuestServiceKey =
  | 'study-bundle'
  | 'starter'
  | 'business'
  | 'ecommerce'
  | 'management'
  | 'marketing'
  | 'branding'
  | 'consulting';

const QUEST_EVENT = 'khula:select-quest';

/** Pre-selects a service/package in the Contact terminal and scrolls to #contact. */
export function selectQuestAndScroll(service: QuestServiceKey) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<{ service: QuestServiceKey }>(QUEST_EVENT, { detail: { service } }));
  const target = document.getElementById('contact');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.location.hash = 'contact';
  }
}

export function onQuestSelect(handler: (service: QuestServiceKey) => void) {
  if (typeof window === 'undefined') return () => {};
  const listener = (e: Event) => {
    const custom = e as CustomEvent<{ service: QuestServiceKey }>;
    if (custom.detail?.service) handler(custom.detail.service);
  };
  window.addEventListener(QUEST_EVENT, listener);
  return () => window.removeEventListener(QUEST_EVENT, listener);
}
