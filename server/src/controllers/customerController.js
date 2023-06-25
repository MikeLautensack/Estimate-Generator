import { prisma } from '../../prisma/client'

export const getCustomer = async (req, res) => {
    try {
        const customers = await prisma.customers.findMany({
            where: {
              user_id: req.user
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
                customerID: req.body.customerID,
                user: req.user,
                name: req.body.name,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
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
                customer_id: req.body.customerID
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
    try {
        const customer = await prisma.customers.delete({
            where: {
              customer_id: req.params.id,
            },
          })

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