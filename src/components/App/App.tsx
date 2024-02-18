import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import products from '../../data/products.json';
import { useAppDispatch } from '../../hooks';
import ErrorPage from '../../pages/ErrorPage';
import HomePage from '../../pages/HomePage';
import ProductDetailsPage from '../../pages/ProductDetailsPage';
import { fetchProductsSuccess } from '../../store/actions/actions';
import { DEFAULT_PATH, ERROR_PATH, PRODUCT_PATH } from '../../utils/routePath';
import { CartWidget } from '../CartWidget';
import { Header } from '../Header';


const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, isLoading] = useState<boolean>(false);
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(fetchProductsSuccess(products.products))
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
      <Header isScrolled={bannerVisible} />
      {!loading ? (
        <Routes location={background || location}>
          <Route path={DEFAULT_PATH} element={<HomePage forwardRef={ref} />} />
          <Route path={PRODUCT_PATH} element={<ProductDetailsPage />} />
          <Route path={ERROR_PATH} element={<ErrorPage />} />
        </Routes>
      ) : (
        <>Загрузка</>
      )}
      <CartWidget />
    </>
  );
};

export default App;