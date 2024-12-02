class EmailService {
  constructor() {
    this.templates = {
      verification: {
        subject: 'Verify Your Email - SEO Content Dashboard',
        template: (data) => `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="${data.logoUrl}" alt="Logo" style="max-width: 150px;">
            </div>
            <h1 style="color: #1a237e; margin-bottom: 20px;">Verify Your Email Address</h1>
            <p>Hi ${data.name},</p>
            <p>Thank you for signing up for the SEO Content Management Dashboard. To complete your registration, please verify your email address by clicking the button below:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.verificationLink}" style="background-color: #1a237e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Verify Email Address
              </a>
            </div>
            <p style="color: #666; font-size: 14px;">
              If you didn't create an account, you can safely ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #666; font-size: 12px; text-align: center;">
              This email was sent by SEO Content Management Dashboard<br>
              © ${new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        `
      },
      passwordReset: {
        subject: 'Reset Your Password - SEO Content Dashboard',
        template: (data) => `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="${data.logoUrl}" alt="Logo" style="max-width: 150px;">
            </div>
            <h1 style="color: #1a237e; margin-bottom: 20px;">Reset Your Password</h1>
            <p>Hi ${data.name},</p>
            <p>We received a request to reset your password. Click the button below to create a new password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.resetLink}" style="background-color: #1a237e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p style="color: #666; font-size: 14px;">
              If you didn't request a password reset, you can safely ignore this email.
              This link will expire in 1 hour for security reasons.
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #666; font-size: 12px; text-align: center;">
              This email was sent by SEO Content Management Dashboard<br>
              © ${new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        `
      },
      welcome: {
        subject: 'Welcome to SEO Content Dashboard!',
        template: (data) => `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="${data.logoUrl}" alt="Logo" style="max-width: 150px;">
            </div>
            <h1 style="color: #1a237e; margin-bottom: 20px;">Welcome to SEO Content Dashboard!</h1>
            <p>Hi ${data.name},</p>
            <p>Thank you for joining SEO Content Dashboard! We're excited to help you optimize your content and improve your SEO performance.</p>
            <h2 style="color: #1a237e; margin: 30px 0 20px;">Getting Started</h2>
            <ul style="padding-left: 20px; margin-bottom: 30px;">
              <li style="margin-bottom: 10px;">Complete your profile setup</li>
              <li style="margin-bottom: 10px;">Connect your favorite SEO tools</li>
              <li style="margin-bottom: 10px;">Set up your first content workflow</li>
              <li style="margin-bottom: 10px;">Invite your team members</li>
            </ul>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.dashboardLink}" style="background-color: #1a237e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Go to Dashboard
              </a>
            </div>
            <p>Need help getting started? Check out our <a href="${data.docsLink}" style="color: #1a237e;">documentation</a> or contact our support team.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #666; font-size: 12px; text-align: center;">
              This email was sent by SEO Content Management Dashboard<br>
              © ${new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        `
      },
      teamInvite: {
        subject: 'You\'ve Been Invited to Join SEO Content Dashboard',
        template: (data) => `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="${data.logoUrl}" alt="Logo" style="max-width: 150px;">
            </div>
            <h1 style="color: #1a237e; margin-bottom: 20px;">Team Invitation</h1>
            <p>Hi there,</p>
            <p>${data.inviterName} has invited you to join their team on SEO Content Dashboard!</p>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 4px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Team:</strong> ${data.teamName}</p>
              <p style="margin: 10px 0 0;"><strong>Role:</strong> ${data.role}</p>
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.inviteLink}" style="background-color: #1a237e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Accept Invitation
              </a>
            </div>
            <p style="color: #666; font-size: 14px;">
              This invitation will expire in 7 days.
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #666; font-size: 12px; text-align: center;">
              This email was sent by SEO Content Management Dashboard<br>
              © ${new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        `
      },
      webhookAlert: {
        subject: 'Webhook Alert - SEO Content Dashboard',
        template: (data) => `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="${data.logoUrl}" alt="Logo" style="max-width: 150px;">
            </div>
            <h1 style="color: ${data.status === 'error' ? '#d32f2f' : '#1a237e'}; margin-bottom: 20px;">
              Webhook ${data.status === 'error' ? 'Error' : 'Alert'}
            </h1>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 4px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Webhook:</strong> ${data.webhookName}</p>
              <p style="margin: 10px 0 0;"><strong>Status:</strong> ${data.status}</p>
              ${data.error ? `<p style="margin: 10px 0 0; color: #d32f2f;"><strong>Error:</strong> ${data.error}</p>` : ''}
              <p style="margin: 10px 0 0;"><strong>Timestamp:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.dashboardLink}" style="background-color: #1a237e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                View Details
              </a>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #666; font-size: 12px; text-align: center;">
              This email was sent by SEO Content Management Dashboard<br>
              © ${new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        `
      }
    };
  }

  async sendEmail(templateName, data) {
    const template = this.templates[templateName];
    if (!template) {
      throw new Error(`Template '${templateName}' not found`);
    }

    // Add common data
    const commonData = {
      logoUrl: `${window.location.origin}/logo.png`,
      year: new Date().getFullYear(),
      dashboardLink: `${window.location.origin}/dashboard`,
      docsLink: `${window.location.origin}/docs`,
      ...data
    };

    // Generate email content
    const emailContent = template.template(commonData);
    const subject = template.subject;

    // Here you would integrate with your email service provider
    // For example, using SendGrid, AWS SES, or your own SMTP server
    try {
      // Example implementation with a hypothetical email API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: data.email,
          subject,
          html: emailContent
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      return {
        success: true,
        messageId: await response.text()
      };
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  // Helper method to validate email address
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

export default new EmailService();
