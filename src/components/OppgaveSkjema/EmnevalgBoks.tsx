"use client";
import { Emne } from "@/data/types";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";
import Error from "../Error";

interface EmnevalgBoksProps {
  onSelectOption: (selectedOption: Emne) => void;
}

const EmnevalgBoks: React.FC<EmnevalgBoksProps> = ({ onSelectOption }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["emner"],
    queryFn: () => fetch("/api/emner").then((res) => res.json()),
  });

  if (isLoading) return <Loading message="Laster emner" />;
  if (error) return <Error errorMessage="Kunne ikke laste emner" />;
  if (data)
    return (
      <div className="flex flex-col items-center h-full w-full p-4">
        {data.map((emne: Emne) => (
          <button
            key={emne.navn}
            onClick={() => onSelectOption(emne)}
            className="bg-green-500 text-white py-2 px-4 rounded mb-2 hover:bg-green-700 text-lg w-full"
          >
            {emne.navn}
          </button>
        ))}
      </div>
    );
};

export default EmnevalgBoks;
