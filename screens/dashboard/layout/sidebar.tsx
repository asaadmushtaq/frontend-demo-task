import React from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { type LucideIcon } from "lucide-react-native";
import { ScrollView } from "@/components/ui/scroll-view";

type SidebarItem = {
  iconName: LucideIcon | typeof Icon;
  iconText: string;
  id: string; // changed from route to id
};

type SidebarProps = {
  sidebarItems: SidebarItem[];
  activeTab: string;
  onTabSelect: (id: string) => void;
};

export const Sidebar = ({
  sidebarItems,
  activeTab,
  onTabSelect,
}: SidebarProps) => {
  return (
    <ScrollView className="h-full" contentContainerStyle={{ flexGrow: 1 }}>
      <VStack
        className="h-full flex-1 w-[280px] py-4 pr-4 pl-8 items-center border-r border-border-300"
        space="xl"
      >
        <VStack className="w-full px-2 pt-3 pb-4" space="xs">
          {sidebarItems.map((item, index) => {
            const isActive = activeTab === item.id;

            return (
              <Pressable
                onPress={() => onTabSelect(item.id)}
                key={index}
                className={`flex-row px-4 py-3 items-center gap-2 rounded ${
                  isActive ? "bg-background-950" : "bg-background-0"
                }`}
              >
                <Icon
                  as={item.iconName}
                  className={`${
                    isActive
                      ? "stroke-background-0 fill-background-800"
                      : "stroke-background-800 fill-none"
                  }`}
                />
                <Text
                  className={`${
                    isActive ? "text-typography-0" : "text-typography-700"
                  }`}
                >
                  {item.iconText}
                </Text>
              </Pressable>
            );
          })}
        </VStack>
      </VStack>
    </ScrollView>
  );
};
