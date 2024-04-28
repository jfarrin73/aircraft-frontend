const AircraftCard = (props: AircraftCardProps) => {
    const { airframe, id, pilot, crew_chief_id } = props
    return (
        <div style={{ border: 'solid 3px', padding: '50px' }}>
            <>{airframe}</>
            <>{id}</>
            <>{pilot}</>
            <>{crew_chief_id}</>
        </div>
    )
}

type AircraftCardProps = {
    airframe: string
    id: number
    pilot: string
    crew_chief_id: number
}

export default AircraftCard
