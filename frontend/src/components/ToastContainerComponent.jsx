import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ToastContainerComponent = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000} // Toast auto closes after 3 seconds
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme= "dark" // You can choose 'light' or 'dark' or 'colored'
    />
  );
};

export default ToastContainerComponent;
