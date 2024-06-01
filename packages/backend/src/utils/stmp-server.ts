import nodeMailer from 'nodemailer'
import { logger } from '../logger'

export const transporter = nodeMailer.createTransport({
  // @ts-ignore secureConnection在类型文件中未找到但还能用。。。
  host: process.env.SMTP_HOST,
  port: 587,
  secureConnection: false,
  tls: { ciphers: 'SSLv3' },
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const sendEmailCode = async (toEmail: string, code: string | number) => {
  try {
    const res = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: toEmail,
      subject: '验证码',
      text: `验证码是${code}`,
    })
    return res
  } catch (error) {
    logger.info(`${code} ${error} sendEmail`)
  }
}
