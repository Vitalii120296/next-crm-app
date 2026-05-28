"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { BiLockOpenAlt, BiSignal3 } from "react-icons/bi";
import { MdOutlineAccessTime } from "react-icons/md";
import { AiOutlineTool } from "react-icons/ai";
import { GoLock } from "react-icons/go";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FiDatabase } from "react-icons/fi";
import { LuSquareKanban, LuShoppingCart } from "react-icons/lu";
import { FaRegComment, FaGithub } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { BsBriefcase } from "react-icons/bs";
import { IoPieChart } from "react-icons/io5";
import type { IconType } from "react-icons";
import { useAuth } from "@/services/auth/hooks/useAuth";
import { useAuthStore } from "@/store/user";

const container = "mx-auto box-border w-full xl:max-w-[1280px]";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const features = [
  {
    icon: MdOutlineAccessTime,
    title: "Fast platform",
    description: "High-speed performance for seamless user experience",
  },
  {
    icon: AiOutlineTool,
    title: "Best feature",
    description: "Powerful tools designed for maximum productivity",
  },
  {
    icon: BiSignal3,
    title: "Frequent updates",
    description: "Regular updates with new features and improvements",
  },
];

type AdvantageVariant =
  | "red"
  | "blue"
  | "green"
  | "orange"
  | "purple"
  | "teal"
  | "pink"
  | "yellow";

const advantageStyles: Record<
  AdvantageVariant,
  { card: string; iconWrapper: string; icon: string }
> = {
  red: {
    card: "border-[#ff4d4f] shadow-[0_0_15px_rgba(255,77,79,0.5)]",
    iconWrapper: "border-[#ff4d4f] bg-[rgba(255,77,79,0.2)]",
    icon: "text-[#ff4d4f]",
  },
  blue: {
    card: "border-[#40a9ff] shadow-[0_0_15px_rgba(64,169,255,0.5)]",
    iconWrapper: "border-[#40a9ff] bg-[rgba(64,169,255,0.2)]",
    icon: "text-[#40a9ff]",
  },
  green: {
    card: "border-[#73d13d] shadow-[0_0_15px_rgba(115,209,61,0.5)]",
    iconWrapper: "border-[#73d13d] bg-[rgba(115,209,61,0.2)]",
    icon: "text-[#73d13d]",
  },
  orange: {
    card: "border-[#faad14] shadow-[0_0_15px_rgba(250,173,20,0.5)]",
    iconWrapper: "border-[#faad14] bg-[rgba(250,173,20,0.2)]",
    icon: "text-[#faad14]",
  },
  purple: {
    card: "border-[#9254de] shadow-[0_0_15px_rgba(146,84,222,0.5)]",
    iconWrapper: "border-[#9254de] bg-[rgba(146,84,222,0.2)]",
    icon: "text-[#9254de]",
  },
  teal: {
    card: "border-[#13c2c2] shadow-[0_0_15px_rgba(19,194,194,0.5)]",
    iconWrapper: "border-[#13c2c2] bg-[rgba(19,194,194,0.2)]",
    icon: "text-[#13c2c2]",
  },
  pink: {
    card: "border-[#ff85c0] shadow-[0_0_15px_rgba(255,133,192,0.5)]",
    iconWrapper: "border-[#ff85c0] bg-[rgba(255,133,192,0.2)]",
    icon: "text-[#ff85c0]",
  },
  yellow: {
    card: "border-gray-500",
    iconWrapper: "border-gray-500 bg-[rgba(37,36,35,0.2)]",
    icon: "text-gray-500",
  },
};

const advantages: {
  variant: AdvantageVariant;
  icon: IconType;
  title: string;
  description: string;
  noHover?: boolean;
}[] = [
  {
    variant: "red",
    icon: FiDatabase,
    title: "Database of all clients",
    description:
      "Easily store and access detailed client information in one secure place.",
  },
  {
    variant: "blue",
    icon: LuSquareKanban,
    title: "Kanban Management",
    description:
      "Organize tasks visually and track workflow efficiently for all team members.",
  },
  {
    variant: "green",
    icon: IoIosCheckmarkCircleOutline,
    title: "Client statuses",
    description:
      "Quickly see each client's stage and progress through your sales pipeline.",
  },
  {
    variant: "orange",
    icon: FaRegComment,
    title: "Custom comments and notes",
    description: "Add detailed notes or comments for each client individually.",
  },
  {
    variant: "purple",
    icon: LuShoppingCart,
    title: "Adding products and linking them to clients",
    description:
      "Manage product lists and associate items directly with individual clients easily.",
  },
  {
    variant: "teal",
    icon: GrUserManager,
    title: "Manager management",
    description:
      "Assign roles and organize your team efficiently from one place.",
  },
  {
    variant: "pink",
    icon: BsBriefcase,
    title: "Company data configuration",
    description:
      "Set up company details, policies, and settings to suit your business needs.",
  },
  {
    variant: "yellow",
    icon: IoPieChart,
    title: "Data monitoring",
    description: "Coming Soon...",
    noHover: true,
  },
];

