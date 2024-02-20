
const Footer = () => {
    return (
        <footer className="bg-black text-yellow-500 p-4 md:p-8">
            <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full md:w-auto text-center md:text-left md:flex-1">
                    <p className="text-sm md:text-lg text-gold-500 font-light mb-2">
                        © {new Date().getFullYear()} Pet Store. All rights reserved.
                    </p>
                </div>
                <div className="flex justify-center md:justify-end flex-wrap gap-4">
                    <a href="https://github.com/eugenepokalyuk" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:text-gray-300 transition-colors">
                        GitHub
                    </a>
                    <a href="https://t.me/PaperCranejs" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:text-gray-300 transition-colors">
                        Telegram
                    </a>
                    <a href="https://eugenepokalyuk.github.io/react-about/" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:text-gray-300 transition-colors">
                        General
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;