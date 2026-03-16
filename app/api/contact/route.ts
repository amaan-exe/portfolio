import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { CONTACT_EMAIL } from "@/lib/constants";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      return NextResponse.json(
        { success: false, message: "Server configuration error. Try emailing directly." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // App password
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    const autoReplyOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Message Received: ${subject}`,
      text: `Hi ${name},\n\nThank you for reaching out! I've received your message and will get back to you as soon as possible.\n\nFor your records, here's a copy of what you sent:\n${message}\n\nBest regards,\nAmaanullah`,
    };

    await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(autoReplyOptions)
    ]);

    return NextResponse.json({ success: true, message: "Sent ✓" });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Try emailing directly." },
      { status: 500 }
    );
  }
}
