import {prisma} from '../client.js'

export const getCustomer = async (req, res) => {
    try {
        const customers = await prisma.customers.findMany({
            where: {
              user_id: req.user.user_id
            }
          })
        res.status(200).send(customers)
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}

export const postCustomer = async (req, res) => {
    try {
        const customer = await prisma.customers.create({
            data: {
                customer_id: req.body.customer_id,
                user_id: req.user.user_id,
                name: req.body.name,
                email: req.body.email,
                phone_number: req.body.phone_number,
                address: req.body.address,
                dateCreated: req.body.dateCreated,
                dateModified: req.body.dateModified
            }
        })
        res.status(200).send(customer)
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}

export const putCustomer = async (req, res) => {
    try {
        const updatedCustomer = await prisma.customers.update({
            where: {
                customer_id: req.body.customer_id
            },
            data: req.body
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
    console.log('Testing 123`', req.params.customer_id)
    console.log('Testing 123`', req.params)
    try {
        const customer = await prisma.customers.delete({
            where: {
              customer_id: parseInt(req.params.customer_id),
            },
          })

        if(!customer) {
            res.status(400).send('Customer not found')
        } else {
            res.status(200).send(`Deleted Customer ${customer.customer_id}`)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}