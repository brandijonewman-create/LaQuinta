import ContextualContactForm from '@/components/contextual-contact-form';
import { partnerRecruitment } from '@/lib/exclusive-partner';

// Homepage-only partner-inquiry section. The invitation pitch above links
// to #partner-inquiry, and this section anchors two forms:
//   1. A realtor "introduce yourself" form (the slot is by invitation but
//      we accept self-introductions for consideration).
//   2. A separate "home builders / tier-one operators" form for developers,
//      private lenders, club GMs and other adjacent partners.
//
// Submissions POST to /api/contact with distinct subjects so leads are
// filed correctly in the Mongo `leads` collection and in the owner's
// welcome email.

export default function PartnerInquiryForm() {
  return (
    <>
      <div id="partner-inquiry" className="bg-sand-50/40 border-t border-border scroll-mt-24">
        <ContextualContactForm
          formId="partner-inquiry-form"
          subject={partnerRecruitment.form.subject}
          headline="Interested? Introduce yourself."
          intro={partnerRecruitment.form.intro}
          submitLabel={partnerRecruitment.form.submitLabel}
        />
      </div>

      <div id="builder-inquiry" className="bg-palm/[0.04] border-t border-border scroll-mt-24">
        <ContextualContactForm
          formId="builder-inquiry-form"
          subject={partnerRecruitment.builderCTA.subject}
          eyebrow={partnerRecruitment.builderCTA.eyebrow}
          headline={partnerRecruitment.builderCTA.headline}
          intro={partnerRecruitment.builderCTA.body}
          submitLabel={partnerRecruitment.builderCTA.submitLabel}
        />
      </div>
    </>
  );
}
