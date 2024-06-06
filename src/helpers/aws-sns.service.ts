import { SNSClient, PublishCommand  } from "@aws-sdk/client-sns";

initSnS();
let awsSNSInstance: any;
async function initSnS() {
  awsSNSInstance = new SNSClient({
    credentials: {
      accessKeyId: String(process.env.AWS_ACCESS_KEY),
      secretAccessKey: String(process.env.AWS_SECRET_KEY),
    },
    region: String(process.env.AWS_REGION),
  });
}

export async function sendTextToMobile(
  countryCode: number,
  mobileNumber: number,
  message: any
) {
  const params = {
    Message: message,
    PhoneNumber: `+${countryCode}${mobileNumber}`,
  };

  return awsSNSInstance.send(new PublishCommand(params))
}
