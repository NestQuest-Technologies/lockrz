import { formatKwacha, getTariffs } from "@/lib/data";

export async function LowestPrice() {
  const tariffs = await getTariffs();
  return <>{formatKwacha(Math.min(...tariffs.map((tariff) => tariff.price_ngwee)))}</>;
}

export async function Pricing() {
  const tariffs = await getTariffs();

  return (
    <>
      <ul className="price-list">
        {tariffs.map((tariff) => (
          <li key={tariff.size}>
            <div>
              <strong>{tariff.label}</strong>
              <span>{tariff.description} Up to {tariff.max_weight_kg} kg.</span>
            </div>
            <b>{formatKwacha(tariff.price_ngwee)}</b>
          </li>
        ))}
      </ul>
      <div className="estimate-footnote">One flat price anywhere in Lusaka. Final price confirmed when your parcel is weighed at drop-off.</div>
    </>
  );
}
