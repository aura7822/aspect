export default function Legal({ page }) {
  const title = page === '⚚ privacy' ? '⚚ Privacy Policy' : '⚚ Terms of Service'
  return (
    <div className="container-page py-16 max-w-2xl">
      <h1 className="font-display text-3xl mb-6">{title}</h1>
      <div className="prose prose-invert text-fg-secondary text-sm leading-relaxed space-y-4">
        <p>
             <strong>1. Services & Project Scope</strong> <br></br>
              Defines the specific work to be delivered, as detailed in a separate Statement of Work (SOW).<br></br> Performance is contingent on the client providing timely feedback, access, and materials.<br></br> Delays caused by the client do not hold the startup responsible.<br></br><br></br>
              2. Client Responsibilities & Cooperation<br></br>
              Clients must designate a point of contact, provide timely decisions, and supply all necessary materials and access.<br></br> Failure to do so may delay the project timeline.<br></br> The startup is not liable for issues caused by client inaction.<br></br><br></br>
              3. Change Orders<br></br>

              Any changes to scope, schedule, or budget require a formal written Change Order agreed upon by both parties.<br></br> The Change Order documents the impact on timeline and cost.<br></br> Work begins on changes only after the Change Order is signed.<br></br><br></br>
              4. Intellectual Property Ownership<br></br>

              Each party retains ownership of their pre-existing materials and tools.<br></br> The custom deliverables (e.g., code) created specifically for the client become the client's property upon full payment.<br></br> This provides a clear incentive for timely payment.<br></br><br></br>
              5. Non-Solicitation of Staff<br></br>

              Clients may not hire or solicit the startup's developers or staff for a specified period (e.g., 1 year) after project completion.<br></br> Violation triggers a significant fee, often equal to the employee's annual salary.<br></br> This protects the startup's most valuable asset: its team.<br></br><br></br>
              6. Disclaimer of Warranties<br></br>

              Services and deliverables are provided "as is" and "as available."<br></br> The startup disclaims all implied warranties, including merchantability and fitness for a particular purpose.<br></br> This limits the startup's promises and legal exposure.<br></br><br></br>
              7. Limitation of Liability<br></br>

              The startup is not liable for indirect or consequential damages (e.g., lost profits).<br></br> Total liability is capped at the total amount the client has paid for the services.<br></br> This ensures predictable and limited financial risk for the startup.<br></br><br></br>
              8. Payments & Auto-Renewal<br></br>

              Clearly defines pricing, billing cycles, and renewal terms.<br></br> For subscriptions or maintenance, auto-renewal terms must be clearly disclosed with simple online cancellation as required by law.<br></br> Clients give affirmative consent before being charged for renewals.<br></br><br></br>
              9. Termination<br></br>

              Defines conditions for ending the agreement by either party (e.g., non-payment, material breach).<br></br> Includes notice periods and consequences, such as payment for work completed and outstanding fees.<br></br> Provides a clear exit path for both parties.<br></br><br></br>
              10. Dispute Resolution & Governing Law<br></br>

              Establishes which state's law governs the agreement and where legal proceedings will occur.<br></br> Disputes are first addressed through good-faith negotiation, then binding arbitration or court.<br></br> This provides predictability in resolving disagreements.<br></br>



        </p>
        <p>🖎 Cookie consent, data retention periods, and compliance disclosures would be finalized with legal counsel before launch.</p>
      </div>
    </div>
  )
}
