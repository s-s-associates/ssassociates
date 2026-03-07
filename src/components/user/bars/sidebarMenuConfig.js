import {
  FiFolder,
  FiGlobe,
  FiGrid,
  FiHelpCircle,
  FiMail,
  FiMessageCircle,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";
import { MdPeopleOutline } from "react-icons/md";

export const menuItems = [
  { label: "Dashboard", href: "/user/dashboard", Icon: FiGrid },
  { label: "Admins", href: "/user/admins", Icon: FiUsers },
  { label: "Clients", href: "/user/clients", Icon: MdPeopleOutline },
  { label: "Contact submission", href: "/user/contact-submissions", Icon: FiMail },
  { label: "Subscribers", href: "/user/subscribers", Icon: FiUserPlus },
  { label: "Project pages", href: "/user/category", Icon: FiFolder, hasSubmenu: true },
  { label: "Services", href: "/user/services", Icon: FiGlobe },
  { label: "Testimonials", href: "/user/testimonials", Icon: FiMessageCircle },
  { label: "FAQs", href: "/user/faqs", Icon: FiHelpCircle },
];

export const projectPagesChildren = [
  { label: "Category", href: "/user/category" },
  { label: "Projects", href: "/user/projects" },
];
