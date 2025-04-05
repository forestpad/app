import { FaXTwitter, FaGithub } from 'react-icons/fa6';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#0F1115] text-white py-4">
      <div className="container mx-auto">
        <div className="flex space-x-4 border-t border-gray-800 pt-4">
          <a href="#" className="text-gray-400 hover:text-white">
            <FaXTwitter className="w-5 h-5" />
          </a>
          <a href="https://github.com/forestpad" className="text-gray-400 hover:text-white">
            <FaGithub className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};