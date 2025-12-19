import React from 'react';

const DisplayOrderProduct = ({ products = [] }) => {
  if (!products.length) {
    return (
      <p className="text-center text-gray-500 py-6">
        No products selected
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Ordered Products
      </h3>

      {products.map((product) => (
        <div
          key={product._id}
          className="flex items-center gap-4 border-b pb-4"
        >
          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 object-cover rounded"
          />

          {/* Info */}
          <div className="flex-1">
            <p className="font-semibold text-gray-800">
              {product.name}
            </p>
            <p className="text-sm text-gray-500">
              Quantity: {product.quantity}
            </p>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="font-medium">
              {product.price * product.quantity}৳
            </p>
            <p className="text-xs text-gray-500">
              {product.price}৳ × {product.quantity}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayOrderProduct;


