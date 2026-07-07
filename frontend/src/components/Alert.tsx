import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface AlertProps {
  type?: 'error' | 'success' | 'info' | 'warning';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Alert({
  type = 'info',
  title,
  children,
  className = '',
}: AlertProps) {
  const config = {
    error: {
      icon: AlertCircle,
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      titleClass: 'text-red-900',
    },
    success: {
      icon: CheckCircle,
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      titleClass: 'text-green-900',
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-700',
      titleClass: 'text-yellow-900',
    },
    info: {
      icon: Info,
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      titleClass: 'text-blue-900',
    },
  }[type];

  const Icon = config.icon;

  return (
    <div
      className={`${config.bg} ${config.border} border rounded-lg p-4 flex items-start gap-3 ${className}`}
    >
      <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${config.text}`} />
      <div>
        {title && <p className={`font-semibold ${config.titleClass}`}>{title}</p>}
        <p className={`text-sm ${config.text}`}>{children}</p>
      </div>
    </div>
  );
}
