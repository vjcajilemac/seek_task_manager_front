import Tasks from "../pages/Tasks";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import TaskChartPage from "../pages/TaskChartPage";

const InternalRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/charts" element={<TaskChartPage />} />

      </Routes>
    </MainLayout>
  );
};

export default InternalRoutes;
