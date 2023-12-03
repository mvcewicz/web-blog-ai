#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { WebBlogAiStack } from "@wba/next/lib/web-blog-ai.stack";

const app = new cdk.App();
new WebBlogAiStack(app, "WebBlogAIStack", {
  tags: {
    name: "web-blog-ai",
  },
});
