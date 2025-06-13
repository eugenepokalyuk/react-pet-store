import {FC, useEffect, useState} from 'react';
import {useInView} from 'react-intersection-observer';
import {Route, Routes, useLocation} from 'react-router-dom';

import {CartWidget} from '../CartWidget';
import Footer from '../Footer';
import {Header} from '../Header';
import products from '../../data/products.json';
import {useAppDispatch} from '../../hooks';
import ContactsPage from '../../pages/ContactsPage';
import ErrorPage from '../../pages/ErrorPage';
import HomePage from '../../pages/HomePage';
import {PaymentPage} from '../../pages/PaymentPage';
import ProductDetailsPage from '../../pages/ProductDetailsPage';
import {fetchProductsSuccess} from '../../store/actions/actions';
import {CONTACT_PATH, DEFAULT_PATH, ERROR_PATH, PAYMENT_PATH, PRODUCT_PATH} from '../../utils/routePath';

const App:FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const [loading,] = useState<boolean>(false);

    const background = location.state && location.state.background;

    useEffect(() => {
        const productList:any = products.products;

        dispatch(fetchProductsSuccess(productList))
    }, []);

    const [bannerVisible, setBannerVisible] = useState<boolean>(true);

    const { ref, inView } = useInView({
        threshold: 0.1
    });

    useEffect(() => {
        if (inView) {
            setBannerVisible(false)
        } else {
            setBannerVisible(true)
        }
    }, [inView]);

    return (
        <>
            <Header isScrolled={bannerVisible}/>

            {!loading ? (
                <main className='bg-[#F4F2F0]'>
                    <Routes location={background || location}>
                        <Route path={DEFAULT_PATH} element={<HomePage forwardRef={ref}/>}/>
                        <Route path={CONTACT_PATH} element={<ContactsPage/>}/>
                        <Route path={PRODUCT_PATH} element={<ProductDetailsPage/>}/>
                        <Route path={PAYMENT_PATH} element={<PaymentPage/>}/>
                        <Route path={ERROR_PATH} element={<ErrorPage/>}/>
                    </Routes>
                </main>
            ) : (
                <>{'Загрузка'}</>
            )}

            <CartWidget/>

            <Footer/>
        </>
    );
};

export default App;
