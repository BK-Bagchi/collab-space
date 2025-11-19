import { FadeLoader } from "react-spinners";

const Loading = ({ loading, children }) => {
  if (loading) {
    return (
      <div className="w-full flex justify-center py-10">
        <FadeLoader
          color="#2979FF"
          height={16}
          loading={loading}
          margin={2}
          radius={2}
          speedMultiplier={2}
          width={5}
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default Loading;
