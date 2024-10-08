const Location = ({ location }: any) => {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-stone-200 font-normal">Delivering to</span>
      <span className="text-sm text-stone-200 font-bold">{location.city}</span>
      <span className="text-sm text-stone-200 font-bold">
        {location.country}
      </span>
    </div>
  );
};

export default Location;
