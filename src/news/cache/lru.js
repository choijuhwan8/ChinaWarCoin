const DEFAULT_TTL = 10 * 60 * 1000; // 10 minutes

export class LruCache {
  constructor(limit = 100, ttl = DEFAULT_TTL) {
    this.limit = limit;
    this.ttl = ttl;
    this.map = new Map();
  }

  _isExpired(entry) {
    return entry.expiresAt < Date.now();
  }

  get(key) {
    const entry = this.map.get(key);
    if (!entry) return undefined;
    if (this._isExpired(entry)) {
      this.map.delete(key);
      return undefined;
    }
    this.map.delete(key);
    this.map.set(key, entry);
    return entry.value;
  }

  set(key, value, ttl = this.ttl) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, {
      value,
      expiresAt: Date.now() + ttl
    });
    if (this.map.size > this.limit) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
  }
}

export function loadFromStorage(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return new Map();
    const parsed = JSON.parse(raw);
    return new Map(parsed);
  } catch (err) {
    console.warn('Failed to load cache from storage', err);
    return new Map();
  }
}

export function persistToStorage(storageKey, map) {
  try {
    const serializable = Array.from(map.entries());
    localStorage.setItem(storageKey, JSON.stringify(serializable));
  } catch (err) {
    console.warn('Failed to persist cache to storage', err);
  }
}
