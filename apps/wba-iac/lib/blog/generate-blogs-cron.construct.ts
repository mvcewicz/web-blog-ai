import { Construct } from "constructs";
import {
  aws_events,
  aws_events_targets,
  aws_lambda,
  aws_lambda_nodejs,
} from "aws-cdk-lib";
import * as path from "path";
import * as cdk from "aws-cdk-lib";

export class GenerateBlogsCronConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const generateBlogLambda = this.createGenerateBlogLambda();
    const cronRule = this.createCronRule();

    // new cron job
    cronRule.addTarget(
      new aws_events_targets.LambdaFunction(generateBlogLambda, {
        retryAttempts: 0,
      }),
    );
  }

  createGenerateBlogLambda() {
    return new aws_lambda_nodejs.NodejsFunction(this, "GenerateBlogLambda", {
      runtime: aws_lambda.Runtime.NODEJS_20_X,
      entry: path.resolve(__dirname, "./generate-blog.cron.ts"),
      handler: "handler",
      environment: this.createEnvironmentVariables(),
      timeout: cdk.Duration.seconds(120),
      memorySize: 256,
      architecture: aws_lambda.Architecture.ARM_64,
      retryAttempts: 0,
    });
  }

  createCronRule() {
    return new aws_events.Rule(this, "GenerateBlogCronRule", {
      schedule: aws_events.Schedule.rate(cdk.Duration.days(1)),
      ruleName: "GenerateBlogCronRule",
      description: "Generate blog cron job",
    });
  }

  createEnvironmentVariables() {
    return {
      POSTGRES_URL: process.env.POSTGRES_URL,
      POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
      POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
      POSTGRES_USER: process.env.POSTGRES_USER,
      POSTGRES_HOST: process.env.POSTGRES_HOST,
      POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
      POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      CRON_SECRET_KEY: process.env.CRON_SECRET_KEY,
      WBA_API_URL: process.env.WBA_API_URL,
    } as Record<string, string>;
  }
}
