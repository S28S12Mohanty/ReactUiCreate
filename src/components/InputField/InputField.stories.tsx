import type { Meta, StoryObj } from "@storybook/react";
import InputField from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: { label: "Name", placeholder: "Enter your name" },
};

export const Error: Story = {
  args: { label: "Email", placeholder: "Enter email", errorMessage: "Invalid email" },
};

export const Disabled: Story = {
  args: { label: "Username", placeholder: "Disabled field", disabled: true },
};

export const PasswordToggle: Story = {
  args: { label: "Password", type: "password", passwordToggle: true },
};

export const Clearable: Story = {
  args: { label: "Search", placeholder: "Type something...", clearable: true },
};
