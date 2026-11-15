/** Public endorsements and measured outcomes require BOTH documented evidence
 * and permission to publish. No existing source-code quote is proof of consent.
 * Business approval must supply these references before a record is added.
 */
type MarketingEvidence = {
  evidenceReference: string;
  publicationConsentReference: string;
  approvedBy: string;
  approvedAt: string;
};

const approvedClaims: Readonly<Record<string, MarketingEvidence>> = {};

export function hasMarketingEvidence(claimId: string): boolean {
  const evidence = approvedClaims[claimId];
  return Boolean(
    evidence?.evidenceReference &&
    evidence.publicationConsentReference &&
    evidence.approvedBy &&
    evidence.approvedAt,
  );
}
