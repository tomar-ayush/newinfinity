import axios from 'axios';
import * as cheerio from 'cheerio';
import google from "@/app/ai/main"; // Assuming this is your AI integration
import { generateText } from "ai"; // Adjust this to the specific AI function you're using
import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer'; // For sending emails

export async function POST(req: NextRequest) {
  try {
    // Step 1: Parse request body for emails, companyInfo, and writer details
    const { emails, campaignInfo } = await req.json(); 

    // Fallback static company info in case it's not provided in the request
    // const campaignInfo = companyInfo || {
    //   founder: "Elon Musk",
    //   industry: "Software Development",
    //   purpose: "Promoting App Development",
    //   name: "Musk Softwares",
    //   location: "Rajpura",
    //   website: "https://www.chitkara.edu.in",
    //   contact: "+91 9816328430"
    // };

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
      if(email.split("@")[1] == "gmail.com"){

        const prompt = `
        Write a professional cold email on behalf of ${campaignInfo.founder} from ${campaignInfo.name}, a company in the ${campaignInfo.industry} sector, located in ${campaignInfo.location}. 
        The purpose of the email is to introduce ${campaignInfo.purpose}. Address recipient as ${email.split('@')[0]}.Write tital and body. Do not add subject and body in content. First line should be subject and then body and do not add title, subject and body text in content.`;

      const { text: generatedText } = await generateText({
        model: google("gemini-pro"),
        prompt: prompt,
      });


      const cleanedText = generatedText.replace(/\*\*/g, '');

      // Split the AI-generated text into email title and body
      const [emailTitle, ...emailBodyLines] = cleanedText.split('\n');
      // Split the AI-generated text into email title and body
      const emailBody = emailBodyLines.join("\n").replace(/(?:\r\n|\r|\n)/g, "<br>");
      return transporter.sendMail({
        from: process.env.EMAIL_USER, // Sender's email
        to: email,  // Receiver's email
        subject: emailTitle.split(":")[1] || 'Introduction to Our Product',
        html: emailBody || 'We believe our product can be beneficial for your business...',
      }).then(() => {
        console.log(`Email sent to ${email}`);
      }).catch((error) => {
        console.error(`Failed to send email to ${email}: ${error}`);
      });
      }
      else{

      
      const domain = email.split('@')[1]; // Extract domain from the email

      // Step 3.1: Scrape the website for title and meta description
      const websiteUrl = `https://${domain}`;
      const { data: html } = await axios.get(websiteUrl);
      const $ = cheerio.load(html);

      const title = $('head > title').text() || 'No title found';
      const metaDescription = $('meta[name="description"]').attr('content') || 'No description found';

      // Step 3.2: Use AI to generate the email title and body based on the scraped data and companyInfo
      const prompt = `
        Write a professional cold email on behalf of ${campaignInfo.founder} from ${campaignInfo.name}, a company in the ${campaignInfo.industry} sector, located in ${campaignInfo.location}. 
        The purpose of the email is to introduce ${campaignInfo.purpose}. Address recipient as ${email.split('@')[0]}. 
        The email should target the business owner of the website titled "${title}" with the meta description: "${metaDescription}". 
        Focus on how our product can help improve or streamline their business operations. First line should be subject and then body and do not add title, subject and body text in content`;

      const { text: generatedText } = await generateText({
        model: google("gemini-pro"),
        prompt: prompt,
      });


      const cleanedText = generatedText.replace(/\*\*/g, '');

      // Split the AI-generated text into email title and body
      const [emailTitle, ...emailBodyLines] = cleanedText.split('\n');
      // Split the AI-generated text into email title and body
      const emailBody = emailBodyLines.join("\n").replace(/(?:\r\n|\r|\n)/g, "<br>");



      // Step 3.3: Send the email using nodemailer
      return transporter.sendMail({
        from: process.env.EMAIL_USER, // Sender's email
        to: email,  // Receiver's email
        subject: emailTitle.split(":")[1] || 'Introduction to Our Product',
        html: emailBody || 'We believe our product can be beneficial for your business...',
      }).then(() => {
        console.log(`Email sent to ${email}`);
      }).catch((error) => {
        console.error(`Failed to send email to ${email}: ${error}`);
      });
    }
    });

    // Step 4: Wait for all email promises to resolve.
    await Promise.all(emailPromises);

    // Step 5: Return success response
    return NextResponse.json({ success: true, message: 'Emails sent successfully!' });

  } catch (error) {
    console.error('Error in scraping or generating email:', error);
    return NextResponse.json({ error: 'Failed to generate and send emails.' }, { status: 500 });
  }
}
