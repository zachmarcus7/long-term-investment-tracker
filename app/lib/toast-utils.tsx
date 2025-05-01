import toast from 'react-hot-toast';

/**
 * 
 * @param message 
 */
export function showSuccessToast(message: string) {
  toast.success(
    <div>
      <h3 className="font-bold text-2xl">Success</h3>
      <p className="text-sm text-white">{message}</p>
    </div>
  , {
    duration: 4000,
    position: 'top-center',
    style: {
      borderRadius: '10px',
      background: 'oklch(69.6% 0.17 162.48)',
      color: 'white',
    },
    iconTheme: {
      primary: 'oklch(59.6% 0.145 163.225)',
      secondary: 'white',
    },
  });
}

/**
 * 
 * @param message 
 */
export function showErrorToast(message: string) {
  toast.error(
    <div>
      <h3 className="font-bold text-2xl">Error</h3>
      <p className="text-sm text-white">{message}</p>
    </div>
  , {
    duration: 4000,
    position: 'top-center',
    style: {
      borderRadius: '10px',
      background: 'oklch(0.545 0.206 27.9)',
      color: 'white',
    },
    iconTheme: {
      primary: 'oklch(0.377 0.276 23.8)',
      secondary: 'white',
    },
  });
}