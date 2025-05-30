import React from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { type LucideIcon } from "lucide-react-native";
import { ScrollView } from "@/components/ui/scroll-view";
import { IconType } from "react-icons";

type SidebarItem = {
  iconName: IconType; // react-icons components use IconType type
  iconText: string;
  id: string;
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
        className="h-full flex-1 w-[280px] py-6 pr-8 pl-2 items-center border-r border-border-700 bg-background-900"
        space="xl"
      >
        <VStack className="w-full px-2 pt-3 pb-4" space="xs">
          {sidebarItems.map((item, index) => {
            const isActive = activeTab === item.id;
            const IconComp = item.iconName;

            return (
              <Pressable
                onPress={() => onTabSelect(item.id)}
                key={index}
                className={`flex-row px-5 py-3 items-center gap-3 rounded-lg transition-colors duration-300 ${
                  isActive
                    ? "bg-custom-gradient shadow-lg"
                    : "bg-background-900 hover:bg-custom-gradient"
                }`}
              >
                <IconComp
                  size={24}
                  className={`transition-colors duration-300 ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                />
                <Text
                  className={`font-semibold transition-colors duration-300 ${
                    isActive ? "text-white" : "text-gray-300"
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
