import { ClipLoader } from "react-spinners";

const Waiting = ({ color = "#2979FF" }) => {
  return (
    <div className="w-full flex justify-center">
      <ClipLoader size={16} color={color} />
    </div>
  );
};

export default Waiting;
