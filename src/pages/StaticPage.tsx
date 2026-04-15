import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BottomNav from "@/components/BottomNav/BottomNav";

type Section = { heading: string; body: string | string[] };
type PageContent = { title: string; lastUpdated: string; intro?: string; sections: Section[] };

const pages: Record<string, PageContent> = {
  about: {
    title: "About Us",
    lastUpdated: "January 2025",
    intro:
      "SwiftCart was built on a single belief — that great products should reach every doorstep, fast and affordably. We are a team of passionate builders, designers, and problem-solvers working to redefine how India shops online.",
    sections: [
      {
        heading: "Our Story",
        body: "Founded in 2023, SwiftCart started as a small experiment in hyper-local grocery delivery. Within months, customers told us they wanted more — better products, better prices, and a shopping experience that felt genuinely delightful. We listened. Today, SwiftCart offers thousands of products across groceries, personal care, home essentials, and more — all delivered reliably across India.",
      },
      {
        heading: "Our Mission",
        body: "To make quality everyday essentials accessible to everyone, everywhere — with transparent pricing, zero hidden fees, and delivery that actually shows up on time.",
      },
      {
        heading: "What Sets Us Apart",
        body: [
          "Curated catalogue — every product is manually reviewed for quality before it goes live.",
          "No dark patterns — the price you see is the price you pay. Always.",
          "Mobile-first experience — designed from the ground up for the smartphone.",
          "Sustainable packaging — we are progressively moving to recyclable and minimal packaging.",
          "24/7 support — real humans, not bots, available to resolve your issues.",
        ],
      },
      {
        heading: "Our Values",
        body: [
          "Transparency: We share our policies openly and keep communication honest.",
          "Customer-first: Every product decision, feature, and policy starts with the customer.",
          "Speed: We respect your time — in delivery and in resolving issues.",
          "Integrity: We do what we say, and we say what we do.",
        ],
      },
      {
        heading: "Get in Touch",
        body: "Have a question, a partnership idea, or just want to say hello? Reach us at support@swiftcart.in or call us at 1800-123-4567 (Mon–Sat, 9 AM – 6 PM IST).",
      },
    ],
  },

  terms: {
    title: "Terms of Use",
    lastUpdated: "January 2025",
    intro:
      "By accessing or using SwiftCart — including our website, mobile app, and progressive web app — you agree to be bound by the following terms. Please read them carefully.",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: "By placing an order or creating an account, you acknowledge that you have read, understood, and agree to these Terms of Use and our Privacy Policy. If you do not agree, please discontinue use of the platform immediately.",
      },
      {
        heading: "2. Eligibility",
        body: [
          "You must be at least 18 years of age to use SwiftCart.",
          "By using the platform, you represent that all information you provide is accurate and up to date.",
          "Accounts registered with false information may be terminated without notice.",
        ],
      },
      {
        heading: "3. Orders and Payments",
        body: [
          "All orders are subject to availability and confirmation.",
          "Prices are listed in Indian Rupees (INR) and include applicable taxes unless stated otherwise.",
          "We reserve the right to cancel any order due to pricing errors, stock unavailability, or suspected fraud.",
          "For Cash on Delivery orders, payment is due at the time of delivery.",
          "Online payments are processed through secure third-party payment gateways.",
        ],
      },
      {
        heading: "4. Prohibited Activities",
        body: [
          "Attempting to hack, reverse-engineer, or disrupt the platform.",
          "Placing fraudulent or test orders without intent to purchase.",
          "Reselling products purchased on SwiftCart without explicit written permission.",
          "Using automated tools or bots to access the platform.",
          "Submitting false or misleading reviews, complaints, or support tickets.",
        ],
      },
      {
        heading: "5. Intellectual Property",
        body: "All content on SwiftCart — including logos, images, text, UI design, and code — is the intellectual property of SwiftCart or its licensors. Unauthorised reproduction or distribution is strictly prohibited.",
      },
      {
        heading: "6. Limitation of Liability",
        body: "SwiftCart shall not be liable for indirect, incidental, or consequential damages arising from the use of, or inability to use, the platform. Our liability is limited to the value of the order in question.",
      },
      {
        heading: "7. Governing Law",
        body: "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.",
      },
      {
        heading: "8. Changes to Terms",
        body: "We may revise these terms at any time. Continued use of the platform after changes constitutes acceptance of the updated terms.",
      },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    lastUpdated: "January 2025",
    intro:
      "Your privacy matters to us. This policy explains what data we collect, how we use it, and the choices you have. SwiftCart complies with applicable data protection laws in India.",
    sections: [
      {
        heading: "1. Information We Collect",
        body: [
          "Personal information: Name, phone number, email address, and delivery addresses you provide.",
          "Order information: Products ordered, payment method, and delivery history.",
          "Device and usage data: Browser type, device model, IP address, and pages visited.",
          "Location data: Approximate location for delivery area detection (only when you grant permission).",
          "Cookies and local storage: Used to maintain your session, cart, and preferences.",
        ],
      },
      {
        heading: "2. How We Use Your Information",
        body: [
          "To process and deliver your orders.",
          "To send order confirmations, updates, and delivery notifications.",
          "To personalise your shopping experience and recommend relevant products.",
          "To improve our platform through usage analytics.",
          "To detect and prevent fraud or security breaches.",
          "To respond to your support requests.",
        ],
      },
      {
        heading: "3. Data Sharing",
        body: "We do not sell or rent your personal data to third parties. We may share data with trusted service providers (logistics partners, payment processors) solely for fulfilling your orders. All third parties are bound by confidentiality agreements.",
      },
      {
        heading: "4. Cookies",
        body: "We use cookies and local storage to keep you signed in, remember your cart, and understand how the app is used. You can control cookie settings in your browser; however, disabling them may affect functionality.",
      },
      {
        heading: "5. Data Security",
        body: "We implement industry-standard security measures including HTTPS encryption, secure payment processing, and access controls. While no system is entirely immune, we take every reasonable precaution to protect your data.",
      },
      {
        heading: "6. Data Retention",
        body: "We retain your personal data as long as your account is active or as needed to provide services. You may request deletion of your account and associated data by contacting support@swiftcart.in.",
      },
      {
        heading: "7. Your Rights",
        body: [
          "Access: Request a copy of the personal data we hold about you.",
          "Correction: Ask us to correct inaccurate or incomplete data.",
          "Deletion: Request deletion of your personal data (subject to legal obligations).",
          "Opt-out: Unsubscribe from marketing communications at any time.",
        ],
      },
      {
        heading: "8. Contact",
        body: "For privacy-related queries, email us at privacy@swiftcart.in.",
      },
    ],
  },

  shipping: {
    title: "Shipping Policy",
    lastUpdated: "January 2025",
    intro:
      "We are committed to delivering your orders safely and on time. Below is everything you need to know about how shipping works on SwiftCart.",
    sections: [
      {
        heading: "Delivery Timelines",
        body: [
          "Standard delivery: 4 – 7 business days from order confirmation.",
          "Express delivery (select pincodes): 1 – 2 business days, shown at checkout if available.",
          "Remote areas: 7 – 10 business days depending on logistics partner availability.",
          "Business days exclude Sundays and public holidays.",
        ],
      },
      {
        heading: "Delivery Charges",
        body: [
          "Orders above ₹499: FREE delivery, always.",
          "Orders below ₹499: Flat ₹40 delivery fee.",
          "Express delivery: Additional charges apply and are displayed at checkout.",
        ],
      },
      {
        heading: "Pincode Availability",
        body: "We deliver to 19,000+ pincodes across India. To check if we deliver to your area, enter your pincode in the cart or checkout screen. If your pincode is not serviceable, you will be notified before payment.",
      },
      {
        heading: "Order Tracking",
        body: "Once your order is shipped, you will receive a tracking link via SMS. You can also track your order from the Orders section in the app. Tracking updates are refreshed every 6–12 hours.",
      },
      {
        heading: "Delays and Exceptions",
        body: [
          "Delivery timelines may extend during peak seasons, sales events, or natural disruptions.",
          "SwiftCart is not liable for delays caused by incorrect address information provided by the customer.",
          "If an order is undeliverable after 3 attempts, it will be returned to our warehouse and a refund will be processed.",
        ],
      },
      {
        heading: "Packaging",
        body: "All products are carefully packed to prevent damage in transit. Fragile items are wrapped with protective materials. If you receive a damaged package, please photograph it before opening and contact support within 48 hours.",
      },
    ],
  },

  cancellation: {
    title: "Cancellation Policy",
    lastUpdated: "January 2025",
    intro:
      "We understand plans change. Here is how cancellations work on SwiftCart.",
    sections: [
      {
        heading: "When Can I Cancel?",
        body: [
          "You can cancel your order anytime within 12 hours of placing it, provided it has not yet been shipped.",
          "Once an order is dispatched (status: Shipped), it cannot be cancelled.",
          "For perishable or fast-delivery items, the cancellation window may be as short as 1 hour.",
        ],
      },
      {
        heading: "How to Cancel",
        body: [
          "Go to the Orders section in the app.",
          "Select the order you wish to cancel.",
          "Tap Cancel Order and choose a reason.",
          "You will receive a confirmation via SMS within 15 minutes.",
        ],
      },
      {
        heading: "Cancellation by SwiftCart",
        body: "In rare cases, we may cancel your order due to product unavailability, pricing errors, or logistical constraints. You will be notified immediately and a full refund will be processed within 3–5 business days.",
      },
      {
        heading: "Refund on Cancellation",
        body: [
          "Prepaid orders: Full refund to the original payment method within 5–7 business days.",
          "COD orders: No payment collected — no refund needed.",
          "Wallet credits (if applicable): Refunded within 24 hours.",
        ],
      },
      {
        heading: "Non-Cancellable Items",
        body: [
          "Items marked Non-Cancellable on the product page.",
          "Digital or downloadable products.",
          "Items purchased during special flash sales (marked at purchase).",
        ],
      },
    ],
  },

  return: {
    title: "Return Policy",
    lastUpdated: "January 2025",
    intro:
      "We want you to be completely satisfied with your purchase. If something is not right, our return policy is here to help.",
    sections: [
      {
        heading: "Return Window",
        body: "Most products are eligible for return within 7 days of delivery. The return window is mentioned on each product page. Some categories have different policies as noted below.",
      },
      {
        heading: "Eligible for Return",
        body: [
          "Products that are damaged, defective, or not as described.",
          "Wrong item delivered (different from what was ordered).",
          "Products with missing parts or accessories.",
          "Sealed products delivered with broken seals (where seal-integrity is guaranteed).",
        ],
      },
      {
        heading: "Non-Returnable Products",
        body: [
          "Perishable goods (food, dairy, fresh produce).",
          "Personal hygiene products once opened (razors, earrings, undergarments).",
          "Digital goods and gift cards.",
          "Products that have been used, altered, or washed.",
          "Items without original packaging or with tampered MRP labels.",
        ],
      },
      {
        heading: "How to Initiate a Return",
        body: [
          "Go to Orders → select the item → tap Return Item.",
          "Select the reason for return and upload a photo of the product.",
          "Our team will review the request within 24 hours.",
          "If approved, a pickup will be scheduled within 2 business days.",
          "Refund is processed after the item passes quality inspection at our warehouse.",
        ],
      },
      {
        heading: "Return Pickup",
        body: "Pickup is free of charge for all valid returns. Our logistics partner will collect the item from the original delivery address. Please ensure the product is securely packed in its original packaging.",
      },
      {
        heading: "Refund After Return",
        body: [
          "Prepaid orders: Refund within 5–7 business days after pickup and inspection.",
          "COD orders: Refund to your registered bank account or SwiftCart wallet within 7 business days.",
        ],
      },
    ],
  },

  refund: {
    title: "Refund Policy",
    lastUpdated: "January 2025",
    intro:
      "Refunds at SwiftCart are straightforward and transparent. Here is a complete guide to how and when refunds are processed.",
    sections: [
      {
        heading: "When Are Refunds Issued?",
        body: [
          "Order cancelled before shipment.",
          "Item returned after delivery within the return window.",
          "Item not delivered within the estimated timeframe.",
          "Payment charged but order not placed due to a technical error.",
          "Order cancelled by SwiftCart due to stock or pricing issues.",
        ],
      },
      {
        heading: "Refund Timelines",
        body: [
          "Credit / Debit cards: 5–7 business days.",
          "UPI payments: 2–3 business days.",
          "Net banking: 5–7 business days.",
          "Wallets (Paytm, PhonePe, etc.): 1–2 business days.",
          "SwiftCart Wallet: Within 24 hours.",
          "COD orders: Bank transfer or wallet credit within 7 business days after pickup.",
        ],
      },
      {
        heading: "How Refunds Are Processed",
        body: "Refunds are credited back to the original payment method used during checkout. We do not issue cash refunds. For COD orders, a bank transfer or wallet credit is arranged.",
      },
      {
        heading: "Tracking Your Refund",
        body: "You will receive an SMS and in-app notification when your refund is initiated. You can also check the status in Orders → select the order → Refund Status.",
      },
      {
        heading: "Non-Refundable Situations",
        body: [
          "Products that do not qualify for return as per our Return Policy.",
          "Delivery charges are non-refundable unless the order was cancelled before dispatch or not delivered.",
          "Refund requests raised after the return window has expired.",
        ],
      },
      {
        heading: "Disputes",
        body: "If your refund has not been credited within the stated timeline, please contact us at support@swiftcart.in with your order ID. We will resolve it within 48 business hours.",
      },
    ],
  },
};

