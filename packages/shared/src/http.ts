export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const INTERNAL_API_KEY_HEADER = 'x-internal-api-key';

export const internalAuthHeaders = (): Record<string, string> => ({
  [INTERNAL_API_KEY_HEADER]: process.env.INTERNAL_API_KEY!,
});

export const postJSON = async (
  url: string,
  body: Record<string, any>,
  { retries = 3, retryDelayMs = 1000 }: { retries?: number; retryDelayMs?: number } = {}
) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...internalAuthHeaders() },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(`${url} responded with ${res.status}`);

      return res;
    } catch (err) {
      console.error(`postJSON attempt ${attempt} failed for ${url}:`, err);
      if (attempt === retries) throw err;
      await delay(retryDelayMs);
    }
  }
};
