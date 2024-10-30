import { Button } from "./ui/button";
import Image from "next/image";
import { SquareX } from "lucide-react";
import Script from "next/script";

interface NHSPopupFormProps {
  isVisible: boolean;
  onClose: () => void;
}

export const FreeTaxReliefPopupForm = ({
  isVisible,
  onClose,
}: NHSPopupFormProps) => {
  if (!isVisible) return null;

  return (
    <div
      id="overall-container"
      className="relative flex size-full flex-col bg-white md:h-[495px] md:w-[800px] md:flex-row"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        id="title-and-image"
        className="flex h-3/5 flex-col justify-center bg-[#F58F1D] text-white md:h-full md:w-1/2 md:px-2"
      >
        <div className="my-12 flex flex-col items-center justify-center  text-center font-bold">
          <button onClick={onClose} className="absolute right-6 top-2">
            <SquareX className="stroke-blue-primary" size={32} />
          </button>
          <h2 className="mx-3 mb-4 text-[28px] leading-8 md:text-[27px]">
            FREE pdf on tax efficiency for dentists
          </h2>
          <Image
            src="https://assets.drjamesmartin.co.uk/David_Hossein_tax_relief_8729644e8b/David_Hossein_tax_relief_8729644e8b.jpg"
            alt="david hossein tax relief"
            width={300}
            height={400}
            className="rounded-[30px] "
          />
        </div>
      </div>
      <div
        id="form"
        className="mx-4 bg-white md:mt-[-40px] md:w-1/2 md:place-self-center"
      >
        <div
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className="_form_23"
        ></div>
        <Script src="https://dentistswhoinvest.activehosted.com/f/embed.php?id=23" />

        {/* We do this kinda horrible thing because it seems to clash with the TaxReliefForm at the bottom of the homepage
         So we just copy the embed code. 
          Possibly necessary because of a recaptcha? On a previous iteration with a different form,
          rendering it twice on the same page was causing issues with React*/}
        <div
          dangerouslySetInnerHTML={{
            __html: `
              <div class="_form_23"><style>@import url(https://fonts.bunny.net/css?family=montserrat:400);</style><style>
              #_form_67215B4AC2451_{font-size:14px;line-height:1.6;font-family:arial, helvetica, sans-serif;margin:0}#_form_67215B4AC2451_ *{outline:0}._form_hide{display:none;visibility:hidden}._form_show{display:block;visibility:visible}#_form_67215B4AC2451_._form-top{top:0}#_form_67215B4AC2451_._form-bottom{bottom:0}#_form_67215B4AC2451_._form-left{left:0}#_form_67215B4AC2451_._form-right{right:0}#_form_67215B4AC2451_ input[type="text"],#_form_67215B4AC2451_ input[type="tel"],#_form_67215B4AC2451_ input[type="date"],#_form_67215B4AC2451_ textarea{padding:6px;height:auto;border:#979797 1px solid;border-radius:4px;color:#000000 !important;font-size:14px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}#_form_67215B4AC2451_ textarea{resize:none}#_form_67215B4AC2451_ ._submit{-webkit-appearance:none;cursor:pointer;font-family:arial, sans-serif;font-size:14px;text-align:center;background:#151F6D !important;border:0 !important;-moz-border-radius:4px !important;-webkit-border-radius:4px !important;border-radius:4px !important;color:#FFFFFF !important;padding:15px !important}#_form_67215B4AC2451_ ._submit:disabled{cursor:not-allowed;opacity:0.4}#_form_67215B4AC2451_ ._submit.processing{position:relative}#_form_67215B4AC2451_ ._submit.processing::before{content:"";width:1em;height:1em;position:absolute;z-index:1;top:50%;left:50%;border:double 3px transparent;border-radius:50%;background-image:linear-gradient(#151F6D, #151F6D), conic-gradient(#151F6D, #FFFFFF);background-origin:border-box;background-clip:content-box, border-box;animation:1200ms ease 0s infinite normal none running _spin}#_form_67215B4AC2451_ ._submit.processing::after{content:"";position:absolute;top:0;bottom:0;left:0;right:0;background:#151F6D !important;border:0 !important;-moz-border-radius:4px !important;-webkit-border-radius:4px !important;border-radius:4px !important;color:#FFFFFF !important;padding:15px !important}@keyframes _spin{0%{transform:translate(-50%, -50%) rotate(90deg)}100%{transform:translate(-50%, -50%) rotate(450deg)}}#_form_67215B4AC2451_ ._close-icon{cursor:pointer;background-image:url("https://d226aj4ao1t61q.cloudfront.net/esfkyjh1u_forms-close-dark.png");background-repeat:no-repeat;background-size:14.2px 14.2px;position:absolute;display:block;top:11px;right:9px;overflow:hidden;width:16.2px;height:16.2px}#_form_67215B4AC2451_ ._close-icon:before{position:relative}#_form_67215B4AC2451_ ._form-body{margin-bottom:30px}#_form_67215B4AC2451_ ._form-image-left{width:150px;float:left}#_form_67215B4AC2451_ ._form-content-right{margin-left:164px}#_form_67215B4AC2451_ ._form-branding{color:#fff;font-size:10px;clear:both;text-align:left;margin-top:30px;font-weight:100}#_form_67215B4AC2451_ ._form-branding ._logo{display:block;width:130px;height:14px;margin-top:6px;background-image:url("https://d226aj4ao1t61q.cloudfront.net/hh9ujqgv5_aclogo_li.png");background-size:130px auto;background-repeat:no-repeat}#_form_67215B4AC2451_ .form-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}#_form_67215B4AC2451_ ._form-label,#_form_67215B4AC2451_ ._form_element ._form-label{font-weight:bold;margin-bottom:5px;display:block}#_form_67215B4AC2451_._dark ._form-branding{color:#333}#_form_67215B4AC2451_._dark ._form-branding ._logo{background-image:url("https://d226aj4ao1t61q.cloudfront.net/jftq2c8s_aclogo_dk.png")}#_form_67215B4AC2451_ ._form_element{position:relative;margin-bottom:10px;font-size:0;max-width:100%}#_form_67215B4AC2451_ ._form_element *{font-size:14px}#_form_67215B4AC2451_ ._form_element._clear{clear:both;width:100%;float:none}#_form_67215B4AC2451_ ._form_element._clear:after{clear:left}#_form_67215B4AC2451_ ._form_element input[type="text"],#_form_67215B4AC2451_ ._form_element input[type="date"],#_form_67215B4AC2451_ ._form_element select,#_form_67215B4AC2451_ ._form_element textarea:not(.g-recaptcha-response){display:block;width:100%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;font-family:inherit}#_form_67215B4AC2451_ ._field-wrapper{position:relative}#_form_67215B4AC2451_ ._inline-style{float:left}#_form_67215B4AC2451_ ._inline-style input[type="text"]{width:150px}#_form_67215B4AC2451_ ._inline-style:not(._clear)+._inline-style:not(._clear){margin-left:20px}#_form_67215B4AC2451_ ._form_element img._form-image{max-width:100%}#_form_67215B4AC2451_ ._form_element ._form-fieldset{border:0;padding:0.01em 0 0 0;margin:0;min-width:0}#_form_67215B4AC2451_ ._clear-element{clear:left}#_form_67215B4AC2451_ ._full_width{width:100%}#_form_67215B4AC2451_ ._form_full_field{display:block;width:100%;margin-bottom:10px}#_form_67215B4AC2451_ input[type="text"]._has_error,#_form_67215B4AC2451_ textarea._has_error{border:#F37C7B 1px solid}#_form_67215B4AC2451_ input[type="checkbox"]._has_error{outline:#F37C7B 1px solid}#_form_67215B4AC2451_ ._error{display:block;position:absolute;font-size:14px;z-index:10000001}#_form_67215B4AC2451_ ._error._above{padding-bottom:4px;bottom:39px;right:0}#_form_67215B4AC2451_ ._error._below{padding-top:8px;top:100%;right:0}#_form_67215B4AC2451_ ._error._above ._error-arrow{bottom:-4px;right:15px;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid #FFDDDD}#_form_67215B4AC2451_ ._error._below ._error-arrow{top:0;right:15px;border-left:8px solid transparent;border-right:8px solid transparent;border-bottom:8px solid #FFDDDD}#_form_67215B4AC2451_ ._error-inner{padding:12px 12px 12px 36px;background-color:#FFDDDD;background-image:url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM9 3V9H7V3H9ZM9 13V11H7V13H9Z' fill='%23CA0000'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:12px center;font-size:14px;font-family:arial, sans-serif;font-weight:600;line-height:16px;color:#000;text-align:center;text-decoration:none;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;box-shadow:0px 1px 4px rgba(31, 33, 41, 0.298295)}@media only screen and (max-width:319px){#_form_67215B4AC2451_ ._error-inner{padding:7px 7px 7px 25px;font-size:12px;line-height:12px;background-position:4px center;max-width:100px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}}#_form_67215B4AC2451_ ._error-inner._form_error{margin-bottom:5px;text-align:left}#_form_67215B4AC2451_ ._button-wrapper ._error-inner._form_error{position:static}#_form_67215B4AC2451_ ._error-inner._no_arrow{margin-bottom:10px}#_form_67215B4AC2451_ ._error-arrow{position:absolute;width:0;height:0}#_form_67215B4AC2451_ ._error-html{margin-bottom:10px}.pika-single{z-index:10000001 !important}#_form_67215B4AC2451_ input[type="text"].datetime_date{width:69%;display:inline}#_form_67215B4AC2451_ select.datetime_time{width:29%;display:inline;height:32px}#_form_67215B4AC2451_ input[type="date"].datetime_date{width:69%;display:inline-flex}#_form_67215B4AC2451_ input[type="time"].datetime_time{width:29%;display:inline-flex}@media (min-width:320px) and (max-width:667px){::-webkit-scrollbar{display:none}#_form_67215B4AC2451_{margin:0;width:100%;min-width:100%;max-width:100%;box-sizing:border-box}#_form_67215B4AC2451_ *{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;font-size:1em}#_form_67215B4AC2451_ ._form-content{margin:0;width:100%}#_form_67215B4AC2451_ ._form-inner{display:block;min-width:100%}#_form_67215B4AC2451_ ._form-title,#_form_67215B4AC2451_ ._inline-style{margin-top:0;margin-right:0;margin-left:0}#_form_67215B4AC2451_ ._form-title{font-size:1.2em}#_form_67215B4AC2451_ ._form_element{margin:0 0 20px;padding:0;width:100%}#_form_67215B4AC2451_ ._form-element,#_form_67215B4AC2451_ ._inline-style,#_form_67215B4AC2451_ input[type="text"],#_form_67215B4AC2451_ label,#_form_67215B4AC2451_ p,#_form_67215B4AC2451_ textarea:not(.g-recaptcha-response){float:none;display:block;width:100%}#_form_67215B4AC2451_ ._row._checkbox-radio label{display:inline}#_form_67215B4AC2451_ ._row,#_form_67215B4AC2451_ p,#_form_67215B4AC2451_ label{margin-bottom:0.7em;width:100%}#_form_67215B4AC2451_ ._row input[type="checkbox"],#_form_67215B4AC2451_ ._row input[type="radio"]{margin:0 !important;vertical-align:middle !important}#_form_67215B4AC2451_ ._row input[type="checkbox"]+span label{display:inline}#_form_67215B4AC2451_ ._row span label{margin:0 !important;width:initial !important;vertical-align:middle !important}#_form_67215B4AC2451_ ._form-image{max-width:100%;height:auto !important}#_form_67215B4AC2451_ input[type="text"]{padding-left:10px;padding-right:10px;font-size:16px;line-height:1.3em;-webkit-appearance:none}#_form_67215B4AC2451_ input[type="radio"],#_form_67215B4AC2451_ input[type="checkbox"]{display:inline-block;width:1.3em;height:1.3em;font-size:1em;margin:0 0.3em 0 0;vertical-align:baseline}#_form_67215B4AC2451_ button[type="submit"]{padding:20px;font-size:1.5em}#_form_67215B4AC2451_ ._inline-style{margin:20px 0 0 !important}}#_form_67215B4AC2451_{position:relative;text-align:left;margin:25px auto 0;padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;background:transparent !important;border:0;max-width:1000px;-moz-border-radius:0px !important;-webkit-border-radius:0px !important;border-radius:0px !important;color:#FFFFFF}#_form_67215B4AC2451_._inline-form,#_form_67215B4AC2451_._inline-form ._form-content{font-family:"Montserrat", sans-serif}#_form_67215B4AC2451_._inline-form ._row span,#_form_67215B4AC2451_._inline-form ._row label{font-family:"Montserrat", sans-serif;font-size:14px;font-weight:400;line-height:1.6em}#_form_67215B4AC2451__inlineform input[type="text"],#_form_67215B4AC2451__inlineform input[type="date"],#_form_67215B4AC2451__inlineform input[type="tel"],#_form_67215B4AC2451__inlineform select,#_form_67215B4AC2451__inlineform textarea:not(.g-recaptcha-response){font-family:"Montserrat", sans-serif;font-size:14px;font-weight:400;font-color:#000000;line-height:1.6em}#_form_67215B4AC2451_._inline-form ._html-code *:not(h1, h2, h3, h4, h5, h6),#_form_67215B4AC2451_._inline-form ._form-thank-you{font-family:"Montserrat", sans-serif}#_form_67215B4AC2451_._inline-form ._form-label,#_form_67215B4AC2451_._inline-form ._form-emailidentifier,#_form_67215B4AC2451_._inline-form ._form-checkbox-option-label{font-family:"Montserrat", sans-serif;font-size:14px;font-weight:700;line-height:1.6em}#_form_67215B4AC2451_._inline-form ._submit{margin-top:12px;font-family:"Montserrat", sans-serif}#_form_67215B4AC2451_._inline-form ._html-code h1,#_form_67215B4AC2451_._inline-form ._html-code h2,#_form_67215B4AC2451_._inline-form ._html-code h3,#_form_67215B4AC2451_._inline-form ._html-code h4,#_form_67215B4AC2451_._inline-form ._html-code h5,#_form_67215B4AC2451_._inline-form ._html-code h6,#_form_67215B4AC2451_._inline-form ._form-title{font-size:22px;line-height:normal;font-weight:600;margin-bottom:0}#_form_67215B4AC2451_._inline-form ._form-branding{font-family:"IBM Plex Sans", Helvetica, sans-serif;font-size:13px;font-weight:100;font-style:normal;text-decoration:none}#_form_67215B4AC2451_:before,#_form_67215B4AC2451_:after{content:" ";display:table}#_form_67215B4AC2451_:after{clear:both}#_form_67215B4AC2451_._inline-style{width:auto;display:inline-block}#_form_67215B4AC2451_._inline-style input[type="text"],#_form_67215B4AC2451_._inline-style input[type="date"]{padding:10px 12px}#_form_67215B4AC2451_._inline-style button._inline-style{position:relative;top:27px}#_form_67215B4AC2451_._inline-style p{margin:0}#_form_67215B4AC2451_._inline-style ._button-wrapper{position:relative;margin:27px 12.5px 0 20px}#_form_67215B4AC2451_ ._form-thank-you{position:relative;left:0;right:0;text-align:center;font-size:18px}#_form_67215B4AC2451_ ._form-pc-confirmation ._submit{margin-top:16px}@media (min-width:320px) and (max-width:667px){#_form_67215B4AC2451_._inline-form._inline-style ._inline-style._button-wrapper{margin-top:20px !important;margin-left:0 !important}}#_form_67215B4AC2451_ .iti.iti--allow-dropdown.iti--separate-dial-code{width:100%}#_form_67215B4AC2451_ .iti input{width:100%;height:32px;border:#979797 1px solid;border-radius:4px}#_form_67215B4AC2451_ .iti--separate-dial-code .iti__selected-flag{background-color:#FFFFFF;border-radius:4px}#_form_67215B4AC2451_ .iti--separate-dial-code .iti__selected-flag:hover{background-color:rgba(0, 0, 0, 0.05)}#_form_67215B4AC2451_ .iti__country-list{border-radius:4px;margin-top:4px;min-width:460px}#_form_67215B4AC2451_ .iti__country-list--dropup{margin-bottom:4px}#_form_67215B4AC2451_ .phone-error-hidden{display:none}#_form_67215B4AC2451_ .phone-error{color:#E40E49}#_form_67215B4AC2451_ .phone-input-error{border:1px solid #E40E49 !important}#_form_67215B4AC2451_._inline-form ._form-content ._form-list-subscriptions-field fieldset{margin:0;margin-bottom:1.1428571429em;border:none;padding:0}#_form_67215B4AC2451_._inline-form ._form-content ._form-list-subscriptions-field fieldset:last-child{margin-bottom:0}#_form_67215B4AC2451_._inline-form ._form-content ._form-list-subscriptions-field legend{margin-bottom:1.1428571429em}#_form_67215B4AC2451_._inline-form ._form-content ._form-list-subscriptions-field label{display:flex;align-items:flex-start;justify-content:flex-start;margin-bottom:0.8571428571em}#_form_67215B4AC2451_._inline-form ._form-content ._form-list-subscriptions-field label:last-child{margin-bottom:0}#_form_67215B4AC2451_._inline-form ._form-content ._form-list-subscriptions-field input{margin:0;margin-right:8px}#_form_67215B4AC2451_._inline-form ._form-content ._form-list-subscriptions-field ._form-checkbox-option-label{display:block;font-weight:400;margin-top:-4px}#_form_67215B4AC2451_._inline-form ._form-content ._form-list-subscriptions-field ._form-checkbox-option-label-with-description{display:block;font-weight:700;margin-top:-4px}#_form_67215B4AC2451_._inline-form ._form-content ._form-list-subscriptions-field ._form-checkbox-option-description{margin:0;font-size:0.8571428571em}#_form_67215B4AC2451_._inline-form ._form-content ._form-list-subscriptions-field ._form-subscriptions-unsubscribe-all-description{line-height:normal;margin-top:-2px}</style>

              <form method="POST" action="https://dentistswhoinvest.activehosted.com/proc.php" id="_form_67215B4AC2451_" class="_form _form_23 _inline-form  _dark" novalidate="" data-styles-version="5">
              <input type="hidden" name="u" value="67215B4AC2451" data-name="u"/>
              <input type="hidden" name="f" value="23" data-name="f"/>
              <input type="hidden" name="s" data-name="s"/>
              <input type="hidden" name="c" value="0" data-name="c"/>
              <input type="hidden" name="m" value="0" data-name="m"/>
              <input type="hidden" name="act" value="sub" data-name="act"/>
              <input type="hidden" name="v" value="2" data-name="v"/>
              <input type="hidden" name="or" value="f9223c7d4a1fffeb4d6acbacf1064d66" data-name="or"/>
              <div class="_form-content">
              <div class="_form_element _x87715369 _full_width ">
              <label for="firstname" class="_form-label">First Name</label>
              <div class="_field-wrapper">
              <input type="text" id="firstname" name="firstname" placeholder="Type your first name" data-name="firstname"/>
              <div data-lastpass-icon-root="" style="position: relative !important; height: 0px !important; width: 0px !important; float: left !important;"></div></div>

              </div>
              <div class="_form_element _x87030340 _full_width ">
              <label for="email" class="_form-label">Email*</label>
              <div class="_field-wrapper">
              <input type="text" id="email" name="email" placeholder="Type your email" required="" data-name="email"/>
              </div>

              </div>
              <div class="_button-wrapper _full_width"><button id="_form_23_submit" class="_submit" type="submit">SUBMIT &amp; DOWNLOAD</button></div>        <div class="_clear-element"></div>
              </div>
              <div class="_form-thank-you" style="display:none;"></div>
              </form>
              </div>`,
          }}
        />

        <p className="mx-6 mb-4 mt-2 text-base text-blue-primary">
          Enter your details above to receive a link you can use to download
          your FREE pdf
        </p>
      </div>
    </div>
  );
};
