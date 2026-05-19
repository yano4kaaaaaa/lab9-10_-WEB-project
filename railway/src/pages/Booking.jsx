import { useParams, useNavigate } from "react-router-dom"
import { trains } from "../data/trains"
import { BookingProvider, useBooking } from "../context/BookingContext"
import WagonSelector from "../components/WagonSelector"
import SeatMap from "../components/SeatMap"
import BookingForm from "../components/BookingForm"
import { BookingService } from "../services/BookingService"
import { toast } from "react-toastify"
import styles from "./Booking.module.css"

function BookingContent() {
  const { trainId } = useParams()
  const navigate = useNavigate()
  const { selectedWagon, selectedSeats, selectWagon, clearBooking } = useBooking()

  const train = trains.find(t => t.id === Number(trainId))

  if (!train) return <div className={styles.error}>Рейс не знайдено</div>

  const handleBooking = (formData) => {
    if (!selectedWagon) {
      toast.error("Оберіть вагон!")
      return
    }
    if (selectedSeats.length === 0) {
      toast.error("Оберіть хоча б одне місце!")
      return
    }
    BookingService.save({
      trainId: train.id,
      trainNumber: train.number,
      route: `${train.from} → ${train.to}`,
      wagonId: selectedWagon.id,
      seats: selectedSeats,
      passenger: formData,
    })
    toast.success(`Квиток заброньовано! Місця: ${selectedSeats.join(", ")}`)
    clearBooking()
    setTimeout(() => navigate("/"), 2000)
  }

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate("/")}>
        ← Назад
      </button>
      <h1 className={styles.title}>{train.from} → {train.to}</h1>
      <p className={styles.sub}>Поїзд № {train.number}</p>

      <WagonSelector
        wagons={train.wagons}
        selectedWagon={selectedWagon}
        onSelect={selectWagon}
      />

      {selectedWagon && (
        <>
          <SeatMap wagon={selectedWagon} />
          {selectedSeats.length > 0 && (
            <>
              <p className={styles.selected}>
                Обрані місця: <strong>{selectedSeats.join(", ")}</strong>
              </p>
              <BookingForm onSubmit={handleBooking} />
            </>
          )}
        </>
      )}
    </div>
  )
}

function Booking() {
  return (
    <BookingProvider>
      <BookingContent />
    </BookingProvider>
  )
}

export default Booking