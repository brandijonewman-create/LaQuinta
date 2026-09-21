import ContextualContactForm from '@/components/contextual-contact-form';
import { partnerRecruitment } from '@/lib/exclusive-partner';

// Homepage-only partner-inquiry section. The invitation pitch above links
// to #partner-inquiry, and this section anchors a SINGLE realtor
// "introduce yourself" form (the slot is by invitation but we accept
// self-introductions for consideration).
//
// Submissions POST to /api/contact with the partner subject so leads are
// filed correctly in the Mongo `leads` collection and in the owner's
// welcome email.

export default function PartnerInquiryForm() {
  return (
    <div id="partner-inquiry" className="bg-sand-50/40 border-t border-border scroll-mt-24">
      <ContextualContactForm
        formId="partner-inquiry-form"
        subject={partnerRecruitment.form.subject}
        eyebrow={partnerRecruitment.eyebrow}
        headline="Interested? Introduce yourself."
        intro={partnerRecruitment.form.intro}
        submitLabel={partnerRecruitment.form.submitLabel}
        questionLabel="Tell us about your practice"
        questionPlaceholder="California DRE license, brokerage, La Quinta production, and the IDX feed you'd bring. Where builder or tier-one introductions are possible, mention those too."
      />
    </div>
  );
}
