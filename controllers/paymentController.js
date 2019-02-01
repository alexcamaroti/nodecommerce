var PaymentDAO =  require('./../dao/PaymentDAO.js');

module.exports = function(app) {
    app.get("/payments", function(req, resp){
        console.log("Payments URL has been accessed.");
        resp.send("Hello Fellas!!!");
    })

    app.post("/payments/payment", function(req,res) {
        let paymentDAO = new PaymentDAO(); 
        console.log("Connecting to payment.")
        var payment = req.body;
        console.log("Payment so body: "  + JSON.stringify(payment));
        payment.status = 'PUBLISHED';
        payment.dateCreated = new Date();
        payment.type = 'Visa';
        payment.dateValidation = '09/2021'
        console.log("Payment + conteudo" + JSON.stringify(payment));
        var payment = paymentDAO.add(null, res, payment);
    });
}