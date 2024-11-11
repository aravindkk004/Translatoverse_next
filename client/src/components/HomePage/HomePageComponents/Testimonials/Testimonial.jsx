const Testimonial = ({ name, msg, img }) => {
  return (
    <div className="mx-5 p-3 h-[320px] bg-white shadow-xl rounded-2xl my-5 font-latin">
      <div className="flex item-center justify-center my-3">
        <img
          src={img}
          alt="reviewer img"
          className="h-[80px] border-2 border-customHoverColor rounded-full"
        />
      </div>
      <div>
        <h3 className="text-xl font-bold text-center">{name}</h3>
        <p className="text-base">{msg}</p>
      </div>
    </div>
  );
};

export default Testimonial;
