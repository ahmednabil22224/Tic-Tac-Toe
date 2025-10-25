import { RxCross2 } from "react-icons/rx";
import { FaRegCircle } from "react-icons/fa";

export default function Square(props) {
  const style = { backgroundColor: props.state ? props.color : "black" };

  return (
    <div
      className="w-16 h-16 rounded-lg text-8xl text-white flex justify-center items-center"
      style={style}
      onClick={() => props.toggle(props.id)}>
      {props.state &&
        (props.color === "green" ? (
          <RxCross2 />
        ) : (
          <FaRegCircle className="p-2" />
        ))}
    </div>
  );
}
