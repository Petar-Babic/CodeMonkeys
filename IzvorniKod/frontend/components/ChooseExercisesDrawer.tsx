import { useState, useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { ExerciseBase } from "@/types/exercise";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";

interface ChooseExercisesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onExercisesSelected: (selectedExercises: ExerciseBase[]) => void;
  initialSelectedExercises?: ExerciseBase[];
}

export function ChooseExercisesDrawer({
  isOpen,
  onClose,
  onExercisesSelected,
  initialSelectedExercises = [],
}: ChooseExercisesDrawerProps) {
  const { exercises } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExercises, setSelectedExercises] = useState<ExerciseBase[]>(
    initialSelectedExercises
  );

  useEffect(() => {
    if (isOpen) {
      setSelectedExercises(initialSelectedExercises);
    }
  }, [isOpen, initialSelectedExercises]);

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExerciseToggle = (exercise: ExerciseBase) => {
    setSelectedExercises((prev) =>
      prev.some((e) => e.id === exercise.id)
        ? prev.filter((e) => e.id !== exercise.id)
        : [...prev, exercise]
    );
  };

  const handleSelectAll = () => {
    setSelectedExercises(filteredExercises);
  };

  const handleDeselectAll = () => {
    setSelectedExercises([]);
  };

  const handleSubmit = () => {
    console.log(selectedExercises);
    onExercisesSelected(selectedExercises);
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Choose Exercises</DrawerTitle>
          <DrawerDescription>
            Select exercises for your workout
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <Input
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex justify-between">
            <Button onClick={handleSelectAll} variant="outline" size="sm">
              Select All
            </Button>
            <Button onClick={handleDeselectAll} variant="outline" size="sm">
              Deselect All
            </Button>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredExercises.map((exercise) => (
              <div key={exercise.id} className="flex items-center space-x-2">
                <Checkbox
                  id={exercise.id.toString()}
                  checked={selectedExercises.some((e) => e.id === exercise.id)}
                  onCheckedChange={() => handleExerciseToggle(exercise)}
                />
                <label
                  htmlFor={exercise.id.toString()}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {exercise.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={handleSubmit}>Update Exercises</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
