import {prisma} from '../client.js'

export const getEstimate = async (req, res) => {
    try {
        const estimates = await prisma.estimates.findMany({
            where: {
                user_id: req.user._id
            }
        })
        res.status(200).send(estimates)
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}

export const postEstimate = async (req, res) => {
    try {
        const estimate = await prisma.estimates.create({
            data: {
                user: req.user,
                estimateName: req.body.estimateName,
                customerName: req.body.customerName,
                customerEmail: req.body.customerEmail,
                customerPhone: req.body.customerPhone,
                address: req.body.address,
                dateCreated: req.body.dateCreated,
                dateModified: req.body.dateModified,
                tasks: req.body.tasks,
                total: req.body.total
            }
        })
        res.status(200).send(estimate)
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}

export const putEstimate = async (req, res) => {
    try {
        const estimate = await prisma.estimates.findUnique({
            where: {
                user_id: req.params.id
            }
          })
        if(!estimate) {
            res.status(400).send('Estimate not found')
        } else {
            const updatedEstimate = await prisma.estimates.update({
                where: {
                  estimate_id: req.params.id
                },
                data: req.body
              })
            const user = await prisma.users.findUnique({
                where: {
                    user_id: req.user._id
                }
              })
            if(!user) {
                res.status(401).send('User not found')
            }
            // Make sure logged in used matches goal user
            if(estimate.user.toString() !== user._id.toString()) {
                res.status(401).send('User not authorized')
            }
            res.status(200).send(updatedEstimate)
        }    
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}

export const deleteEstimate = async (req, res) => {
    try {
        const estimate = await prisma.estimates.delete({
            where: {
              estimate_id: req.params.id
            }
          })
        if(!estimate) {
            res.status(400).send('Estimate not found')
        } else {
            const user = await prisma.users.findUnique({
                where: {
                  user_id: req.user._id
                }
              })
        if(!user) {
            res.status(401).send('User not found')
        }
        // Make sure logged in used matches goal user
        if(estimate.user.toString() !== user._id.toString()) {
            res.status(401).send('User not authorized')
        }
        await estimate.remove()
        res.status(200).send(`Deleted Estimate ${req.params.id}`)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}