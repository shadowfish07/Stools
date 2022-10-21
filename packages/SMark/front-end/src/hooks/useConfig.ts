import { useContext, useState } from "react";
import { SavingContext } from "../main";
import { useConfigState } from "../store/useConfigState";

export type UseConfigReturnType = [
  Config,
  <T extends keyof Config>(key: T, value: Config[T]) => void,
  (newConfig: Config) => void
];

export const useConfig = (): UseConfigReturnType => {
  const [config, setConfig] = useConfigState((state) => [
    state.config,
    state.setConfig,
  ]);
  const { setIsSaving } = useContext(SavingContext);

  const updateConfigByKey = <T extends keyof Config>(
    key: T,
    value: Config[T]
  ) => {
    setIsSaving(true);

    const newConfig: Config = {
      ...config,
      [key]: value,
    };

    setConfig(newConfig).then(() => setIsSaving(false));
  };

  const updateConfig = (newConfig: Config) => {
    setIsSaving(true);

    setConfig(newConfig).then(() => setIsSaving(false));
  };

  return [config, updateConfigByKey, updateConfig];
};
