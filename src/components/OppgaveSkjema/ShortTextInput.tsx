interface ShortTextInputProps {
  name: string;
  initialValue: string;
  onChange: (value: string) => void;
}

const ShortTextInput: React.FC<ShortTextInputProps> = ({
  name,
  initialValue,
  onChange,
}) => {
  return (
    <div>
      <h1>{name}</h1>
      <input
        type="text"
        defaultValue={initialValue}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-400 p-2"
      />
    </div>
  );
};

export default ShortTextInput;
