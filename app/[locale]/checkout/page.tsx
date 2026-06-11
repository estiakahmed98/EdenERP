"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Gift,
  Trash2,
  ChevronLeft,
  CreditCard,
  Truck,
  Shield,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "@/i18n/navigation";

// Types
type BillingCycle = "yearly" | "semiannual" | "quarterly" | "monthly";

interface CheckoutContent {
  title: string;
  subtitle: string;
  billingShipping: string;
  fullName: string;
  phone: string;
  email: string;
  district: string;
  areaCity: string;
  deliveryAddress: string;
  streetAddress: string;
  createAccount: string;
  orderNotes: string;
  orderNotesPlaceholder: string;
  yourOrder: string;
  items: string;
  shipping: string;
  free: string;
  total: string;
  cashOnDelivery: string;
  cashOnDeliveryDesc: string;
  sslcommerz: string;
  sslcommerzDesc: string;
  bkash: string;
  bkashDesc: string;
  termsAndConditions: string;
  continueShopping: string;
  placeOrder: string;
  backButton: string;
  orderSummary: string;
  priceDetails: string;
  perMonth: string;
  billingCycleLabel: string;
}

// Default content (English)
const defaultContent: CheckoutContent = {
  title: "Secure Checkout",
  subtitle: "Complete your purchase with confidence",
  billingShipping: "Billing & Shipping",
  fullName: "Full Name",
  phone: "Phone",
  email: "E-mail (Optional)",
  district: "Choose District",
  areaCity: "Area/City",
  deliveryAddress: "Delivery Address",
  streetAddress: "Street Address",
  createAccount: "Create an account?",
  orderNotes: "Order Notes (optional)",
  orderNotesPlaceholder: "If you have any instruction",
  yourOrder: "Your order",
  items: "items",
  shipping: "Shipping",
  free: "Free",
  total: "Total",
  cashOnDelivery: "Cash on delivery",
  cashOnDeliveryDesc: "Pay with cash upon delivery.",
  sslcommerz: "Pay with SSLCOMMERZ",
  sslcommerzDesc: "Powered by SSLCOMMERZ",
  bkash: "Pay with bKash",
  bkashDesc: "Pay with bKash",
  termsAndConditions:
    "I have read and agree to the website terms and conditions",
  continueShopping: "CONTINUE SHOPPING",
  placeOrder: "PLACE ORDER",
  backButton: "Back to Plans",
  orderSummary: "Order Summary",
  priceDetails: "Price Details",
  perMonth: "/month",
  billingCycleLabel: "Billing Cycle",
};

// Bengali content
const bengaliContent: CheckoutContent = {
  title: "নিরাপদ চেকআউট",
  subtitle: "আত্মবিশ্বাসের সাথে আপনার কেনাকাটা সম্পূর্ণ করুন",
  billingShipping: "বিলিং ও শিপিং",
  fullName: "পুরো নাম",
  phone: "ফোন",
  email: "ই-মেইল (ঐচ্ছিক)",
  district: "জেলা নির্বাচন করুন",
  areaCity: "এলাকা/শহর",
  deliveryAddress: "ডেলিভারি ঠিকানা",
  streetAddress: "রাস্তার ঠিকানা",
  createAccount: "একাউন্ট তৈরি করবেন?",
  orderNotes: "অর্ডার নোট (ঐচ্ছিক)",
  orderNotesPlaceholder: "যদি কোনো নির্দেশনা থাকে",
  yourOrder: "আপনার অর্ডার",
  items: "আইটেম",
  shipping: "ডেলিভারি চার্জ",
  free: "বিনামূল্যে",
  total: "মোট",
  cashOnDelivery: "ডেলিভারির সময় নগদে পেমেন্ট",
  cashOnDeliveryDesc: "ডেলিভারির সময় নগদে পেমেন্ট করুন।",
  sslcommerz: "SSLCOMMERZ এ পেমেন্ট করুন",
  sslcommerzDesc: "পাওয়ার্ড বাই SSLCOMMERZ",
  bkash: "বিক্যাশ এ পেমেন্ট করুন",
  bkashDesc: "বিক্যাশ এ পেমেন্ট করুন",
  termsAndConditions: "আমি ওয়েবসাইটের শর্তাবলী পড়েছি এবং সম্মতি জানাচ্ছি",
  continueShopping: "শপিং চালিয়ে যান",
  placeOrder: "অর্ডার করুন",
  backButton: "প্ল্যানে ফিরুন",
  orderSummary: "অর্ডার সামারি",
  priceDetails: "মূল্যের বিবরণ",
  perMonth: "/মাস",
  billingCycleLabel: "বিলিং সাইকেল",
};

