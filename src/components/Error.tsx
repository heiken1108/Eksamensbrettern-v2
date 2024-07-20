interface ErrorProps {
  errorMessage: string;
}

/**
 * Returns a component rendering an error message.
 * @param errorMessage - The error message to be displayed.
 * @component
 */
const Error: React.FC<ErrorProps> = ({ errorMessage }) => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <h1>{errorMessage}</h1>
    </div>
  );
};

export default Error;
