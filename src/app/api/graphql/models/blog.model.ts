import { schemaBuilder } from "@/src/app/api/graphql/schema";

export const blogSchema = schemaBuilder.prismaObject("Blog", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    content: t.exposeString("content"),
    createdAt: t.string({
      resolve: (parent) => parent.createdAt.toISOString(),
    }),
    updatedAt: t.string({
      resolve: (parent) => parent.updatedAt.toISOString(),
    }),
    comments: t.relation("Comment"),
  }),
});
