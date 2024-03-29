import Link from 'next/link'
import { Metadata } from 'next'

// Static metadata
export const metadata: Metadata = {
  title: 'Stepping Stones - Privacy Policy',
}
 

export default function PrivacyPolicy(){
  return (
    <section className="relative mt-24 bg-slate-50 py-4 md:py-8">
      <section className="mx-4 space-y-4 py-4 text-justify text-sm font-thin md:container md:mx-auto md:max-w-screen-md md:py-8">
        <h1 className="text-sm font-bold md:text-lg">
          STEPPING STONES, SOLUTIONS FOR BUSINESS APP PRIVACY POLICY
        </h1>
        <h2 className="font-semibold">Last updated July 12, 2022</h2>
        <p>
          Thank you for choosing to be part of our community at Stepping Stones
          App, a Equilibrium Startup Lab LLC Service and will be known as
          (“Stepping Stones“, “we“, “us“, “our“). We are committed to protecting
          your personal information and your right to privacy. If you have any
          questions or concerns about this privacy notice, or our practices with
          regards to your personal information, please contact us at{' '}
          <a href="mailto:support@steppingatonesapp.com" className="underline">
            support@steppingatonesapp.com
          </a>
        </p>
        <p>
          When you visit our website {''}
          <a href="https://steppingstonesapp.com" className="underline">
            https://steppingstonesapp.com
          </a>
          {''}
          (the “Website“), and more generally, use any of our services (the
          “Services“, which include the Website), we appreciate that you are
          trusting us with your personal information. We take your privacy very
          seriously. In this privacy notice, we seek to explain to you in the
          clearest way possible what information we collect, how we use it and
          what rights you have in relation to it. We hope you take some time to
          read through it carefully, as it is important. If there are any terms
          in this privacy notice that you do not agree with, please discontinue
          use of our Services immediately.
        </p>
        <p>
          This privacy notice applies to all information collected through our
          Services (which, as described above, includes our Website), as well
          as, any related services, sales, marketing or events.
        </p>
        <p>
          Please read this privacy notice carefully as it will help you
          understand what we do with the information that we collect.
        </p>
        <h2 className="font-semibold">1. WHAT INFORMATION DO WE COLLECT?</h2>
        <p>
          We collect personal information that you voluntarily provide to us
          when you register on the Website, express an interest in obtaining
          information about us or our products and Services, when you
          participate in activities on the Website or otherwise when you contact
          us.
        </p>
        <p>
          The personal information that we collect depends on the context of
          your interactions with us and the Website, the choices you make and
          the products and features you use. The personal information we collect
          may include the following:
        </p>
        <ul className="ml-4 list-disc space-y-2 text-justify">
          <li>
            Personal Information Provided by You. We may collect names; phone
            numbers; email addresses; mailing addresses; job titles; postal or
            zip codes; contact preferences; data collected from surveys;
            usernames; passwords; contact or authentication data; information
            you provide when using our products (e.g., business name, business
            email, business address, business fax, company website, etc.);
            number of unique views and total number of visitors when you deploy
            your cookie banner using our consent management solution;
            information in blog comments; profile photo; and other similar
            information.
          </li>
          <li>
            Social Media Login Data. We may provide you with the option to
            register with us using your existing social media account details,
            like your Facebook, Twitter or other social media account. If you
            choose to register in this way, we will collect the information
            described in the section called “
            <span className="underline">
              HOW DO WE HANDLE YOUR SOCIAL LOGINS?
            </span>
            ” below.
          </li>
        </ul>
        <p>
          All personal information that you provide to us must be true,
          complete, and accurate, and you must notify us of any changes to such
          personal information.
        </p>
        <h2 className="font-semibold">Information automatically collected</h2>
        <p>
          Some information — such as your Internet Protocol (IP) address and/or
          browser and device characteristics — is collected automatically when
          you visit our Website.
        </p>
        <p>
          We automatically collect certain information when you visit, use or
          navigate the Website. This information does not reveal your specific
          identity (like your name or contact information) but may include
          device and usage information, such as your IP address, browser and
          device characteristics, operating system, language preferences,
          referring URLs, device name, country, location, information about how
          and when you use our Website and other technical information. This
          information is primarily needed to maintain the security and operation
          of our Website, and for our internal analytics and reporting purposes.
          Like many businesses, we also collect information through cookies and
          similar technologies. You can find out more about this in our{' '}
          <Link href={'/cookie-policy'} className="text-gray-900 underline">
            Cookie Notice
          </Link>
          .
        </p>
        <p>The information we collect automatically includes:</p>
        <ul className="ml-4 list-disc space-y-2 text-justify">
          <li>
            Log and Usage Data. Log and usage data is service-related,
            diagnostic, usage and performance information our servers
            automatically collect when you access or use our Website and which
            we record in log files. Depending on how you interact with us, this
            log data may include your IP address, device information, browser
            type and settings and information about your activity in the Website
            (such as the date/time stamps associated with your usage, pages and
            files viewed, searches and other actions you take such as which
            features you use), device event information (such as system
            activity, error reports (sometimes called 'crash dumps') and
            hardware settings).
          </li>
          <li>
            Device Data. We collect device data such as information about your
            computer, phone, tablet or other device you use to access the
            Website. Depending on the device used, this device data may include
            information such as your IP address (or proxy server), device and
            application identification numbers, location, browser type, hardware
            model, Internet service provider and/or mobile carrier, operating
            system and system configuration information.
          </li>
          <li>
            Location Data. We collect location data such as information about
            your device's location, which can be either precise or imprecise.
            How much information we collect depends on the type and settings of
            the device you use to access the Website. For example, we may use
            GPS and other technologies to collect geolocation data that tells us
            your current location (based on your IP address). You can opt out of
            allowing us to collect this information either by refusing access to
            the information or by disabling your Location setting on your
            device. Note however, if you choose to opt out, you may not be able
            to use certain aspects of the Services.
          </li>
        </ul>
        <h2 className="font-semibold">
          Information collected from other sources
        </h2>
        <p>
          We may collect limited data from public databases, marketing partners,
          social media platforms, and other outside sources.
        </p>
        <p>
          In order to enhance our ability to provide relevant marketing, offers
          and services to you and update our records, we may obtain information
          about you from other sources, such as public databases, joint
          marketing partners, affiliate programs, data providers, social media
          platforms, as well as from other third parties. This information
          includes mailing addresses, job titles, email addresses, phone
          numbers, intent data (or user behavior data), Internet Protocol (IP)
          addresses, social media profiles, social media URLs and custom
          profiles, for purposes of targeted advertising and event promotion. If
          you interact with us on a social media platform using your social
          media account (e.g. Facebook or Twitter), we receive personal
          information about you such as your name, email address, and gender.
          Any personal information that we collect from your social media
          account depends on your social media account's privacy settings.
        </p>
        <h2 className="font-semibold">2. HOW DO WE USE YOUR INFORMATION?</h2>
        <p>
          We process your information for purposes based on legitimate business
          interests, the fulfillment of our contract with you, compliance with
          our legal obligations, and/or your consent.
        </p>
        <p>
          We use personal information collected via our Website for a variety of
          business purposes described below. We process your personal
          information for these purposes in reliance on our legitimate business
          interests, in order to enter into or perform a contract with you, with
          your consent, and/or for compliance with our legal obligations. We
          indicate the specific processing grounds we rely on next to each
          purpose listed below.
        </p>
        <p>We use the information we collect or receive:</p>
        <ul className="ml-4 list-disc space-y-2 text-justify">
          <li>
            <span className="font-semibold">
              To facilitate account creation and logon process
            </span>
            . If you choose to link your account with us to a third-party
            account (such as your Google or Facebook account), we use the
            information you allowed us to collect from those third parties to
            facilitate account creation and logon process for the performance of
            the contract.
          </li>
          <li>
            <span className="font-semibold">To manage user accounts</span>. We
            may use your information for the purposes of managing our account
            and keeping it in working order.
          </li>
          <li>
            <span className="font-semibold">To request feedback</span>. We may
            use your information to request feedback and to contact you about
            your use of our Services.
          </li>
          <li>
            <span className="font-semibold">To post testimonials.</span> We post
            testimonials on our Website that may contain personal information.
            Prior to posting a testimonial, we will obtain your consent to use
            your name and the content of the testimonial. If you wish to update,
            or delete your testimonial, please contact us at support@termly.io
            and be sure to include your name, testimonial location, and contact
            information.
          </li>
          <li>
            <span className="font-semibold">To protect our Services.</span> We
            may use your information as part of our efforts to keep our Services
            safe and secure (for example, for fraud monitoring and prevention).
          </li>
          <li>
            <span className="font-semibold">
              To enforce our terms, conditions and policies for business
              purposes
            </span>
            , to comply with legal and regulatory requirements or in connection
            with our contract.
          </li>
          <li>
            <span className="font-semibold">
              To respond to legal requests and prevent harm.
            </span>
            If we receive a subpoena or other legal request, we may need to
            inspect the data we hold to determine how to respond.
          </li>
          <li>
            <span className="font-semibold">
              To deliver and facilitate delivery of services to the user.
            </span>
            We may use your information to provide you with the requested
            service.
          </li>
          <li>
            <span className="font-semibold">
              To respond to user inquiries/offer support to users.
            </span>
            We may use your information to respond to your inquiries and solve
            any potential issues you might have with the use of our Services.
          </li>
          <li>
            <span className="font-semibold">
              To administer prize draws and competitions.
            </span>
            We may use your information to administer prize draws and
            competitions when you elect to participate in our competitions.
          </li>
          <li>
            <span className="font-semibold">
              To send you marketing and promotional communications.
            </span>
            We and/or our third-party marketing partners may use the personal
            information you send to us for our marketing purposes, if this is in
            accordance with your marketing preferences. For example, when
            expressing an interest in obtaining information about us or our
            Services, subscribing to marketing or otherwise contacting us, we
            will collect personal information from you. You can opt-out of our
            marketing emails at any time (see the “
            <a href="#" className="underline">
              WHAT ARE YOUR PRIVACY RIGHTS?
            </a>
            ” below).
          </li>
          <li>
            <span className="font-semibold">
              To send administrative information to you.
            </span>{' '}
            We may use your personal information to send you product, service
            and new feature information and/or information about changes to our
            terms, conditions, and policies.
          </li>
          <li>
            <span className="font-semibold">
              To deliver targeted advertising to you.
            </span>{' '}
            We may use your information to develop and display personalized
            content and advertising (and work with third parties who do so)
            tailored to your interests and/or location and to measure its
            effectiveness. For more information see our{' '}
            <Link href={'/cookie-policy'} className="text-gray-900 underline">
              Cookie Notice
            </Link>
          </li>
          <li>
            <span className="font-semibold">For other business purposes.</span>{' '}
            We may use your information for other business purposes, such as
            data analysis, identifying usage trends, determining the
            effectiveness of our promotional campaigns and to evaluate and
            improve our Website, Services, products, marketing and your
            experience. We may use and store this information in aggregated and
            anonymized form so that it is not associated with individual end
            users and does not include personal information. We will not use
            identifiable personal information without your consent.
          </li>
        </ul>
        <h2 className="font-semibold">
          3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?
        </h2>
        <p>
          We only share information with your consent, to comply with laws, to
          provide you with services, to protect your rights, or to fulfill
          business obligations.
        </p>
        <p>
          We may process or share your data that we hold based on the following
          legal basis:
        </p>
        <ul className="ml-4 list-disc space-y-2 text-justify">
          <li>
            <span className="font-semibold">Consent:</span> We may process your
            data if you have given us specific consent to use your personal
            information for a specific purpose.
          </li>
          <li>
            <span className="font-semibold">Legitimate Interests:</span> We may
            process your data when it is reasonably necessary to achieve our
            legitimate business interests.
          </li>
          <li>
            <span className="font-semibold">Performance of a Contract:</span>{' '}
            Where we have entered into a contract with you, we may process your
            personal information to fulfill the terms of our contract.
          </li>
          <li>
            <span className="font-semibold">Legal Obligations:</span> We may
            disclose your information where we are legally required to do so in
            order to comply with applicable law, governmental requests, a
            judicial proceeding, court order, or legal process, such as in
            response to a court order or a subpoena (including in response to
            public authorities to meet national security or law enforcement
            requirements).
          </li>
          <li>
            <span className="font-semibold">Vital Interests:</span> We may
            disclose your information where we believe it is necessary to
            investigate, prevent, or take action regarding potential violations
            of our policies, suspected fraud, situations involving potential
            threats to the safety of any person and illegal activities, or as
            evidence in litigation in which we are involved.
          </li>
        </ul>
        <p>
          More specifically, we may need to process your data or share your
          personal information in the following situations:
        </p>
        <ul className="ml-4 list-disc space-y-2 text-justify">
          <li>
            <span className="font-semibold">Business Transfers.</span> We may
            share or transfer your information in connection with, or during
            negotiations of, any merger, sale of company assets, financing, or
            acquisition of all or a portion of our business to another
          </li>
          <li>
            <span className="font-semibold">
              Vendors, Consultants and Other Third-Party Service Providers.
            </span>
            We may share your data with third-party vendors, service providers,
            contractors or agents who perform services for us or on our behalf
            and require access to such information to do that work. Examples
            include: payment processing, data analysis, email delivery, hosting
            services, customer service and marketing efforts. We may allow
            selected third parties to use tracking technology on the Website,
            which will enable them to collect data on our behalf about how you
            interact with our Website over time. This information may be used
            to, among other things, analyze and track data, determine the
            popularity of certain content, pages or features, and better
            understand online activity. Unless described in this notice, we do
            not share, sell, rent or trade any of your information with third
            parties for their promotional purposes. We have contracts in place
            with our data processors, which are designed to help safeguard your
            personal information. This means that they cannot do anything with
            your personal information unless we have instructed them to do it.
            They will also not share your personal information with any
            organization apart from us. They also commit to protect the data
            they hold on our behalf and to retain it for the period we instruct.
          </li>
          <li>
            <span className="font-semibold">Affiliates.</span> We may share your
            information with our affiliates, in which case we will require those
            affiliates to honor this privacy notice. Affiliates include our
            parent company and any subsidiaries, joint venture partners or other
            companies that we control or that are under common control with us.
          </li>
          <li>
            <span className="font-semibold">Business Partners.</span> We may
            share your information with our business partners to offer you
            certain products, services or promotions.
          </li>
        </ul>
        <h2 className="font-semibold">
          4. WHO WILL YOUR INFORMATION BE SHARED WITH?{' '}
        </h2>
        <p>
          We only share information with the following categories of third
          parties. We only share and disclose your information with the
          following categories of third parties. If we have processed your data
          based on your consent and you wish to revoke your consent, please
          contact us using the contact details provided in the section below
          titled “<a href="#">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>“.
        </p>
        <ul className="ml-4 list-disc space-y-2 text-justify">
          <li>Ad Networks</li>
          <li>Affiliate Marketing Programs</li>
          <li>Cloud Computing Services</li>
          <li>Communication & Collaboration Tools</li>
          <li>Data Analytic Services</li>
          <li>Data Storage Service Providers</li>
          <li>Finance & Accounting Tools</li>
          <li>Order Fulfillment Service Provider</li>
          <li>Payment Processors</li>
          <li>Performance Monitoring Tools</li>
          <li>Product Engineering & Design Tools</li>
          <li>Re-targeting Platforms</li>
          <li>Sales & Marketing Tools</li>
          <li>Social Networks</li>
          <li>Testing Tools</li>
          <li>User Account Registration & Authentication Services</li>
          <li>Website Hosting Service Providers</li>
        </ul>
        <h2 className="font-semibold">
          5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
        </h2>
        <p>
          We may use cookies and other tracking technologies to collect and
          store your information.
        </p>
        <p>
          We may use cookies and similar tracking technologies (like web beacons
          and pixels) to access or store information. Specific information about
          how we use such technologies and how you can refuse certain cookies is
          set out in our{' '}
          <Link href={'/cookie-policy'} className="text-gray-900 underline">
            Cookie Notice
          </Link>
        </p>
        <h2 className="font-semibold">
          6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
        </h2>
        <p>
          Our Website offers you the ability to register and login using your
          third-party social media account details (like your Linkedin or
          Facebook or Twitter logins). Where you choose to do this, we will
          receive certain profile information about you from your social media
          provider. The profile information we receive may vary depending on the
          social media provider concerned, but will often include your name,
          email address, friends list, profile picture as well as other
          information you choose to make public on such social media platform.
        </p>
        <p>
          We will use the information we receive only for the purposes that are
          described in this privacy notice or that are otherwise made clear to
          you on the relevant Website. Please note that we do not control, and
          are not responsible for, other uses of your personal information by
          your third-party social media provider. We recommend that you review
          their privacy notice to understand how they collect, use and share
          your personal information, and how you can set your privacy
          preferences on their sites and apps.
        </p>
        <h2 className="font-semibold">
          7. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?{' '}
        </h2>
        <p>
          We may transfer, store, and process your information in countries
          other than your own.
        </p>
        <p>
          We are an internationally based company with operations in the United
          States and United Kingdom. Our servers are located in the United
          States. In order to provide our Services to you, please be aware that
          your information may be transferred to, stored, and processed by us in
          our facilities and by those third parties with whom we may share your
          personal information (see “
          <a href="#" className="underline">
            WILL YOUR INFORMATION BE SHARED WITH ANYONE?
          </a>
          ” above), in the United Kingdom, United States, Taiwan, and other
          countries.
        </p>
        <p>
          If you are located in the European Economic Area (EEA) or United
          Kingdom (UK), then these countries may not necessarily have data
          protection laws or other similar laws as comprehensive as those in
          your country. With that in mind, we use appropriate safeguards when we
          transfer your information outside the EEA or UK to ensure your
          personal information remains protected and to comply with applicable
          data protection laws.
        </p>
        <p>The bases, mechanisms, and measures we rely on include:</p>
        <ul className="ml-4 list-disc space-y-2 text-justify">
          <li>
            Adequacy Decisions. When applicable, we may rely on EU or UK
            adequacy decisions to transfer your information outside the EEA or
            UK. When the relevant EU or UK authority issues an adequacy
            decision, that means they found the third country to offer adequate
            protection for personal information.
          </li>
          <li>
            Derogations. We may transfer information based on a derogation
            listed in Article 49 of the GDPR. We will only do so if the transfer
            of information meets specific strict conditions.
          </li>
          <li>
            Standard Contractual Clauses: We have implemented measures to
            protect your personal information, including by using Standard
            Contractual Clauses for transfers of personal information between us
            and our group companies and between us and our third-party
            providers. These clauses require all recipients to protect all
            personal information that they process originating from the EEA or
            UK in accordance with European data protection laws and regulations.
            Our Standard Contractual Clauses can be provided upon request. We
            have implemented similar appropriate safeguards with our third-party
            service providers and further details can be provided upon request.
          </li>
          <li>
            Supplementary Measures. When necessary, in addition to the Standard
            Contractual Clauses, we may adopt technical, contractual, and
            organizational supplementary measures to better ensure that the
            level of protection guaranteed by the GDPR is not undermined by the
            transfer.
          </li>
        </ul>
        <h2 className="font-semibold">
          8. HOW LONG DO WE KEEP YOUR INFORMATION?
        </h2>
        <p>
          We keep your information for as long as necessary to fulfill the
          purposes outlined in this privacy notice unless otherwise required by
          law.
        </p>
        <p>
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this privacy notice, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting or other legal requirements). No purpose in this notice
          will require us keeping your personal information for longer than
          three (3) months past the termination of the user’s account.
        </p>
        <p>
          When we have no ongoing legitimate business need to process your
          personal information, we will either delete or anonymize such
          information, or, if this is not possible (for example, because your
          personal information has been stored in backup archives), then we will
          securely store your personal information and isolate it from any
          further processing until deletion is possible.
        </p>
        <h2 className="font-semibold">
          9. HOW DO WE KEEP YOUR INFORMATION SAFE?
        </h2>
        <p>
          We aim to protect your personal information through a system of
          organizational and technical security measures. We have implemented
          appropriate technical and organizational security measures designed to
          protect the security of any personal information we process. However,
          despite our safeguards and efforts to secure your information, no
          electronic transmission over the Internet or information storage
          technology can be guaranteed to be 100% secure, so we cannot promise
          or guarantee that hackers, cyber criminals, or other unauthorized
          third parties will not be able to defeat our security, and improperly
          collect, access, steal, or modify your information. Although we will
          do our best to protect your personal information, transmission of
          personal information to and from our Website is at your own risk. You
          should only access the Website within a secure environment.
        </p>
        <h2 className="font-semibold">
          10. DO WE COLLECT INFORMATION FROM MINORS?
        </h2>
        <p>
          We do not knowingly solicit data from or market to children under 18
          years of age. By using the Website, you represent that you are at
          least 18 or that you are the parent or guardian of such a minor and
          consent to such minor dependent's use of the Website. If we learn that
          personal information from users less than 18 years of age has been
          collected, we will deactivate the account and take reasonable measures
          to promptly delete such data from our records. If you become aware of
          any data we may have collected from children under age 18, please
          contact us at support@steppingstonesapp.com.
        </p>
        <h2 className="font-semibold">11. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
        <p>
          In some regions, such as the European Economic Area (EEA) and United
          Kingdom (UK), you have rights that allow you greater access to and
          control over your personal information. You may review, change, or
          terminate your account at any time.
        </p>
        <p>
          In some regions (like the EEA and UK), you have certain rights under
          applicable data protection laws. These may include the right (i) to
          request access and obtain a copy of your personal information, (ii) to
          request rectification or erasure; (iii) to restrict the processing of
          your personal information; and (iv) if applicable, to data
          portability. In certain circumstances, you may also have the right to
          object to the processing of your personal information. To make such a
          request, please use the contact details provided below. We will
          consider and act upon any request in accordance with applicable data
          protection laws.
        </p>
        <p>
          If we are relying on your consent to process your personal
          information, you have the right to withdraw your consent at any time.
          Please note however that this will not affect the lawfulness of the
          processing before its withdrawal, nor will it affect the processing of
          your personal information conducted in reliance on lawful processing
          grounds other than consent.
        </p>
        <p>
          If you are located in the EEA or UK and you believe we are unlawfully
          processing your personal information, you also have the right to
          complain to your local data protection supervisory authority. You can
          find their contact details
          <a
            href="http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm"
            target="_"
            className="underline"
          >
            here
          </a>
        </p>
        <p>
          If you are located in Switzerland, the contact details for the data
          protection authorities are available{' '}
          <a
            href="https://www.edoeb.admin.ch/edoeb/en/home.html"
            target="_"
            className="underline"
          >
            here
          </a>
        </p>
        <p>
          If you have questions or comments about your privacy rights, you may
          email us at{' '}
          <a href="mailto:support@steppingstonesapp.com" className="underline">
            support@steppingstonesapp.com
          </a>
        </p>
        <h2 className="font-semibold">Account Information</h2>
        <p>
          If you would at any time like to review or change the information in
          your account or terminate your account, you can:
        </p>
        <ul className="ml-4 list-disc space-y-2 text-justify">
          <li>Contact us using the contact information provided.</li>
          <li>Log in to your account settings and update your user account.</li>
        </ul>
        <p>
          Upon your request to terminate your account, we will deactivate or
          delete your account and information from our active databases.
          However, we may retain some information in our files to prevent fraud,
          troubleshoot problems, assist with any investigations, enforce our
          Terms of Use and/or comply with applicable legal requirements.
        </p>
        <p>
          <span className="font-semibold">
            Cookies and similar technologies:
          </span>{' '}
          Most Web browsers are set to accept cookies by default. If you prefer,
          you can usually choose to set your browser to remove cookies and to
          reject cookies. If you choose to remove cookies or reject cookies,
          this could affect certain features or services of our Website. To
          opt-out of interest-based advertising by advertisers on our Website,
          click{' '}
          <a
            href="http://www.aboutads.info/choices/"
            target="_"
            className="underline"
          >
            here
          </a>
          . For further information, please see our{' '}
          <Link href={'/cookie-policy'} className="text-gray-900 underline">
            Cookie Notice
          </Link>
          .
        </p>
        <p>
          <span className="font-semibold">Opting out of email marketing:</span>{' '}
          You can unsubscribe from our marketing email list at any time by
          clicking on the unsubscribe link in the emails that we send or by
          contacting us using the details provided below. You will then be
          removed from the marketing email list — however, we may still
          communicate with you, for example to send you service-related emails
          that are necessary for the administration and use of your account, to
          respond to service requests, or for other non-marketing purposes.
        </p>
        <p>To otherwise opt-out, you may:</p>
        <ul className="ml-4 list-disc space-y-2 text-justify">
          <li>Contact us using the contact information provided.</li>
          <li>Access your account settings and update your preferences.</li>
          <li>
            Use the unsubscribe link at the bottom of any marketing emails,
            newsletters, or other non-essential communications.
          </li>
        </ul>
        <h2 className="font-semibold">
          12. CONTROLS FOR DO-NOT-TRACK FEATURES
        </h2>
        <p>
          Most web browsers and some mobile operating systems and mobile
          applications include a Do-Not-Track (“DNT”) feature or setting you can
          activate to signal your privacy preference not to have data about your
          online browsing activities monitored and collected. At this stage no
          uniform technology standard for recognizing and implementing DNT
          signals has been finalized. As such, we do not currently respond to
          DNT browser signals or any other mechanism that automatically
          communicates your choice not to be tracked online. If a standard for
          online tracking is adopted that we must follow in the future, we will
          inform you about that practice in a revised version of this privacy
          notice.
        </p>
        <h2 className="font-semibold">
          13. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
        </h2>
        <p>
          California Civil Code Section 1798.83, also known as the “Shine The
          Light” law, permits our users who are California residents to request
          and obtain from us, once a year and free of charge, information about
          categories of personal information (if any) we disclosed to third
          parties for direct marketing purposes and the names and addresses of
          all third parties with which we shared personal information in the
          immediately preceding calendar year. If you are a California resident
          and would like to make such a request, please submit your request in
          writing to us using the contact information provided below.
        </p>
        <p>
          If you are under 18 years of age, reside in California, and have a
          registered account with the Website, you have the right to request
          removal of unwanted data that you publicly post on the Website. To
          request removal of such data, please contact us using the contact
          information provided below, and include the email address associated
          with your account and a statement that you reside in California. We
          will make sure the data is not publicly displayed on the Website, but
          please be aware that the data may not be completely or comprehensively
          removed from all our systems (e.g. backups, etc.).
        </p>
        <h2 className="font-semibold">
          14. DO WE MAKE UPDATES TO THIS NOTICE?
        </h2>
        <p>
          We may update this privacy notice from time to time. The updated
          version will be indicated by an updated “Revised” date and the updated
          version will be effective as soon as it is accessible. If we make
          material changes to this privacy notice, we may notify you either by
          prominently posting a notice of such changes or by directly sending
          you a notification. We encourage you to review this privacy notice
          frequently to be informed of how we are protecting your information.
        </p>
        <h2 className="font-semibold">
          15. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
        </h2>
        <p>
          If you have questions or comments about this notice, you may contact
          our Data Protection Officer (DPO) by email at{' '}
          <a href="mailto:support@steppingstonesapp.com" className="underline">
            support@steppingstonesapp.com
          </a>
        </p>
        <h2 className="font-semibold">
          16. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
          YOU?{' '}
        </h2>
        <p>
          Based on the applicable laws of your country, you may have the right
          to request access to the personal information we collect from you,
          change that information, or delete it in some circumstances. To
          request to review, update, or delete your personal information, please
          do so by contacting us using the information listed above.
        </p>
      </section>
    </section>
  )
}


