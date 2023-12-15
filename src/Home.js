import React from "react";
import Chart from 'react-apexcharts';

export default function Home({ order, prodList }) {
  const uniqueCategories = [...new Set(prodList.map((p) => p.prodCategory))];

  const series = uniqueCategories.map((category) => {
    const categoryProducts = prodList.filter((p) => p.prodCategory === category);

    const categoryData = categoryProducts.map((product) => ({
      x: product.prodName, // Product name
      y: product.stock, // Stock value
    }));

    return {
      name: category,
      data: categoryData,
    };
  });

  const options = {
    chart: {
      id: "basic-line",
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: prodList.map((p) => p.prodName),
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ flex: '1', marginRight: '20px', maringTop: '20px'}}>
        <Chart
          options={options}
          series={series}
          type="line"
          width={620}
          height={410}
        />
      </div>
    </div>
  );
}
