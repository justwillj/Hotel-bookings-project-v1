import Button from "../button/Button";
import Input from "../input/Input";
import "./CreateReservations.css";
const CreateReservation = () => {
  return (
    <div>
      <h1>Create Reservation Page</h1>
      <form className="main">
        <Input label="Guest Email:" type="email" />
        <Input label="Check-in date:" type="text" />
        <Input label="Number of nights:" type="number" />
        <Input label="Room Type:" type="select" />
        <Button value="Create" className="create-btn" />
      </form>
    </div>
  );
};
export default CreateReservation;
