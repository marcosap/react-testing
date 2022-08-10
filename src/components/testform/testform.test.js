import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import fetchMock from "jest-fetch-mock"
import TestForm from "./testform"

it("Show an error message while de value is short", () => {

    render(<TestForm></TestForm>)

    let input = screen.getByTestId('test-input')
    fireEvent.change(input, {target:{value: "abc"}})

    let inputError = screen.getByTestId('test-input-error')

    expect(inputError).toHaveTextContent("Deve conter ao menos 8 caracteres")
})

it("Do not show an error message with a valid value", () => {

    render(<TestForm></TestForm>)

    let input = screen.getByTestId('test-input')
    fireEvent.change(input, {target:{value: "abcdefgh"}})

    let inputError = screen.getByTestId('test-input-error')

    expect(inputError).toBeEmptyDOMElement()
})

it("Show error message on http error", async() => {

    render(<TestForm></TestForm>)

    let button = screen.getByTestId('send-button')

    fetchMock.enableMocks()
    fetchMock.mockResponseOnce('', {status: 500})

    fireEvent.click(button)

    let message = screen.getByTestId('message')

    await waitFor(async() => {
        expect(message).toHaveTextContent('Erro na chamada')
    })
})

it("Show ok message on http success", async() => {

    render(<TestForm></TestForm>)

    let button = screen.getByTestId('send-button')

    fetchMock.enableMocks()
    fetchMock.mockResponseOnce('', {status: 200})

    fireEvent.click(button)

    let message = screen.getByTestId('message')

    await waitFor(async() => {
        expect(message).toHaveTextContent('Chamada ok')
    })
})