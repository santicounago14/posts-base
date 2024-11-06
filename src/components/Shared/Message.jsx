const Message = (props) => {
  const { variant, message } = props;

  const variantsStyles = {
    success: "bg-green-100 border-green-300 text-green-700",
    error: "bg-red-100 border-red-300 text-red-700",
    warning: "bg-yellow-100 border-yellow-300 text-yellow-700",
    info: "bg-blue-100 border-blue-300 text-blue-700",
  };

  return (
    <div>
      <div className={`border rounded-md p-4 ${variantsStyles[variant]}`}>
        {message}
      </div>
    </div>
  );
};

export default Message;
