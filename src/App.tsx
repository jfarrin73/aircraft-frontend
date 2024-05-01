import { FormEvent, useEffect, useState } from 'react'
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
        <div className="w-full flex justify-center">
            <div className="max-w-md w-full m-6 box-border p-6 border border-gray-200 space-y-10 rounded-md shadow-md">
                <h1 className="text-3xl font-medium text-center mb-6">
                    Aircraft
                </h1>

                <form
                    className="mb-8 flex flex-col gap-4"
                    onSubmit={onFormSubmit}
                >
                    <div className="flex flex-col">
                        <label className="text-sm" htmlFor="airframe">
                            Airframe
                        </label>
                        <input
                            className=" border border-gray-200 p-2 rounded-md mt-0.5"
                            id="airframe"
                            value={airframe}
                            onChange={(e) => setAirframe(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm" htmlFor="pilot">
                            Pilot
                        </label>
                        <input
                            className=" border border-gray-200 p-2 rounded-md mt-0.5"
                            id="pilot"
                            value={pilot}
                            onChange={(e) => setPilot(e.target.value)}
                        />
                    </div>

                    <button
                        className="p-2 bg-black text-white rounded-md w-full"
                        type="submit"
                    >
                        Create
                    </button>
                </form>

                <div className="h-px bg-gray-200" />

                <ul className="flex flex-col space-y-8">
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
            </div>
        </div>
    )
}

export default App
