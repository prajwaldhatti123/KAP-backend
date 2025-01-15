export interface VolumeTrendByMuscleGroup {
  date: Date;
  muscleGroups: {
    [muscleGroup: string]: number; // Key: muscle group, Value: total volume
  };
}
