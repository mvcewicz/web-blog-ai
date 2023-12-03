const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    return "https://web-blog-ai.vercel.app";
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return "http://localhost:3000";
};

type FetcherConfig = Omit<RequestInit, "body" | "method"> & {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  query?: Record<string, unknown>;
  headers?: Record<string, string>;
};

export const fetcher = async <TResponse>(
  config: FetcherConfig,
): Promise<TResponse> => {
  const url = new URL(
    config.url,
    config.url.startsWith("/") ? getBaseUrl() : undefined,
  );

  if (config.query) {
    Object.entries(config.query).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const response = await fetch(url, {
    ...config,
    method: config.method ?? "GET",
    body: config.body ? JSON.stringify(config.body) : undefined,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
  });

  if (!response.ok) {
    console.info(config);
    throw new Error(response.statusText);
  }

  return (await response.json()) as TResponse;
};