function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <span className="text-2xl font-extrabold text-(--info)">FLOW</span>
      <span className="text-base font-normal">
        <span className="text-primary">C</span>
        <span className="text-(--secondary)">R</span>
        <span className="text-(--warning)">M</span>
      </span>
    </div>
  );
}

const logoHoverLines =
  "relative inline-flex w-fit cursor-pointer before:pointer-events-none after:pointer-events-none before:absolute after:absolute before:left-0 after:left-0 before:h-0.5 after:h-0.5 before:w-full after:w-full before:content-[''] after:content-[''] before:bg-[linear-gradient(to_right,#a9dfd8,#f2c8ed,#f2994a)] after:bg-[linear-gradient(to_right,#a9dfd8,#f2c8ed,#f2994a)] before:transition-transform after:transition-transform before:duration-[400ms] after:duration-[400ms] before:ease-out after:ease-out before:-top-1.5 after:-bottom-1.5 before:origin-left after:origin-right before:scale-x-0 after:scale-x-0 hover:before:scale-x-100 hover:after:scale-x-100";

function LogoBlock({
  asLink = false,
  onClick,
}: {
  asLink?: boolean;
  onClick?: () => void;
}) {
  if (asLink) {
    return (
      <Link
        href="/"
        onClick={onClick}
        className={`${logoHoverLines} no-underline`}
      >
        <Logo />
      </Link>
    );
  }

  return (
    <div className={logoHoverLines}>
      <Logo />
    </div>
  );
}

