import styles from "./SeatMap.module.css";

// Генеруємо місця — частина "заброньована" з localStorage
function generateSeats(wagon, bookedSeats) {
  return Array.from({ length: wagon.seats }, (_, i) => ({
    id: i + 1,
    status: bookedSeats.includes(i + 1) ? "booked" : "free",
  }));
}

function SeatMap({ wagon, selectedSeats, onToggleSeat }) {
  const booked = JSON.parse(
    localStorage.getItem(`booked_${wagon.id}`) || "[]"
  );
  const seats = generateSeats(wagon, booked);

  return (
    <div className={styles.wrapper}>
      <h3>Схема місць — {wagon.type}</h3>
      <div className={styles.legend}>
        <span className={styles.free}>вільне</span>
        <span className={styles.selected}>обране</span>
        <span className={styles.booked}>заброньоване</span>
      </div>
      <div className={styles.grid}>
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat.id);
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
              onClick={() => onToggleSeat(seat.id)}
            >
              {seat.id}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SeatMap;