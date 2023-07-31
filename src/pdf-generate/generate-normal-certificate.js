import fs from "fs";
import moment from "moment";
import PDFDocument from "pdfkit";

const { ThirdwebStorage } = require("@thirdweb-dev/storage");

const storage = new ThirdwebStorage();

// Create the PDF document
const generateNormalCertificate = (name, supervisorName, subject, mark) => {
  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
  });

  // The name
  //   const name = "An";

  // Pipe the PDF into an name.pdf file
  doc.pipe(fs.createWriteStream(`${name}_normal.pdf`));

  // Draw the certificate image
  doc.image(
    "/home/an/Code/Deducation/Front-end/public/certificate-form/normal-certificate.png",
    0,
    0,
    { width: 830 }
  );

  // Remember to download the font
  // Set the font to Dancing Script
  doc.font(
    "/home/an/Code/Deducation/Front-end/public/fonts/Amsterdam Four_ttf 400.ttf"
  );

  // Draw the name
  doc.fontSize(50).text(name, 50, 250, {
    align: "center",
  });

  // Draw the result
  doc
    .font("/home/an/Code/Deducation/Front-end/public/fonts/Cormorant-VariableFont_wght.ttf")
    .fontSize(15)
    .text(`has completed ${subject} with mark ${mark}`, 50, 400, {
      align: "center",
    });

  // Draw the suppervisor name
  doc.fontSize(13).text(supervisorName, 55, 455, {
    align: "center",
  });

  // Draw the date
  // doc.fontSize(13).text(moment().format("MMMM Do YYYY"), 590, 485, {
  //   align: "center",
  // });

  // Finalize the PDF and end the stream
  doc.end();

  setTimeout(async function () {
    //your code to be executed after 1 second
    const upload = await storage.upload(
      fs.readFileSync(`${name}_graduate.pdf`)
    );
    console.log(`Gateway URL - ${storage.resolveScheme(upload)}`);
    fs.unlinkSync(`${name}_graduate.pdf`);
    return storage.resolveScheme(upload);
  }, 200);
  
  
};
module.exports = generateNormalCertificate;

// generateNormalCertificate(
//   "Dao Xuan An",
//   "Truong Dieu Linh",
//   "Graduate Project",
//   "A+"
// );
