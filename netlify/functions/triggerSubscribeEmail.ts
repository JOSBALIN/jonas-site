import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

const handler: Handler = async function (event) {
  console.log(process.env.NETLIFY_EMAILS_SECRET)
  console.log(process.env.NETLIFY_EMAILS_PROVIDER)
  console.log(process.env.NETLIFY_EMAILS_DIRECTORY)
  console.log(process.env.NETLIFY_EMAILS_PROVIDER_API_KEY)
  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify("Payload required"),
    };
  }

  const requestBody = JSON.parse(event.body) as {
    contactFrom: string;
    contactSubject: string;
    contactBody: string;
  };

  //automatically generated snippet from the email preview
  //sends a request to an email handler for a subscribed email
  await fetch(`${process.env.URL}/.netlify/functions/emails/subscribed`, {
    headers: {
      "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET as string,
    },
    method: "POST",
    body: JSON.stringify({
      from: "jonasbalin@gmail.com",
      to: "contact@jsjb.dk",
      subject: "JXP Contact: " + requestBody.contactSubject,
      parameters: {
        from: requestBody.contactFrom,
        body: requestBody.contactBody,
      },
    }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify("Subscribe email sent!"),
  };
};

export { handler };