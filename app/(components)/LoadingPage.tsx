export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      {/* <h1 className="sr-only">
        Alan Nixon - MERN Stack Developer & Freelancer
      </h1> */}
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
      </div>
      <div className="text-black text-3xl font-bold ml-2">Loading...</div>
    </div>
  );
}

export function CircleLoader() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-transparent border-t-[#50c878] rounded-full animate-spin"></div>
    </div>
  );
}
