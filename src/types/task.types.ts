export interface Task {
  task_id: string;
  title: string;
  score: number;
  completed: false | true;
  userId: string;
}

export interface SafeTask {
  task_id: string;
  title: string;
  score: number;
  completed: false | true;
}