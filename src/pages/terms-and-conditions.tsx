import { BlocksRenderer } from "@strapi/blocks-react-renderer";

type TAndCAttributes = {
  terms: any;
  last_updated: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export const getStaticProps = async () => {
  const testResult = [
    {
      id: 1,
      attributes: {
        title: "Terms and conditions",
        description: "Lorem ipsum...",
      },
    },
  ];

  return {
    props: {
      result: testResult,
    },
  };
};

export default function TermsAndConditions({ result }: { result: any[] }) {
  return (
    <main
      className={`flex flex-col shadow-[rgba(0,0,15,0.5)_0px_0px_15px_0px] `}
    >
      <div
        id="banner"
        className="flex h-[200px] items-center justify-center bg-[#dbe2e9] text-center text-[45px] font-bold text-blue-primary "
      >
        Terms and Conditions
      </div>
      {/* <div className="t-and-c my-8 space-y-8 px-6 pt-8 lg:m-6 xl:mx-36">
        <BlocksRenderer content={policyPage.policy} />
        <h4>Attribution</h4>
        <BlocksRenderer content={policyPage.attribution} />
        <span>
          This privacy policy was created on{" "}
          <span className="font-bold">{formattedDate}</span>.
        </span>
      </div> */}

      <div className="my-8 space-y-8 px-6 pt-8 lg:m-6 lg:mx-auto max-w-[1140px]">
        <p>Please read all these terms and conditions.&nbsp;</p>

        <p>
          As we can accept your order and make a legally enforceable agreement
          without further reference to you, you must read&nbsp; these terms and
          conditions to make sure that they contain all that you want and
          nothing that you are not happy with.&nbsp;&nbsp;
        </p>

        <h3>
          <strong>APPLICATION&nbsp;</strong>
        </h3>

        <ol>
          <li>
            These Terms and Conditions will apply to the purchase of the
            services and goods by you (the&nbsp;
            <strong>Customer&nbsp;</strong>or&nbsp;<strong>you</strong>).
            We&nbsp; are DW Invest Limited a company registered in England and
            Wales under number 13287562 whose registered office is&nbsp; at 185
            Dyke Road, United Kingdom, BN3 1TL with email address
            james@dentistswhoinvest.com; (the&nbsp;
            <strong>Supplier&nbsp;</strong>or&nbsp;&nbsp;
            <strong>us&nbsp;</strong>or&nbsp;<strong>we</strong>).&nbsp;
          </li>
          <li>
            These are the terms on which we sell all Services to you. By
            ordering any of the Services, you agree to be bound by&nbsp; these
            Terms and Conditions. You can only purchase the Services and Goods
            from the Website if you are eligible to&nbsp; enter into a contract
            and are at least 18 years old.&nbsp;
          </li>
        </ol>

        <h3>
          <strong>INTERPRETATION&nbsp;</strong>
        </h3>

        <ol>
          <li>
            <strong>Consumer&nbsp;</strong>means an individual acting for
            purposes which are wholly or mainly outside their trade, business,
            craft or&nbsp; profession;&nbsp;
          </li>
          <li>
            <strong>Contract&nbsp;</strong>means the legally-binding agreement
            between you and us for the supply of the Services;&nbsp;
          </li>
          <li>
            <strong>Delivery Location&nbsp;</strong>means the Supplier’s
            premises or other location where the Services are to be supplied, as
            set out in&nbsp; the Order;&nbsp;
          </li>
          <li>
            <strong>Durable Medium&nbsp;</strong>means paper or email, or any
            other medium that allows information to be addressed personally
            to&nbsp; the recipient, enables the recipient to store the
            information in a way accessible for future reference for a period
            that is&nbsp; long enough for the purposes of the information, and
            allows the unchanged reproduction of the information stored;&nbsp;
          </li>
          <li>
            <strong>Goods&nbsp;</strong>means any goods that we supply to you
            with the Services, of the number and description as set out in the
            Order;&nbsp;
          </li>
          <li>
            <strong>Order&nbsp;</strong>means the Customer’s order for the
            Services from the Supplier as submitted following the step by step
            process&nbsp; set out on the Website;&nbsp;
          </li>
          <li>
            <strong>Privacy Policy&nbsp;</strong>means the terms which set out
            how we will deal with confidential and personal information
            received&nbsp; from you via the Website;&nbsp;
          </li>
          <li>
            <strong>Services&nbsp;</strong>means the services advertised on the
            Website, including any Goods, of the number and description set out
            in&nbsp; the Order;&nbsp;
          </li>
          <li>
            <strong>Website&nbsp;</strong>means our website
            www.dentistswhoinvest.com on which the Services are
            advertised.&nbsp;
          </li>
        </ol>

        <h3>
          <strong>SERVICES&nbsp;</strong>
        </h3>

        <ol>
          <li>
            The description of the Services and any Goods is as set out in the
            Website, catalogues, brochures or other form of&nbsp; advertisement.
            Any description is for illustrative purposes only and there may be
            small discrepancies in the size and&nbsp; colour of any Goods
            supplied.&nbsp;
          </li>
          <li>
            In the case of Services and any Goods made to your special
            requirements, it is your responsibility to ensure that any&nbsp;
            information or specification you provide is accurate.&nbsp;
          </li>
          <li>
            All Services which appear on the Website are subject to
            availability.&nbsp;
          </li>
          <li>
            We can make changes to the Services which are necessary to comply
            with any applicable law or safety requirement.&nbsp; We will notify
            you of these changes.&nbsp;
          </li>
        </ol>

        <h3>
          <strong>CUSTOMER RESPONSIBILITIES&nbsp;</strong>
        </h3>

        <p>Powered by Rocket Lawyer&nbsp;®</p>

        <h3>
          <strong>CUSTOMER RESPONSIBILITIES&nbsp;</strong>
        </h3>

        <ol>
          <li>
            You must co-operate with us in all matters relating to the Services,
            provide us and our authorised employees and&nbsp; representatives
            with access to any premises under your control as required, provide
            us with all information required to&nbsp; perform the Services and
            obtain any necessary licences and consents (unless otherwise
            agreed).&nbsp;
          </li>
          <li>
            Failure to comply with the above is a Customer default which
            entitles us to suspend performance of the Services until&nbsp; you
            remedy it or if you fail to remedy it following our request, we can
            terminate the Contract with immediate effect on&nbsp; written notice
            to you.&nbsp;
          </li>
        </ol>

        <h3>
          <strong>PERSONAL INFORMATION&nbsp;</strong>
        </h3>

        <ol>
          <li>
            We retain and use all information strictly under the Privacy
            Policy.&nbsp;
          </li>
          <li>
            We may contact you by using e-mail or other electronic communication
            methods and by pre-paid post and you&nbsp; expressly agree to
            this.&nbsp;
          </li>
        </ol>

        <h3>
          <strong>BASIS OF SALE&nbsp;</strong>
        </h3>

        <ol>
          <li>
            The description of the Services and any Goods in our website does
            not constitute a contractual offer to sell the&nbsp; Services or
            Goods. When an Order has been submitted on the Website, we can
            reject it for any reason, although we will&nbsp; try to tell you the
            reason without delay.&nbsp;
          </li>
          <li>
            The Order process is set out on the Website. Each step allows you to
            check and amend any errors before submitting&nbsp; the Order. It is
            your responsibility to check that you have used the ordering process
            correctly.&nbsp;
          </li>
          <li>
            A Contract will be formed for the Services ordered only when you
            receive an email from us confirming the Order (&nbsp;
            <strong>Order Confirmation</strong>). You must ensure that the Order
            Confirmation is complete and accurate and inform us&nbsp;
            immediately of any errors. We are not responsible for any
            inaccuracies in the Order placed by you. By placing an Order&nbsp;
            you agree to us giving you confirmation of the Contract by means of
            an email with all information in it (ie the Order&nbsp;
            Confirmation). You will receive the Order Confirmation within a
            reasonable time after making the Contract, but in any&nbsp; event
            not later than the delivery of any Goods supplied under the
            Contract, and before performance begins of any of the&nbsp;
            Services.&nbsp;
          </li>
          <li>
            Any quotation or estimate of Fees (as defined below) is valid for a
            maximum period of 7 days from its date, unless&nbsp; we expressly
            withdraw it at an earlier time.&nbsp;
          </li>
          <li>
            No variation of the Contract, whether about description of the
            Services, Fees or otherwise, can be made after it has&nbsp; been
            entered into unless the variation is agreed by the Customer and the
            Supplier in writing.&nbsp;
          </li>
          <li>
            We intend that these Terms and Conditions apply only to a Contract
            entered into by you as a Consumer. If this is not&nbsp; the case,
            you must tell us, so that we can provide you with a different
            contract with terms which are more appropriate&nbsp; for you and
            which might, in some respects, be better for you, eg by giving you
            rights as a business.&nbsp;
          </li>
        </ol>

        <h3>
          <strong>FEES AND PAYMENT&nbsp;</strong>
        </h3>

        <ol>
          <li>
            The fees (<strong>Fees</strong>) for the Services, the price of any
            Goods (if not included in the Fees) and any additional delivery
            or&nbsp; other charges is that set out on the Website at the date we
            accept the Order or such other price as we may agree in&nbsp;
            writing. Prices for Services may be calculated on a fixed price or
            on a standard daily rate basis.&nbsp;
          </li>
          <li>
            Fees and charges include VAT at the rate applicable at the time of
            the Order.&nbsp;
          </li>
          <li>
            You must pay by submitting your credit or debit card details with
            your Order and we can take payment immediately or&nbsp; otherwise
            before delivery of the Services.&nbsp;
          </li>
        </ol>

        <h3>
          <strong>DELIVERY&nbsp;</strong>
        </h3>

        <ol>
          <li>
            We will deliver the Services, including any Goods, to the Delivery
            Location by the time or within the agreed period or,&nbsp; failing
            any agreement:&nbsp;
          </li>
        </ol>

        <ul>
          <li>in the case of Services, within a reasonable time; and&nbsp;</li>
          <li>
            in the case of Goods, without undue delay and, in any event, not
            more than 30 days after the day on which the&nbsp;&nbsp;Powered by
            Rocket Lawyer&nbsp;®
          </li>
          <li>
            in the case of Goods, without undue delay and, in any event, not
            more than 30 days after the day on which the&nbsp; Contract is
            entered into.&nbsp;
          </li>
        </ul>

        <ol>
          <li>
            In any case, regardless of events beyond our control, if we do not
            deliver the Services on time, you can require us to&nbsp; reduce the
            Fees or charges by an appropriate amount (including the right to
            receive a refund for anything already paid&nbsp; above the reduced
            amount). The amount of the reduction can, where appropriate, be up
            to the full amount of the Fees or&nbsp; charges.&nbsp;
          </li>
          <li>
            In any case, regardless of events beyond our control, if we do not
            deliver the Goods on time, you can (in addition to&nbsp; any other
            remedies) treat the Contract at an end if:&nbsp;
          </li>
        </ol>

        <ul>
          <li>
            we have refused to deliver the Goods, or if delivery on time is
            essential taking into account all the relevant&nbsp; circumstances
            at the time the Contract was made, or you said to us before the
            Contract was made that delivery on&nbsp; time was essential;
            or&nbsp;
          </li>
          <li>
            after we have failed to deliver on time, you have specified a later
            period which is appropriate to the circumstances&nbsp; and we have
            not delivered within that period.&nbsp;
          </li>
        </ul>

        <ol>
          <li>
            If you treat the Contract at an end, we will (in addition to other
            remedies) promptly return all payments made under the&nbsp;
            Contract.&nbsp;
          </li>
          <li>
            If you were entitled to treat the Contract at an end, but do not do
            so, you are not prevented from cancelling the Order&nbsp; for any
            Goods or rejecting Goods that have been delivered and, if you do
            this, we will (in addition to other remedies)&nbsp; without delay
            return all payments made under the Contract for any such cancelled
            or rejected Goods. If the Goods have&nbsp; been delivered, you must
            return them to us or allow us to collect them from you and we will
            pay the costs of this.&nbsp;
          </li>
          <li>
            If any Goods form a commercial unit (a unit is a commercial unit if
            division of the unit would materially impair the&nbsp; value of the
            goods or the character of the unit) you cannot cancel or reject the
            Order for some of those Goods without&nbsp; also cancelling or
            rejecting the Order for the rest of them.&nbsp;
          </li>
          <li>
            We do not generally deliver to addresses outside England and Wales,
            Scotland, Northern Ireland, the Isle of Man and&nbsp; Channels
            Islands. If, however, we accept an Order for delivery outside that
            area, you may need to pay import duties or&nbsp; other taxes, as we
            will not pay them.&nbsp;
          </li>
          <li>
            You agree we may deliver the Goods in instalments if we suffer a
            shortage of stock or other genuine and fair reason,&nbsp; subject to
            the above provisions and provided you are not liable for extra
            charges.&nbsp;
          </li>
          <li>
            If you or your nominee fail, through no fault of ours, to take
            delivery of the Services at the Delivery Location, we may&nbsp;
            charge the reasonable costs of storing and redelivering them.&nbsp;
          </li>
          <li>
            The Goods will become your responsibility from the completion of
            delivery or Customer collection. You must, if&nbsp; reasonably
            practicable, examine the Goods before accepting them.&nbsp;
          </li>
        </ol>

        <p>
          <strong>Risk and Title&nbsp;</strong>
        </p>

        <ol>
          <li>
            Risk of damage to, or loss of, any Goods will pass to you when the
            Goods are delivered to you.&nbsp;
          </li>
          <li>
            You do not own the Goods until we have received payment in full. If
            full payment is overdue or a step occurs towards&nbsp; your
            bankruptcy, we can choose, by notice to cancel any delivery and end
            any right to use the Goods still owned by&nbsp; you, in which case
            you must return them or allow us to collect them.&nbsp;
          </li>
        </ol>

        <p>
          <strong>Withdrawal and cancellation&nbsp;</strong>
        </p>

        <ol>
          <li>
            You can withdraw the Order by telling us before the Contract is
            made, if you simply wish to change your mind and&nbsp; without
            giving us a reason, and without incurring any liability.&nbsp;
          </li>
          <li>
            This is a&nbsp;<strong>distance contract&nbsp;</strong>(as defined
            below) which has the cancellation rights (
            <strong>Cancellation Rights</strong>) set out below.&nbsp; These
            Cancellation Rights, however, do not apply, to a contract for the
            following goods and services (with no others) in&nbsp; the following
            circumstances:&nbsp;
          </li>
        </ol>

        <ul>
          <li>
            goods that are made to your specifications or are clearly
            personalised; b.&nbsp;&nbsp;
          </li>
          <li>
            goods which are liable to deteriorate or expire rapidly.&nbsp;
          </li>
        </ul>

        <p>
          <em>Right to cancel&nbsp;</em>
        </p>

        <ol>
          <li>
            Subject as stated in these Terms and Conditions, you can cancel this
            contract within 14 days without giving any reason.&nbsp;Powered by
            Rocket Lawyer&nbsp;®
          </li>
          <li>
            Subject as stated in these Terms and Conditions, you can cancel this
            contract within 14 days without giving any reason.&nbsp;
          </li>
          <li>
            The cancellation period will expire after 14 days from the day on
            which you acquire, or a third party, other than the&nbsp; carrier,
            indicated by you, acquires physical possession of the last of the
            Goods. In a contract for the supply of services&nbsp; only (without
            goods), the cancellation period will expire 14 days from the day the
            Contract was entered into. In a&nbsp; contract for the supply of
            goods over time (ie subscriptions), the right to cancel will be 14
            days after the first delivery.&nbsp;
          </li>
          <li>
            To exercise the right to cancel, you must inform us of your decision
            to cancel this Contract by a clear statement setting&nbsp; out your
            decision (eg a letter sent by post or email). You can use the
            attached model cancellation form, but it is not&nbsp; obligatory. In
            any event, you must be able to show clear evidence of when the
            cancellation was made, so you may&nbsp; decide to use the model
            cancellation form.&nbsp;
          </li>
          <li>
            You can also electronically fill in and submit the model
            cancellation form or any other clear statement of the&nbsp;
            Customer’s decision to cancel the Contract on our website
            www.dentistswhoinvest.com . If you use this option, we will&nbsp;
            communicate to you an acknowledgement of receipt of such a
            cancellation in a Durable Medium (eg by email) without&nbsp;
            delay.&nbsp;
          </li>
          <li>
            To meet the cancellation deadline, it is sufficient for you to send
            your communication concerning your exercise of the&nbsp; right to
            cancel before the cancellation period has expired.&nbsp;
          </li>
        </ol>

        <p>
          <em>Commencement of Services in the cancellation period&nbsp;</em>
        </p>

        <ol>
          <li>
            We must not begin the supply of a service (being part of the
            Services) before the end of the cancellation period unless&nbsp; you
            have made an express request for the service.&nbsp;
          </li>
        </ol>

        <p>
          <em>Effects of cancellation in the cancellation period&nbsp;</em>
        </p>

        <ol>
          <li>
            Except as set out below, if you cancel this Contract, we will
            reimburse to you all payments received from you,&nbsp; including the
            costs of delivery (except for the supplementary costs arising if you
            chose a type of delivery other than the&nbsp; least expensive type
            of standard delivery offered by us).&nbsp;
          </li>
        </ol>

        <p>
          <em>
            Payment for Services commenced during the cancellation period&nbsp;
          </em>
        </p>

        <ol>
          <li>
            Where a service is supplied (being part of the Service) before the
            end of the cancellation period in response to your&nbsp; express
            request to do so, you must pay an amount for the supply of the
            service for the period for which it is supplied,&nbsp; ending with
            the time when we are informed of your decision to cancel the
            Contract. This amount is in proportion to&nbsp; what has been
            supplied in comparison with the full coverage of the Contract. This
            amount is to be calculated on the&nbsp; basis of the total price
            agreed in the Contract or, if the total price were to be excessive,
            on the basis of the market value&nbsp; of the service that has been
            supplied, calculated by comparing prices for equivalent services
            supplied by other traders.&nbsp; You will bear no cost for supply of
            that service, in full or in part, in this cancellation period if
            that service is not&nbsp; supplied in response to such a
            request.&nbsp;
          </li>
        </ol>

        <p>
          <em>Deduction for Goods supplied&nbsp;</em>
        </p>

        <ol>
          <li>
            We may make a deduction from the reimbursement for loss in value of
            any Goods supplied, if the loss is the result of&nbsp; unnecessary
            handling by you (ie handling the Goods beyond what is necessary to
            establish the nature, characteristics&nbsp; and functioning of the
            Goods: eg it goes beyond the sort of handling that might be
            reasonably allowed in a shop). This&nbsp; is because you are liable
            for that loss and, if that deduction is not made, you must pay us
            the amount of that loss.&nbsp;
          </li>
        </ol>

        <p>
          <em>Timing of reimbursement&nbsp;</em>
        </p>

        <ol>
          <li>
            If we have not offered to collect the Goods, we will make the
            reimbursement without undue delay, and not later than:&nbsp;
          </li>
        </ol>

        <ul>
          <li>
            14 days after the day we receive back from you any Goods supplied,
            or b.&nbsp;&nbsp;
          </li>
          <li>
            (if earlier) 14 days after the day you provide evidence that you
            have sent back the Goods.&nbsp;
          </li>
        </ul>

        <ol>
          <li>
            If we have offered to collect the Goods or if no Goods were supplied
            or to be supplied (ie it is a contract for the supply&nbsp; of
            services only), we will make the reimbursement without undue delay,
            and not later than 14 days after the day on&nbsp; which we are
            informed about your decision to cancel this Contract.&nbsp;
          </li>
          <li>
            We will make the reimbursement using the same means of payment as
            you used for the initial transaction, unless you&nbsp; have
            expressly agreed otherwise; in any event, you will not incur any
            fees as a result of the reimbursement.&nbsp;
          </li>
        </ol>

        <p>
          <em>Returning Goods</em>Powered by Rocket Lawyer&nbsp;®
        </p>

        <p>
          <em>Returning Goods&nbsp;</em>
        </p>

        <ol>
          <li>
            If you have received Goods in connection with the Contract which you
            have cancelled, you must send back the Goods&nbsp; or hand them over
            to us at 185 Dyke Road, United Kingdom, BN3 1TL without delay and in
            any event not later&nbsp; than 14 days from the day on which you
            communicate to us your cancellation of this Contract. The deadline
            is met if&nbsp; you send back the Goods before the period of 14 days
            has expired. You agree that you will have to bear the cost of&nbsp;
            returning the Goods.&nbsp;
          </li>
          <li>
            For the purposes of these Cancellation Rights, these words have the
            following meanings:&nbsp;
          </li>
        </ol>

        <ul>
          <li>
            <strong>distance contract&nbsp;</strong>means a contract concluded
            between a trader and a consumer under an organised distance
            sales&nbsp; or service-provision scheme without the simultaneous
            physical presence of the trader and the consumer, with the&nbsp;
            exclusive use of one or more means of distance communication up to
            and including the time at which the contract&nbsp; is
            concluded;&nbsp;
          </li>
          <li>
            <strong>sales contract&nbsp;</strong>means a contract under which a
            trader transfers or agrees to transfer the ownership of goods to
            a&nbsp; consumer and the consumer pays or agrees to pay the price,
            including any contract that has both goods and&nbsp; services as its
            object.&nbsp;
          </li>
        </ul>

        <h3>
          <strong>CONFORMITY&nbsp;</strong>
        </h3>

        <ol>
          <li>
            We have a legal duty to supply the Goods in conformity with the
            Contract, and will not have conformed if it does not&nbsp; meet the
            following obligation.&nbsp;
          </li>
          <li>Upon delivery, the Goods will:&nbsp;</li>
        </ol>

        <ul>
          <li>be of satisfactory quality;&nbsp;</li>
          <li>
            be reasonably fit for any particular purpose for which you buy the
            Goods which, before the Contract is made, you&nbsp; made known to us
            (unless you do not actually rely, or it is unreasonable for you to
            rely, on our skill and judgment)&nbsp; and be fit for any purpose
            held out by us or set out in the Contract; and&nbsp;
          </li>
          <li>conform to their description.&nbsp;</li>
        </ul>

        <ol>
          <li>
            It is not a failure to conform if the failure has its origin in your
            materials.&nbsp;
          </li>
          <li>
            We will supply the Services with reasonable skill and care.&nbsp;
          </li>
          <li>
            In relation to the Services, anything we say or write to you, or
            anything someone else says or writes to you on our&nbsp; behalf,
            about us or about the Services, is a term of the Contract (which we
            must comply with) if you take it into account&nbsp; when deciding to
            enter this Contract, or when making any decision about the Services
            after entering into this Contract.&nbsp; Anything you take into
            account is subject to anything that qualified it and was said or
            written to you by us or on behalf&nbsp; of us on the same occasion,
            and any change to it that has been expressly agreed between us
            (before entering this&nbsp; Contract or later).&nbsp;
          </li>
        </ol>

        <h3>
          <strong>DURATION, TERMINATION AND SUSPENSION&nbsp;</strong>
        </h3>

        <ol>
          <li>
            The Contract continues as long as it takes us to perform the
            Services.&nbsp;
          </li>
          <li>
            Either you or we may terminate the Contract or suspend the Services
            at any time by a written notice of termination or&nbsp; suspension
            to the other if that other:&nbsp;
          </li>
        </ol>

        <ul>
          <li>
            commits a serious breach, or series of breaches resulting in a
            serious breach, of the Contract and the breach either&nbsp; cannot
            be fixed or is not fixed within 30 days of the written notice;
            or&nbsp;
          </li>
          <li>
            is subject to any step towards its bankruptcy or liquidation.&nbsp;
          </li>
        </ul>

        <ol>
          <li>
            On termination of the Contract for any reason, any of our respective
            remaining rights and liabilities will not be&nbsp; affected.&nbsp;
          </li>
        </ol>

        <h3>
          <strong>SUCCESSORS AND OUR SUB-CONTRACTORS&nbsp;</strong>
        </h3>

        <p>Powered by Rocket Lawyer&nbsp;®</p>

        <ol>
          <li>
            Either party can transfer the benefit of this Contract to someone
            else, and will remain liable to the other for its&nbsp; obligations
            under the Contract. The Supplier will be liable for the acts of any
            sub-contractors who it chooses to help&nbsp; perform its
            duties.&nbsp;
          </li>
        </ol>

        <h3>
          <strong>
            CIRCUMSTANCES BEYOND THE CONTROL OF EITHER PARTY&nbsp;
          </strong>
        </h3>

        <ol>
          <li>
            In the event of any failure by a party because of something beyond
            its reasonable control:&nbsp;
          </li>
        </ol>

        <ul>
          <li>
            the party will advise the other party as soon as reasonably
            practicable; and&nbsp;
          </li>
          <li>
            the party’s obligations will be suspended so far as is reasonable,
            provided that that party will act reasonably, and&nbsp; the party
            will not be liable for any failure which it could not reasonably
            avoid, but this will not affect the&nbsp; Customer’s above rights
            relating to delivery (and the right to cancel below).&nbsp;
          </li>
        </ul>

        <h3>
          <strong>PRIVACY&nbsp;</strong>
        </h3>

        <ol>
          <li>
            Your privacy is critical to us. We respect your privacy and comply
            with the General Data Protection Regulation with&nbsp; regard to
            your personal information.&nbsp;
          </li>
          <li>
            These Terms and Conditions should be read alongside, and are in
            addition to our policies, including our privacy policy&nbsp;
            (www.dentistswhoinvest.com/privacypolicy) and cookies policy
            (www.dentistswhoinvest.com/privacypolicy).&nbsp;
          </li>
          <li>For the purposes of these Terms and Conditions:&nbsp;</li>
        </ol>

        <ul>
          <li>
            ‘Data Protection Laws’ means any applicable law relating to the
            processing of Personal Data, including, but not&nbsp; limited to the
            GDPR.&nbsp;
          </li>
          <li>‘GDPR’ means the UK General Data Protection Regulation.&nbsp;</li>
          <li>
            ‘Data Controller’, ‘Personal Data’ and ‘Processing’ shall have the
            same meaning as in the GDPR.&nbsp;
          </li>
        </ul>

        <ol>
          <li>
            We are a Data Controller of the Personal Data we Process in
            providing the Services and Goods to you.&nbsp;
          </li>
          <li>
            Where you supply Personal Data to us so we can provide Services and
            Goods to you, and we Process that Personal&nbsp; Data in the course
            of providing the Services and Goods to you, we will comply with our
            obligations imposed by the&nbsp; Data Protection Laws:&nbsp;
          </li>
        </ol>

        <ul>
          <li>
            before or at the time of collecting Personal Data, we will identify
            the purposes for which information is being&nbsp; collected;&nbsp;
          </li>
          <li>
            we will only Process Personal Data for the purposes
            identified;&nbsp;
          </li>
          <li>
            we will respect your rights in relation to your Personal Data;
            and&nbsp;
          </li>
          <li>
            we will implement technical and organisational measures to ensure
            your Personal Data is secure.&nbsp;
          </li>
        </ul>

        <ol>
          <li>
            For any enquiries or complaints regarding data privacy, you can
            e-mail: .&nbsp;
          </li>
        </ol>

        <h3>
          <strong>EXCLUDING LIABILITY&nbsp;</strong>
        </h3>

        <ol>
          <li>
            The Supplier does not exclude liability for: (i) any fraudulent act
            or omission; or (ii) death or personal injury caused by&nbsp;
            negligence or breach of the Supplier’s other legal obligations.
            Subject to this, we are not liable for (i) loss which was&nbsp; not
            reasonably foreseeable to both parties at the time when the Contract
            was made, or (ii) loss (eg loss of profit) to your&nbsp; business,
            trade, craft or profession which would not be suffered by a Consumer
            – because we believe you are not&nbsp; buying the Services and Goods
            wholly or mainly for your business, trade, craft or
            profession.&nbsp;
          </li>
        </ol>

        <h3>
          <strong>GOVERNING LAW, JURISDICTION AND COMPLAINTS&nbsp;</strong>
        </h3>

        <ol>
          <li>
            The Contract (including any non-contractual matters) is governed by
            the law of England and Wales.&nbsp;
          </li>
          <li>
            Disputes can be submitted to the jurisdiction of the courts of
            England and Wales or, where the Customer lives in&nbsp; Scotland or
            Northern Ireland, in the courts of respectively Scotland or Northern
            Ireland.&nbsp;
          </li>
        </ol>

        <p>Powered by Rocket Lawyer&nbsp;®</p>

        <ol>
          <li>
            We try to avoid any dispute, so we deal with complaints as follows:
            If a dispute occurs customers should contact us to&nbsp; find a
            solution. We will aim to respond with an appropriate solution within
            5 days..&nbsp;
          </li>
        </ol>

        <h3>
          <strong>ATTRIBUTION&nbsp;</strong>
        </h3>

        <ol>
          <li>
            These terms and conditions were created using a document
            from&nbsp;Rocket Lawyer&nbsp;(https://www.rocketlawyer.com/gb
            /en).&nbsp;
          </li>
        </ol>

        <h3>
          <strong>MODEL CANCELLATION FORM&nbsp;</strong>
        </h3>

        <p>To&nbsp;</p>

        <p>&nbsp;DW Invest Limited&nbsp;</p>

        <p>185 Dyke Road&nbsp;</p>

        <p>&nbsp;United Kingdom&nbsp;</p>

        <p>BN3 1TL&nbsp;</p>

        <p>Email address: james@dentistswhoinvest.com&nbsp;</p>

        <p>
          &nbsp;I/We[*] hereby give notice that I/We [*] cancel my/our [*]
          contract of sale of the following goods [*] [for the supply of
          the&nbsp; following service [*], Ordered on [*]/received on
          [*]______________________(date received)&nbsp;
        </p>

        <p>&nbsp;Name of consumer(s):&nbsp;</p>

        <p>&nbsp;Address of consumer(s):&nbsp;</p>

        <p>
          Signature of consumer(s) (only if this form is notified on
          paper)&nbsp;
        </p>

        <p>Date&nbsp;</p>

        <p>&nbsp;[*] Delete as appropriate.&nbsp;</p>
      </div>
    </main>
  );
}
