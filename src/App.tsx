import { useEffect, useState } from 'react'
import './App.css'
import AircraftCard from './AircraftCard.tsx'
import { Aircraft } from './types/Aircraft.ts'

function App() {
    const [data, setData] = useState([])

    useEffect(() => {
        const response = async () => {
            const data = await fetch('/api/aircraft')
            const json = await data.json()
            setData(json)
        }

        response()
    }, [])

    return (
        <>
            <h1>Aircraft</h1>
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
