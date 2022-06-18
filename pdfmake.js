const fs = require("fs");

const Pdfmake = require("pdfmake");

var fonts = {
  Roboto: {
    normal: "fonts/roboto/Roboto-Regular.ttf",
    bold: "fonts/roboto/Roboto-Medium.ttf",
    italics: "fonts/roboto/Roboto-Italic.ttf",
    bolditalics: "fonts/roboto/Roboto-MediumItalic.ttf",
  },
};

let pdfmake = new Pdfmake(fonts);

function headerTest(farmInfo) {
  return {
    // text: "Page " + currentPage.toString() + " of " + pageCount,
    alignment: "center",
    style: "normalText",
    margin: [10, 10, 10, 10],
    table: {
      widths: ["*"],
      body: [[farmInfo]],
    },
  };
}

// function generatePdf(docDefinition, callback) => {

//     try {
//         let pdfmake = new Pdfmake(fonts);
//         let pdfDoc = pdfmake.createPdfKitDocument(docDefination, {});

//         let writeStream = fs.createWriteStream("pdfs/constTest.pdf");
//         let chunks = [];
//         const result;

//         pdfDoc.on('data', (chunk) => {
//             chunks.push(chunk);
//         });

//         pdfDoc.on('end', () => {
//             result = Buffer.concat(chunks);
//             callback(result);
//         });

//         pdfDoc.end();

//     } catch(err) {
//         throw(err);
//     }
//   };
// function generatePdf(docDefinition, successCallback, errorCallback) => {
// try {
//     const fontDescriptors = { ... };
//     const printer = new pdfMakePrinter(fontDescriptors);
//     const doc = printer.createPdfKitDocument(docDefinition);

//     doc.pipe(
//     fs.createWriteStream('docs/filename.pdf').on("error", (err) => {
//         errorCallback(err.message);
//     })
//     );

//     doc.on('end', () => {
//     successCallback("PDF successfully created and stored");
//     });

//     doc.end();

// } catch(err) {
//     throw(err);
// }
// };

const makePDF = (data) => {
  let aPromise = new Promise((resolve, reject) => {
    console.time(`creatingPDF`);
    console.log(data.farm);
    /// all those stuffs

    let docDefination = {
      header: headerTest(data.farm),
      footer: {
        margin: [72, 0, 72, 0],
        fontSize: 10,
        columns: [
          {
            with: "auto",
            alignment: "left",
            text: "© Blogger Nepal 2022",
          },
        ],
      },
      content: [`Hello World ${data.farm}`],
    };

    let pdfDoc = pdfmake.createPdfKitDocument(docDefination, {});

    let writeStream = fs.createWriteStream("pdfs/constTest.pdf");

    pdfDoc.pipe(writeStream);
    pdfDoc.end();

    writeStream.on("finish", function () {
      console.timeEnd("creatingPDF");
      resolve("pdfs/test.pdf");
    });
  });

  return aPromise;
};

makePDF({
  farm: "Big Farms",
  animals: "elephant upstairs",
}).then((file) => {
  console.log(file);
});
