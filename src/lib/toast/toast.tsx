import { toast as sonnerToast } from "sonner";

export const useToast = () => {
  const show = (title: string, description?: string, type: "success" | "error" | "info" | "warning" = "info") => {
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

  return {
    success: (title: string, description?: string) => show(title, description, "success"),
    error: (title: string, description?: string) => show(title, description, "error"),
    warning: (title: string, description?: string) => show(title, description, "warning"),
    info: (title: string, description?: string) => show(title, description, "info"),
  };
};
