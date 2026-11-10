"use client";

import { useActionState } from "react";
import { joinWaitlist, type WaitlistState } from "../actions";
import { lusakaAreas } from "@/lib/lusaka";
import { ArrowIcon } from "./icons";

const interestOptions = [
  { value: "send", label: "I want to send parcels" },
  { value: "receive", label: "I want to receive parcels" },
  { value: "business", label: "I run a business that sends often" },
  { value: "agent", label: "My shop could be a LOCKRZ point" },
];

export function WaitlistForm() {
  const [state, action, pending] = useActionState<WaitlistState, FormData>(joinWaitlist, null);

  if (state?.ok) {
    return <p className="form-message waitlist-success" role="status">{state.message}</p>;
  }

  // Links on posters and flyers carry ?ref=..., so we can see which ones work.
  function submit(formData: FormData) {
    formData.set("source", new URLSearchParams(window.location.search).get("ref") ?? "website");
    return action(formData);
  }

  return (
    <form className="waitlist-form" action={submit}>
      <label>
        Your name
        <input name="fullName" autoComplete="name" required minLength={2} maxLength={80} />
      </label>
      <label>
        Phone number (for SMS / WhatsApp)
        <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="097 123 4567" required />
      </label>
      <label>
        Your area
        <select name="area" required defaultValue="">
          <option value="" disabled>Choose your area</option>
          {lusakaAreas.map((area) => <option key={area}>{area}</option>)}
          <option value="Other">Other part of Lusaka</option>
        </select>
      </label>
      <fieldset>
        <legend>How would you use LOCKRZ?</legend>
        {interestOptions.map((option, index) => (
          <label className="radio-option" key={option.value}>
            <input type="radio" name="interest" value={option.value} required defaultChecked={index === 0} />
            {option.label}
          </label>
        ))}
      </fieldset>
      <button className="button button-yellow" type="submit" disabled={pending}>
        {pending ? "Saving…" : <>Notify me at launch <ArrowIcon /></>}
      </button>
      {state && !state.ok && <p className="form-message form-error" role="alert">{state.message}</p>}
      <p className="waitlist-privacy">We only use your number to tell you about LOCKRZ. No spam.</p>
    </form>
  );
}
