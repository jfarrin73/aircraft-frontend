import { FormEvent, useEffect, useState } from 'react'
import './App.css'
import AircraftCard from './AircraftCard.tsx'
import { Aircraft } from './types/Aircraft.ts'

function App() {
    const [data, setData] = useState<Aircraft[]>([])

    const [airframe, setAirframe] = useState('')
    const [pilot, setPilot] = useState('')

    useEffect(() => {
        const response = async () => {
            const data = await fetch('/api/aircraft')
            const json = await data.json()
            setData(json)
        }

        response()
    }, [])

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newAircraft = {
            airframe,
            pilot,
        }

        const response = await fetch('/api/aircraft', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAircraft),
        })
        const responseData = await response.json()

        setData([...data, responseData])

        setAirframe('')
        setPilot('')
    }

    return (
        <>
            <h1>Aircraft</h1>

            <form onSubmit={onFormSubmit}>
                <label htmlFor="airframe">Airframe</label>
                <input
                    id="airframe"
                    value={airframe}
                    onChange={(e) => setAirframe(e.target.value)}
                />
                <label htmlFor="pilot">Pilot</label>
                <input
                    id="pilot"
                    value={pilot}
                    onChange={(e) => setPilot(e.target.value)}
                />

                <button type="submit">Create</button>
            </form>

            <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
                {data.map((item: Aircraft) => {
                    return (
                        <AircraftCard
                            key={item.id}
                            airframe={item.airframe}
                            id={item.id}
                            pilot={item.pilot}
                            crew_chief_id={item.crew_chief_id}
                        />
                    )
                })}
            </ul>
        </>
    )
}

export default App
