import { Id, toast, ToastOptions } from "react-toastify";

export const useNotification = () => {
  const successToast = (
    message: string,
    options?: Partial<ToastOptions>
  ): Id => {
    return toast.success(message, {
      ...options,
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const errorToast = (message: string, options?: Partial<ToastOptions>): Id => {
    return toast.error(message, {
      ...options,
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return {
    successToast,
    errorToast,
  };
};
