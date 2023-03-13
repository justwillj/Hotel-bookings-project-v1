import Input from "../input/Input";

const CreateReservation = () => {
  return (
    <div>
      <h1>Create Reservation Page</h1>
      <form className="main">
        <Input label="Guest Email:" type="email" />
        <Input label="Check-in date" type="text" />
        <Input label="Number of nights" type="number" />
        <Input label="Room Type" type="select" />
        <button>Create</button>
      </form>
    </div>
  );
};
export default CreateReservation;
