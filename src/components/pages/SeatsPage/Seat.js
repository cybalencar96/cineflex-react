import { useState, useEffect } from "react";

export default function Seat({id,isAvailable,name,toggleSeat}) {
    const [seatState, setSeatState] = useState("available-type");

    useEffect(() => {if (!isAvailable) setSeatState("unavailable-type")},[]);
    
    function reserve() {
        if (!isAvailable) return alert("Assento já reservado");
        setSeatState(toggleSeat(id));
    }

    return (
        <div onClick={reserve} className={"seat " + seatState}>
            <span>{name}</span>
        </div>
    )
}