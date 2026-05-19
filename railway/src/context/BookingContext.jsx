import { createContext, useContext, useState } from "react"

const BookingCtx = createContext(null)

export function BookingProvider({ children }) {
  const [selectedWagon, setSelectedWagon] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])

  const selectWagon = (wagon) => {
    setSelectedWagon(wagon)
    setSelectedSeats([])
  }

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(s => s !== seatId)
        : [...prev, seatId]
    )
  }

  const clearBooking = () => {
    setSelectedWagon(null)
    setSelectedSeats([])
  }

  return (
    <BookingCtx.Provider value={{
      selectedWagon,
      selectedSeats,
      selectWagon,
      toggleSeat,
      clearBooking
    }}>
      {children}
    </BookingCtx.Provider>
  )
}

export const useBooking = () => useContext(BookingCtx)