import { useContext, useState } from "react";
import { SavingContext } from "../main";
import { Storage } from "../utils";

export type UseConfigReturnType = [
  Config,
  <T extends keyof Config>(key: T, value: Config[T]) => void
];

export const useConfig = (): UseConfigReturnType => {
  const [config, setConfig] = useState(Storage.getConfig());
  const { setIsSaving } = useContext(SavingContext);

  const updateConfig = <T extends keyof Config>(key: T, value: Config[T]) => {
    setIsSaving(true);

    const newConfig: Config = {
      ...config,
      [key]: value,
    };

    Storage.writeLocalConfig(newConfig).then(() => setIsSaving(false));
    setConfig(newConfig);
  };

  return [config, updateConfig];
};
