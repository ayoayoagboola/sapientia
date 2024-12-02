import { Resend } from 'resend'; 

const resend = new Resend(process.env.RESEND_API_KEY);  

export const sendTwoFactorTokenEmail = async (
    email: string, 
    token: string, 
) => {

    await resend.emails.send({
        from: 'onboarding@resend.dev', 
        to: email, 
        subject: 'Two Factor Code', 
        html: `<p>Your Two Factor Code: ${token}</p>`
    })
}

export const sendResetPasswordEmail = async (
    email: string, 
    token: string, 
) => {
    const resetPasswordLink = `http://localhost:3000/new-password?token=${token}`;

    await resend.emails.send({
        from: 'onboarding@resend.dev', 
        to: email, 
        subject: 'reset your password', 
        html: `<p>Click <a href="${resetPasswordLink}">here</a> to reset your password.</p>`
    })
}

export const sendVerificationEmail = async (
    email: string, 
    token: string, 
) => {
    const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

    await resend.emails.send({
        from: 'onboarding@resend.dev', 
        to: email, 
        subject: 'confirm your email', 
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`
    })
}