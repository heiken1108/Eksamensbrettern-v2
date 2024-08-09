interface LongTextInputProps {
  name: string;
  initialValue: string;
  onTekstChange: (tekst: string) => void;
}

const LongTextInput: React.FC<LongTextInputProps> = ({
  name,
  initialValue,
  onTekstChange,
}) => {
  return (
    <div className="w-full h-full border border-gray-400 p-4 flex flex-col">
      <h1 className="mb-2">{name}</h1>
      <textarea
        defaultValue={initialValue}
        onChange={(e) => onTekstChange(e.target.value)}
        className="w-full px-3 py-2 border rounded-md mt-2 resize-none flex-grow min-h-0"
      />
    </div>
  );
};

export default LongTextInput;
