const fs = require("fs");
const PDFDocument = require("pdfkit");

function createReceipt(order, path) {
    let doc = new PDFDocument({ size: "A4", margin: 50 });

    generateHeader(doc);
    generateBuyerInformation(doc, order);
    generateReceiptTable(doc, order);
    generateFooter(doc);

    doc.end();
    doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
    doc.image("logo.png", 50, 45, { width: 50 })
        .fillColor("#444444")
        .fontSize(20)
        .text("XDD Online Market", 110, 57)
        .fontSize(10)
        .text("XDD Office", 200, 50, { align: "right" })
        .text("1000 N 4TH Street", 200, 65, { align: "right" })
        .text("FAIRFIELD, IA, 52557", 200, 80, { align: "right" })
        .moveDown();
}

function generateBuyerInformation(doc, order) {
    doc.fillColor("#444444").fontSize(20).text("Order", 50, 160);

    generateHr(doc, 185);

    const buyerInformationTop = 200;
    let shippingAddress = order.shippingAddress;
    let billingAddress = order.billingAddress;
    doc.fontSize(10)
        .text("Order Number:", 50, buyerInformationTop)
        .font("Helvetica-Bold")
        .text(order._id, 150, buyerInformationTop)
        .font("Helvetica")
        .text("Order Date:", 50, buyerInformationTop + 15)
        .text(formatDate(new Date()), 150, buyerInformationTop + 15)

        .font("Helvetica-Bold")
        .text(order.user.name, 300, buyerInformationTop)
        .font("Helvetica")
        .text(shippingAddress, 300, buyerInformationTop + 15)
        .moveDown();

    generateHr(doc, 252);
}
let dueBalance = 0;

function generateReceiptTable(doc, order) {
    let i;
    const orderTableTop = 330;

    doc.font("Helvetica-Bold");
    generateTableRow(doc, orderTableTop, "Item", "Unit Cost", "Quantity", "Line Total");
    generateHr(doc, orderTableTop + 20);
    doc.font("Helvetica");
    for (i = 0; i < order.items.length; i++) {
        const item = order.items[i];
        const position = orderTableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            item.productId,
            formatCurrency(item.price),
            item.quantity,
            formatCurrency(item.price * item.quantity)
        );
        dueBalance += item.price * item.quantity;

        generateHr(doc, position + 20);
    }

    const duePosition = orderTableTop + (i + 1) * 30;
    doc.font("Helvetica-Bold");
    generateTableRow(doc, duePosition, "", "", "Total", "", 100);
    doc.font("Helvetica");
}

function generateFooter(doc) {
    doc.fontSize(10).text("Thank you for purchasing on XDD online Market.", 50, 780, {
        align: "center",
        width: 500,
    });
}

function generateTableRow(doc, y, item, unitCost, quantity, lineTotal) {
    doc.fontSize(10)
        .text(item, 50, y)
        .text(unitCost, 150, y, { width: 90, align: "right" })
        .text(quantity, 370, y, { width: 90, align: "right" })
        .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
    doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents) {
    return "$" + cents;
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return year + "/" + month + "/" + day;
}

module.exports = {
    createReceipt,
};
