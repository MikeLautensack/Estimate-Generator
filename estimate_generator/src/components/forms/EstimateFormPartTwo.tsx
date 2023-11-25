'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { FaPlus } from 'react-icons/fa'
import { useFieldArray, useFormContext } from 'react-hook-form'
import EstimateFormTable from '../tables/contractorTables/estimateFormTable/EstimateFormTable'
import TaxSelector from '../misc/TaxSelector'
import { formatPriceString } from '@/utils/formatingFunctions'
import { EstimateFormPartTwoProps } from '@/types/estimates'

const EstimateFormPartTwo = ({
    customers,
    profile,
    fields,
    prepend,
    remove
}: EstimateFormPartTwoProps) => {

  const [ customerName, setCustomerName ] = useState('')
  const [ customerEmail, setCustomerEmail ] = useState('')
  const [ projectAddress, setProjectAddress ] = useState('')
  const [ businessName, setBusinessName ] = useState('')
  const [ businessAddress, setBusinessAddress ] = useState('')
  const [ businessPhone, setBusinessPhone ] = useState('')
  const [ subtotal, setSubtotal ] = useState(0)
  const [ taxRate, setTaxRate ] = useState(.07)
  const [ tax, setTax ] = useState(0)
  const [ total, setTotal ] = useState(0)

  const { register, watch, setValue, getValues, control } = useFormContext()

  const calculateTotal = (): number => {
    let num = 0
    for(let i = 0; i < fields.length; i++) {
        num += getValues(`lineItems.${i}.amount`)
    }
    return num
  }

  const applyTotal = () => {
    const calculatedTotal = calculateTotal()
    setSubtotal(calculatedTotal)
    setValue('subtotal', calculatedTotal)
  }

  useEffect(() => {
    applyTotal()
  }, [fields])

  useEffect(() => {
    const currentTax = subtotal * taxRate
    setTax(currentTax)
    setValue('tax', currentTax)
    setValue('taxRate', taxRate)
    const total = subtotal + currentTax
    setTotal(total)
    setValue('total', total)
  }, [subtotal, taxRate])

  useEffect(() => {
    const name = profile[0].businessName
    const address = profile[0].businessAddress
    const phone = profile[0].businessPhone
    setBusinessName(name)
    setBusinessAddress(address)
    setBusinessPhone(phone)
    setValue('contractorName', name)
    setValue('contractorAddress', address)
    setValue('contractorPhone', phone)

    if(getValues('customer_id')) {
        let customer
        for(let i = 0; i < customers.length; i++) {
            if(customers[i].id == getValues('customer_id')) {
                customer = customers[i]
            }
        }
        setCustomerName(customer?.name as string)
        setCustomerEmail(customer?.email as string)
        setProjectAddress(customer?.address as string)
        setValue('customerName', customer?.name as string)
        setValue('customerEmail', customer?.email as string)
        setValue('projectAddress', customer?.address as string)
    } else {
        setCustomerName(getValues('customerName'))
        setCustomerEmail(getValues('customerEmail'))
        setProjectAddress(getValues('projectAddress'))
    }
  }, [])

  return (
    <div className='p-4'>
        <div className='flex flex-col gap-1 my-2'>
            {}
            <label>Estimate Name</label>
            <input {...register("estimateName")} className='border border-primary300 rounded max-w-xs'></input>
        </div>
        <div>
            <div>
                <p>{customerName}</p>
                <p>{customerEmail}</p>
                <p>{projectAddress}</p>
            </div>
            <div>
                <div>
                    <p>{businessName}</p>
                    <p>{businessAddress}</p>
                    <p>{businessPhone}</p>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <Button
                    type='button'
                    onClick={() => {
                        prepend({
                            item: '',
                            description: '',
                            quantity: null,
                            rateType: 'unit',
                            price: null,
                            amount: 0
                        })
                    }}
                    className='max-w-[15rem]'
                >
                    New Line Item
                </Button>
                <EstimateFormTable 
                    fields={fields}
                    applyTotal={applyTotal}
                    remove={remove}
                />
            </div>
            <div>
                <div>
                    <label></label>
                    <textarea {...register("message")} className='border border-primary300 rounded'></textarea>
                </div>
                <div className='flex flex-col gap-1 my-2'>
                    <div>
                        <p>Subtotal</p>
                        <p>{formatPriceString(subtotal)}</p>
                    </div>
                    <div>
                        <p>Tax</p>
                        <div>
                            <TaxSelector 
                                taxRate={taxRate}
                                setTaxRate={setTaxRate}
                            />
                            <p>{formatPriceString(tax)}</p>
                        </div>
                    </div>
                    <div>
                        <p>Total</p>
                        <p>{formatPriceString(total)}</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-evenly gap-2'>
                <Button
                    type='button'
                    className='flex-1'
                >
                    Preview Estimate
                </Button>
                <Button
                    type='submit'
                    className='flex-1'
                >
                    Save
                </Button>
                <Button
                    type='button'
                    className='flex-1'
                >
                    Save & Send
                </Button>
            </div>
        </div>
    </div>
  )
}

export default EstimateFormPartTwo