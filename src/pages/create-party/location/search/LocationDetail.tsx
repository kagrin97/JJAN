import { IconCancel, IconChevronLeftLarge, IconSearch } from "jjan-icon";
import { Dispatch, SetStateAction, Suspense, useState } from "react";

import { LocationList } from "../list";

import { Box } from "@/components/box";
import { Flex } from "@/components/flex";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import useDebounce from "@/hooks/useDebounce";
import { PartyLocation } from "@/store/partyStore";

type LocationSearchProps = {
  onClose: Dispatch<SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: Dispatch<SetStateAction<PartyLocation>> | any;
  location: PartyLocation | undefined;
};

const LocationSearch = (props: LocationSearchProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValued = useDebounce<string>(searchValue, 300);

  const handleClose = () => {
    props.onClose(prev => !prev);
  };

  return (
    <Box height="100vh" padding="0 20px">
      <Flex flexDirection="column" gap="42px">
        <Header
          leftIcon={
            <IconChevronLeftLarge
              onClick={handleClose}
              width="14px"
              height="24px"
            />
          }
          rightIcon={
            <IconCancel onClick={handleClose} width="22px" height="22px" />
          }
        >
          모임 만들기
        </Header>
        <Input
          appearance="filled"
          placeholder="장소 검색"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          icon={<IconSearch />}
          isValid
        />
        <Suspense fallback={<h1>fallback</h1>}>
          <LocationList {...props} searchValue={debouncedValued} />
        </Suspense>
      </Flex>
    </Box>
  );
};

export { LocationSearch };
