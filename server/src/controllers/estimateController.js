    import {prisma} from '../client.js'

export const getEstimate = async (req, res) => {
    try {
        const estimates = await prisma.estimates.findMany({
            where: {
                user_id: req.user.user_id
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
                estimate_id: req.body.estimate_id,
                estimate_name: req.body.estimateName,
                customer_name: req.body.customerName,
                customer_email: req.body.customerEmail,
                customer_phone: req.body.customerPhone,
                address: req.body.address,
                date_created: req.body.dateCreated,
                date_modified: req.body.dateModified,
                tasks: {
                    create: req.body.tasks.map((task) => ({
                        task_id: task.task_id,
                        task_name: task.taskName,
                        task_description: task.taskDescription,
                        total: task.total,
                        subtasks: {
                            create: task.subtasks.map((subtask) => ({
                                subtask_id: subtask.subtask_id,
                                subtask_description: subtask.subtaskDescription,
                                calc_method: subtask.calcMethod,
                                time_unit: subtask.timeUnit,
                                time_price_per_unit: subtask.timePricePerUnit,
                                time_quantity: subtask.timeQuantity,
                                time_subtotal: subtask.timeSubtotal,
                                materials_unit: subtask.materialsUnit,
                                materials_price_per_unit: subtask.materialsPricePerUnit,
                                materials_quantitly: subtask.materialsQuantity,
                                materials_subtotal: subtask.materialsSubtotal,
                                unit: subtask.unit,
                                price_per_unit: subtask.pricePerUnit,
                                quantity: subtask.quantity,
                                custom_subtotal: subtask.customSubtotal,
                                subtotal: subtask.subtotal,
                                subtask_total: subtask.subtaskTotal 
                        }))}
                    }))
                },
                total: req.body.total,
                user_id: req.user.user_id,
            }
        })
        res.status(200).send(estimate)
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}

export const putEstimate = async (req, res) => {
    console.log(typeof req.params.estimate_id)
    try {
        const estimate = await prisma.estimates.findUnique({
            where: {
                estimate_id: parseInt(req.params.estimate_id)
            }
          })
        if(!estimate) {
            res.status(400).send('Estimate not found')
        } else {
            const updatedEstimate = await prisma.estimates.update({
                where: {
                  estimate_id: req.params.estimate_id
                },
                data: {
                    estimate_id: req.body.estimate_id,
                    estimate_name: req.body.estimateName,
                    customer_name: req.body.customerName,
                    customer_email: req.body.customerEmail,
                    customer_phone: req.body.customerPhone,
                    address: req.body.address,
                    date_created: req.body.dateCreated,
                    date_modified: req.body.dateModified,
                    tasks: {
                        create: req.body.tasks.map((task) => ({
                            task_id: task.task_id,
                            task_name: task.taskName,
                            task_description: task.taskDescription,
                            total: task.total,
                            subtasks: {
                                create: task.subtasks.map((subtask) => ({
                                    subtask_id: subtask.subtask_id,
                                    subtask_description: subtask.subtaskDescription,
                                    calc_method: subtask.calcMethod,
                                    time_unit: subtask.timeUnit,
                                    time_price_per_unit: subtask.timePricePerUnit,
                                    time_quantity: subtask.timeQuantity,
                                    time_subtotal: subtask.timeSubtotal,
                                    materials_unit: subtask.materialsUnit,
                                    materials_price_per_unit: subtask.materialsPricePerUnit,
                                    materials_quantitly: subtask.materialsQuantity,
                                    materials_subtotal: subtask.materialsSubtotal,
                                    unit: subtask.unit,
                                    price_per_unit: subtask.pricePerUnit,
                                    quantity: subtask.quantity,
                                    custom_subtotal: subtask.customSubtotal,
                                    subtotal: subtask.subtotal,
                                    subtask_total: subtask.subtaskTotal 
                            }))}
                        }))
                    },
                    total: req.body.total,
                    user_id: req.user.user_id,
                }
              })
            const user = await prisma.users.findUnique({
                where: {
                    user_id: req.user.user_id
                }
              })
            if(!user) {
                res.status(401).send('User not found')
            }
            // Make sure logged in used matches goal user
            if(estimate.user.toString() !== user.user_id.toString()) {
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
              estimate_id: req.params.user_id
            }
          })
        if(!estimate) {
            res.status(400).send('Estimate not found')
        } else {
            const user = await prisma.users.findUnique({
                where: {
                  user_id: req.user.user_id
                }
              })
        if(!user) {
            res.status(401).send('User not found')
        }
        // Make sure logged in used matches goal user
        if(estimate.user.toString() !== user.user_id.toString()) {
            res.status(401).send('User not authorized')
        }
        await estimate.remove()
        res.status(200).send(`Deleted Estimate ${req.params.user_id}`)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}