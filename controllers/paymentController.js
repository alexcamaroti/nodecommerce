module.exports = function(app) {
    app.get("/payments", function(req, resp){
        console.log("Payments URL has been accessed.");
        resp.send("Hello Fellas!!!");
    })

    app.post("/payments/payment", function(req,res) {
        console.log("Connecting to payment.")
        var payment = req.body;
        payment.status = 'PUBLISHED';
        payment.dateCreated = new Date();
        console.log(payment);
        res.send("OK");
    });
}