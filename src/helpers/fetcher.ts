const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return "http://localhost:3000";
};

type FetcherConfig = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  query?: Record<string, string>;
  headers?: Record<string, string>;
};

export const fetcher = async <T>(config: FetcherConfig): Promise<T> => {
  const url = new URL(
    config.url,
    config.url.startsWith("/") ? getBaseUrl() : undefined,
  );

  if (config.query) {
    Object.entries(config.query).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const response = await fetch(url, {
    method: config.method ?? "GET",
    body: config.body ? JSON.stringify(config.body) : undefined,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return (await response.json()) as T;
};
