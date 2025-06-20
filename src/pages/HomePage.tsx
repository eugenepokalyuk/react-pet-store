import {FC} from 'react';
import {motion} from 'framer-motion';

import Billboard from '../assets/images/images-billboard1.jpg';
import Billboard2 from '../assets/images/images-billboard2.jpg';
import Billboard3 from '../assets/images/images-billboard3.jpg';
import Billboard4 from '../assets/images/images-billboard4.jpg';
import Billboard5 from '../assets/images/images-billboard5.jpg';
import Billboard6 from '../assets/images/images-billboard6.jpg';
import ProductList from '../components/ProductList';
import {useAppSelector} from '../hooks';

interface HomePageProps {
    forwardRef:any
}

const PhotoGallery = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="grid gap-4">
                <div>
                    <img className="h-auto max-w-full rounded-lg"
                         src="https://www.armani.com/content/images/cms/ycm/resource/blob/740910/2c55ac9aa42b6b13f3ddeba3cf09dac0/ga-editorial-banner-poldo-03-data.jpg/w1920.jpg"
                         alt=""/>
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg"
                         src="https://media.gucci.com/style/DarkGray_Center_0_0_2400x2400/1655474416/692946_UW4AG_8367_003_100_0000_Light-Extra-small-pet-collar.jpg"
                         alt=""/>
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg"
                         src="https://media.gucci.com/style/DarkGray_Center_0_0_2400x2400_40/1655474407/692946_UTVAG_8742_003_100_0000_Light-Extra-small-pet-collar.jpg"
                         alt=""/>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="grid gap-4">
                <div>
                    <img className="h-auto max-w-full rounded-lg"
                         src="https://media.gucci.com/style/DarkGray_Center_0_0_2400x2400_40/1696582012/692946_FAB05_4064_005_100_0000_Light-Extra-small-pet-collar.jpg"
                         alt=""/>
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg"
                         src="https://www.prada.com/content/dam/pradanux_products/2/2YX/2YX003/2DMIF0011/2YX003_2DMI_F0011_SLF.png/_jcr_content/renditions/cq5dam.web.hebebed.2000.2000.jpg"
                         alt=""/>
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg"
                         src="https://media.gucci.com/style/DarkGray_Center_0_0_2400x2400_40/1655469908/697406_ZAJGQ_2580_004_100_0000_Light-Hexagon-GG-pet-bowl.jpg"
                         alt=""/>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="grid gap-4">
                <div>
                    <img className="h-auto max-w-full rounded-lg"
                         src="https://media.gucci.com/style/DarkGray_Center_0_0_2400x2400_40/1655469904/697382_ZAJGK_1030_004_100_0000_Light-Bowl-cover-with-strawberry.jpg"
                         alt=""/>
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg"
                         src="https://assets.hermes.com/is/image/hermesproduct/dog-bowl-small-model--800509E%2001-worn-1-0-0-800-800_g.jpg"
                         alt=""/>
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg"
                         src="https://www.versace.com/dw/image/v2/BGWN_PRD/on/demandware.static/-/Sites-ver-master-catalog/default/dw0158957e/original/90_ZDOGACJ02-ZCOSP052_Z4800_22_IBaroqueSmallPetBathrobe-For~your~Pet-Versace-online-store_1_2.jpg?sw=850&q=85&strip=true"
                         alt=""/>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="grid gap-4">
                <div>
                    <img className="h-auto max-w-full rounded-lg"
                         src="https://www.versace.com/dw/image/v2/BGWN_PRD/on/demandware.static/-/Sites-ver-master-catalog/default/dw321e2dd4/original/90_ZDOGTSH02-1A06617_2B020_22_Versace~Allover~Small~Pet~T~Shirt-For~your~Pet-Versace-online-store_2_0.jpg?sw=850&q=85&strip=true"
                         alt=""/>
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg"
                         src="https://media.gucci.com/style/DarkGray_Center_0_0_2400x2400_40/1701426729/697322_ZAPYJ_2480_004_100_0000_Light-GG-Supreme-print-pet-bed.jpg"
                         alt=""/>
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg"
                         src="https://assets.hermes.com/is/image/hermesproduct/eperon-d-or-dog-bandana-medium-model--800752E%2002-worn-1-0-0-800-800_g.jpg"
                         alt=""/>
                </div>
            </motion.div>
        </>
    )
}

