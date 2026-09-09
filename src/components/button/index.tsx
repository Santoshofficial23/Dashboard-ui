import { Button } from "@chakra-ui/react";

type CommonButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "outline" | "solid" | "subtle" | "surface" | "ghost" | "plain";
  colorScheme?: string;
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
};

const CommonButton = ({
  children,
  onClick,
  variant = "solid",
  loading = false,
  type = "button",
  size = "md",
}: CommonButtonProps) => {
  return (
    <Button
      w={40}
      borderRadius="md"
      color="white"
      _hover={{ opacity: 0.9 }}
      onClick={onClick}
      variant={variant}
      loading={loading}
      type={type}
      size={size}
    >
      {children}
    </Button>
  );
};

export default CommonButton;