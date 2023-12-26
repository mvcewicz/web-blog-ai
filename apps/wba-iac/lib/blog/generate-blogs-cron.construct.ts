import { Construct } from "constructs";
import {
  aws_events,
  aws_events_targets,
  aws_lambda,
  aws_lambda_nodejs,
  aws_secretsmanager,
  aws_ssm,
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
    const openaiSecret = aws_secretsmanager.Secret.fromSecretNameV2(
      this,
      "/wba-iac/openai",
      "openai",
    );
    const cronSecret = aws_secretsmanager.Secret.fromSecretNameV2(
      this,
      "/wba-iac/cron",
      "cron",
    );
    const wbaApiUrl = aws_ssm.StringParameter.fromStringParameterName(
      this,
      "/wba-iac/webhook-url",
      "webhook-url",
    );
    return {
      OPENAI_API_KEY: openaiSecret.secretValue.unsafeUnwrap(),
      CRON_SECRET_KEY: cronSecret.secretValue.unsafeUnwrap(),
      WBA_API_URL: wbaApiUrl.stringValue,
    };
  }
}
