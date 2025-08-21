import { motion } from "framer-motion";
import Logo from "@/assets/logo.png";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.footer
      className="bg-[#260932] h-[100px] w-full flex flex-col items-center justify-center text-white fixed bottom-0 left-0 right-0 z-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.img src={Logo} alt="Vortex Logo" variants={childVariants} />
      <motion.p className="text-sm font-semibold" variants={childVariants}>
        © 2025 Vortex. All rights reserved.
      </motion.p>
    </motion.footer>
  );
};

export default Footer;
