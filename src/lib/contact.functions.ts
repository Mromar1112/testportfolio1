
import { createServerFn } from '@tanstack/react-start';
import { Resend } from 'resend';
import { contactSchema } from './contact-schema';

const OWNER_EMAIL = 'mukkaomar@gmail.com';

export const submitContact = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    // Keep the Resend API key on the server only.
    const apiKey = process.env['RESEND_API_KEY'];
    if (!apiKey) {
      console.error('RESEND_API_KEY is missing from the environment.');

      return {
        ok: false,
        message:
          'The email service is not configured yet. Please try again later.',
      };
    }

    try {
      const resend = new Resend(apiKey);

      const { data: result, error } = await resend.emails.send({
        // Testing sender. Configure a verified domain for production.
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [OWNER_EMAIL],
        replyTo: data.email,
        subject: `Portfolio enquiry: ${data.subject}`,
        text: [
          'New message from your portfolio website',
          '',
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Subject: ${data.subject}`,
          '',
          'Message:',
          data.message,
          '',
          'You can reply directly to this email to contact the sender.',
        ].join('\n'),
      });

      if (error) {
        console.error('Resend failed to send the email:', error);

        return {
          ok: false,
          message:
            'Your message could not be sent. Please try again or email mukkaomar@gmail.com directly.',
        };
      }

      console.info('Portfolio contact email sent:', result?.id);

      return {
        ok: true,
        message:
          'Thank you! Your message has been sent successfully. I will get back to you soon.',
      };
    } catch (error) {
      console.error('Unexpected contact email error:', error);

      return {
        ok: false,
        message:
          'Something went wrong while sending your message. Please try again later.',
      };
    }
  });
