import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('/api/aircraft', () => {
        return HttpResponse.json([])
    }),
]
