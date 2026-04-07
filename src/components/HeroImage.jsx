import { format } from "date-fns";

const HeroImage = ({ currentDate }) => {
  return (
    <div className="hero-image">
      <img
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
        alt="hero"
      />

      <div className="month-label">
        <h2>{format(currentDate, "MMMM").toUpperCase()}</h2>
        <p>{format(currentDate, "yyyy")}</p>
      </div>
    </div>
  );
};

export default HeroImage;