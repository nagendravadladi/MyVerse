import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, User, CheckCircle, XCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { GymExercise } from "@shared/schema";

interface GymZoneProps {
  userId: number;
}

const muscleGroups = [
  { name: 'Chest', exercises: ['Push-ups', 'Bench Press', 'Chest Fly', 'Dips', 'Incline Press'] },
  { name: 'Back', exercises: ['Pull-ups', 'Lat Pulldown', 'Rows', 'Deadlift', 'Back Fly'] },
  { name: 'Legs', exercises: ['Squats', 'Lunges', 'Leg Press', 'Calf Raises', 'Leg Curls'] },
  { name: 'Arms', exercises: ['Bicep Curls', 'Tricep Dips', 'Hammer Curls', 'Overhead Press', 'Close-grip Push-ups'] },
  { name: 'Core', exercises: ['Planks', 'Crunches', 'Russian Twists', 'Mountain Climbers', 'Leg Raises'] },
  { name: 'Shoulders', exercises: ['Shoulder Press', 'Lateral Raises', 'Front Raises', 'Shrugs', 'Reverse Fly'] },
];

export default function GymZone({ userId }: GymZoneProps) {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: exercises = [] } = useQuery<GymExercise[]>({
    queryKey: [`/api/gym-exercises/${userId}`],
  });

  const updateExerciseMutation = useMutation({
    mutationFn: async ({ exerciseId, status }: { exerciseId?: number; status: string; muscleGroup?: string; exerciseName?: string }) => {
      if (exerciseId) {
        await apiRequest("PATCH", `/api/gym-exercises/${exerciseId}`, { status });
      } else {
        await apiRequest("POST", "/api/gym-exercises", { 
          userId, 
          muscleGroup: selectedMuscleGroup, 
          exerciseName: status, 
          status: 'pending' 
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/gym-exercises/${userId}`] });
    },
  });

  const markExerciseStatus = async (exerciseName: string, status: 'completed' | 'skipped') => {
    const existingExercise = exercises.find(
      e => e.exerciseName === exerciseName && e.muscleGroup === selectedMuscleGroup
    );

    if (existingExercise?.id) {
      updateExerciseMutation.mutate({ exerciseId: existingExercise.id, status });
    } else {
      // Create new exercise record
      await apiRequest("POST", "/api/gym-exercises", {
        userId,
        muscleGroup: selectedMuscleGroup,
        exerciseName,
        status,
      });
      queryClient.invalidateQueries({ queryKey: [`/api/gym-exercises/${userId}`] });
    }
  };

  const getExerciseStatus = (muscleGroup: string, exerciseName: string) => {
    const exercise = exercises.find(
      e => e.muscleGroup === muscleGroup && e.exerciseName === exerciseName
    );
    return exercise?.status || 'pending';
  };

  const getTodayStats = () => {
    const today = new Date().toDateString();
    const todayExercises = exercises.filter(
      e => new Date(e.date!).toDateString() === today
    );
    
    const completed = todayExercises.filter(e => e.status === 'completed').length;
    const skipped = todayExercises.filter(e => e.status === 'skipped').length;
    
    return { completed, skipped };
  };

  const { completed, skipped } = getTodayStats();

  return (
    <>
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Dumbbell className="text-primary" />
            Gym Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Body Diagram Placeholder */}
          <div 
            className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-xl p-4 mb-4 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setSelectedMuscleGroup('Full Body')}
          >
            <div className="text-center">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Click to start workout</p>
            </div>
          </div>
          
          {/* Muscle Groups */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {muscleGroups.map((group) => (
              <Button
                key={group.name}
                variant={selectedMuscleGroup === group.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMuscleGroup(group.name)}
                className="text-xs"
              >
                {group.name}
              </Button>
            ))}
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-100 dark:bg-green-900 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-green-800 dark:text-green-200">{completed}</p>
              <p className="text-xs text-green-600 dark:text-green-400">Completed</p>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-orange-800 dark:text-orange-200">{skipped}</p>
              <p className="text-xs text-orange-600 dark:text-orange-400">Skipped</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedMuscleGroup} onOpenChange={() => setSelectedMuscleGroup(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedMuscleGroup} Exercises</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {selectedMuscleGroup && muscleGroups.find(g => g.name === selectedMuscleGroup)?.exercises.map((exercise) => {
              const status = getExerciseStatus(selectedMuscleGroup, exercise);
              return (
                <div key={exercise} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm">{exercise}</span>
                    {status !== 'pending' && (
                      <Badge variant={status === 'completed' ? 'default' : 'secondary'}>
                        {status}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={status === 'completed' ? 'default' : 'outline'}
                      onClick={() => markExerciseStatus(exercise, 'completed')}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={status === 'skipped' ? 'secondary' : 'outline'}
                      onClick={() => markExerciseStatus(exercise, 'skipped')}
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
