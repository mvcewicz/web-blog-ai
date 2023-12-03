// // Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
// import { createYoga } from "graphql-yoga";
// import { prismaClient } from "@wba/next/src/helpers/clients/prisma-client";
// import { schemaBuilder } from "@wba/next/src/app/api/graphql/schema";
// import { commentSchema } from "@wba/next/src/app/api/graphql/models/comment.model";
// import { blogSchema } from "@wba/next/src/app/api/graphql/models/blog.model";
// import { userSchema } from "@wba/next/src/app/api/graphql/models/user.model";
//
// schemaBuilder.queryType({
//   fields: (t) => ({
//     comments: t.prismaField({
//       type: [commentSchema],
//       args: {
//         userId: t.arg.id(),
//         orderBy: t.arg.string(),
//         order: t.arg.string(),
//       },
//       resolve: (query, parent, args, context) => {
//         return context.prisma.comment.findMany({
//           where: {
//             user: {
//               id: args.userId?.toString(),
//             },
//           },
//           orderBy: args.orderBy ? { [args.orderBy]: args.order } : undefined,
//         });
//       },
//     }),
//     blog: t.prismaField({
//       type: "Blog",
//       args: {
//         id: t.arg.id(),
//         slug: t.arg.string(),
//       },
//       resolve: async (query, parent, args, context) => {
//         const blog = await context.prisma.blog.findUniqueOrThrow({
//           where: {
//             id: args.id?.toString(),
//             slug: args.slug?.toString(),
//           },
//         });
//         return blog;
//       },
//     }),
//     blog: t.prismaField({
//       type: [blogSchema],
//       args: {
//         cursor: t.arg.string(),
//         orderBy: t.arg.string(),
//         order: t.arg.string(),
//       },
//       resolve: (query, parent, args, context) => {
//         return context.prisma.blog.findMany({
//           cursor: args.cursor ? { id: args.cursor } : undefined,
//           orderBy: args.orderBy ? { [args.orderBy]: args.order } : undefined,
//           skip: args.cursor ? 1 : undefined,
//         });
//       },
//     }),
//     users: t.prismaField({
//       type: [userSchema],
//       resolve: (query, parent, args, context) => {
//         return context.prisma.user.findMany({});
//       },
//     }),
//   }),
// });
//
// const { handleRequest } = createYoga({
//   schema: schemaBuilder.toSchema(),
//
//   // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
//   graphqlEndpoint: "/api/graphql",
//
//   // Yoga needs to know how to create a valid Next response
//   // fetchAPI: { Response, fetch },
//
//   context: {
//     prisma: prismaClient,
//   },
// });
//
// export { handleRequest as GET, handleRequest as POST };
export {};
