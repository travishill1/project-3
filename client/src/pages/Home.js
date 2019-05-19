import withRoot from '../withRoot';
import React from 'react';
import ProductCategories from '../components/views/ProductCategories';
import ProductSmokingHero from '../components/views/ProductSmokingHero';
import AppFooter from '../components/views/AppFooter';
import ProductHero from '../components/views/ProductHero';
import ProductValues from '../components/views/ProductValues';
import ProductHowItWorks from '../components/views/ProductHowItWorks';
import AppAppBar from '../components/views/AppAppBar';

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);