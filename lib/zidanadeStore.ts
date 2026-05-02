let count = 0;
const listeners = new Set<() => void>();

export function getZidanadeCount(): number {
  return count;
}

export function setZidanadeCount(n: number): void {
  if (n === count) return;
  count = n;
  listeners.forEach((l) => l());
}

export function subscribeZidanade(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function countZidanadesIn(text: string): number {
  if (!text) return 0;
  const matches = text.match(/ZIDANE/gi);
  return matches ? matches.length : 0;
}
