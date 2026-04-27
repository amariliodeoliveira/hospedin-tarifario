import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

type AlertType = "info" | "warning" | "error" | "success";

interface Props {
  type: AlertType;
  message: string;
}

const iconClass = "size-6 shrink-0";

const icons: Record<AlertType, React.ReactNode> = {
  info: <InformationCircleIcon className={iconClass} />,
  warning: <ExclamationTriangleIcon className={iconClass} />,
  error: <ExclamationCircleIcon className={iconClass} />,
  success: <CheckCircleIcon className={iconClass} />,
};

const alertClass: Record<AlertType, string> = {
  info: "alert-info",
  warning: "alert-warning",
  error: "alert-error",
  success: "alert-success",
};

export function Alert({ type, message }: Props) {
  return (
    <div role="alert" className={`alert ${alertClass[type]}`}>
      {icons[type]}
      <span>{message}</span>
    </div>
  );
}
