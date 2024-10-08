import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function App() {
  return (
    <div>
      <Button className="">Click me</Button>
      <div className="flex items-center space-x-4 mt-5">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
}

export default App;
