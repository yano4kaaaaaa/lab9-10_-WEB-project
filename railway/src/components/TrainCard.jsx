import { useNavigate } from "react-router-dom";
import styles from "./TrainCard.module.css";

function TrainCard({ train }) {
  const navigate = useNavigate();

  const formatTime = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.number}>№ {train.number}</span>
        <span className={styles.date}>{formatDate(train.departure)}</span>
      </div>
      <div className={styles.route}>
        <div className={styles.city}>
          <span className={styles.time}>{formatTime(train.departure)}</span>
          <span className={styles.name}>{train.from}</span>
        </div>
        <div className={styles.arrow}>
          <span className={styles.duration}>{train.duration}</span>
          <div className={styles.line}></div>
          <span className={styles.arrowIcon}>→</span>
        </div>
        <div className={styles.city}>
          <span className={styles.time}>{formatTime(train.arrival)}</span>
          <span className={styles.name}>{train.to}</span>
        </div>
      </div>
      <div className={styles.footer}>
        <span>{train.wagons.length} вагони</span>
        <button
          className={styles.btn}
          onClick={() => navigate(`/booking/${train.id}`)}
        >
          Обрати місця
        </button>
      </div>
    </div>
  );
}

export default TrainCard;