import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './styles.css';
import ProdManagement from './ProductManagement';
import CatManagement from './CategoryManagement';
import StockManagement from './StockManagement';
import TransManagement from './TransactionManagement';
import Report from './Report';
import Home from './Home';

function NavTabs() {
  const [prodList, setProdList] = useState([]);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);
  return (
    <>
    <Tabs
      defaultActiveKey="product"
      id="uncontrolled-tab"
      className="mb-3 custom-tabs"
      fill
    >
      <Tab eventKey="home" title="Home">
        <Home prodList={prodList} order={order}/>
      </Tab>
      
      <Tab eventKey="product" title="Product Management">
        <ProdManagement prodList={prodList} setProdList={setProdList} />
      </Tab>
      <Tab eventKey="transaction" title="Transaction Management">
        <TransManagement  prodList={prodList} setProdList={setProdList} cart={cart} setCart={setCart} order={order} setOrder={setOrder}/>
      </Tab>
      <Tab eventKey="stocks" title="Stocks Management">
        <StockManagement/>
      </Tab>
      <Tab eventKey="report" title="Transaction Report">
        <Report order={order} setOrder={setOrder}/>
      </Tab>
      
    </Tabs>
    </>
  );
}

export default NavTabs;