import { schemaBuilder } from "@/src/app/api/graphql/schema";

export const userSchema = schemaBuilder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    image: t.exposeString("image"),
  }),
});
