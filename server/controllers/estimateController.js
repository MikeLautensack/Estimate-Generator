import estimateModel from "../models/estimateModel.js"

export const getEstimate = async (req, res) => {
    try {
        const estimates = await estimateModel.find()
        res.status(200).send(estimates)
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}

export const postEstimate = async (req, res) => {
    try {
        const estimate = await estimateModel.create({
            user: req.user,
            estimateName: req.body.estimateName,
            customerName: req.body.customerName,
            customerEmail: req.body.customerEmail,
            customerPhone: req.body.customerPhone,
            address: req.body.address,
            tasks: req.body.tasks
        })

        res.status(200).send(estimate)
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}

export const putEstimate = async (req, res) => {
    try {
        const estimate = await estimateModel.findById(req.params.id)

        if(!estimate) {
            res.status(400).send('Estimate not found')
        }

        const updatedEstimate = await estimateModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })

        res.status(200).send(updatedEstimate)
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}

export const deleteEstimate = async (req, res) => {
    try {
        const estimate = await estimateModel.findById(req.params.id)

        if(!estimate) {
            res.status(400).send('Estimate not found')
        }

        await estimate.remove()

        res.status(200).send(`Deleted Estimate ${req.params.id}`)
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}