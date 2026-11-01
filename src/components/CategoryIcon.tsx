type Props = { name: string; className?: string };

export default function CategoryIcon({ name, className }: Props) {
  const common = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: className ?? 'h-6 w-6',
    'aria-hidden': true,
  };

  switch (name) {
    case 'sparkles':
      return (
        <svg {...common}>
          <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" />
          <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
        </svg>
      );
    case 'face':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9 10h.01M15 10h.01M9 15c.9.8 2 1.2 3 1.2s2.1-.4 3-1.2" />
        </svg>
      );
    case 'body':
      return (
        <svg {...common}>
          <circle cx="12" cy="5" r="2.3" />
          <path d="M8 10h8l-1 5-2 1v5h-2v-5l-2-1-1-5z" />
        </svg>
      );
    case 'laser':
      return (
        <svg {...common}>
          <path d="M3 20L20 3" />
          <path d="M10 20l10-10" />
          <path d="M14 20l6-6" />
          <circle cx="20" cy="4" r="1" />
        </svg>
      );
    case 'surgery':
      return (
        <svg {...common}>
          <path d="M4 14l10-10 3 3L7 17H4v-3z" />
          <path d="M14 7l3 3" />
          <path d="M3 21h18" />
        </svg>
      );
    case 'body-surgery':
      return (
        <svg {...common}>
          <path d="M12 3c3 0 5 2 5 5v3l2 4-3 1-1 5H9l-1-5-3-1 2-4V8c0-3 2-5 5-5z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
