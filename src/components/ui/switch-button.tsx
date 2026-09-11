// import { Switch } from "@chakra-ui/react";

// type SwitchCompProps = {
//   checked: boolean;
//   onChange: (checked: boolean) => void;
// };

// const SwitchComp = ({
//   checked,
//   onChange,
// }: SwitchCompProps) => {
//   return (
//     <Switch.Root
//       checked={checked}
//       onCheckedChange={(details) => {
//         onChange(details.checked);
//       }}
//     >
//       <Switch.HiddenInput />
//       <Switch.Control>
//         <Switch.Thumb />
//       </Switch.Control>

//       <Switch.Label>
//         {checked ? "Active" : "Inactive"}
//       </Switch.Label>
//     </Switch.Root>
//   );
// };

// export default SwitchComp;

import { Switch as ChakraSwitch } from "@chakra-ui/react";

export const SwitchComp = ({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) => (
  <ChakraSwitch.Root
    checked={checked}
    onCheckedChange={(details) => onCheckedChange(details.checked)}
  >
    <ChakraSwitch.HiddenInput />
    <ChakraSwitch.Control>
      <ChakraSwitch.Thumb />
    </ChakraSwitch.Control>
  </ChakraSwitch.Root>
);
