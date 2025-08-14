import nodemailer from 'nodemailer';

export class EmailService {
  private transporter;

  constructor() {
    // Use mock transporter if no credentials provided
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      this.transporter = nodemailer.createTransport({
        jsonTransport: true
      });
    } else {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    }
  }

  async sendPropertyContactNotification(data: {
    corretor_email: string;
    corretor_name: string;
    client_name: string;
    client_email: string;
    client_phone?: string;
    property_title: string;
    message: string;
  }): Promise<void> {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || 'sistema@imobiliaria.com',
        to: data.corretor_email,
        subject: `💼 Novo contato para o imóvel: ${data.property_title}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">🏠 Novo Lead - ${data.property_title}</h2>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">👤 Dados do Cliente:</h3>
              <p><strong>Nome:</strong> ${data.client_name}</p>
              <p><strong>Email:</strong> ${data.client_email}</p>
              ${data.client_phone ? `<p><strong>Telefone:</strong> ${data.client_phone}</p>` : ''}
            </div>

            <div style="background-color: #fefce8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">💬 Mensagem:</h3>
              <p style="font-style: italic;">"${data.message}"</p>
            </div>

            <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #059669; margin: 0;">
                <strong>📞 Entre em contato com o cliente o quanto antes para não perder esta oportunidade!</strong>
              </p>
            </div>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px;">
              Este é um email automático do Sistema Imobiliário. Não responda este email.
            </p>
          </div>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 Mock Email sent:', {
          to: data.corretor_email,
          subject: mailOptions.subject,
          messageId: result.messageId || 'mock-id'
        });
      }
      
      console.log('✅ Email notification sent successfully');
    } catch (error) {
      console.error('❌ Error sending email notification:', error);
      
      // Don't throw error in development mode
      if (process.env.NODE_ENV === 'development') {
        console.log('🔧 Email error ignored in development mode');
        return;
      }
      
      throw error;
    }
  }
}