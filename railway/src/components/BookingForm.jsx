import { useState } from "react";
import styles from "./BookingForm.module.css";

function BookingForm({ onSubmit }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Введіть ім'я";
    if (!/^\+?\d{10,13}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Невірний формат телефону";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Невірний email";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    onSubmit(form);
  };

  const handleChange = (field) => (ev) => {
    setForm({ ...form, [field]: ev.target.value });
    setErrors({ ...errors, [field]: undefined });
  };

  return (
    <div className={styles.form}>
      <h3>Дані пасажира</h3>
      <label>Ім'я та прізвище
        <input value={form.name} onChange={handleChange("name")} placeholder="Марія Коваль" />
        {errors.name && <span className={styles.err}>{errors.name}</span>}
      </label>
      <label>Телефон
        <input value={form.phone} onChange={handleChange("phone")} placeholder="+380501234567" />
        {errors.phone && <span className={styles.err}>{errors.phone}</span>}
      </label>
      <label>Email
        <input value={form.email} onChange={handleChange("email")} placeholder="maria@example.com" />
        {errors.email && <span className={styles.err}>{errors.email}</span>}
      </label>
      <button className={styles.btn} onClick={handleSubmit}>
        Забронювати квиток
      </button>
    </div>
  );
}

export default BookingForm;