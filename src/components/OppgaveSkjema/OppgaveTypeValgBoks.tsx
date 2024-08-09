import { oppgavetyper } from "@/data/oppgavetyper";
import { OppgaveType } from "@/data/types";

interface OppgaveTypeValgBoksrops {
  onSelect: (selectedOption: OppgaveType) => void;
}

const OppgaveTypeValgBoks: React.FC<OppgaveTypeValgBoksrops> = ({
  onSelect,
}) => {
  return (
    <div className="flex flex-col items-center w-4/5">
      {oppgavetyper.map((option) => (
        <button
          key={option.navn}
          onClick={() => onSelect(option)}
          className="bg-green-500 text-white py-2 px-4 rounded mb-2 hover:bg-green-700 text-lg w-full"
        >
          {option.navn}
        </button>
      ))}
    </div>
  );
};

export default OppgaveTypeValgBoks;
