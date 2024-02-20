import { Flex } from '@radix-ui/themes';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC } from 'react';

const AccordionContext = React.createContext({});
const useAccordion = () => React.useContext(AccordionContext);

interface ContactsPageProps {
}
const MapWidget = () => {
    return (
        <>
            <div style={{
                "position": "relative",
                "overflow": "hidden"
            }}
            >
                <iframe
                    src="https://yandex.com/map-widget/v1/org/wahaca_southbank/227226704149/?ll=-0.121320%2C51.507024&z=16"
                    width="600"
                    height="600"
                    style={{
                        "position": "relative"
                    }}
                    className="rounded-lg"
                />
            </div>
        </>
    )
}

function Accordion({ children, multiple, defaultIndex }: any) {
    const [activeIndex, setActiveIndex] = React.useState(
        multiple ? [defaultIndex] : defaultIndex
    );

    function onChangeIndex(index: any) {
        setActiveIndex((currentActiveIndex: any) => {
            if (!multiple) {
                return index === activeIndex ? -1 : index;
            }

            if (currentActiveIndex.includes(index)) {
                return currentActiveIndex.filter((i: any) => i !== index);
            }

            return currentActiveIndex.concat(index);
        });
    }

    return React.Children.map(children, (child, index) => {
        const isActive =
            multiple && Array.isArray(activeIndex)
                ? activeIndex.includes(index)
                : activeIndex === index;

        return (
            <AccordionContext.Provider value={{ isActive, index, onChangeIndex }}>
                {child}
            </AccordionContext.Provider>
        );
    });
}

function AccordionItem({ children }: any) {
    return <div className="AccordionItem">{children}</div>;
}

function AccordionHeader({ children }: any) {
    const { isActive, index, onChangeIndex }: any = useAccordion();

    return (
        <motion.div
            className={`AccordionHeader ${isActive ? "active" : ""}`}
            onClick={() => onChangeIndex(index)}
        >
            {children}
        </motion.div>
    );
}

function AccordionPanel({ children }: any) {
    const { isActive }: any = useAccordion();

    return (
        <AnimatePresence initial={false}>
            {isActive && (
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                >
                    <div className="AccordionPanel">{children}</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const ContactsPage: FC<ContactsPageProps> = () => {
    const array = [{
        header: "Feedback",
        body: "If you have any questions or would like to clarify details about our products for your pets, feel free to contact us. We are always happy to help and answer all your queries."
    }, {
        header: "Applications for cooperation",
        body: "We are open to collaborating with other brands and companies for whom pet care is important. If you have partnership suggestions, please email us."
    }, {
        header: "Problems with ordering",
        body: "We are committed to providing you with the best service possible, so if you have any problems with your order or delivery, please contact us and we will endeavor to resolve everything quickly and efficiently."
    }];

    return (
        <section className='container mx-auto mt-[6rem] min-h-screen'>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center">
                <Flex className='items-center justify-center'>
                    <MapWidget />
                </Flex>
                <Flex className='flex-col'>
                    <h2 className='text-[48px] text-center mb-4'>Contact us</h2>
                    <Accordion>
                        {array.map((item, index) => (
                            <AccordionItem key={index}>
                                <AccordionHeader>{item.header}</AccordionHeader>
                                <AccordionPanel>
                                    {item.body}
                                </AccordionPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Flex>
            </div>
        </section>
    );
};

export default ContactsPage;