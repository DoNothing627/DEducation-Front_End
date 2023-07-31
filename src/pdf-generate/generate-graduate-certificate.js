// import fs from "fs";
// import moment from "moment";
// import PDFDocument from "pdfkit";
const fs = require("fs");
const moment = require("moment");
const PDFDocument = require("pdfkit");
const { ThirdwebStorage } = require("@thirdweb-dev/storage");

const storage = new ThirdwebStorage();

const generateGraduateCertificate = async (name, major, result) => {
  // Create the PDF document
  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
  });

  // The name
  // const name = "An";

  // Pipe the PDF into an name.pdf file
  doc.pipe(fs.createWriteStream(`${name}_graduate.pdf`));

  // Draw the certificate image
  doc.image(
    "/home/an/Code/Deducation/Front-end/public/certificate-form/graduate-certificate.png",
    0,
    0,
    { width: 842 }
  );

  // Remember to download the font
  // Set the font to Dancing Script
  doc.font("/home/an/Code/Deducation/Front-end/public/fonts/Halimun.ttf");

  // Draw the name
  doc.fontSize(50).text(name, 70, 260, {
    align: "center",
  });

  doc
    .font(
      "/home/an/Code/Deducation/Front-end/public/fonts/Cormorant-VariableFont_wght.ttf"
    )
    .fontSize(15)
    .text(
      `has completed major ${major} with classification ${result}`,
      80,
      350,
      {
        align: "center",
      }
    );

  // Draw the date
  doc.fontSize(17).text(moment().format("MMMM Do YYYY"), -280, 420, {
    align: "center",
  });

  // Finalize the PDF and end the stream
  doc.end();

  setTimeout(async function () {
    //your code to be executed after 1 second
    const upload = await storage.upload(
      fs.readFileSync(`${name}_graduate.pdf`)
    );
    console.log(`Gateway URL - ${storage.resolveScheme(upload)}`);
    await fs.unlinkSync(`${name}_graduate.pdf`);
  }, 200);
  setTimeout(() => {}, 50);
};
//module.exports = generateGraduateCertificate;

generateGraduateCertificate("Dao Xuan An", "Computer Engineering", "Very Good");
