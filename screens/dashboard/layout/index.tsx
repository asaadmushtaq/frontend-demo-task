import React, { useState } from "react";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import { VStack } from "@/components/ui/vstack";
import { Icon, MenuIcon } from "@/components/ui/icon";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Sidebar } from "./sidebar";
import MobileView from "./mobile-view";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import FormPage from "@/screens/form";
import ApiDataPage from "@/screens/api-data";
import { TextListPage } from "@/screens/text-list";
import { FiFileText, FiList, FiDatabase } from "react-icons/fi";

const SectionsList = [
  {
    iconName: FiFileText,
    iconText: "Form",
    id: "form",
  },
  {
    iconName: FiList,
    iconText: "Text List",
    id: "text-list",
  },
  {
    iconName: FiDatabase,
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
        <HStack className="bg-custom-gradient px-4 py-4 items-center backdrop-blur-md md:px-6 shadow-lg z-10">
          <Pressable onPress={toggleSidebar} className="mr-4 hidden md:flex">
            <Icon as={MenuIcon} size="lg" color="white" />
          </Pressable>
          <Text
            className="text-xl font-semibold text-white"
            style={{ userSelect: "none" }}
          >
            Frontend Developer Task
          </Text>
        </HStack>

        <HStack className="h-full w-full">
          <Box
            className={`hidden md:flex h-full transition-all duration-300 ease-in-out ${
              showSidebar ? "w-64 opacity-100" : "w-0 opacity-0"
            } overflow-hidden`}
          >
            <Sidebar
              sidebarItems={SectionsList}
              activeTab={activeTab}
              onTabSelect={onTabSelect}
            />
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
