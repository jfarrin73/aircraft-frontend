const AircraftCard = (props: AircraftCardProps) => {
    const { airframe, id, pilot } = props
    return (
        <li style={{ border: 'solid 3px', padding: '25px' }}>
            <div>{airframe}</div>
            <div>{id}</div>
            <div>{pilot}</div>
        </li>
    )
}

type AircraftCardProps = {
    airframe: string
    id: number
    pilot: string
    crew_chief_id: number
}

export default AircraftCard
