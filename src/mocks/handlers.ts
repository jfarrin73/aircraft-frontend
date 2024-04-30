import { http, HttpResponse } from 'msw'

const mockAircraft = {
    id: 1,
    airframe: 'Monoplane',
    pilot: 'Egor',
    crew_chief_id: null,
}

export const handlers = [
    http.get('/api/aircraft', () => {
        return HttpResponse.json([mockAircraft])
    }),
]