const StaticPage = () => {
  const navigate = useNavigate();
  const { page } = useParams<{ page: string }>();
  const content = page ? pages[page] : undefined;

  if (!content) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground gap-4 px-6 text-center">
        <p className="text-lg font-semibold text-foreground">Page not found.</p>
        <p className="text-sm text-muted-foreground">This page does not exist or has been moved.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-2 text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
        >
          ← Go back
        </button>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground animate-fade-in pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-12">

      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center gap-3 bg-white dark:bg-[#0a0a0a] border-b border-[#e2e8f0] dark:border-[#1f1f1f] px-4 py-3.5">
        <button
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary active:scale-90 transition-all"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <span className="text-[17px] font-semibold text-foreground">{content.title}</span>
      </div>

      {/* Body */}
      <div className="max-w-2xl mx-auto w-full px-5 py-7 flex flex-col gap-7">

        {/* Last updated + intro */}
        <div className="flex flex-col gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Last updated: {content.lastUpdated}
          </span>
          {content.intro && (
            <p className="text-[15px] leading-relaxed text-foreground font-medium">{content.intro}</p>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Sections */}
        {content.sections.map((section, i) => (
          <div key={i} className="flex flex-col gap-2.5">
            <h2 className="text-[14.5px] font-bold text-foreground tracking-tight">{section.heading}</h2>
            {Array.isArray(section.body) ? (
              <ul className="flex flex-col gap-2">
                {section.body.map((point, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-muted-foreground/50" />
                    <span className="text-[13.5px] leading-relaxed text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{section.body}</p>
            )}
          </div>
        ))}

        {/* Contact footer card */}
        <div className="rounded-2xl border border-border bg-card px-5 py-4 mt-2">
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">
            Questions about this policy? Contact us at{" "}
            <span className="text-foreground font-semibold">support@swiftcart.in</span>{" "}
            or call{" "}
            <span className="text-foreground font-semibold">1800-123-4567</span>{" "}
            (Mon–Sat, 9 AM – 6 PM IST).
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default StaticPage;
