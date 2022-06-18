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

// pdfDoc = pdfmake.createPdfKitDocument(docDefination, {});
// pdfDoc.pipe(fs.createWriteStream('pdfs/test.pdf'));
// pdfDoc.end();

let content = [
  {
    text: "Hello World",
    alignment: "center",
    fontSize: 25,
  },
];

for (let i = 0; i < 50; i++) {
  content.push({
    text: `${i}) a random test.. `,
  });
}

let headerfooterDoc = {
  header: {
    margin: [0, 20, 0, 0],
    alignment: "center",

    image: "images/info.png",
    height: 100,
  },

  //
  // static footer
  // footer: {
  //     margin: [72, 0, 72, 0],
  //     fontSize: 10,
  //     columns: [{
  //             with: 'auto',
  //             alignment: 'left',
  //             text: '© Blogger Nepal 2022'
  //         }

  //     ],
  // },
  //
  // for dynamic footer

  footer: (currentPage, pageCount, pageSize) => {
    return {
      margin: [72, 0, 72, 0],
      fontSize: 10,
      columns: [
        {
          with: "auto",
          alignment: "left",
          text: "© Blogger Nepal 2022",
        },
        {
          with: "auto",
          alignment: "right",
          // text: 'Page | 1'
          text: [
            {
              color: "#7f7f7f",
              text: "Page | ",
            },
            {
              text: currentPage,
            },
          ],
        },
      ],
    };
  },

  content: content,
  pageMargins: [72, 120, 72, 50],
};

pdfDoc = pdfmake.createPdfKitDocument(headerfooterDoc, {});
pdfDoc.pipe(fs.createWriteStream("pdfs/headerfooter.pdf"));
pdfDoc.end();

let stylingDocs = {
  content: [
    {
      text: "Report",
      style: "header",
    },
    {
      text: "This is an anual report. bla bla, some text goes here about this and that",
      style: "text",
    },
    {
      text: "About Blogger Nepal",
      style: "subheader",
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porta, lectus ac pellentesque suscipit, lacus felis cursus nisi, ac dictum velit ipsum ac dolor. Ut erat eros, dictum nec porttitor non, rhoncus sed augue. Maecenas consectetur aliquam lorem. Duis id congue risus. Ut vel rutrum massa, eget convallis nulla. Praesent ac sagittis diam. Aliquam erat volutpat. Fusce posuere sapien vitae suscipit interdum. Curabitur in mattis massa, vel aliquet ex. Vestibulum ornare lorem et sollicitudin commodo. Sed id vestibulum ligula. ",
      style: "text",
    },
    {
      text: "\n",
    },
    {
      text: "Nunc laoreet mauris sed vestibulum pellentesque. Nunc suscipit ante placerat orci pulvinar varius. Sed in velit maximus odio rutrum molestie et a enim. Mauris vitae dui rutrum tortor euismod tempor in eu diam. Fusce pulvinar nunc at feugiat pharetra. Morbi tempus accumsan finibus. Suspendisse dictum augue eu finibus volutpat. Suspendisse vel ipsum quis eros tincidunt posuere id eu nunc. Sed cursus sodales accumsan. Sed interdum dolor ac dignissim eleifend. ",
      style: "text",
    },
    {
      text: [
        "\nThe output of the code was ",
        {
          bold: true,
          fontSize: 15,
          text: "Hello World!",
        },
        " It worked. as expected",
      ],
    },
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      alignment: "center",
      margin: [0, 30, 0, 20],
    },
    subheader: {
      fontSize: 14,
      margin: [0, 15, 0, 10],
      color: "#003893",
    },
    text: {
      alignment: "justify",
    },
  },
};

// pdfDoc = pdfmake.createPdfKitDocument(stylingDocs, {});
// pdfDoc.pipe(fs.createWriteStream('pdfs/styling.pdf'));
// pdfDoc.end();

let listTableDocs = {
  content: [
    {
      text: "About Blogger Nepal",
      style: "subheader",
    },
    {
      ul: [
        {
          text: "Nepali Calendar",
          link: "http://calendar.bloggernepal.com",
        },
        "Blog",
        "tools",
      ],
    },
    {
      text: "\n\n",
    },
    {
      ol: [
        {
          text: "Is this a Word?",
          style: "link",
          link: "https://isthisaword.bloggernepal.com/",
        },
        {
          text: "Countries with State and Dialcode",
          style: "link",
          link: "https://countries.bloggernepal.com/",
        },
        {
          text: "SocketIO Client Online",
          style: "link",
          link: "https://socketio.bloggernepal.com/",
        },
        {
          text: "Bunny Jump",
          style: "link",
          link: "https://bunnyjump.bloggernepal.com/",
        },
      ],
    },
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      alignment: "center",
      margin: [0, 30, 0, 20],
    },
    subheader: {
      fontSize: 14,
      margin: [0, 15, 0, 10],
      color: "#003893",
    },
    text: {
      alignment: "justify",
    },
    link: {
      decoration: "underline",
      color: "#0074c1",
    },
  },
};