const HomePage:FC<HomePageProps> = ({ forwardRef }) => {
    const products = useAppSelector((store) => store.products.products);

    const first20Products:any = Array.isArray(products) ? products.slice(0, 8) : [];
    const remainingProducts:any = Array.isArray(products) ? products.slice(8) : [];

    return (
        <section className='mt-[6rem]'>
            <article className='container mx-auto mt-4' ref={forwardRef}>
                <h1 className='uppercase text-[34px] md:text-[72px] text-center'>From the fashon show</h1>
            </article>

            <article className='container mx-auto mt-4'>
                <ProductList products={first20Products}/>
            </article>

            <article className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
                <PhotoGallery/>
            </article>

            <article className='container mx-auto mt-4'>
                <ProductList products={remainingProducts}/>
            </article>

            <article className='hidden md:block'>
                <div className="bg-fixed w-full h-screen bg-no-repeat md:block bg-center bg-cover"
                     style={{ backgroundImage: `url(${Billboard3})` }}/>
                <div className="bg-fixed w-full h-screen bg-no-repeat md:block bg-center bg-cover"
                     style={{ backgroundImage: `url(${Billboard5})` }}/>
                <div className="bg-fixed w-full h-screen bg-no-repeat md:block bg-center bg-cover"
                     style={{ backgroundImage: `url(${Billboard2})` }}/>
                <div className="bg-fixed w-full h-screen bg-no-repeat md:block bg-center bg-cover"
                     style={{ backgroundImage: `url(${Billboard6})` }}/>
                <div className="bg-fixed w-full h-screen bg-no-repeat md:block bg-center bg-cover"
                     style={{ backgroundImage: `url(${Billboard4})` }}/>
                <div className="bg-fixed w-full h-screen bg-no-repeat md:block bg-center bg-cover"
                     style={{ backgroundImage: `url(${Billboard})` }}/>
            </article>

            <article className='block md:hidden'>
                <div className="snap-y snap-mandatory h-screen overflow-scroll">
                    <div
                        className="snap-start bg-amber-200 w-screen h-screen flex items-center justify-center text-8xl bg-no-repeat md:block bg-center bg-cover"
                        style={{ backgroundImage: `url(${Billboard3})` }}/>
                    <div
                        className="snap-start bg-amber-200 w-screen h-screen flex items-center justify-center text-8xl bg-no-repeat md:block bg-center bg-cover"
                        style={{ backgroundImage: `url(${Billboard5})` }}/>
                    <div
                        className="snap-start bg-amber-200 w-screen h-screen flex items-center justify-center text-8xl bg-no-repeat md:block bg-center bg-cover"
                        style={{ backgroundImage: `url(${Billboard2})` }}/>
                    <div
                        className="snap-start bg-amber-200 w-screen h-screen flex items-center justify-center text-8xl bg-no-repeat md:block bg-center bg-cover"
                        style={{ backgroundImage: `url(${Billboard6})` }}/>
                    <div
                        className="snap-start bg-amber-200 w-screen h-screen flex items-center justify-center text-8xl bg-no-repeat md:block bg-center bg-cover"
                        style={{ backgroundImage: `url(${Billboard4})` }}/>
                    <div
                        className="snap-start bg-amber-200 w-screen h-screen flex items-center justify-center text-8xl bg-no-repeat md:block bg-center bg-cover"
                        style={{ backgroundImage: `url(${Billboard})` }}/>
                </div>
            </article>

        </section>
    );
};

export default HomePage;
