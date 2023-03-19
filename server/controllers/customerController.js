import customerModel from "../models/customerModel.js"

export const getCustomer = async (req, res) => {
    try {
        const customers = await customerModel.find()
        res.status(200).send(customers)
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}

export const postCustomer = async (req, res) => {
    try {
        const customer = await customerModel.create({
            user: req.user,
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address
        })

        res.status(200).send(customer)
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}

export const putCustomer = async (req, res) => {
    try {
        const customer = await customerModel.findById(req.params.id)

        if(!customer) {
            res.status(400).send('Customer not found')
        }

        const updatedCustomer = await customerModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })

        res.status(200).send(updatedCustomer)
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}

export const deleteCustomer = async (req, res) => {
    try {
        const customer = await customerModel.findById(req.params.id)

        if(!customer) {
            res.status(400).send('Customer not found')
        }

        await customer.remove()

        res.status(200).send(`Deleted Customer ${req.params.id}`)
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}