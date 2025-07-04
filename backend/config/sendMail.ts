import { Resend } from 'resend';
import { z } from 'zod';

const RESENT_API = process.env.RESEND_API || undefined;

const resend = new Resend(RESENT_API as string); 


export const StudentData = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Phone number is required"),
  query: z.string().min(1, "Query is required")
})
export type StudentDatatype = z.infer<typeof StudentData>;
async function sendEmail(info: StudentDatatype) {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #4a90e2; color: white; padding: 20px;">
          <h2 style="margin: 0;">New Student Inquiry</h2>
        </div>
        <div style="padding: 20px;">
          <p style="font-size: 16px;">You have received a new query from a student:</p>

          <table style="width: 100%; font-size: 16px; margin-top: 20px;">
            <tr>
              <td style="font-weight: bold; padding: 5px 0;">Name:</td>
              <td>${info.name}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 5px 0;">Phone Number:</td>
              <td>${info.phone}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 5px 0;">Query:</td>
              <td style="color: #333;">${info.query}</td>
            </tr>
          </table>

          <p style="margin-top: 30px; font-size: 14px; color: #777;">Please respond to the student as soon as possible.</p>
        </div>
        <div style="background-color: #f7f7f7; padding: 15px; text-align: center; font-size: 12px; color: #999;">
          This is an automated message from Base Academy.
        </div>
      </div>
    `;

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'yourbaseacademy@gmail.com',
      subject: `New Inquiry from ${info.name}`,
      html: htmlContent
    });

    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

export default sendEmail;