import React, { useEffect, useState } from "react";
import { ScrollView } from "@/components/ui/scroll-view";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Spinner } from "@/components/ui/spinner";

type User = {
  id: number;
  name: string;
  email: string;
};

const ApiDataPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const simulateError = false;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const url = simulateError
          ? "https://jsonplaceholder.typicode.com/invalid-endpoint"
          : "https://jsonplaceholder.typicode.com/users";

        const res = await fetch(url);

        if (!res.ok) throw new Error("Failed to fetch users");

        const data: User[] = await res.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading)
    return (
      <VStack className="w-full h-full justify-center items-center">
        <Spinner size="large" color="#11998E" />
      </VStack>
    );

  if (error)
    return (
      <VStack className="w-full h-full justify-center items-center p-6">
        <Text className="text-red-600 font-semibold text-lg">
          Error: {error}
        </Text>
      </VStack>
    );

  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
      <VStack space="md" className="w-full">
        <Heading size="lg" className="mb-4 text-center">
          Data List
        </Heading>

        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {users.map((user) => (
            <Box
              key={user.id}
              className="p-4 rounded-lg bg-[#DFF6DD] shadow-[ -4px_-4px_6px_#ffffff,4px_4px_6px_#a3b18a ]"
            >
              <Text className="font-semibold">{user.name}</Text>
              <Text className="text-sm text-typography-500">{user.email}</Text>
            </Box>
          ))}
        </Box>
      </VStack>
    </ScrollView>
  );
};

export default ApiDataPage;
