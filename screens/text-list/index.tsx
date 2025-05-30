"use client";

import { useEffect, useState } from "react";
import { ScrollView } from "@/components/ui/scroll-view";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Spinner } from "@/components/ui/spinner";

const loremText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Suspendisse et justo ac sapien vestibulum viverra. Nullam porta cursus pulvinar. 
Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
Integer ut mauris vel turpis lacinia luctus. Nulla facilisi.`;

const items = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `Lorem Ipsum Item ${i + 1}`,
  description: loremText,
  imageUri: "https://picsum.photos/seed/" + (i + 1) + "/80/80",
}));

export const TextListPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box className="flex-1 justify-center items-center h-screen">
        <Spinner size="large" color="#11998E" />
      </Box>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      className="gap-7"
      contentContainerStyle={{ padding: 20 }}
    >
      <VStack space="lg">
        <Heading size="lg">Text List</Heading>
        <VStack className="h-full" space="md">
          {items.map((item) => (
            <HStack
              key={item.id}
              className="p-4 items-center rounded-xl bg-[#DFF6DD] shadow-[ -4px_-4px_6px_#ffffff,4px_4px_6px_#a3b18a ]"
              space="lg"
            >
              <Box className="relative h-20 w-20 rounded overflow-hidden">
                <Image
                  height={80}
                  width={80}
                  source={item.imageUri}
                  alt={item.title}
                />
              </Box>
              <VStack className="flex-1" space="sm">
                <Heading size="md">{item.title}</Heading>
                <Text>{item.description}</Text>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
};
