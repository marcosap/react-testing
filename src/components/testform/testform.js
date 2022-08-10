import React, { useState } from 'react'
import Input from '../input/input'

import './testform.css'

export default function TestForm() {

    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    const [httpStatus, setHttpStatus] = useState(null)

    const handleInputChange = (e) => {

        let newValue = e.target.value

        setValue(newValue)

        if (newValue.length < 8) {
            setError("Deve conter ao menos 8 caracteres")
            return
        }

        setError("")

    }

    const handleSubmit = async(e) => {

        e.preventDefault()

        let { status } = await fetch('https://echo.zuplo.io', {
            method: 'POST'
        })


        if(status !== 200) {
            setHttpStatus('Erro na chamada')
            return
        }

        setHttpStatus('Chamada ok')
    }

    return <form onSubmit={handleSubmit}>
        <Input
            id='test-input'
            label='Test input'
            value={value}
            onChange={handleInputChange}
            errorMessage={error}
        ></Input>

        <div className='http-message' data-testid='message'>{httpStatus}</div>

        <button data-testid='send-button'>Enviar request</button>
    </form>
}