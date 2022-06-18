/**
 * @desc Print pdf for the puzzles
 * @param {Array} sections
 * @param {Number} pageWidth Width in inches
 * @param {Number} pageHeight Width in inches
 * */
const PrintPdf = (sections, pageWidth, pageHeight) => {
  const { pageSize, content, pageMargins } = pdfContent(sections, pageWidth, pageHeight);
  const docDefinition = {
    pageSize,
    content: content,
    pageMargins,
    footer: function (currentPage, pageCount) {
      return {
        text: "Page " + currentPage.toString() + " of " + pageCount,
        alignment: currentPage % 2 === 0 ? "left" : "right",
        style: "normalText",
        margin: [10, 10, 10, 10],
      };
    },
  };

  // console.log(docDefinition);
  pdfMake.createPdf(docDefinition).download(`pdf-${+new Date()}.pdf`);
};
