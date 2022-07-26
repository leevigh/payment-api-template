const initializePayment = require('../config/flutterwave')

const Flutterwave = require('flutterwave-node-v3')

const flw = new Flutterwave(process.env.FLWPUBKEY, process.env.FLWSECKEY)

module.exports = {
    payment: async (req, res) => {
        const productId = req.params.id;

        let tx_ref = `productx-${productId}`

        try {
            const { email, phone, amount } = req.body;

            const details = {
                tx_ref, amount,
                redirect_url: `${process.env.DEVELOPMENT_URL}verify/${productId}`,
                currency: "NGN",
                customer: {
                    email,phone
                }
            }

            initializePayment(details)
                .then(response => {
                    return res.status(200).json({
                        status: response.status,
                        payment_url: response.data.link
                    })
                })
                .catch(err => {
                    return res.status(400).json({
                        message: err
                    })
                })


        } catch (error) {
            console.log("controller error", error);

            return res.status(500).json({
                message: error
            })
        }
    },

    verify: async (req, res) => {
        const productId = req.params.id;
        const transactionId = req.query.transaction_id;
        const status = req.query.status;

        switch(status) {
            case 'successful':
                const response = await flw.Transaction.verify({ id: transactionId })

                // perform some checks before saving to DB

                return res.status(201).json({
                    message: "Payment Verified",
                    redirect_url: 'http://localhost:4000/'
                })

                break;
            case 'failed':
                return res.status(500).json({
                    message: "Verification Failed",
                    redirect_url: 'http://localhost:4000/'
                })

                break;
            default:
                return res.status(500).json({
                    message: "Something went wrong...",
                    redirect_url: 'http://localhost:4000/'
                })
        }
    }
}