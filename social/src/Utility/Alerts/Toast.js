import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

  export const ToastError = (msg) => {


    return toast.error(msg)

  }
  export const ToastSuccess = (msg) => {


    return toast.success(msg)

  }
