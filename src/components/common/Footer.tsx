import Logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#260932] h-[100px] w-full flex flex-col items-center justify-center text-white fixed bottom-0 left-0 right-0 z-50">
      <img src={Logo} alt="Vortex Logo" />
      <p className="text-sm font-semibold">© 2025 Vortex. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
