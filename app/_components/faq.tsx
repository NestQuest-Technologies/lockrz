const questions = [
  {
    q: "What is LOCKRZ?",
    a: "LOCKRZ is a parcel delivery service by Yellowdrop Parcel Company Limited. You drop a parcel at a LOCKRZ point near you, we move it across Lusaka, and the person receiving it collects it at a point near them using a code.",
  },
  {
    q: "Where do you deliver?",
    a: "We are starting in Lusaka only. Once Lusaka is running smoothly we will open other towns. Join the launch list and tell us your area so we know where to open first.",
  },
  {
    q: "How much does it cost?",
    a: "One flat price anywhere in Lusaka, based on the size of your parcel. You can see the prices on this page. The final price is confirmed when your parcel is weighed at drop-off.",
  },
  {
    q: "How do I pay?",
    a: "We are setting up local payment options, including mobile money. We will confirm exactly how to pay before we open.",
  },
  {
    q: "How does the person receiving the parcel collect it?",
    a: "When the parcel arrives, they get a message with a collection code. They take the code to the LOCKRZ point and collect the parcel when it suits them.",
  },
  {
    q: "What can't I send?",
    a: "Cash, weapons, drugs, anything flammable or explosive, live animals and food that can go bad. If you are not sure, ask us on WhatsApp before you drop it off.",
  },
  {
    q: "I own a shop. Can it be a LOCKRZ point?",
    a: "Yes, we are looking for trusted shops across Lusaka to receive and hand over parcels. Join the launch list and choose “My shop could be a LOCKRZ point”, and we will contact you.",
  },
];

export function Faq() {
  return (
    <section className="faq-section" id="faq">
      <div className="container faq-layout">
        <div>
          <div className="eyebrow"><span /> GOOD QUESTIONS</div>
          <h2>Everything you need to know.</h2>
        </div>
        <div className="faq-list">
          {questions.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
