import {
	VITE_CONTACT_EMAIL as CONTACT_EMAIL,
	VITE_RESEND_API_KEY as RESEND_API_KEY
} from '$env/static/private';
import { json } from '@sveltejs/kit';
import { Resend } from 'resend';

const resend = new Resend(RESEND_API_KEY);

export async function POST({ request }) {
	try {
		const { type, fullName, email, projectDescription } = await request.json();

		// Validation
		if (!type || !fullName || !email) {
			return json({ error: 'Service type, full name, and email are required' }, { status: 400 });
		}

		// Email format validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return json({ error: 'Please provide a valid email address' }, { status: 400 });
		}

		// Email content
		const emailSubject = `New Contact Form Submission - ${type}`;
		const emailHtml = `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
				<h2 style="color: #334155;">New Contact Form Submission</h2>
				
				<div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
					<h3 style="color: #475569; margin-top: 0;">Contact Details</h3>
					<p><strong>Name:</strong> ${fullName}</p>
					<p><strong>Email:</strong> ${email}</p>
					<p><strong>Service Type:</strong> ${type}</p>
					${projectDescription ? `<p><strong>Project Description:</strong><br>${projectDescription.replace(/\n/g, '<br>')}</p>` : ''}
				</div>
				
				<div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
					<p style="margin: 0; color: #1e40af;">
						<strong>Reply to:</strong> This message was sent through your portfolio contact form.
					</p>
				</div>
				
				<hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
				<p style="color: #64748b; font-size: 14px;">
					Sent from salvatorestampone.com contact form
				</p>
			</div>
		`;

		// Send email using Resend
		const { data, error } = await resend.emails.send({
			from: 'Portfolio Contact <noreply@salvatorestampone.com>',
			to: [CONTACT_EMAIL],
			subject: emailSubject,
			html: emailHtml,
			replyTo: email // Now email is always present
		});

		if (error) {
			console.error('Resend error:', error);
			return json({ error: 'Failed to send email. Please try again later.' }, { status: 500 });
		}

		return json({
			success: true,
			message: 'Email sent successfully',
			id: data?.id
		});
	} catch (error) {
		console.error('Server error:', error);
		return json({ error: 'Internal server error. Please try again later.' }, { status: 500 });
	}
}
