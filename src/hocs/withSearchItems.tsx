import { ComponentType } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

type Options<ActionPayload,> = {
  itemsProp: string;
  selector: Parameters<typeof useSelector>[0];
  searchAction: ActionCreatorWithPayload<ActionPayload>;
}

export const withSearchItems = <CompProps, ActionPayload>({ itemsProp, selector, searchAction }: Options<ActionPayload>) => (Comp: ComponentType<CompProps>) => {
  return (props: CompProps) => {
    const items = useSelector(selector);
    const dispatch = useDispatch();

    const handleSearch = (...rest: Parameters<typeof searchAction>) => {
      dispatch(searchAction(...rest));
    }

    const extraProps = {
      [itemsProp]: items,
      [`on${itemsProp.substr(0, 1).toUpperCase().concat(itemsProp.slice(1))}Search`]: handleSearch,
    };

    return <Comp {...props} {...extraProps}  />;
  }
}
