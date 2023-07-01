const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('');

function reservationSummary({user , reservationInfo}){
    console.log(reservationInfo);
const name = user.name
const checkinTime = reservationInfo.checkInTime
const checkoutTime = reservationInfo.checkOutTime
const ElapsedTime = convertSecondsToHours(reservationInfo.timeDiff)
const price = reservationInfo.totalPrice

function convertSecondsToHours(seconds){
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsRemainder = seconds % 60;
    return `${hours}h ${minutes}m ${secondsRemainder}s`;
  }
const msg = {
  to: user.email,
  from: 'parksquare@mail.com',
  subject: 'Parking Reservation Summary',
  text: `Dear ${name},

    We hope you had a great experience with our parking service. This email is to provide you with a summary of your parking reservation details.

    Check-in : ${checkinTime}
    Check-out : ${checkoutTime}
    Elapsed Time: ${ElapsedTime}
    Price: ${price}$

    Thank you again for choosing our parking service. We hope to see you again soon!

    Best regards,

    Park Square
  `,
};

sgMail.send(msg)
  .then(() => console.log('Email sent'))
  .catch((error) => console.error(error));
}

module.exports = reservationSummary
