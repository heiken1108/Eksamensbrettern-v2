import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface StateNavigatorProps {
  onChangeState: (forward: boolean) => void;
}

export default function StateNavigator({ onChangeState }: StateNavigatorProps) {
  return (
    <div className="w-full h-auto bg-gray-500 flex px-4">
      <button className="p-4 border" onClick={() => onChangeState(false)}>
        <ArrowBackIcon />
      </button>
      <button
        className="p-4 border ml-auto"
        onClick={() => onChangeState(true)}
      >
        <ArrowForwardIcon />
      </button>
    </div>
  );
}
