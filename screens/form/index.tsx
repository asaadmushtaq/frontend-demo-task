"use client";

import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { useToast, Toast, ToastTitle } from "@/components/ui/toast";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react-native";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormSchemaType = z.infer<typeof formSchema>;

const Form = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const toast = useToast();

  const onSubmit = (data: FormSchemaType) => {
    console.log("Form Data:", data);
    toast.show({
      placement: "bottom right",
      render: ({ id }) => (
        <Toast nativeID={id} variant="solid" action="success">
          <ToastTitle>Form submitted successfully</ToastTitle>
        </Toast>
      ),
    });
    reset();
  };

  return (
    <VStack space="xl" className="max-w-[440px] w-full">
      <FormControl isInvalid={!!errors.name}>
        <FormControlLabel>
          <FormControlLabelText>Name</FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="name"
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <Input>
              <InputField
                placeholder="Your Name"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            </Input>
          )}
        />
        <FormControlError>
          <FormControlErrorIcon size="sm" as={AlertTriangle} />
          <FormControlErrorText>{errors.name?.message}</FormControlErrorText>
        </FormControlError>
      </FormControl>

      <FormControl isInvalid={!!errors.email}>
        <FormControlLabel>
          <FormControlLabelText>Email</FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="email"
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <Input>
              <InputField
                placeholder="Your Email"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Input>
          )}
        />
        <FormControlError>
          <FormControlErrorIcon size="sm" as={AlertTriangle} />
          <FormControlErrorText>{errors.email?.message}</FormControlErrorText>
        </FormControlError>
      </FormControl>

      <FormControl isInvalid={!!errors.message}>
        <FormControlLabel>
          <FormControlLabelText>Message</FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="message"
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <Textarea>
              <TextareaInput
                placeholder="Your Message"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                numberOfLines={4}
                multiline
              />
            </Textarea>
          )}
        />
        <FormControlError>
          <FormControlErrorIcon size="sm" as={AlertTriangle} />
          <FormControlErrorText>{errors.message?.message}</FormControlErrorText>
        </FormControlError>
      </FormControl>

      <Button onPress={handleSubmit(onSubmit)} className="mt-4">
        <ButtonText>Submit</ButtonText>
      </Button>
    </VStack>
  );
};

export default Form;
