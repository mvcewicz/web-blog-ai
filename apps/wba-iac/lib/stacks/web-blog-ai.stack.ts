import { App, Stack, StackProps } from "aws-cdk-lib";
import { GenerateBlogsCronConstruct } from "@wba/iac/lib/blog/generate-blogs-cron.construct";

export class WebBlogAiStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);
    new GenerateBlogsCronConstruct(this, "GenerateBlogsCronConstruct")
  }
}
