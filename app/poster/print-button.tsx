"use client";

export function PrintButton() {
  return (
    <button className="button button-dark poster-print" type="button" onClick={() => window.print()}>
      Print poster (A4)
    </button>
  );
}
