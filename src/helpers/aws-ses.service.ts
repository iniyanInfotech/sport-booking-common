import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

initSnS();
let awsSESInstance: any;
async function initSnS() {
  awsSESInstance = new SESClient({
    credentials: {
      accessKeyId: String(process.env.AWS_ACCESS_KEY),
      secretAccessKey: String(process.env.AWS_SECRET_KEY),
    },
    region: String(process.env.AWS_REGION),
  });
}

export async function sendEmail(toEmail: string, subject: string) {
  const params = {
    Destination: {
      /* required */
      CcAddresses: [
        /* more items */
      ],
      ToAddresses: [
        toEmail,
        /* more To-email addresses */
      ],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: "HTML_FORMAT_BODY",
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "EMAIL_SUBJECT",
      },
    },
    Source: process.env.FROM_EMAIL,
    ReplyToAddresses: [
      /* more items */
    ],
  };

  const command = new SendEmailCommand(params);
  try {
    return await awsSESInstance.send(command);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
}
