import { Construct } from "constructs";
import {
  aws_events,
  aws_events_targets,
  aws_lambda,
  aws_lambda_nodejs,
} from "aws-cdk-lib";
import * as path from "path";
import * as cdk from "aws-cdk-lib";

type GenerateBlogsStackProps = {
  /**
   * The URL will be called with blog data as a POST request.
   */
  callbackUrl: string;
};

export class GenerateBlogsCronConstruct extends Construct {
  constructor(scope: Construct, id: string, props: GenerateBlogsStackProps) {
    super(scope, id);

    const generateBlogLambda = this.createGenerateBlogLambda();
    const cronRule = this.createCronRule();

    // new cron job
    cronRule.addTarget(
      new aws_events_targets.LambdaFunction(generateBlogLambda, {
        retryAttempts: 0,
        event: aws_events.RuleTargetInput.fromObject({
          callbackUrl: props.callbackUrl,
        }),
      }),
    );
  }

  createGenerateBlogLambda() {
    console.log(process.cwd());
    return new aws_lambda_nodejs.NodejsFunction(this, "GenerateBlogLambda", {
      runtime: aws_lambda.Runtime.NODEJS_20_X,
      entry: path.resolve(
        __dirname,
        "../../../features/blog/crons/generate-blog.cron.ts",
      ),
      bundling: {},
      handler: "handler",
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
}
