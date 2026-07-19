export default function PrivacyPolicy() {
  const policies = [
    {
      title: "1. Information We Collect",
      content:
        "We collect information you provide while placing an order, including your name, phone number, email address, delivery address, and customization details such as names, photos, dates, and messages required to personalize your product.",
    },
    {
      title: "2. How We Use Your Information",
      content:
        "Your information is used to process orders, create customized products, communicate order updates, provide customer support, arrange delivery, and improve our products and services.",
    },
    {
      title: "3. Photo & Customization Data",
      content:
        "Photos and customization details shared by customers are used solely for creating the requested product. We do not sell or share your personal photos with third parties without your permission.",
    },
    {
      title: "4. Payment Information",
      content:
        "Payments are processed through trusted payment providers. Papakutty Creations does not store your debit card, credit card, UPI PIN, or banking credentials.",
    },
    {
      title: "5. Information Sharing",
      content:
        "We never sell or rent your personal information. Your details are shared only with trusted courier partners or service providers when necessary to fulfill and deliver your order.",
    },
    {
      title: "6. Data Security",
      content:
        "We take reasonable security measures to protect your personal information against unauthorized access, misuse, or disclosure. However, no online transmission or storage system can be guaranteed to be 100% secure.",
    },
    {
      title: "7. Cookies",
      content:
        "Our website may use cookies and similar technologies to improve your browsing experience, analyze website traffic, and remember your preferences.",
    },
    {
      title: "8. Marketing Communication",
      content:
        "We may contact you regarding your order or send promotional offers only if you have chosen to receive such updates. You may opt out of promotional messages at any time.",
    },
    {
      title: "9. Your Rights",
      content:
        "You may request to access, update, or delete your personal information by contacting us. Certain information may be retained where required by law or for legitimate business purposes.",
    },
    {
      title: "10. Changes to This Privacy Policy",
      content:
        "Papakutty Creations reserves the right to update this Privacy Policy at any time. Changes will become effective immediately after being published on our website.",
    },
    {
      title: "11. Contact Us",
      content:
        "If you have any questions regarding this Privacy Policy or how your information is handled, please contact us through our official WhatsApp or Instagram. We will be happy to assist you.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-pink-100 text-pink-600 font-semibold text-sm">
            Papakutty Creations
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mt-4 text-gray-900">
            Privacy Policy
          </h1>

          <p className="text-gray-600 mt-4 max-w-3xl mx-auto leading-8">
            At <strong>Papakutty Creations</strong>, we value your privacy and
            are committed to protecting your personal information. This Privacy
            Policy explains how we collect, use, store, and safeguard the
            information you provide while using our website and placing orders.
          </p>
        </div>

        {/* Policy Cards */}
        <div className="space-y-6">
          {policies.map((policy, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-pink-100 p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold text-pink-600 mb-3">
                {policy.title}
              </h2>

              <p className="text-gray-600 leading-8">
                {policy.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 bg-pink-600 rounded-3xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold">
            Your Privacy Matters ❤️
          </h2>

          <p className="mt-4 text-pink-100 leading-8">
            We respect your trust and are committed to keeping your personal
            information safe. Thank you for choosing Papakutty Creations for
            your handmade and customized gifts.
          </p>
        </div>
      </div>
    </div>
  );
}