export const StartPage = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { logout } = useAuth();

  const authButtonClass =
    "rounded bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-[#05080a] transition hover:shadow-[0_0_10px_var(--primary)] active:scale-90";

  return (
    <div className="relative z-20 min-h-auto bg-[#05080a] bg-size-[40px_40px] bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] text-foreground">
      <header className="border-y border-white/10 bg-[#05080a]">
        <div className={container}>
          <div className="relative z-10 flex h-auto items-center justify-between px-7.5 py-2.5 xl:border-x xl:border-white/10">
            <LogoBlock />

            {currentUser ? (
              <button
                type="button"
                className={authButtonClass}
                onClick={() => logout()}
              >
                Log out
              </button>
            ) : (
              <Link href="/sign-in" className={authButtonClass}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      <motion.section
        className={`${container} flex w-full flex-col gap-5 bg-[#05080a] sm:flex-row sm:border-x sm:border-dashed sm:border-white/10`}
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.div
          className="flex w-full flex-1 items-center justify-center"
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            },
          }}
        >
          <motion.div
            className="flex w-auto flex-col items-start gap-3.5 p-4.5 sm:gap-5 xl:p-16"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
          >
            <motion.div
              className="inline-flex items-center gap-1.5 rounded-[18px] border border-primary bg-[rgba(168,240,230,0.1)] px-2.5 py-1 text-xs font-bold text-[#a8f0e6]"
              variants={{
                hidden: { opacity: 0, x: -10 },
                show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
            >
              <span className="text-base leading-none">•</span>
              <span>NEW VERSION</span>
            </motion.div>

            <motion.h1
              className="pb-2.5 text-start text-[26px] font-extrabold sm:pb-5 sm:text-[32px]"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
            >
              CRM with a{" "}
              <span className="bg-linear-to-r from-primary via-(--secondary) to-(--warning) bg-clip-text text-transparent">
                simple interface
              </span>{" "}
              for B2C businesses
            </motion.h1>

            <motion.p className="text-start" variants={fadeUp}>
              Take advantage of a free trial subscription
            </motion.p>

            <motion.button
              type="button"
              className="inline-flex items-center justify-center gap-1.5 rounded bg-primary px-4 py-2 font-semibold text-[#05080a] transition hover:shadow-[0_0_10px_var(--primary)] active:scale-90"
              onClick={() => (window.location.href = "/crm")}
              variants={fadeUp}
            >
              <BiLockOpenAlt className="size-4" />
              <span>Get started</span>
            </motion.button>

            <motion.div className="flex items-center gap-8" variants={fadeUp}>
              <div className="flex items-center gap-1.5">
                <IoIosCheckmarkCircleOutline className="size-3 text-(--textSecondary)" />
                <p className="m-0 text-[10px] leading-none">VERSION-1.0</p>
              </div>
              <div className="flex items-center gap-1.5">
                <GoLock className="size-3 text-(--textSecondary)" />
                <p className="m-0 text-[10px] leading-none">
                  ALL DATA PROTECTED
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="flex flex-1 items-center justify-center border-t border-dashed border-white/10 perspective-[1000px] sm:border-t-0 sm:border-l">
          <div className="p-8 xl:p-16">
            <div className="inline-block rounded-3xl bg-linear-to-br from-primary via-(--secondary) to-(--warning) p-1 shadow-[0_20px_40px_rgba(242,200,237,0.5),0_0_30px_rgba(242,200,237,0.3)]">
              <motion.img
                src="/kanban.webp"
                alt="CRM Preview"
                className="block h-auto w-full max-w-125 rounded-[20px]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="border-y border-dashed border-white/10 bg-[#05080a]"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <div className={`${container} grid w-full grid-cols-1 sm:grid-cols-3`}>
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="flex flex-col items-start gap-3 border-t border-dashed border-white/10 p-8 transition-colors hover:bg-[#080b0f] sm:border-t-0 sm:border-r sm:last:border-r-0 xl:first:border-l xl:last:border-r"
              variants={fadeUp}
            >
              <feature.icon className="size-5 text-primary" />
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-start text-sm text-(--textSecondary)">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="border-b border-dashed border-white/10 bg-[#05080a] py-12 xl:py-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.18 } },
        }}
      >
        <div className={container}>
          <div className="flex w-full justify-start p-0">
            <motion.div
              className="flex w-full flex-col justify-start gap-3 border-l border-dashed border-white/10 px-8 text-left sm:pl-16"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.15 } },
              }}
            >
              <motion.p className="text-xs text-primary" variants={fadeUp}>
                THE HIDDEN FRICTION
              </motion.p>

              <motion.h2
                className="text-[28px] font-bold leading-snug"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: "easeOut" },
                  },
                }}
              >
                Workflow slowdowns are rarely obvious. <br />
                Friction builds quietly over time.
              </motion.h2>

              <motion.p className="text-sm" variants={fadeUp}>
                Most managers believe delays happen instantly because <br />
                of one confusing interface or a single missing task. The reality
                is uncomfortable:
                <br />
                small inefficiencies are scattered and accumulate subtly.
              </motion.p>

              <motion.p className="text-sm" variants={fadeUp}>
                Our CRM is designed to make every action simple and visible.{" "}
                <br />
                By the time you notice tasks piling up, our interface <br />
                has already kept your workflow smooth.
              </motion.p>

              <motion.h5
                className="border-l-2 border-primary pl-2.5 text-sm font-normal"
                variants={fadeUp}
              >
                FlowCRM bridges this gap. We give you clarity and control over
                your processes, so small issues never become big problems.
              </motion.h5>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="w-full py-7">
        <div className={container}>
          <h2 className="mb-2.5 flex items-center px-8 text-[22px] font-normal text-white">
            ADVANTAGES
          </h2>

          <motion.div
            className="grid grid-cols-1 gap-10 border-x border-dashed border-white/10 p-8 sm:grid-cols-2 xl:grid-cols-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {advantages.map((item) => {
              const styles = advantageStyles[item.variant];
              return (
                <motion.div
                  key={item.title}
                  className={`flex aspect-5/4 flex-col items-start justify-start gap-4 rounded-2xl border-l-2 bg-[#05080a] p-6 text-left transition-all duration-300 sm:aspect-[4/3] xl:aspect-square ${styles.card} ${
                    item.noHover
                      ? ""
                      : "hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                  }`}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: "easeOut" },
                    },
                  }}
                >
                  <div
                    className={`mb-3 flex items-center justify-center rounded-lg border-2 p-3 ${styles.iconWrapper}`}
                  >
                    <item.icon className={`text-2xl ${styles.icon}`} />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-(--textSecondary)">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <footer className="border-y border-white/10 bg-[#05080a]">
        <div className={container}>
          <div className="relative z-10 mt-3 flex h-auto items-center justify-between px-5 py-2.5">
            <LogoBlock
              asLink
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />

            <div className="flex flex-row gap-2">
              <a
                href="https://github.com/Vitalii120296"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-(--textSecondary) transition hover:scale-110 hover:text-(--text)"
              >
                <FaGithub size={22} />
              </a>
            </div>
          </div>

          <p className="flex justify-start border-t border-white/10 px-5 py-2.5 text-[10px]">
            © {new Date().getFullYear()} FLOW CRM. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default StartPage;
