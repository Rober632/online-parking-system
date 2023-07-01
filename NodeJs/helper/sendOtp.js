const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('');
const email = 'robersamy98@gmail.com'
const handelOtp = async (email) => {
  const generateOTP = () => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  };

  const sendOTP = async (email) => {
    const otp = generateOTP();
    // const otp =+ (Math.floor(Math.random()*1000000))
    const msg = {
      to: email,
      from: 'Parksquare@mail.com',
      subject: 'confirmation code',
      text: `Your OTP is ${otp}. Please use this OTP to confirm your booking`,
    };

    try {
      await sgMail.send(msg);
      console.log('OTP sent successfully');
      return otp;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  };

  try {
    const otp = await sendOTP(email);
    console.log(`${otp} is your code for confirmation`);
    return otp;
  } catch (error) {
    console.error('Error generating/sending OTP:', error);
    throw error;
  }
};

module.exports = handelOtp;