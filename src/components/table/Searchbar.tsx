import { Flex, Input, InputGroup } from "@chakra-ui/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";


interface SearchBarProps {
  onSearchChange?: (value: string) => void;
  defaultValues?: string;
  placeholder?: string;
}

const SearchBar = ({
  onSearchChange,
  defaultValues = "",
  placeholder = "Search",
}: SearchBarProps) => {
  const [searchParams] = useSearchParams();

  // Seed from the `?q=` URL param when present, otherwise the default value.
  const [value, setValue] = useState(
    () => searchParams.get("q") || defaultValues,
  );

  return (
    <Flex gap={4} flex={1} maxW={{ lg: "330px" }}>
      <InputGroup
        flexGrow={1}
        w={{ base: "300px", md: "330px" }}
        h={"46px"}
        startElement={
            <FaSearch />
        }
      >
        <Input
          borderRadius={"xl"}
          name="search"
          type="search"
          fontSize={"14px"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value ?? "");
            onSearchChange?.(e?.target?.value ?? "");
          }}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchBar;
