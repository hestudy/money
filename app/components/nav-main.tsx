import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react";
import { NavLink } from "react-router";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import Spin from "./spin";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <NavLink to={"/stock/add"} className={"w-full"}>
              {({ isPending }) => {
                return (
                  <SidebarMenuButton
                    disabled={isPending}
                    tooltip="Quick Create"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                  >
                    {!isPending && <IconCirclePlusFilled />}
                    {isPending && <Spin />}
                    <span>Quick Create</span>
                  </SidebarMenuButton>
                );
              }}
            </NavLink>
            {/* <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button> */}
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <NavLink to={item.url}>
                {({ isActive, isPending }) => {
                  return (
                    <SidebarMenuButton
                      disabled={isPending}
                      tooltip={item.title}
                      isActive={isActive}
                    >
                      {item.icon && !isPending && <item.icon />}
                      {isPending && <Spin />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  );
                }}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
