
import { toast as sonnerToast } from "sonner";

type ToastType = "success" | "error" | "info" | "warning";

interface CustomToastProps {
  title: string;
  description?: string;
  type?: ToastType;
}

export const toast = ({ title, description, type = "info" }: CustomToastProps) => {
  const content = (
    <div>
      <p className="font-semibold">{title}</p>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );

  switch (type) {
    case "success":
      sonnerToast.success(content);
      break;
    case "error":
      sonnerToast.error(content);
      break;
    case "warning":
      sonnerToast.warning(content);
      break;
    case "info":
    default:
      sonnerToast(content);
  }
};
