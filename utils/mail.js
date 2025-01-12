import dotenv from "dotenv";
dotenv.config();
const { STRIPE_RESP_URL_LOCAL } = process.env;

export const resetPasswordTemplate = (userID, otpCode) => {
  const emailTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password - USM Logistics LLC</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
        font-family: 'Montserrat', sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        }

        .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        font-family: 'Montserrat', sans-serif;
        }

        h1 {
        color: #333;
        }

        p {
        color: #555;
        }

        .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #3498db;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        font-family: 'Montserrat', sans-serif;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <h1>USM Logistics LLC</h1>
        <p>Dear User,</p>
        <p>We recieved a request on your account to reset your password, please make sure that this code is not shared to anyone else under any circumstance.
        Here is the One Time Pin to activate a new password reset</p>
        <p>${otpCode}</p>
        <p>If you did not request for a reset kindly reach out to us and discard this mail. Thanks.</p>
        <p>Thank you for choosing USM Logistics LLC!</p>
        <p>Best regards, Head Admin</p>
    </div>
    </body>
    </html>
    `;

  return emailTemplate;
};

export const orderUpdatedEmailTemplate = (fullname, products) => {
  const emailTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Placed</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
        <style>
          table {
            font-family: Arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
      <h2>Hello ${fullname},</h2><br/>
      <h4>Your order has been approved and is ${
        products.status
      }, you should recieve your order in about 5 - 7 work days.</h4>
        <h2><b>Your Order is ${products.status}</b></h2>
        <table>
          <tr>
            <th>Name</th>
            <th>Product Image</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
          ${products.orderCart
            .map(
              (product) => `
            <tr>
              <td>${product.name}</td>
              <td><img src="${product.selectedImage.image}" alt="${
                product.name
              }" style="max-width: 100px;"></td>
              <td>${product.description}</td>
              <td>$${product.price.toFixed(2)}</td>
              <td>${product.quantity}</td>
            </tr>
          `
            )
            .join("")}
        </table>
        <h4>Thanks for shopping at JPLGOODS.
      </body>
    </html>
  `;
  return emailTemplate;
};

export const subscriptionUpdatedEmailTemplate = (fullname, products) => {
  const emailTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Placed</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
        <style>
          table {
            font-family: Arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
      <h2>Hello ${fullname},</h2><br/>
      <h4>Your subscribed order has been approved and is ${
        products.status
      }, please reach out to us if you need assistance at any point.</h4>
        <h2><b>Your Order, ${products.status}</b></h2>
        <table>
          <tr>
            <th>Name</th>
            <th>Product Image</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
            <tr>
              <td>${products.orderCart?.name}</td>
              <td><img src="${products.orderCart?.selectedImage?.image}" alt="${
    products.orderCart?.name
  }" style="max-width: 100px;"></td>
              <td>${products.orderCart?.description}</td>
              <td>$${products.orderCart?.price.toFixed(2)}</td>
              <td>${products.orderCart?.quantity}</td>
            </tr>
        </table>
        <h4>Thanks for shopping at JPLGOODS.
      </body>
    </html>
  `;
  return emailTemplate;
};

export const orderCreatedEmailTemplate = (fullname, products) => {
  const emailTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Placed</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
        <style>
          table {
            font-family: Arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
      <h2>Hello ${fullname},</h2><br/>
      <h4>Your order has been placed and undergoing processing you
      will recieve an email notification  about the status delivery of
      your orders, refer to the table below to see the products you
      have ordered.</h4>
        <h2><b>Your Order Details</b></h2>
        <table>
          <tr>
            <th>Name</th>
            <th>Product Image</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>

          </tr>
          ${products
            .map(
              (product) => `
            <tr>
              <td>${product.name}</td>
              <td><img src="${product.selectedImage}" alt="${
                product.name
              }" style="max-width: 100px;"></td>
              <td>${product.description}</td>
              <td>$${product.price.toFixed(2)}</td>
              <td>${product.quantity}</td>

            </tr>
          `
            )
            .join("")}
        </table>
        <h4>Thanks for shopping at USM Logistics LLC.
      </body>
    </html>
  `;

  return emailTemplate;
};

export const emailVerificationTemplate = (fullName, code) => {
  const emailTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification - USM Logistics LLC</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
        font-family: 'Montserrat', sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        }

        .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        font-family: 'Montserrat', sans-serif;
        }

        h1 {
        color: #333;
        }

        p {
        color: #555;
        }

        .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #3498db;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        font-family: 'Montserrat', sans-serif;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <h1>USM Logistics LLC</h1>
        <p>Dear ${fullName},</p>
        <p>Thank you for creating an account with USM Logistics LLC.</p>
        <p>To verify your account you need to supply these OTP codes for account activation, please do not give out these codes for any reason under any circumstances.
        <p><b>${code}</b></p>
        <p>Thank you for choosing USM Logistics LLC!</p>
        <p>Best regards, Head Admin</p>
    </div>
    </body>
    </html>
    `;

  return emailTemplate;
};

export const emailVerifiedTemplate = (fullName) => {
  const emailTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Onboard - USM Logistics LLC</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
        font-family: 'Montserrat', sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        }

        .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        font-family: 'Montserrat', sans-serif;
        }

        h1 {
        color: #333;
        }

        p {
        color: #555;
        }

        .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #3498db;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        font-family: 'Montserrat', sans-serif;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <h1>USM Logistics LLC</h1>
        <p>Dear ${fullName},</p>
        <p>Your email address has been verified completely, you can proceed to sign in and continue with our services.</p>
        <p>Thank you for choosing USM Logistics LLC!</p>
        <p>Best regards, Head Admin</p>
    </div>
    </body>
    </html>
    `;

  return emailTemplate;
};
