import { getPickupPoints } from "@/lib/data";
import { lusakaAreas } from "@/lib/lusaka";
import { PinIcon } from "./icons";

const kindLabels = { hub: "HUB", locker: "SMART LOCKER", agent_point: "LOCKRZ POINT" };

export async function PickupPoints() {
  const points = await getPickupPoints();

  return (
    <div className="location-board">
      <div className="location-board-header">
        <span>LUSAKA PICKUP POINTS</span>
        <span className="network-live"><i /> {points.length ? `${points.length} OPEN` : "OPENING SOON"}</span>
      </div>
      {points.length ? (
        <div className="location-list">
          {points.map((point) => (
            <div className="location-row" key={point.code}>
              <span className="location-marker"><PinIcon /></span>
              <div className="location-text">
                <strong>{point.name}</strong>
                <span>{[point.area, point.address, point.opening_hours].filter(Boolean).join(" · ")}</span>
              </div>
              <span className="location-type">{kindLabels[point.kind]}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="location-empty">
          <p>We&apos;re choosing our first pickup points now. Sign-ups from your area help us decide where to open first.</p>
          <div className="area-chips">
            {lusakaAreas.slice(0, 10).map((area) => <span key={area}>{area}</span>)}
            <span>+ more</span>
          </div>
        </div>
      )}
      <div className="location-board-footer">
        <span>LUSAKA FIRST. MORE TOWNS NEXT.</span>
        <a href="#join">Vote for your area ↗</a>
      </div>
    </div>
  );
}
