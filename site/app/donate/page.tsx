import { SITE_NAME } from "@/lib/data";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: `Donate | ${SITE_NAME}`,
  description: "Support The Ethics Reporter with a donation.",
};

export default function DonatePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4 font-sans text-center">Support The Ethics Reporter</h1>
      <p className="text-gray-600 font-serif text-center mb-10 max-w-xl mx-auto leading-relaxed">
        Do you enjoy the Ethics Reporter deep investigations and aggressive daily reporting? Consider supporting our work today with a donation of any amount! Your contribution will go directly toward expanding our team and enhancing our capabilities.
      </p>
      <div className="flex justify-center">
        <Script async src="https://js.stripe.com/v3/buy-button.js" strategy="afterInteractive" />
        {/* @ts-expect-error - Stripe custom element */}
        <stripe-buy-button
          buy-button-id="buy_btn_1SuyjP7A7WUX3WHdHsrH7h1L"
          publishable-key="pk_live_51SuxpL7A7WUX3WHdU0ClGqAn77BEmAlokumj9473nYD8ik2zSnjKwMKO4IpXX0TyHyASbPpbey8wLpVbcLv3nnBX00oJUnQ7cu"
        />
      </div>
    </div>
  );
}
