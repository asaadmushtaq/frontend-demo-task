import React, { useState } from "react";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import { VStack } from "@/components/ui/vstack";
import { Icon, MenuIcon } from "@/components/ui/icon";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Sidebar } from "./sidebar";
import { NewsBlogIcon } from "@/screens/profile-screens/profile/assets/icons/news-blog";
import { FaqIcon } from "@/screens/profile-screens/profile/assets/icons/faq";
import { SubscriptionIcon } from "@/screens/profile-screens/profile/assets/icons/subscription";
import MobileView from "./mobile-view";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import FormPage from "@/screens/form";
import ApiDataPage from "@/screens/api-data";
import { TextListPage } from "@/screens/text-list";

const SectionsList = [
  {
    iconName: NewsBlogIcon,
    iconText: "Form",
    id: "form",
  },
  {
    iconName: FaqIcon,
    iconText: "Text List",
    id: "text-list",
  },
  {
    iconName: SubscriptionIcon,
    iconText: "API Data",
    id: "api-data",
  },
];

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showSidebar, setShowSidebar] = useState(true);

  const [activeTab, setActiveTab] = useState("form");

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const onTabSelect = (id: string) => {
    setActiveTab(id);
  };

  const renderContent = () => {
    try {
      switch (activeTab) {
        case "form":
          return <FormPage />;
        case "text-list":
          return <TextListPage />;
        case "api-data":
          return <ApiDataPage />;
        default:
          return <FormPage />;
      }
    } catch (error) {
      return <Text>Error loading content</Text>;
    }
  };

  return (
    <SafeAreaView className="h-full w-full">
      <VStack className="h-full w-full bg-background-0">
        <HStack className="px-4 py-4 border-b border-border-300 items-center bg-background-0 md:px-6">
          <Pressable onPress={toggleSidebar} className="mr-4 hidden md:flex">
            <Icon as={MenuIcon} size="lg" />
          </Pressable>
          <Text className="text-xl font-semibold">Frontend Developer Task</Text>
        </HStack>

        <HStack className="h-full w-full">
          <Box className="hidden md:flex h-full">
            {showSidebar && (
              <Sidebar
                sidebarItems={SectionsList}
                activeTab={activeTab}
                onTabSelect={onTabSelect}
              />
            )}
          </Box>
          <VStack className="w-full flex-1">
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 160,
                padding: 20,
                flexGrow: 1,
              }}
            >
              {renderContent()}
            </ScrollView>
          </VStack>
        </HStack>
      </VStack>

      <MobileView
        footerItems={SectionsList}
        activeTab={activeTab}
        onTabSelect={onTabSelect}
      />
    </SafeAreaView>
  );
};
