import { getRandomAvaterColor } from "./Colors";

const Avater = ({ name, className }: { name: string; className?: string }) => {
  const color = getRandomAvaterColor();

  return (
    <div>
      <div
        className={` rounded-full transition-all hover:cursor-pointer text-xl ring-2 ring-gray-300 shadow drop-shadow-2xl ${className ? className : "size-10"}`}
        style={{
          borderRadius: "50%",
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    </div>
  );
};

export default Avater;
