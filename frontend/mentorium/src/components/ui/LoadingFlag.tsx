// components/ui/LoadingFlag.tsx
import { useRive } from "@rive-app/react-canvas";

const LoadingFlag:React.FC =() => {
  const { RiveComponent } = useRive({
    src: "/wavingflag.riv", // Make sure this path is correct in your `public/` folder
    autoplay: true,
  });

  return (
    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 bg-white flex items-center justify-center ">
      <RiveComponent />
    </div>
  );
}
export default LoadingFlag