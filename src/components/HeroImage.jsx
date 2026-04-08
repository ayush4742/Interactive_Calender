import { format } from "date-fns";

const images = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2070",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070",


  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070",

  "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=2070",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2070",
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=2070"
];

const HeroImage = ({ currentDate }) => {
  const month = currentDate.getMonth();
  const image = images[month];

  return (
    <div className="hero-image">
      <img 
        src={image} 
        alt="calendar hero"
        onError={(e) => {
          e.target.src = images[0]; // fallback image
        }}
      />

      <div className="month-label">
        <h2>{format(currentDate, "MMMM").toUpperCase()}</h2>
        <p>{format(currentDate, "yyyy")}</p>
      </div>
    </div>
  );
};

export default HeroImage;