let table = {
  // headers are automatically repeated if the table spans over multiple pages
  // you can declare how many rows should be treated as headers
  headerRows: 3,
  widths: ["*", "auto", 100, 60, 50, 60, 50],

  body: [
    [
      {
        text: "Name",
        rowSpan: 3,
      },
      {
        text: "Age",
        rowSpan: 3,
      },
      {
        text: "Gender",
        rowSpan: 3,
      },
      {
        text: "Mark",
        alignment: "center",
        colSpan: 4,
      },
      {},
      {},
      {},
    ],
    [
      {},
      {},
      {},
      {
        text: "First Year",
        alignment: "center",
        colSpan: 2,
      },
      {},
      {
        text: "Second year",
        alignment: "center",
        colSpan: 2,
      },
      {},
    ],
    [
      {},
      {},
      {},
      {
        text: "Theory",
      },
      {
        text: "Practical",
      },
      {
        text: "Theory",
      },
      {
        text: "Practical",
      },
    ],
    // now data and values
    ["Ram", "32", "Male", "90", "95", "80", "95"],
    ["Sita", "30", "Female", "95", "95", "80", "95"],
    ["Laxman", "26", "Male", "70", "90", "75", "90"],
  ],
};

listTableDocs["content"].push(
  {
    text: "Table Now",
    style: "subheader",
  },
  {
    table: table,
  }
);

// Wait for the write to complete

pdfDoc = pdfmake.createPdfKitDocument(listTableDocs, {});

let writeStream = fs.createWriteStream("pdfs/listtable.pdf");

pdfDoc.pipe(writeStream);
pdfDoc.end();

writeStream.on("finish", function () {
  // do stuff here that need to be after the pdf write is completed
  // sending to frontend
  // sending as attachment
});

const makePDF = (datas) => {
  let aPromise = new Promise((resolve, reject) => {
    console.time("creatingPDF");

    /// all those stuffs

    // var dd = {
    //   // by default we use portrait, you can change it to landscape if you wish
    //   pageOrientation: "landscape",
    //   footer: function (currentPage, pageCount) {
    //     return currentPage.toString() + " of " + pageCount;
    //   },
    //   header: function (currentPage, pageCount, pageSize) {
    //     // you can apply any logic and return any valid pdfmake element

    //     return [
    //       { text: "simple text", alignment: currentPage % 2 ? "left" : "right" },
    //       { canvas: [{ type: "rect", x: 170, y: 32, w: pageSize.width - 170, h: 40 }] },
    //     ];
    //   },

    //   content: [
    //     { text: "1 Headline", headlineLevel: 1 },
    //     "Some long text of variable length ...",
    //     { text: "2 Headline", headlineLevel: 1 },
    //     "Some long text of variable length ...",
    //     { text: "3 Headline", headlineLevel: 1 },
    //     "Some long text of variable length ...",
    //   ],
    //   pageBreakBefore: function (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
    //     return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
    //   },
    // };
    // 404-796-0426
    // 35413059
    //
    let content = [
      {
        text: "Hello World",
        alignment: "center",
        fontSize: 25,
      },
    ];

    for (let i = 0; i < 50; i++) {
      content.push({
        text: `${i}) a random test.. `,
      });
    }
    let header = [
      {
        margin: [10, 10, 0, 0],
        // alignment: "center",
        text: "sample text",
        // image: "images/info.png",
        // height: 100,
      },
    ];

    function headerTest(farmInfo) {
      return {
        // text: "Page " + currentPage.toString() + " of " + pageCount,
        alignment: "center",
        style: "normalText",
        margin: [10, 10, 10, 10],
        table: {
          widths: ["*"],
          body: [["Some farm name"]],
        },
      };
    }

    let headerfooterDoc = {
      pageOrientation: "landscape",
      header: headerTest,
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
      content: content,
      pageMargins: [72, 120, 72, 50],
    };

    let pdfDoc = pdfmake.createPdfKitDocument(headerfooterDoc, {});

    let writeStream = fs.createWriteStream("pdfs/test.pdf");

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
  data: "asd needed",
}).then((file) => {
  console.log(file);
});
