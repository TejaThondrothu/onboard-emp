import { toast } from "react-toastify";

export const showToast = (message, type = "info") => {
  const toastOptions = {
    position: "top-right",
    autoClose: 3000, // Auto dismiss after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  switch (type) {
    case "success":
      toast.success(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    case "warning":
      toast.warn(message, toastOptions);
      break;
    default:
      toast.info(message, toastOptions);
      break;
  }
};
