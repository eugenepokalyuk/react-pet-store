import { Flex, Grid } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { FC } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { DEFAULT_PATH } from "../utils/routePath";

interface HeaderProps {
    isScrolled: boolean;
}
export const Header: FC<HeaderProps> = ({ isScrolled }) => {
    return (
        <header className={`fixed top-0 w-full z-10 ${isScrolled ? 'header-scrolled' : 'header-not-scrolled'}`}>
            <nav className="container mx-auto border-gray-200 py-6">
                <Grid columns='2' className="justify-center">
                    <Flex className="justify-start">
                        <Link to={DEFAULT_PATH} className="flex items-center">
                            <Logo className={`h-9 mr-4 ${isScrolled ? 'fill-[#3b444b]' : 'fill-white/90'}`} />
                            <span className={`self-center text-xl font-medium whitespace-nowrap ${isScrolled ? 'text-[#3b444b]' : 'text-white/90'}`}>Pokalyuk Store</span>
                        </Link>
                    </Flex>
                    <Flex className="justify-end">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Link
                                to="/contacts"
                                className={`text-white focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none ${isScrolled ? 'bg-[#3b444b]' : 'bg-white/10'}`}
                            >Contacts</Link>
                        </motion.button>
                    </Flex>
                </Grid>
            </nav>
        </header>
    )
}