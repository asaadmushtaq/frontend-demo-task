import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { cn } from "@gluestack-ui/nativewind-utils/cn";
import { Platform } from "react-native";

type FooterItem = {
  iconText: string;
  iconName: any;
  id: string;
};

type MobileViewProps = {
  footerItems: FooterItem[];
  activeTab: string;
  onTabSelect: (id: string) => void;
};

export default function MobileView({
  footerItems,
  activeTab,
  onTabSelect,
}: MobileViewProps) {
  return (
    <>
      <HStack className="py-4 px-4 border-b border-border-300 bg-background-0 items-center justify-center md:hidden">
        <Text className="text-xl font-semibold">Frontend Developer Task</Text>
      </HStack>

      <HStack
        className={cn(
          "bg-background-900 justify-between w-full absolute left-0 bottom-0 right-0 p-3 overflow-hidden items-center border-t border-t-border-700 space-x-2 md:hidden",
          { "pb-5": Platform.OS === "ios" || Platform.OS === "android" }
        )}
      >
        {footerItems.map((item, index) => {
          const isActive = activeTab === item.id;

          return (
            <Pressable
              key={index}
              className={cn(
                "px-2 py-1 flex-1 flex-col items-center rounded-lg transition-colors duration-300 ease-in-out",
                {
                  "bg-custom-gradient shadow-lg": isActive,
                  "bg-background-900 hover:bg-custom-gradient": !isActive,
                }
              )}
              onPress={() => onTabSelect(item.id)}
            >
              <item.iconName
                size={24}
                className={cn("transition-colors duration-300", {
                  "text-white": isActive,
                  "text-gray-400": !isActive,
                })}
              />
              <Text
                className={cn(
                  "text-xs text-center mt-1 font-semibold transition-colors duration-300",
                  {
                    "text-white": isActive,
                    "text-gray-300": !isActive,
                  }
                )}
              >
                {item.iconText}
              </Text>
            </Pressable>
          );
        })}
      </HStack>
    </>
  );
}
