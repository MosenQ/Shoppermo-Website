import { google } from 'googleapis';

async function getAccessToken() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  const connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-mail',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings?.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Gmail not connected');
  }
  return accessToken;
}

async function getUncachableGmailClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.gmail({ version: 'v1', auth: oauth2Client });
}

function createEmailMessage(to: string, subject: string, body: string): string {
  const message = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'Content-Type: text/html; charset=utf-8',
    '',
    body
  ].join('\n');
  
  return Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function sendNotificationEmail(subject: string, htmlBody: string): Promise<void> {
  try {
    const gmail = await getUncachableGmailClient();
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'mohsengho72@gmail.com';
    const rawMessage = createEmailMessage(notificationEmail, subject, htmlBody);
    
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: rawMessage
      }
    });
    
    console.log(`Email notification sent: ${subject}`);
  } catch (error) {
    console.error('Failed to send email notification:', error);
  }
}

export function formatWaitlistEmail(data: { name: string; email: string }): { subject: string; body: string } {
  return {
    subject: `New Waitlist Signup: ${data.name}`,
    body: `
      <h2>New Waitlist Signup</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
    `
  };
}

export function formatMerchantApplicationEmail(data: {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  category: string;
  plan: string;
}): { subject: string; body: string } {
  return {
    subject: `New Merchant Application: ${data.businessName}`,
    body: `
      <h2>New Merchant Application</h2>
      <p><strong>Business Name:</strong> ${data.businessName}</p>
      <p><strong>Contact Name:</strong> ${data.contactName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Category:</strong> ${data.category}</p>
      <p><strong>Plan:</strong> ${data.plan}</p>
    `
  };
}

export function formatContactSalesEmail(data: {
  fullName: string;
  workEmail: string;
  companyName: string;
  companySize: string;
  message?: string | null;
}): { subject: string; body: string } {
  return {
    subject: `New Sales Inquiry: ${data.companyName}`,
    body: `
      <h2>New Sales Inquiry</h2>
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Work Email:</strong> ${data.workEmail}</p>
      <p><strong>Company:</strong> ${data.companyName}</p>
      <p><strong>Company Size:</strong> ${data.companySize}</p>
      ${data.message ? `<p><strong>Message:</strong></p><p>${data.message}</p>` : ''}
    `
  };
}

export function formatContactInquiryEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): { subject: string; body: string } {
  return {
    subject: `New Contact Inquiry: ${data.subject}`,
    body: `
      <h2>New Contact Inquiry</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `
  };
}
