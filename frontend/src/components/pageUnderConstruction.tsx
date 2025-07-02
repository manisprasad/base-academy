import { AlertTriangle, Hammer, Clock } from 'lucide-react';

const PageUnderConstruction = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center mt-24 p-8 space-y-4">
      <div className="flex items-center justify-center space-x-3">
        <AlertTriangle className="w-10 h-10 text-yellow-500" />
        <Hammer className="w-10 h-10  animate-bounce-slow" />
        <Clock className="w-10 h-10 text-blue-500" />
      </div>

      <h2 className="text-2xl font-bold ">Page Under Construction</h2>

      <p className="text-gray-600 max-w-md">
        We're still working on this feature. Thank you for your patience. Please check back soon!
      </p>
    </div>
  );
};

export default PageUnderConstruction;
