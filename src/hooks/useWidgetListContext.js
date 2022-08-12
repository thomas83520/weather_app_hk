import { WidgetListContext } from "../context/widgetListContext";
import { useContext } from "react";

export const useWidgetListContext = () => {
  const context = useContext(WidgetListContext);

  if(!context){
      throw Error('useWidgetListContext must be inside an WidgetListContextProvider')
  }
  return context;
};
