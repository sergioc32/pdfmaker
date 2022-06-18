/**
 * @desc pdf content
 * @param {Array} sections
 * @param {Number} pageWidth Width in inches
 * @param {Number} pageHeight Width in inches
 * @return title, pageSize, content, pageMargin
 * */
const pdfContent = (sections, pageWidth, pageHeight) => {
  const pageSize = {
    width: pageWidth * 72,
    height: pageHeight * 72,
  };
  const imageWidth = 1.0;
  const imagePercentage = 70;
  const pageMargins = [40, 60, 40, 60];
  let content = [];
  sections.forEach((section, si) => {
    content.push({
      text: section.heading || `Section ${si + 1}`,
      fontSize: 20,
      alignment: "center",
      margin: [15, 15],
      // If it is the first section, do not insert a pageBreak.
      pageBreak: si === 0 ? null : "before",
    });
    section.images.forEach((image, j) => {
      content.push({
        image,
        alignment: "center",
        width: (pageSize.width * imageWidth * imagePercentage) / 100,
        pageBreak: j !== 0 ? "before" : null,
      });
    });
  });
  return {
    pageSize,
    content,
    pageMargins,
  };
};
