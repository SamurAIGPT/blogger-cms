"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { FaCoins, FaCheck, FaSpinner, FaTimesCircle, FaCheckCircle } from "react-icons/fa";

const plans = [
  {
    id: "starter",
    name: "Starter Pack",
    credits: 100,
    price: "$10",
    description: "Ideal for beginners or small personal blogs.",
    features: [
      "100 AI Generation Credits",
      "Access to gpt-5-chat AI Writer",
      "Full SEO Panel Settings",
      "HTML Export Support",
      "Basic Support",
    ],
  },
  {
    id: "pro",
    name: "Professional Pack",
    credits: 300,
    price: "$25",
    description: "Perfect for active bloggers and creators.",
    features: [
      "300 AI Generation Credits",
      "Access to gpt-5-chat AI Writer",
      "Full SEO Panel Settings",
      "HTML Export Support",
      "Premium Priority Support",
      "Saves up to 15% on credits",
    ],
    recommended: true,
  },
  {
    id: "business",
    name: "Business Pack",
    credits: 750,
    price: "$50",
    description: "For agencies and high-volume publishers.",
    features: [
      "750 AI Generation Credits",
      "Access to gpt-5-chat AI Writer",
      "Full SEO Panel Settings",
      "HTML Export Support",
      "Dedicated 24/7 Support",
      "Saves up to 33% on credits",
    ],
  },
];

function PricingContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  const [loadingPlan, setLoadingPlan] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleCheckout = async (planId) => {
    if (!session) {
      signIn("google");
      return;
    }

    setLoadingPlan(planId);
    setErrorMsg("");

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      if (!res.ok) {
        throw new Error("Failed to initialize checkout session");
      }

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (e) {
      setErrorMsg(e.message || "An error occurred during checkout initialization.");
      setLoadingPlan("");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        
        {/* Header Title */}
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Flexible Credit Plans
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Purchase credits to generate high-quality, SEO-optimized blog posts powered by OpenAI's advanced gpt-5-chat model.
          </p>
        </div>

        {/* Alerts for Stripe Redirect callback */}
        {success && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 flex items-center gap-3 shadow-sm max-w-xl mx-auto">
            <FaCheckCircle className="text-emerald-500 text-lg flex-shrink-0" />
            <div>
              <span className="font-bold text-sm">Purchase Complete!</span>
              <p className="text-xs text-emerald-700 mt-0.5">Your credits have been added successfully. You can now use them to write articles.</p>
            </div>
          </div>
        )}

        {canceled && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 flex items-center gap-3 shadow-sm max-w-xl mx-auto">
            <FaTimesCircle className="text-amber-500 text-lg flex-shrink-0" />
            <div>
              <span className="font-bold text-sm">Purchase Canceled</span>
              <p className="text-xs text-amber-700 mt-0.5">The checkout session was canceled. No charges were made.</p>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 flex items-center gap-3 shadow-sm max-w-xl mx-auto">
            <FaTimesCircle className="text-red-500 text-lg flex-shrink-0" />
            <span className="text-xs">{errorMsg}</span>
          </div>
        )}

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`bg-white dark:bg-slate-900 border rounded-3xl p-8 flex flex-col relative transition-all duration-300 hover:shadow-xl ${
                plan.recommended 
                  ? "border-indigo-600 dark:border-indigo-500 shadow-md ring-2 ring-indigo-600/10 scale-102" 
                  : "border-slate-200 dark:border-slate-800"
              }`}
            >
              {plan.recommended && (
                <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                  Most Popular
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{plan.description}</p>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-3xl font-black text-slate-950 dark:text-white">{plan.price}</span>
                  <span className="text-xs text-slate-400 font-medium">one-time</span>
                </div>
              </div>

              {/* Credit Badge */}
              <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-slate-950/40 rounded-2xl border border-amber-200/50 mb-6 shadow-inner">
                <FaCoins className="text-amber-500 text-sm animate-bounce" />
                <div>
                  <span className="text-xs font-black text-amber-900 dark:text-amber-400">{plan.credits} AI Credits</span>
                  <p className="text-[10px] text-amber-700 leading-tight">Write up to {Math.floor(plan.credits / 5)} full length articles.</p>
                </div>
              </div>

              {/* Features List */}
              <ul className="flex-1 flex flex-col gap-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                    <FaCheck className="text-indigo-600 dark:text-indigo-400 text-[10px] mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => handleCheckout(plan.id)}
                disabled={loadingPlan !== ""}
                className={`w-full py-3.5 text-xs font-bold rounded-xl active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm ${
                  plan.recommended 
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-500/10" 
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white"
                }`}
              >
                {loadingPlan === plan.id ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <span>Buy Credits</span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <FaSpinner className="text-4xl text-indigo-600 animate-spin" />
      </div>
    }>
      <PricingContent />
    </Suspense>
  );
}
