import React from 'react';

const ChooseUs = () => {
    return (
        <>
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-10">
                        Why Choose <span className="text-primary">TradBazar</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <div className="text-primary text-4xl mb-4">🌿</div>
                            <h4 className="font-semibold mb-2">Authentic Local Products</h4>
                            <p className="text-sm text-gray-600">
                                Directly sourced from farmers and artisans.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <div className="text-primary text-4xl mb-4">✔️</div>
                            <h4 className="font-semibold mb-2">Admin Verified Sellers</h4>
                            <p className="text-sm text-gray-600">
                                Products are approved to ensure quality.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <div className="text-primary text-4xl mb-4">📦</div>
                            <h4 className="font-semibold mb-2">Order Tracking</h4>
                            <p className="text-sm text-gray-600">
                                Track your orders in real-time.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <div className="text-primary text-4xl mb-4">🤝</div>
                            <h4 className="font-semibold mb-2">Support Local Economy</h4>
                            <p className="text-sm text-gray-600">
                                Empower Bangladeshi sellers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default ChooseUs;