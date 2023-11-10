'use server'

const action = () => {
    console.log('action working ...')
}

const accept = () => {
    console.log('accept action working ...')
}

const reject = () => {
    console.log('reject action working ...')
}

const requestChangeOrder = () => {
    console.log('requestChangeOrder action working ...')
}

export {
    action,
    accept,
    reject,
    requestChangeOrder
}