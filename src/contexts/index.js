import { CalculateProvider } from "./calculate.context";
import { NotifyProvider } from "./notify.context";

const combinedProviders = (...components) => {
  return components.reduce((Parents, Child) => ({ children }) => {
    return (
      <Parents>
        <Child>{children}</Child>
      </Parents>
    );
  });
};

const providers = [NotifyProvider, CalculateProvider];

const AppProviders = combinedProviders(...providers);

export { useCalculateContext } from "./calculate.context";
export { useNotify } from "./notify.context";
export default AppProviders;
