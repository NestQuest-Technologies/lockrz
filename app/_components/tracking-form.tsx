"use client";

import { useActionState } from "react";
import { trackParcel, type TrackState } from "../actions";
import { ArrowIcon } from "./icons";

const statusLabels: Record<string, string> = {
  booked: "Booked",
  dropped_off: "Dropped off",
  in_transit: "On its way",
  ready_for_collection: "Ready for collection",
  collected: "Collected",
  returned: "Returned to sender",
  cancelled: "Cancelled",
};

const timeFormat = new Intl.DateTimeFormat("en-ZM", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Lusaka",
});

export function TrackingForm() {
  const [state, action, pending] = useActionState<TrackState, FormData>(trackParcel, { kind: "idle" });

  return (
    <>
      <form className="tracking-form" action={action}>
        <label className="visually-hidden" htmlFor="tracking-number">Tracking number</label>
        <input
          id="tracking-number"
          name="trackingNumber"
          placeholder="e.g. LZ-12345678"
          autoComplete="off"
          autoCapitalize="characters"
          required
        />
        <button className="button button-dark" type="submit" disabled={pending}>
          {pending ? "Checking…" : <>Track parcel <ArrowIcon /></>}
        </button>
      </form>

      {state.kind === "message" && <p className="form-message" role="status">{state.message}</p>}

      {state.kind === "found" && (
        <div className="tracking-result" role="status">
          <div className="tracking-result-head">
            <span>{state.trackingNumber}</span>
            <strong>{statusLabels[state.status] ?? state.status}</strong>
          </div>
          <ol className="tracking-timeline">
            {state.events.map((event) => (
              <li key={`${event.status}-${event.at}`}>
                <strong>{statusLabels[event.status] ?? event.status}</strong>
                <span>
                  {event.location ? `${event.location} · ` : ""}
                  {timeFormat.format(new Date(event.at))}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}