interface PlanData {
  id: string;
  name: string;
  monthlyPrice: number;
  currency: string;
  userCount: number;
  billingCycle: BillingCycle;
  originalPrice: number;
  savings: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState<"en" | "bn">("en");
  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const content = language === "en" ? defaultContent : bengaliContent;

  // Load plan data from URL params or localStorage
  useEffect(() => {
    const planParam = searchParams.get("plan");
    if (planParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(planParam));
        setPlanData(parsed);
      } catch (e) {
        // Fallback to localStorage
        const saved = localStorage.getItem("checkoutPlanData");
        if (saved) {
          setPlanData(JSON.parse(saved));
        }
      }
    } else {
      const saved = localStorage.getItem("checkoutPlanData");
      if (saved) {
        setPlanData(JSON.parse(saved));
      }
    }
  }, [searchParams]);

  const totalPrice = planData
    ? planData.monthlyPrice + (giftWrapping ? 100 : 0)
    : 0;
  const displayCurrency = planData?.currency || "BDT";

  const handlePlaceOrder = () => {
    if (!acceptTerms) {
      alert(
        language === "en"
          ? "Please accept the terms and conditions"
          : "দয়া করে শর্তাবলী গ্রহণ করুন",
      );
      return;
    }
    // Handle order placement
    console.log("Order placed:", { planData, giftWrapping, paymentMethod });
    router.push("/order-confirmation");
  };

  if (!planData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400">
            Loading order details...
          </p>
          <button
            onClick={() => router.push("/pricing")}
            className="mt-4 text-emerald-600 hover:text-emerald-700"
          >
            ← Back to plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900">
      {/* Language Toggle */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
            language === "en"
              ? "bg-emerald-600 text-white"
              : "bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-700"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage("bn")}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
            language === "bn"
              ? "bg-emerald-600 text-white"
              : "bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-700"
          }`}
        >
          বাংলা
        </button>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm text-slate-500 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <ChevronLeft className="h-4 w-4" />
          {content.backButton}
        </button>

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-4xl">
            {content.title}
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">
          {/* Left Form */}
          <div>
            <div className="rounded-2xl border border-white/80 bg-white/90 p-6 shadow-xl shadow-slate-900/10 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
              <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
                {content.billingShipping}
              </h2>

              <div className="space-y-4">
                <input
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500"
                  placeholder={content.fullName}
                />
                <input
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500"
                  placeholder={`${content.phone} *`}
                />
                <input
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500"
                  placeholder={content.email}
                />
                <input
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500"
                  placeholder={content.district}
                />
                <input
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500"
                  placeholder={content.areaCity}
                />

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {content.deliveryAddress}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="min-h-[90px] w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500"
                    placeholder={`${content.streetAddress} *`}
                  />
                </div>

                <label className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={createAccount}
                    onChange={(e) => setCreateAccount(e.target.checked)}
                    className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  {content.createAccount}
                </label>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {content.orderNotes}
                  </label>
                  <textarea
                    className="min-h-[100px] w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500"
                    placeholder={content.orderNotesPlaceholder}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Order Summary */}
          <div className="sticky top-6 h-fit rounded-2xl border border-white/80 bg-white/95 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
            <h2 className="mb-5 text-xl font-semibold text-slate-900 dark:text-white">
              {content.yourOrder} (1 {content.items})
            </h2>

            {/* Plan Item */}
            <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-4 dark:from-emerald-950/30 dark:to-teal-950/30">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                  <CreditCard className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {planData.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {planData.userCount} users • {planData.billingCycle}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900 dark:text-white">
                  {displayCurrency === "BDT" ? "৳" : "$"}
                  {planData.monthlyPrice}
                </p>
                <p className="text-xs text-slate-400">{content.perMonth}</p>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="mt-6 space-y-3 border-b border-slate-200 pb-4 dark:border-slate-700">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  {content.priceDetails}
                </span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {displayCurrency === "BDT" ? "৳" : "$"}
                  {planData.monthlyPrice}
                </span>
              </div>
              {planData.savings > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    {content.billingCycleLabel} savings
                  </span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    -{displayCurrency === "BDT" ? "৳" : "$"}
                    {planData.savings}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  {content.shipping}
                </span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  {content.free}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="my-5 flex justify-between text-lg font-bold">
              <span className="text-slate-900 dark:text-white">
                {content.total}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400">
                {displayCurrency === "BDT" ? "৳" : "$"}
                {totalPrice}
                <span className="text-sm font-normal text-slate-400">
                  {" "}
                  /month
                </span>
              </span>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3">
              <label
                className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                  paymentMethod === "cod"
                    ? "border-emerald-500 bg-emerald-50/50 dark:border-emerald-500 dark:bg-emerald-950/30"
                    : "border-slate-200 hover:border-emerald-200 dark:border-slate-700 dark:hover:border-slate-600"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                />
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {content.cashOnDelivery}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {content.cashOnDeliveryDesc}
                  </p>
                </div>
                <Truck className="h-5 w-5 text-slate-400" />
              </label>

              <label
                className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                  paymentMethod === "ssl"
                    ? "border-emerald-500 bg-emerald-50/50 dark:border-emerald-500 dark:bg-emerald-950/30"
                    : "border-slate-200 hover:border-emerald-200 dark:border-slate-700 dark:hover:border-slate-600"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="ssl"
                  checked={paymentMethod === "ssl"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                />
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {content.sslcommerz}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {content.sslcommerzDesc}
                  </p>
                </div>
                <span className="rounded bg-blue-600 px-2 py-1 text-xs font-bold text-white">
                  SSL
                </span>
              </label>

              <label
                className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                  paymentMethod === "bkash"
                    ? "border-emerald-500 bg-emerald-50/50 dark:border-emerald-500 dark:bg-emerald-950/30"
                    : "border-slate-200 hover:border-emerald-200 dark:border-slate-700 dark:hover:border-slate-600"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="bkash"
                  checked={paymentMethod === "bkash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                />
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {content.bkash}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {content.bkashDesc}
                  </p>
                </div>
                <span className="text-lg">bKash</span>
              </label>
            </div>

            {/* Terms */}
            <label className="mt-6 flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="italic text-slate-600 dark:text-slate-400">
                {content.termsAndConditions}{" "}
                <span className="text-red-500">*</span>
              </span>
            </label>

            {/* Buttons */}
            <button
              onClick={() => router.push("/pricing")}
              className="mt-5 w-full rounded-lg border border-slate-300 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {content.continueShopping}
            </button>

            <button
              onClick={handlePlaceOrder}
              className="mt-3 w-full rounded-lg bg-gradient-to-r from-slate-800 to-slate-900 py-3 font-semibold text-white transition hover:from-slate-700 hover:to-slate-800 dark:from-emerald-700 dark:to-emerald-800 dark:hover:from-emerald-600 dark:hover:to-emerald-700"
            >
              <Shield className="mr-2 inline h-4 w-4" />
              {content.placeOrder}
            </button>

            <p className="mt-4 text-center text-xs text-slate-400">
              🔒 Secure payment powered by SSLCOMMERZ
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
