import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";
import Error from "../Error";
import { useEffect, useState } from "react";

interface Tema {
  id: number;
  navn: string;
}

interface TemaerValgBoksProps {
  emneId: number;
  onTemaSelectionChange: (id: number[]) => void;
}

const TemaerValgBoks: React.FC<TemaerValgBoksProps> = ({
  emneId,
  onTemaSelectionChange,
}) => {
  const [valgteTemaerId, setValgteTemaerId] = useState<number[]>([]);
  const { isLoading, error, data } = useQuery({
    queryKey: ["temaer", emneId],
    queryFn: () => fetch(`/api/emner/${emneId}/tema`).then((res) => res.json()),
  });

  const handleTemaSelection = (temaId: number) => {
    setValgteTemaerId((prevTemaer) =>
      prevTemaer.includes(temaId)
        ? prevTemaer.filter((id) => id !== temaId)
        : [...prevTemaer, temaId]
    );
  };

  useEffect(() => {
    onTemaSelectionChange(valgteTemaerId);
  }, [valgteTemaerId]);

  if (isLoading) return <Loading message="Laster temaer" />;
  if (error) return <Error errorMessage="Kunne ikke laste temaer" />;
  if (data.length === 0) return <p>Ingen temaer funnet</p>;
  if (data && data.length > 0)
    return (
      <div className="flex flex-col items-center h-full w-full p-4">
        {data.map((tema: Tema) => (
          <div key={tema.id} className="flex items-center w-full">
            <label className="flex items-center w-full space-x-2 p-2">
              <span className="flex-grow text-left text-md">{tema.navn}</span>
              <input
                type="checkbox"
                checked={valgteTemaerId.includes(tema.id)}
                onChange={() => handleTemaSelection(tema.id)}
                className="form-checkbox"
                style={{
                  transform: "scale(1.5)",
                  width: "24px",
                  height: "24px",
                }}
              />
            </label>
          </div>
        ))}
      </div>
    );
};

export default TemaerValgBoks;
