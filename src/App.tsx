import AppRoutes from "./components/routes/routes";
import Notification from "./components/toaster/notification";

const App = () => {
  return (
    <>
      <Notification />
      <AppRoutes />
    </>
  );
};

export default App;
