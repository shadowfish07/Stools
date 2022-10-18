import { useContext, useState } from "react";
import { SavingContext } from "../main";
import { useConfigState } from "../store/useConfigState";

export type UseConfigReturnType = [
  Config,
  <T extends keyof Config>(key: T, value: Config[T]) => void
];

export const useConfig = (): UseConfigReturnType => {
  const [config, setConfig] = useConfigState((state) => [
    state.config,
    state.setConfig,
  ]);
  const { setIsSaving } = useContext(SavingContext);

  const updateConfig = <T extends keyof Config>(key: T, value: Config[T]) => {
    setIsSaving(true);

    const newConfig: Config = {
      ...config,
      [key]: value,
    };

    setConfig(newConfig).then(() => setIsSaving(false));
  };

  return [config, updateConfig];
};
