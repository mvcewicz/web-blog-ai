import { schemaBuilder } from "@/src/app/api/graphql/schema";

export const commentSchema = schemaBuilder.prismaObject("Comment", {
  fields: (t) => ({
    id: t.exposeID("id"),
    content: t.exposeString("content"),
    user: t.relation("user"),
    replies: t.relation("replies"),
  }),
});
