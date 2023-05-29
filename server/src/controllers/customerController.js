import customerModel from "../models/customerModel.js"
import userModel from "../models/userModel.js"


export const getCustomer = async (req, res) => {
    try {
        const customers = await customerModel.find({ user: req.user })
        res.status(200).send(customers)
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}
//testing
export const postCustomer = async (req, res) => {
    try {
        const customer = await customerModel.create({
            customerID: req.body.customerID,
            user: req.user,
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            dateCreated: req.body.dateCreated,
            dateModified: req.body.dateModified
        })

        res.status(200).send(customer)
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}

export const putCustomer = async (req, res) => {
    
    console.log('ID logs')
    console.log(req.params.id)
    console.log(req.body._id)
    console.log(req.body.customerID)

    try {
        const updatedCustomer = await customerModel.findOneAndUpdate({customerID: req.body.customerID}, req.body, {
            new: true,
        })
        if(!updatedCustomer) {
            res.status(400).send('Customer not found')
        }
        res.status(200).send(updatedCustomer)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

export const deleteCustomer = async (req, res) => {

    console.log('ID logs')
    console.log(req.params.id)
    console.log(req.body._id)
    console.log(req.body.id)

    try {
        const customer = await customerModel.findById(req.params.id)

        if(!customer) {
            res.status(400).send('Customer not found')
        } else {
            await customer.remove()
            res.status(200).send(`Deleted Customer ${customer.id}`)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}