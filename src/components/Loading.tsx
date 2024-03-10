const Loading = () => {
  return (
    <div className=" w-full h-full flex items-center justify-center bg-opacity-75 z-50">
      <div className="rounded-full h-24 w-24 flex items-center justify-center animate-pulse">
        <div className="border-8 border-black rounded-full h-16 w-16 animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
