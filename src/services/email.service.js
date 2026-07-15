const { Resend } = require("resend");

const sendEmail = async (to, subject, html) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "Glow Salon <onboarding@resend.dev>",
    to,
    subject,
    html
  });
};

exports.sendBienvenue = async (user) => {
  await sendEmail(
    user.email,
    "Bienvenue chez Glow Salon ! 🌟",
    `<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #F5F0EA;">
      <div style="background: #1A1614; padding: 40px; border-radius: 16px; text-align: center; margin-bottom: 30px;">
        <h1 style="color: #C9A876; font-size: 2rem; margin: 0;">Glow Salon</h1>
        <p style="color: #D9B8AC; margin: 10px 0 0;">L'art de sublimer chaque visage</p>
      </div>
      <h2 style="color: #1A1614;">Bienvenue ${user.firstName} !</h2>
      <p style="color: #6B5F58; line-height: 1.7;">Votre compte Glow Salon a bien été créé.</p>
      <p style="color: #9C9085; font-size: 0.85rem; text-align: center; margin-top: 40px;">© 2026 Glow Salon.</p>
    </div>`
  );
};

exports.sendConfirmationRdv = async (user, rdv) => {
  const date = new Date(rdv.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const heure = new Date(rdv.date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  await sendEmail(
    user.email,
    "Votre rendez-vous est confirmé ✅",
    `<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #F5F0EA;">
      <h2 style="color: #1A1614;">Rendez-vous confirmé ✅</h2>
      <p style="color: #6B5F58;">Bonjour ${user.firstName}, votre rendez-vous a été confirmé.</p>
      <div style="background: white; border-radius: 12px; padding: 24px; margin: 20px 0;">
        <p style="margin: 8px 0; color: #1A1614;"><strong>Prestation :</strong> ${rdv.prestation?.nom}</p>
        <p style="margin: 8px 0; color: #1A1614;"><strong>Date :</strong> ${date} à ${heure}</p>
        <p style="margin: 8px 0; color: #C9A876;"><strong>Prix :</strong> ${rdv.prestation?.prix} €</p>
      </div>
      <p style="color: #9C9085; font-size: 0.85rem; text-align: center;">© 2026 Glow Salon.</p>
    </div>`
  );
};

exports.sendRappelRdv = async (user, rdv) => {
  const date = new Date(rdv.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  const heure = new Date(rdv.date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  await sendEmail(
    user.email,
    "Rappel : votre rendez-vous est demain ⏰",
    `<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #F5F0EA;">
      <h2 style="color: #1A1614;">Rappel de rendez-vous ⏰</h2>
      <p style="color: #6B5F58;">Bonjour ${user.firstName}, votre rendez-vous est demain : ${date} à ${heure}.</p>
      <p style="color: #9C9085; font-size: 0.85rem; text-align: center;">© 2026 Glow Salon.</p>
    </div>`
  );
};
