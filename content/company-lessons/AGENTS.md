# Company review agents

Each JSON file is one independently maintained company lesson. Assign different company files to parallel agents; one agent owns a company's file during a review. The parent reviewer integrates and publishes the batch.

Preserve the learning sequence: recognisable products or services, basic operating mechanics, distinctive company questions and risks, then financial interpretation. Explain unfamiliar terms before using them. Do not add a generic share-ownership tutorial or repeat the overview in the deeper explanation.

Follow the repository-root plain-language standard for every review and future company addition. Refex is the concrete style example: explain the actual work, the customer, the payment and the costs. An industry label is not an explanation. Describe unfamiliar objects and tasks before using their technical names; define essential terms locally. Review all existing pre-financial fields for assumed knowledge, including research prompts, rather than simplifying only the opening paragraph.

Use primary company or exchange disclosures. Keep scope and dates clear. A prospectus does not establish exchange admission. Use `listingLabel` when current listing status is unverified. Distinguish historical or discontinued businesses from current offerings. Do not claim a clinical or nutritional benefit from brand positioning.

Actual financial amounts belong only in `financialNotes` or a verified `financial` record. Preserve existing snapshots unless a separately authorised financial review establishes a correction. Never allocate company profit to a brand from its sales share. Keep period, units, standalone/consolidated scope and the profit definition together. Pending verification is different from non-disclosure.

Maintain the existing JSON schema: summary, description, money, customers, drivers, groups, basics, steps, specifics, five watch entries (question, reason, investigation guidance), risks, context, quiz, primary sources, final financialNotes and checked date. Optional catalogue or listing corrections must be supported by the cited source. Checking lesson sources does not re-date every legacy catalogue entry.

After editing, run `node scripts/build-company-lessons.cjs` from the repository root. The generated `dist/profile-lessons.js` is not the authoring source. Run `node --test tests/*.test.cjs` and `node scripts/build-company-lessons.cjs --check`; the parent reviewer handles combined browser checks and publishing. Avoid changing other company files or shared rendering code during parallel research.
