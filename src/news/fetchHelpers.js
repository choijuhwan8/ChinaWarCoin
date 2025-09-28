const MAX_CONCURRENT = 2;
const RETRIES = 3;

let activeRequests = 0;
const queue = [];

function dequeue() {
  if (activeRequests >= MAX_CONCURRENT) return;
  const next = queue.shift();
  if (!next) return;
  activeRequests += 1;
  next()
    .catch(() => {})
    .finally(() => {
      activeRequests -= 1;
      dequeue();
    });
}

export function schedule(task) {
  return new Promise((resolve, reject) => {
    const run = () =>
      task()
        .then(resolve)
        .catch(reject);
    queue.push(run);
    dequeue();
  });
}

export async function fetchWithRetry(url, options = {}, attempt = 0) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (attempt >= RETRIES) throw error;
    const delay = 200 * 2 ** attempt;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return fetchWithRetry(url, options, attempt + 1);
  }
}
