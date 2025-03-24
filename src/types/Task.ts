export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "to_do" | "in_progress" | "completed";
}
