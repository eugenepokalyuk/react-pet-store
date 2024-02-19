import { Flex, Grid } from "@radix-ui/themes";
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
            <nav className="border-gray-200 px-4 lg:px-6 py-6">
                <Grid columns='2' className="justify-center">
                    <Flex className="justify-start">
                        <Link to={DEFAULT_PATH} className="flex items-center">
                            <Logo className="h-9 mr-4" />
                            {/* className="h-6 sm:h-9"  */}
                            <span className={`self-center text-xl font-semibold whitespace-nowrap ${isScrolled ? 'text-black' : 'text-black'}`}>Pokalyuk Store</span>
                        </Link>
                    </Flex>
                    <Flex className="justify-end">
                        <Link
                            to="/contacts"
                            className={`text-gray-800 dark:text-white hover:bg-white/20 focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none ${isScrolled ? 'bg-[#85714D]' : 'bg-white/10'}`}
                        >Contacts</Link>
                    </Flex>
                </Grid>
            </nav>
        </header>
    )
}