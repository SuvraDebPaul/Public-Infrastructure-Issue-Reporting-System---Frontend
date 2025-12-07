const GetStarted = () => {
  return (
    <div
      className="h-[400px] overflow-hidden bg-cover bg-center bg-no-repeat mt-10 text-white flex flex-col justify-center items-center gap-6"
      style={{ backgroundImage: "url(/get-started.jpg)" }}
    >
      <h2 className="text-4xl font-bold">See a Problem? Report It Now</h2>
      <h4 className="text-2xl font-bold">
        Your report makes your city cleaner and safer.
      </h4>
      <button className="btn btn-primary text-lg px-8 py-6 rounded-full">
        Report an Issue
      </button>
    </div>
  );
};

export default GetStarted;
