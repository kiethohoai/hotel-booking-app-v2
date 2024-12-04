import { useEffect } from 'react';

type ToastProps = {
  message: string;
  type: 'SUCCESS' | 'ERROR';
  onClose: () => void;
};

function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timmer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => {
      clearTimeout(timmer);
    };
  }, [onClose]);

  const styles =
    type === 'SUCCESS'
      ? 'fixed right-4 top-4 z-50 max-w-md rounded-sm bg-green-600 p-4 text-white'
      : 'fixed right-4 top-4 z-50 max-w-md rounded-sm bg-red-600 p-4 text-white';

  return (
    <div className={styles}>
      <div className="justify-cente flex items-center">
        <div className="text-lg font-semibold">{message}</div>
      </div>
    </div>
  );
}

export default Toast;
