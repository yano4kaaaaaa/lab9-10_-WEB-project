import styles from "./WagonSelector.module.css";

function WagonSelector({ wagons, selectedWagon, onSelect }) {
  return (
    <div className={styles.wrapper}>
      <h3>Оберіть вагон</h3>
      <div className={styles.list}>
        {wagons.map((wagon) => (
          <button
            key={wagon.id}
            className={`${styles.btn} ${
              selectedWagon?.id === wagon.id ? styles.active : ""
            }`}
            onClick={() => onSelect(wagon)}
          >
            <span className={styles.num}>Вагон {wagon.id}</span>
            <span className={styles.type}>{wagon.type}</span>
            <span className={styles.seats}>{wagon.seats} місць</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default WagonSelector;