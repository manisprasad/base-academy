import { Button } from "@/components/ui/button";

const Unauthorized = () => {
  return (
    <div className="text-center min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold text-red-500">403 - Unauthorized</h1>
      <h2>You are not supposed to be here.</h2>
      <p>You do not have permission to view this page.</p>
      <Button variant={"ghost"} className="border-2 mt-10" onClick={
        () => window.history.back()
      }>Go Back</Button>
    </div>
  );
};

export default Unauthorized;
