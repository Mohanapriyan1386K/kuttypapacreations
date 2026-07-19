export default function TermsAndConditions() {
  const terms = [
    {
      title: "1. Customized Orders",
      content:
        "All our products are handmade and customized based on the details provided by the customer. Please ensure all names, photos, dates, spellings, colors, sizes, and customization details are correct before confirming your order. Once production begins, changes may not be possible.",
    },
    {
      title: "2. Payment Policy",
      content:
        "Orders are confirmed only after the required advance payment is received. Customers may also choose to make the full payment while placing the order. Any remaining balance (if applicable) must be completed before dispatch.",
    },
    {
      title: "3. Production Time",
      content:
        "Our standard production time is 7–10 working days depending on the product and customization requirements. If you require your order earlier, please inform us while placing your order. We will do our best to accommodate your request. In case of any unforeseen delays, we will notify you in advance.",
    },
    {
      title: "4. Handmade Products",
      content:
        "Every product is handcrafted with care. Slight variations in colors, flowers, glitter placement, patterns, or finish are a natural part of handmade creations and make each product unique. These variations are not considered defects.",
    },
    {
      title: "5. Damaged Parcel Policy",
      content:
        "If your parcel arrives damaged, please record a complete uninterrupted unboxing video from the moment you open the sealed package. Claims for damage or replacement will only be considered with a valid unboxing video. Please contact us within 24 hours of delivery along with clear photos of the damaged product.",
    },
    {
      title: "6. Shipping",
      content:
        "Every order is securely packed to ensure safe delivery. Once dispatched, tracking details will be shared. Delivery timelines depend on the courier service and destination, but Papakutty Creations will assist you with shipment tracking and delivery-related concerns.",
    },
    {
      title: "7. Returns & Cancellations",
      content:
        "As every product is handmade and customized exclusively for each customer, orders cannot be returned, exchanged, or cancelled once production has started, except in the case of a verified manufacturing defect.",
    },
    {
      title: "8. Product Images",
      content:
        "Product images displayed on our website are for reference purposes. Since every item is handmade and customized, slight variations may occur while maintaining the overall design, quality, and craftsmanship.",
    },
    {
      title: "9. Intellectual Property",
      content:
        "All product designs, photographs, logos, website content, and branding are the exclusive property of Papakutty Creations. They may not be copied, reproduced, distributed, or used without prior written permission.",
    },
    {
      title: "10. Contact Us",
      content:
        "If you have any questions regarding your order or need assistance, please feel free to contact us through our official WhatsApp or Instagram. We are always happy to help.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-pink-50 to-white min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-pink-100 text-pink-600 font-semibold text-sm">
            Papakutty Creations
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mt-4 text-gray-900">
            Terms & Conditions
          </h1>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Please read these Terms & Conditions carefully before placing your
            order. By ordering from Papakutty Creations, you agree to the
            policies mentioned below.
          </p>
        </div>

        {/* Terms */}
        <div className="space-y-6">
          {terms.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-pink-100 p-6 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-bold text-pink-600 mb-3">
                {item.title}
              </h2>

              <p className="text-gray-600 leading-8">{item.content}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 bg-pink-600 rounded-3xl text-white p-8 text-center">
          <h3 className="text-2xl font-bold">
            Thank You for Choosing Papakutty Creations ❤️
          </h3>

          <p className="mt-3 text-pink-100 leading-7">
            Every product is handmade with love and care. We appreciate your
            trust and support. If you have any questions, feel free to reach
            out—we're always happy to help.
          </p>
        </div>
      </div>
    </div>
  );
}