interface CartNotificationProps {
  show: boolean;
  message: string;
}

export default function CartNotification({ show, message }: CartNotificationProps) {
  return (
    <div
      className={`fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg 
        transform transition-all duration-300 flex items-center space-x-2
        ${show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
} 