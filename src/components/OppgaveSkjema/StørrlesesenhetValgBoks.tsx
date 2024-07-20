import { Størrelsesenheter } from "@/data/enheter";
import { Størrelsesenhet } from "@/data/types";

interface StørrlesesenhetValgBoksProps {
  onSelectOption: (selectedOption: Størrelsesenhet) => void;
}

const StørrlesesenhetValgBoks: React.FC<StørrlesesenhetValgBoksProps> = ({
  onSelectOption,
}) => {
  return (
    <div className="flex flex-col items-center h-full w-full p-4">
      {Størrelsesenheter.map((enhet) => (
        <button
          key={enhet.navn}
          onClick={() => onSelectOption(enhet)}
          className="bg-green-500 text-white py-2 px-4 rounded mb-2 hover:bg-green-700 text-lg w-full"
        >
          {enhet.navn} ({enhet.symbol}): {enhet.faktor}
        </button>
      ))}
    </div>
  );
};

export default StørrlesesenhetValgBoks;
