export interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  classes?: string;
}

export interface CardProps {
  children: React.ReactNode;
  classes?: string;
}