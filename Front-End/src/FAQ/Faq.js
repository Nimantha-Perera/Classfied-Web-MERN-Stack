import React from 'react';

const Faq = () => {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Frequently Asked Questions (FAQ)</h1>

      <div className="accordion" id="faqAccordion">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h2 className="mb-0">
              <button
                className="btn btn-link"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                1. What is your site and how can I sell here?
              </button>
            </h2>
          </div>

          <div
            id="collapseOne"
            className="collapse show"
            aria-labelledby="headingOne"
            data-parent="#faqAccordion"
          >
            <div className="card-body">
              Our site is a platform that allows individuals and businesses to sell their products or services online. To start selling, you need to create an account, set up your seller profile, list your items with accurate descriptions and images, and determine your pricing.
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header" id="headingTwo">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                2. What can I sell on your site?
              </button>
            </h2>
          </div>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#faqAccordion"
          >
            <div className="card-body">
              You can sell a wide range of products and services on our site, including electronics, clothing, accessories, books, handmade crafts, digital products, and more. However, certain restricted items such as illegal products, weapons, and prohibited substances are not allowed.
            </div>
          </div>
        </div>

        {/* Add more FAQ items here following the same structure */}

        <div className="card">
          <div className="card-header" id="headingFifteen">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseFifteen"
                aria-expanded="false"
                aria-controls="collapseFifteen"
              >
                3. What happens if I violate the site's policies?
              </button>
            </h2>
          </div>
          <div
            id="collapseFifteen"
            className="collapse"
            aria-labelledby="headingFifteen"
            data-parent="#faqAccordion"
          >
            <div className="card-body">
              Violations of our site's policies may result in warnings, account suspension, or permanent termination, depending on the severity of the violation. It's important to familiarize yourself with our policies and guidelines to maintain a successful selling experience.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
