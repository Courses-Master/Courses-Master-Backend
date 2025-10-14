 async function getEmailViewByUser (user){
    return `
<div style="
  max-width: 600px;
  margin: auto;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-top: 5px solid #10bfa0;
">
  <!-- Logo -->
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="https://i.ibb.co/5x2mR1M/logo.png" alt="Course Master" style="width: 60px; height: 60px;" />
  </div>

  <!-- Title -->
  <h2 style="color: #10bfa0; text-align: center; margin-bottom: 10px;">
    Welcome to Course Master 🎓
  </h2>

  <!-- Body -->
  <p style="color: #333; font-size: 16px; line-height: 1.5; text-align: center;">
    Hi <strong>${user}</strong>,<br><br>
    We're excited to have you on board!<br>
    This is a quick confirmation that your account has been successfully created.
  </p>

  <!-- Button -->
  <div style="text-align: center; margin-top: 25px;">
    <a href="{ActivationLink}" style="
      background-color: #10bfa0;
      color: white;
      padding: 12px 25px;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
      display: inline-block;
    ">
      Activate Your Account
    </a>
  </div>

  <!-- Footer -->
  <p style="color: #888; font-size: 13px; text-align: center; margin-top: 30px;">
    If you did not sign up for Course Master, please ignore this email.
  </p>
</div>
  `;
}

module.exports = getEmailViewByUser