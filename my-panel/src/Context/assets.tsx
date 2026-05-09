import type { AccountProp, PriceCardProps } from "../utils/types";

export const Account: AccountProp[] = [
  { title: "Personal Information", type: "account" },
  { title: "Payment Method", type: "payment" },
  { title: "Password Manager", type: "password" },
  { title: "Logout", type: "logout" },
];

export const AccountType = {
  Personal_Account: "account",
  Password_Manager: "password",
  Payment: "payment",
  Logout: "logout",
};

export const PriceArray: PriceCardProps[] = [
  {
    id: "Basic",
    title: "Basic",
    plan: "Basic",

    amount: "100",
    message: "Perfect for trying out our AI features",
    value: 100 * 100,
    list: [
      "10 credits per month",
      "Standard Definition (SD)",
      "Single image processing",
      "Standard quality",
    ],
    btnText: "Get Started",
    path: "",
    topTitle: "Basic Use",
  },
  {
    id: "Advance",

    title: "pro",
    plan: "Advance",
    amount: "200",
    message: "Best for creative professionals",
    value: 200 * 100,
    list: [
      "20 credits per month",
      "High Definition (SD)",
      "Batch processing (50 images) ",
      "Priority support",
    ],
    btnText: "Choose Pro",
    path: "",
    topTitle: "Most popular",
  },
  {
    id: "business",

    title: "business",
    plan: "Business",
    amount: "500",
    message: "Advanced tools for teams and scale",
    value: 500 * 100,
    list: [
      "50 credits per month",
      "Standard Definition (SD)",
      "Single image processing",
      "No Api Access",
    ],
    btnText: "Contact Sales",
    path: "",
    topTitle: "Contact popular",
  },
];
