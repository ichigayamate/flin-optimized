import FeatureCard from "@/lib/components/features";
import { CiCreditCard1, CiMoneyBill } from "react-icons/ci";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="my-16 mx-8 lg:m-16 flex justify-center items-center gap-8">
        <div className="w-full lg:w-7/12">
          <h1 className="text-3xl font-bold mb-2">
            First steps of life <span className="text-primary">debt free</span>
          </h1>
          <p>
            Free your future from financial stress – Personal guide to loan
            arrangement, resolution and funding with consolidation.
          </p>
          <div className="mt-4">
            <button className="btn btn-primary btn-xl">Apply Now</button>
          </div>
        </div>
        <div className="w-5/12 hidden lg:block">
        <Image
            src="https://pollinations.ai/p/Debt%20repayment?height=576&nologo=true&model=flux"
            width={576}
            height={576}
            alt="Debt repayment"
            loading="eager"
            priority
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="text-center bg-neutral-100 px-4 py-8">
        <p className="mb-4">
          <b>2 out of 10 borrowers</b> in Indonesia feel restless with high debt
          and heavy monthly installment burden. Stop adding unnecessary mental
          and financial health burden.
        </p>
        <p>Reduce your debt burden and consolidate multiple loans into one. </p>
        <p>
          FLIN provides the right products, technology, and services. Minimize
          personal debt and consolidate it into one.
        </p>
        <div className="flex mt-8 mb-6 gap-6 flex-wrap justify-center">
          <FeatureCard
            icon={<CiMoneyBill className="text-4xl" />}
            title="Personal Loan Consolidation"
            description="Pay off your unsecured credit loan safely and conveniently"
          />
          <FeatureCard
            icon={<CiCreditCard1 className="text-4xl" />}
            title="Credit Card Installment Consolidation"
            description="Simplify your credit card bill in one convenient payment."
          />
          <FeatureCard
            icon={<RiMoneyDollarCircleFill className="text-4xl" />}
            title="Paylater Loan Consolidation"
            description="Combine paylater bill payments with lower interest"
          />
          <FeatureCard
            icon={<RiMoneyDollarCircleFill className="text-4xl" />}
            title="Online Loan Consolidation"
            description="Complete online loans by consolidating monthly bills"
          />
        </div>
      </div>
      <div className="m-8 flex justify-center items-center gap-8">
        <div className="w-4/12 hidden lg:block">
        <Image
            src="https://pollinations.ai/p/Person%20paying%20debt%20with%20credit%20card?width=1024&height=576&nologo=true&model=flux"
            width={1024}
            height={576}
            alt="Person paying debt with credit card"
            loading="lazy"
            priority={false}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="lg:w-8/12">
          <h2 className="font-bold text-4xl">
            How FLIN <span className="text-primary">helps your finances</span>
          </h2>
          <ol className="list-decimal list-inside mt-4">
            <li>Financial health check with guaranteed solutions.</li>
            <li>
              As a debt negotiation service with financial institutions to get
              the best discounts for each of your loans.
            </li>
            <li>Providing a single profitable refinancing option.</li>
            <li>
              Pay off all debts with a single refinancing option with a
              financial institution.
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}
