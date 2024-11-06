const IconButton = (props) => {
  const { icon, onClick } = props;

  return (
    <button
      className="bg-white/20 backdrop-blur-lg hover:bg-white/45 rounded-full w-9 h-9 flex items-center justify-center"
      onClick={onClick}
    >
      <i className="material-symbols-rounded text-white">{icon}</i>
    </button>
  );
};

export default IconButton;
