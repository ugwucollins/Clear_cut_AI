import { BsClockFill, BsInstagram, BsTwitter } from "react-icons/bs";
import type {
  AccountProp,
  ContactCardProps,
  FooterProps,
  MenuProps,
  PriceCardProps,
  SocialIconsProps,
  SocialMediaProps,
} from "../utils/types";
import { FaFacebook } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";
import { BiAt, BiCode, BiLocationPlus, BiShare, BiWorld } from "react-icons/bi";
import { RiMessageFill } from "react-icons/ri";

export const FooterLinks: FooterProps[] = [
  {
    title: "Product",
    handlePaths: [
      {
        title: "features",
        path: "/about",
      },
      {
        title: "Pricing",
        path: "/price",
      },
      {
        title: "Api",
        path: "/",
      },
      {
        title: "Profile",
        path: "/profile",
      },
    ],
  },

  {
    title: "Company",
    handlePaths: [
      {
        title: "About Us",
        path: "/about",
      },
      {
        title: "Contact",
        path: "/contact",
      },
      {
        title: "Blog",
        path: "/",
      },
    ],
  },
  {
    title: "Legal",
    handlePaths: [
      {
        title: "Privacy Policy",
        path: "#",
      },
      {
        title: "Terms Of Service",
        path: "#",
      },
    ],
  },
];

export const MenuLink: MenuProps[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "WorkSpace",
    path: "/workspace",
  },
  {
    title: "About Us",
    path: "/about",
  },
  {
    title: "Pricing",
    path: "/price",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

export const SocialMediaLink: SocialMediaProps[] = [
  {
    icon: <BsTwitter />,
    path: "",
  },
  {
    icon: <FaFacebook />,
    path: "",
  },
  {
    icon: <BsInstagram />,
    path: "",
  },
  {
    icon: <LiaLinkedin />,
    path: "",
  },
];

export const PriceArray: PriceCardProps[] = [
  {
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
    btn: "Get Started",
    path: "",
    topTitle: "Basic Use",
  },

  {
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
    btn: "Choose Pro",
    path: "",
    topTitle: "Most popular",
  },

  {
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
    btn: "Contact Sales",
    path: "",
    topTitle: "Contact popular",
  },
];


export const ContactIcons: SocialIconsProps[] = [
  {
    icons: <BiWorld />,
    path: "",
  },
  {
    icons: <BiAt />,
    path: "",
  },
  {
    icons: <BiCode />,
    path: "",
  },
  {
    icons: <BiShare />,
    path: "",
  },
];

export const ContactCards: ContactCardProps[] = [
  {
    icon: <RiMessageFill />,
    title: "Email Support",
    message: "support@ clear_cut_ai .com",
  },
  {
    icon: <BsClockFill />,
    title: "Business Hours",
    message: "Mon-Fri: 9am - 6pm EST",
    sMessage: "Response time: < 24h",
  },
  {
    icon: <BiLocationPlus />,
    title: "Head quarters",
    message: "san Francisco, CA",
  },
];

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
