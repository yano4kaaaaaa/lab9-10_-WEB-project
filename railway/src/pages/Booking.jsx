import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { trains } from "../data/trains";
import WagonSelector from "../components/WagonSelector";
import SeatMap from "../components/SeatMap";
import BookingForm from "../components/BookingForm";
import { BookingService } from "../services/BookingService";
import { toast } from "react-toastify";
import styles from "./Booking.module.css";

function Booking() {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const train = trains.find((t) => t.id === Number(trainId));

  const [selectedWagon, setSelectedWagon] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!train) {
    return <div className={styles.error}>Рейс не знайдено</div>;
  }

  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const handleWagonSelect = (wagon) => {
    setSelectedWagon(wagon);
    setSelectedSeats([]);
  };

  const handleBooking = (formData) => {
    if (!selectedWagon) {
      toast.error("Оберіть вагон!");
      return;
    }
    if (selectedSeats.length === 0) {
      toast.error("Оберіть хоча б одне місце!");
      return;
    }
    BookingService.save({
      trainId: train.id,
      trainNumber: train.number,
      route: `${train.from} → ${train.to}`,
      wagonId: selectedWagon.id,
      seats: selectedSeats,
      passenger: formData,
    });
    toast.success(`Квиток заброньовано! Місця: ${selectedSeats.join(", ")}`);
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate("/")}>
        ← Назад
      </button>
      <h1 className={styles.title}>
        {train.from} → {train.to}
      </h1>
      <p className={styles.sub}>Поїзд № {train.number}</p>
      <WagonSelector
        wagons={train.wagons}
        selectedWagon={selectedWagon}
        onSelect={handleWagonSelect}
      />
      {selectedWagon && (
        <>
          <SeatMap
            wagon={selectedWagon}
            selectedSeats={selectedSeats}
            onToggleSeat={toggleSeat}
          />
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
  );
}

export default Booking;