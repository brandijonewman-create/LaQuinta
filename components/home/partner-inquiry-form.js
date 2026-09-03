import ContextualContactForm from '@/components/contextual-contact-form';
import { partnerRecruitment } from '@/lib/exclusive-partner';

// Homepage-only partner-inquiry section. The recruitment pitch above links
// to #partner-inquiry, and this section anchors the form. Submissions POST
// to /api/contact with a distinct subject so leads are visibly filed as
// partner inquiries in the Mongo `leads` collection and in the owner's
// welcome email.

export default function PartnerInquiryForm() {
  return (
    <div id="partner-inquiry" className="bg-sand-50/40 border-t border-border scroll-mt-24">
      <ContextualContactForm
        formId="partner-inquiry-form"
        subject={partnerRecruitment.form.subject}
        headline="Request the partnership brief."
        intro={partnerRecruitment.form.intro}
        submitLabel={partnerRecruitment.form.submitLabel}
      />
    </div>
  );
}
