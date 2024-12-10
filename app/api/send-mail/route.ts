import axios from "axios";
import * as cheerio from "cheerio";
import google from "@/app/ai/main"; // Assuming this is your AI integration
import { generateText } from "ai"; // Adjust this to the specific AI function you're using
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer"; // For sending emails

export async function POST(req: NextRequest) {
  try {
    // Step 1: Parse request body for emails and campaignInfo
    const { emails, campaignInfo } = await req.json();

    // Step 2: Set up the email transporter with nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT!, 10),
      secure: true, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Step 3: Iterate over each email address to scrape, generate content, and send
    const emailPromises = emails.map(async (email: string) => {
      const domain = email.split("@")[1];
      let prompt = '';

      if (domain === "gmail.com") {
        prompt = `
          Write a professional cold email on behalf of ${campaignInfo.founder} from ${campaignInfo.name}, 
          a company in the ${campaignInfo.industry} sector with website ${campaignInfo.website}, based in ${campaignInfo.location}. 
          The purpose of this email is to introduce ${campaignInfo.purpose}. 
          Address the recipient as "${email.split("@")[0]}".
        `;
      } else {
        try {
          const websiteUrl = `https://${domain}`;
          const { data: html } = await axios.get(websiteUrl);
          const $ = cheerio.load(html);
          const title = $("head > title").text().trim() || "No title found";
          const metaDescription = $('meta[name="description"]').attr("content")?.trim() || "No description found";

          prompt = `
            Write a professional cold email on behalf of ${campaignInfo.founder} from ${campaignInfo.name}, 
            a company in the ${campaignInfo.industry} sector with website ${campaignInfo.website}, located in ${campaignInfo.location}. 
            The purpose of the email is to introduce ${campaignInfo.purpose}. 
            Address the recipient as "${email.split("@")[0]}" in a formal tone. 
            Focus on how our product can help improve their business operations. 
            The email should include the subject on the first line, followed by the body. 
            Subject: ${title} | Description: ${metaDescription}
          `;
        } catch (error) {
          console.warn(`Failed to scrape website for domain ${domain}: ${error}`);
          prompt = `
            Write a professional cold email on behalf of ${campaignInfo.founder} from ${campaignInfo.name}, 
            a company in the ${campaignInfo.industry} sector with website ${campaignInfo.website}, located in ${campaignInfo.location}. 
            The purpose of the email is to introduce ${campaignInfo.purpose}. 
            Address the recipient as "${email.split("@")[0]}" in a formal tone. 
            Focus on how our product can help improve their business operations.
          `;
        }
      }

      const { text: generatedText } = await generateText({
        model: google("gemini-pro"),
        prompt,
      });

      const cleanedText = generatedText.replace(/\\/g, "");
      const [emailTitle, ...emailBodyLines] = cleanedText.split("\n");
      const emailBody = emailBodyLines.join("\n").replace(/(?:\r\n|\r|\n)/g, "<br>");

      // Step 3.3: Send the email using nodemailer
      return transporter
        .sendMail({
          from: process.env.EMAIL_USER, // Sender's email
          to: email, // Receiver's email
          subject: emailTitle.split(":")[1] || "Introduction to Our Product",
          html: emailBody || "We believe our product can be beneficial for your business...",
        })
        .then(() => {
          console.log(`Email sent to ${email}`);
        })
        .catch((error) => {
          console.error(`Failed to send email to ${email}: ${error}`);
        });
    });

    // Step 4: Wait for all email promises to resolve.
    await Promise.all(emailPromises);

    // Step 5: Return success response
    return NextResponse.json({
      success: true,
      message: "Emails sent successfully!",
    });
  } catch (error) {
    console.error("Error in scraping or generating email:", error);
    return NextResponse.json(
      { error: "Failed to generate and send emails." },
      { status: 500 }
    );
  }
}
