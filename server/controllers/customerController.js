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

export const postCustomer = async (req, res) => {
    try {
        const customer = await customerModel.create({
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
    try {
        const customer = await customerModel.findById(req.params.id)

        if(!customer) {
            res.status(400).send('Customer not found')
        }
   
        const user = await userModel.findById(req.user)
    
        if(!user) {
            res.status(401).send('User not found')
        }

        const updatedCustomer = await customerModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
   
        // Make sure logged in user matches goal user
        if(customer) {
            if(customer.user.toString() !== user._id.toString()) {
                res.status(401).send('User not authorized')
            } else {
                res.status(200).send(updatedCustomer)
            }
        }
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
        } else {
            const user = await userModel.findById(req.user._id)

            if(!user) {
                res.status(401).send('User not found')
            }
            if(customer.user.toString() !== user._id.toString()) {
                res.status(401).send('User not authorized')
            }
            await customer.remove()

            res.status(200).send(`Deleted Customer ${req.params.id}`)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}