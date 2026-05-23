function EventCard({ event }) {
  return (
    <div className="eventCard">

      <img src={event.image} alt="" />

      <h2>{event.title}</h2>

      <p>{event.date}</p>

      <p>{event.venue}</p>

    </div>
  );
}

export default EventCard;