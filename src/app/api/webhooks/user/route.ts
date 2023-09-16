import { NextRequest } from "next/server";
import { prisma } from "@/src/clients/prisma";

type UserCreatedBody = {
  data: {
    id: string;
    first_name: string;
    last_name: string;
    username: string | null;
    image_url: string;
    primary_email_address_id: string;
    email_addresses: {
      email_address: string;
      id: string;
    }[];
  };
};

async function getUserCreatedBody(
  request: NextRequest,
): Promise<UserCreatedBody> {
  return request.json();
}

export async function POST(request: NextRequest) {
  const userBody = await getUserCreatedBody(request);

  const email = userBody.data.email_addresses.find(
    (email) => email.id === userBody.data.primary_email_address_id,
  )?.email_address;

  const name =
    userBody.data.username ||
    `${userBody.data?.first_name || ""} ${
      userBody.data?.last_name || ""
    }`.trim() ||
    userBody.data.id;

  if (!email) {
    throw new Error("No email found");
  }

  const user = await prisma.user.upsert({
    where: {
      id: userBody.data.id,
    },
    update: {
      image: userBody.data.image_url,
      name,
      email,
    },
    create: {
      id: userBody.data.id,
      image: userBody.data.image_url,
      name,
      email,
    },
  });

  return new Response(JSON.stringify({ item: user }));
}
