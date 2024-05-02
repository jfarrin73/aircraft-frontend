import { useEffect, useState } from 'react'
import AircraftCard from './AircraftCard.tsx'
import { Aircraft } from './types/Aircraft.ts'
import { AlertCircleIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { ZodType, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type AircraftFormTypes = {
    airframe: string
    pilot: string
}

const AircraftSchema: ZodType<AircraftFormTypes> = z.object({
    airframe: z.string().min(2).max(25),
    pilot: z.string().min(2).max(25),
})

function App() {
    const [data, setData] = useState<Aircraft[]>([])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AircraftFormTypes>({
        resolver: zodResolver(AircraftSchema),
    })

    useEffect(() => {
        const response = async () => {
            const data = await fetch('/api/aircraft')
            const json = await data.json()
            setData(json)
        }

        response()
    }, [])

    const onFormSubmit = async (values: AircraftFormTypes) => {
        const response = await fetch('/api/aircraft', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        const responseData = await response.json()

        setData([...data, responseData])
    }

    return (
        <div className="w-full flex justify-center h-screen overflow-hidden">
            <div className="flex flex-col overflow-hidden max-w-md w-full m-6 box-border p-6 border border-gray-200 rounded-md shadow">
                <h1 className="text-3xl font-medium text-center">Aircraft</h1>

                <form
                    className="mb-8 flex flex-col gap-4"
                    onSubmit={handleSubmit(onFormSubmit)}
                >
                    <div className="flex flex-col">
                        <label className="text-sm" htmlFor="airframe">
                            Airframe
                        </label>
                        <input
                            {...register('airframe')}
                            className=" border border-gray-200 p-2 rounded-md mt-0.5"
                            id="airframe"
                        />
                        {errors.airframe?.message && (
                            <div className="flex items-center gap-1 mt-1">
                                <AlertCircleIcon
                                    size={18}
                                    className="fill-red-500 stroke-white"
                                />
                                <span className="text-red-500 text-sm">
                                    {errors.airframe?.message}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm" htmlFor="pilot">
                            Pilot
                        </label>
                        <input
                            {...register('pilot')}
                            className=" border border-gray-200 p-2 rounded-md mt-0.5"
                            id="pilot"
                        />
                        {errors.pilot?.message && (
                            <div className="flex items-center gap-1 mt-1">
                                <AlertCircleIcon
                                    size={18}
                                    className="fill-red-500 stroke-white"
                                />
                                <span className="text-red-500 text-sm">
                                    {errors.pilot?.message}
                                </span>
                            </div>
                        )}
                    </div>

                    <button
                        className="p-2 bg-black text-white rounded-md w-full"
                        type="submit"
                    >
                        Create
                    </button>
                </form>

                <div className="h-px bg-gray-200" />

                <ul className="flex flex-col space-y-4 overflow-y-scroll flex-grow pr-4 pt-6">
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
