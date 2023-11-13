import React from 'react';
import { useToast } from '../../store/ToastContext';
import Toast from './Toast';
import '../../styles/Toast.css'

function ToastsContainer() {
  const { toasts } = useToast();

  return (
    <div className="toasts-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} type={toast.type} />
      ))}
    </div>
  );
}

export default ToastsContainer;
