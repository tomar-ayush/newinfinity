import google from "@/app/ai/main";
import website from "@/models/website";
import connectDB from "@/utils/db";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {

    const {name,description,industry,location,linkedin,contact,email,primary_color} = await req.json();

    const prompt = `for ${name} in ${location} in ${industry} industry, write content for hero section in 2 lines, write feature section in 3 lines, write about section in 5 lines and write contact section in 2 lines and the description is ${description} and the contact is ${contact} and the email is ${email} make each section seaprated by $ and don't add section name in the content`;

    const { text } = await generateText({
        model: google("gemini-pro"),
        prompt: prompt,
    });


    const arr = text.split("$");

    const hero = arr[1];
    const feature = arr[2];
    const about = arr[3];
    const contact_section = arr[4];

    await connectDB();

    await website.create({
        name,
        website_content: {
            email,
            location,
            primary_color,
            linkedin,
            hero,
            feature,
            about,
            contact:contact_section
        }
    });

    return NextResponse.json({success: `http://localhost:3000/${name}`});

}