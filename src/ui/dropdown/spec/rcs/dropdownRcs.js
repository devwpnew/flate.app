import API from "../../../../../api/service/api";
import React, { useEffect, useState } from "react";
import DropdownModalInput from "../../dropdownModalInput";
import AddNewRcModalButton from "./addNewRcModalButton";

export default function DropdownRcs({
  isShowSelected,
  isCanAddRc,
  navigation,
  onValueChange,
  ...props
}) {
  const [key, setKey] = useState(0);
  const [isLoadingRcs, setIsLoadingRcs] = useState(false);
  const [rcs, setRcs] = useState([]);

  useEffect(() => {
    (async () => await fetchRcsData())();
  }, []);

  const dropdownRcsValueChangeHandler = (option) => {
    if (navigation) {
      loadRc(option);
    }

    if (onValueChange) {
      onValueChange(option);
    }
  };

  const loadRc = (option) => {
    const rc = rcs.find((rc) => rc.id == option.value);

    navigation.navigate("Category", {
      name: rc.name,
      section: { ...rc, rc_id: rc.id, slug: "rc" },
    });
  };

  const onNewRcAddedHandler = async () => {
    await fetchRcsData();
    setKey(Math.random());
  };

  async function fetchRcsData() {
    setIsLoadingRcs(true);

    const rcsArr = await API.get.rcs({
      window_host: "https://flate.pro/",
      sort: {
        id: "asc",
      },
      limit: "all",
    });

    if (rcsArr.length > 0) {
      setRcs(rcsArr);
    }

    setIsLoadingRcs(false);
  }

  return (
    <>
      <DropdownModalInput
        key={key}
        onValueChange={dropdownRcsValueChangeHandler}
        isLoading={isLoadingRcs}
        options={rcs}
        isShowSelected={isShowSelected}
        emptyFallback={
          isCanAddRc && (
            <AddNewRcModalButton onNewRcAdded={onNewRcAddedHandler} />
          )
        }
        {...props}
      />
    </>
  );
}
