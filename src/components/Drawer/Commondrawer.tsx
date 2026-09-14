import {
  Drawer,
  Portal,
//   Text,
} from "@chakra-ui/react";
import type { ReactNode } from "react";

type CommonDrawerProps = {
  open?: boolean;
  onClose: () => void;
  title: string;
  footer?: ReactNode;
  children?: ReactNode;
  placement?: "start" | "end" | "top" | "bottom";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
};

const CommonDrawer = ({
  open,
  onClose,
  title,
  footer,
  children,
  placement = "end",
  size = "md",
  
}: CommonDrawerProps) => {
  return (
    <Drawer.Root
      open={open}
      onOpenChange={(e) => {
        if (!e.open) {
          onClose();
        }
      }}
      placement={placement}
      size={size}
    >

      <Portal>
        <Drawer.Backdrop />

        <Drawer.Positioner>
          <Drawer.Content width={'90%'} ml={250}>
            <Drawer.Header>
              <Drawer.Title>{title}</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              {children}
            </Drawer.Body>

            <Drawer.Footer>
              {footer}
            </Drawer.Footer>

            <Drawer.CloseTrigger />
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default CommonDrawer;    