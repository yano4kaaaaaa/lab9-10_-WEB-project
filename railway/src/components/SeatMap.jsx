import { useState, useEffect } from "react"
import { useBooking } from "../context/BookingContext"
import styles from "./SeatMap.module.css"

function SeatMap({ wagon }) {
  const { selectedSeats, toggleSeat } = useBooking()
  const [bookedSeats, setBookedSeats] = useState([])

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem(`booked_${wagon.id}`) || "[]"
    )
    setBookedSeats(saved)
  }, [wagon.id])

  const seats = Array.from({ length: wagon.seats }, (_, i) => ({
    id: i + 1,
    status: bookedSeats.includes(i + 1) ? "booked" : "free",
  }))

  return (
    <div className={styles.wrapper}>
      <h3>Схема місць — {wagon.type}</h3>
      <div className={styles.legend}>
        <span className={styles.free}>вільне</span>
        <span className={styles.selected}>обране</span>
        <span className={styles.booked}>заброньоване</span>
      </div>
      <div className={styles.grid}>
        {seats.map(seat => {
          const isSelected = selectedSeats.includes(seat.id)
          return (
            <button
              key={seat.id}
              disabled={seat.status === "booked"}
              className={`${styles.seat} ${
                seat.status === "booked"
                  ? styles.seatBooked
                  : isSelected
                  ? styles.seatSelected
                  : styles.seatFree
              }`}
              onClick={() => toggleSeat(seat.id)}
            >
              {seat.id}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SeatMap