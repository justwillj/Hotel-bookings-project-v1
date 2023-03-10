import Input from "../input/Input";
import "./Form.css";
const Form = () => {
  const formSubmit = () => {};
  return (
    <div className="main">
      <form onSubmit={formSubmit} noValidate>
        <h1>Login</h1>
        <Input label="Email:" type="email" />
        <Input label="Password:" type="email" />
        <button>Login</button>
      </form>
    </div>
  );
};
export default Form;
