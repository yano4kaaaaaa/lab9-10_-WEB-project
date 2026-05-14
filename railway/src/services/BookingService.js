const STORAGE_KEY = "railway_bookings";

export const BookingService = {
  getAll() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  },

  save(booking) {
    const all = this.getAll();
    const newBooking = { ...booking, id: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...all, newBooking]));
    // Зберігаємо зайняті місця для конкретного вагона
    const key = `booked_${booking.wagonId}`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    localStorage.setItem(
      key,
      JSON.stringify([...existing, ...booking.seats])
    );
    return newBooking;
  },

  getByWagon(wagonId) {
    return JSON.parse(localStorage.getItem(`booked_${wagonId}`) || "[]");
  },
};