import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from "./store/bears";

function App() {
  function BearCounter() {
    const bears = useStore((state) => state.bears);
    return <h1>{bears} bears around here...</h1>;
  }

  function Controls() {
    const increasePopulation = useStore((state) => state.increasePopulation);
    return <Button onClick={increasePopulation}>one up</Button>;
  }
  return (
    <div className="p-4">
      <BearCounter />
      <Controls />
      <p>Novo...</p>
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
