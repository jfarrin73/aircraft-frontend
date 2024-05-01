import { describe, expect, test } from 'vitest'
import App from '../App'
import { render, screen, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { server } from '../mocks/node'
import { HttpResponse, http } from 'msw'
import { Aircraft } from '../types/Aircraft'

describe('when the app is rendered', () => {
    test('should display header', () => {
        render(<App />)
        expect(screen.getByText('Aircraft')).toBeDefined()
    })

    test('should display list of aircraft', async () => {
        render(<App />)

        const listElements = await screen.findAllByRole('listitem')
        expect(listElements).toHaveLength(1)

        expect(within(listElements[0]).getByText('Monoplane'))
        expect(within(listElements[0]).getByText('Egor'))
    })

    test('should add aircraft to list on succesfull post', async () => {
        server.use(
            http.post('/api/aircraft', async ({ request }) => {
                const requestData = (await request.json()) as Aircraft
                return HttpResponse.json({ ...requestData, id: 2 })
            })
        )

        render(<App />)

        const airframe = 'Ornithopter'
        const pilot = 'Paul'

        const airframeInput = screen.getByLabelText('Airframe')
        const pilotInput = screen.getByLabelText('Pilot')
        const submitButton = screen.getByRole('button', { name: /create/i })

        await userEvent.type(airframeInput, airframe)
        await userEvent.type(pilotInput, pilot)
        await userEvent.click(submitButton)

        const listElements = await screen.findAllByRole('listitem')
        expect(listElements).toHaveLength(2)

        expect(within(listElements[1]).getByText(airframe))
        expect(within(listElements[1]).getByText(pilot))
    })
})
