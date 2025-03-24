import React, { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Task } from "../types/Task";
import { getTasks } from "../api/taskService";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const TaskChartPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Error fetching tasks. Please try again later.");
      setLoading(false);
    }
  };

  const processChartData = () => {
    const counts = {
      to_do: 0,
      in_progress: 0,
      completed: 0,
    };

    tasks.forEach((task) => {
      counts[task.status]++;
    });

    setChartData([
      { name: "To Do", value: counts["to_do"] },
      { name: "In Progress", value: counts["in_progress"] },
      { name: "Completed", value: counts["completed"] },
    ]);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      processChartData();
    }
  }, [tasks]);

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3}>
        Task Chart
      </Typography>

      {loading && <Typography>Loading tasks...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <Box
          sx={{
            width: "500px",
            height: "70vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ResponsiveContainer width="80%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label
              >
                {chartData.map((
                  _,
                  index // Eliminado 'entry'
                ) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Container>
  );
};

export default TaskChartPage;
