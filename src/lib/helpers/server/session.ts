import jwt from "jsonwebtoken";

type SessionData = {
  sub: string;
};

export async function verifySession(session: string) {
  return jwt.verify(
    session,
    Buffer.from(
      process.env.CLERK_PEM_PUBLIC_KEY as string,
      "base64",
    ).toString(),
    {
      algorithms: ["RS256"],
    },
  ) as SessionData | null;
}
