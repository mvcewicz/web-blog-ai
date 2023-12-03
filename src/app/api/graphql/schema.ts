import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { prismaClient } from "@/src/lib/helpers/clients/prisma-client";
import PrismaTypes from "@pothos/plugin-prisma/generated";

export const schemaBuilder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: {
    prisma: typeof prismaClient;
  };
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prismaClient,
  },
});
