import React from "react";
import { FileText, Scale, Shield, Users, Globe, Mail } from "lucide-react";

export function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 lg:mb-4">Terms and Conditions</h1>
            <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
              Please read these Terms and Conditions carefully before using our website and services.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 lg:p-8 mb-8 lg:mb-12">
            <h2 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Welcome to curate.ae</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-sm lg:text-base">
                Reem Mall provides website features and other products and services to you when you visit or shop at www.curate.ae (the "Site"), use Reem Mall products or services, use Reem Mall applications for mobile, or use software provided by Reem Mall in connection with any of the foregoing (the "Services"). Reem Mall provides the Services and sells products to you subject to the conditions set out herein. Curate.ae is the trading name for Al Farwaniya Property Developments LLC (the "Company"), the legal owner of Reem Mall.
              </p>
              <p className="mt-3 lg:mt-4 text-sm lg:text-base">
                Please read these Terms and Conditions carefully before using this Site and the Services. These Terms and Conditions shall constitute a legally binding agreement between you as the user of the Site (referred as "user", "you", "your" hereinafter) and the Company (referred to as "we", "us", "our" hereinafter).
              </p>
              <p className="mt-3 lg:mt-4 font-semibold text-sm lg:text-base">
                By continuing to use this Site and the Services provided herein, you acknowledge and agree that you have read, understood and consent to be bound by these Terms and Conditions, which may be modified or altered at any time at our discretion and without providing with any notice thereof.
              </p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-8 lg:mb-12">
            <a
              href="#conditions-of-use"
              className="bg-muted/50 rounded-lg p-4 lg:p-6 hover:bg-muted/70 transition-colors"
            >
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className="w-10 lg:w-12 h-10 lg:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 lg:h-6 w-5 lg:w-6 text-primary" />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold">Conditions of Use</h3>
              </div>
            </a>
            <a
              href="#conditions-of-sale"
              className="bg-muted/50 rounded-lg p-4 lg:p-6 hover:bg-muted/70 transition-colors"
            >
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className="w-10 lg:w-12 h-10 lg:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Scale className="h-5 lg:h-6 w-5 lg:w-6 text-primary" />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold">Conditions of Sale</h3>
              </div>
            </a>
          </div>

          {/* CONDITIONS OF USE */}
          <section id="conditions-of-use" className="mb-12 lg:mb-16">
            <div className="bg-muted/50 rounded-lg p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 flex items-center space-x-3">
                <FileText className="h-6 lg:h-8 w-6 lg:w-8 text-primary" />
                <span>CONDITIONS OF USE</span>
              </h2>
              
              <p className="text-sm lg:text-base text-muted-foreground mb-4 lg:mb-6">
                Please read these conditions carefully before using the Services. By using the Services, you signify your agreement to be bound by these conditions.
              </p>

              {/* Use of Personal Information */}
              <div className="mb-6 lg:mb-8">
                <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4 flex items-center space-x-2">
                  <Shield className="h-4 lg:h-5 w-4 lg:w-5 text-primary" />
                  <span>Use of Personal Information</span>
                </h3>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="text-sm lg:text-base">We understand how sharing your personal information is rather a sensitive matter that shall be dealt with carefully and wisely.</p>
                  <p className="text-sm lg:text-base">We are strongly committed to respecting and protecting your privacy and complying with your choices. The personal information you provide (directly or through third parties), or which is automatically generated and collected by us, is safeguarded according to the highest privacy standards developed internationally through our compliance with the terms and conditions of the Privacy Policy, which is part of and incorporated into these Terms and Conditions of the Site.</p>
                </div>
              </div>

              {/* Intellectual Property Rights */}
              <div className="mb-6 lg:mb-8">
                <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4">Intellectual Property Rights and Claims</h3>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="text-sm lg:text-base">All content, including but not limited to texts, graphics, logos, button icons, images, audio clips, digital downloads, and data compilations, that is included in or made available through the Site is the exclusive property of the Company and/or the content providers, and is protected by the United Arab Emirates and international copyright, author's rights, and database rights, trademark, patent, trade secret and any other applicable intellectual property or property right laws.</p>
                  <p className="text-sm lg:text-base">Without our express prior written consent, you may not extract or re-utilize or regenerate any of the information used or displayed on the Site.</p>
                  <p className="text-sm lg:text-base">As we affirm the importance of the protection and respect of intellectual rights against any infringement by others, if you believe that your intellectual property rights or any intellectual property rights made available or displayed on our Site have been used in a way that rises concerns of infringement, please contact our Customer Services.</p>
                </div>
              </div>

              {/* Licence */}
              <div className="mb-6 lg:mb-8">
                <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4">Licence</h3>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="text-sm lg:text-base">Subject to the Terms and Conditions provided herein and your compliance with our Services, the Company shall grant you a limited, revocable, non-exclusive, non-transferable, non-sublicensable, non-commercial licence to access, and use and browse this Site.</p>
                  <p className="text-sm lg:text-base">Your use of the Site shall be limited only to a certain extent as permitted by our regulations and applicable law. You further understand that you shall not be entitled to the following:</p>
                  <ul className="list-disc pl-6 mt-3 lg:mt-4 space-y-1 lg:space-y-2 text-sm lg:text-base">
                    <li>Reproduce, decompile, duplicate, reverse engineer, disassemble, decrypt the Site.</li>
                    <li>Make any modification or alternation to the Site.</li>
                    <li>Copy, sell, resell, exploit any material displayed on the Site for any commercial purpose or send any unsolicited commercial e-mails</li>
                    <li>Enclose or obscure any trademark or logo or any other proprietary information by using any meta tags or any other "hidden text" (including but not limited to images, text, audios, videos, page layout).</li>
                    <li>Violate any applicable laws, rules, or regulations in connection with your access or use of the Site.</li>
                  </ul>
                </div>
              </div>

              {/* Disclaimer of Warranties */}
              <div className="mb-6 lg:mb-8">
                <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4">Disclaimer of Warranties and Limitation of Liability</h3>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="text-sm lg:text-base">Any products or services made available to you through our Services, are provided by the Company on an "as is" basis and are subject to change and availability. The Company makes no representations or warranties of any kind, express or implied, including but not limited to the operation of our Services or the information, content, material, or products displayed on our Site.</p>
                  <p className="text-sm lg:text-base">While every effort is made to secure the availability of our Site without any interruptions, due to the nature of the internet, this matter cannot be fully controlled nor guaranteed. You understand that your access to our Services shall be occasionally interrupted for repairs and maintenance purposes.</p>
                  <p className="text-sm lg:text-base">To the full extent permitted by law, the Company shall not be responsible or liable for any damages, including without limitation to any direct, or indirect, or consequential losses or expenses arising out of or in connection to the use of this Site or inability to use, or reliance on any content displayed on the Site, or any delay or failure of transmission and/or delivery of the products, or any computing interruptions or viruses or system failures.</p>
                </div>
              </div>

              {/* Users Guide and Representations */}
              <div className="mb-6 lg:mb-8">
                <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4 flex items-center space-x-2">
                  <Users className="h-4 lg:h-5 w-4 lg:w-5 text-primary" />
                  <span>Users Guide and Representations</span>
                </h3>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="text-sm lg:text-base">By granting you access to our Site, you shall represent and warrant the following:</p>
                  <ul className="list-disc pl-6 mt-3 lg:mt-4 space-y-1 lg:space-y-2 text-sm lg:text-base">
                    <li>All the information submitted by your side is true and accurate and current, and you shall maintain the accuracy of such information by updating it as required, as the inaccuracy of your information may lead to the suspension of your account.</li>
                    <li>You have the legal capacity to understand and agree with these Terms and Conditions.</li>
                    <li>If you are under the age of 18, you shall use our Services under the supervision of a parent or a guardian.</li>
                    <li>You shall not use our Services for any unauthorized or illegal purposes.</li>
                  </ul>
                </div>
              </div>

              {/* Review and Control of Comments */}
              <div className="mb-6 lg:mb-8">
                <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4">Review and Control of Comments</h3>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="text-sm lg:text-base">As we highly value your feedback for our utmost success, we shall encourage you at your sole discretion, to provide suggestions, comments, questions to us with respect to our products and services. When you provide us with your feedback, you are doing so voluntarily and without any compensation to you or without any restrictions on how we may, if at all, incorporate that feedback on our Site given that the content is not illegal, abusive or injurious, defamatory, threatening, invasive of privacy and infringing to any intellectual property rights.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CONDITIONS OF SALE */}
          <section id="conditions-of-sale" className="mb-12 lg:mb-16">
            <div className="bg-muted/50 rounded-lg p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 flex items-center space-x-3">
                <Scale className="h-6 lg:h-8 w-6 lg:w-8 text-primary" />
                <span>CONDITIONS OF SALE</span>
              </h2>
              
              <p className="text-sm lg:text-base text-muted-foreground mb-4 lg:mb-6">
                Please read these conditions carefully before using the Services and placing an order with the Company. By placing an order, you signify your agreement to be bound by these conditions.
              </p>

              {/* Online Marketplace */}
              <div className="mb-6 lg:mb-8">
                <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4">Online Marketplace</h3>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="text-sm lg:text-base">The Company shall offer you an online marketplace, an e-commerce Site, whereby you are connected with vendors (the "Vendor(s)").</p>
                  <p className="text-sm lg:text-base">Transactions made using our Site may allow us and other Vendors to list and sell products, as Vendors may operate stores, provide services, or sell product lines on our Site.</p>
                  <p className="text-sm lg:text-base">The information and materials displayed and contained on this Site are subject to change and availability. Some products or merchandise may not be always accessible or available due to demographic characteristics or to a stockout, you shall understand that we will always inform you of the unavailability of any product.</p>
                  <p className="text-sm lg:text-base">By using our Site, you may be asked to create or log-in to your own account that shall have a valid payment method associated with it. You shall claim full responsibility for maintaining the confidentiality of your account information and for the activities that occur under your account.</p>
                </div>
              </div>

              {/* Orders */}
              <div className="mb-6 lg:mb-8">
                <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4">Orders</h3>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="text-sm lg:text-base">When you place an order with us (the "Order"), we will confirm your order by sending you a confirmation email containing the Order receipt. Where applicable, Orders will include delivery fees and any applicable tax (e.g., goods and services tax, value-added tax, etc.).</p>
                  <p className="text-sm lg:text-base">Some of our Services require a minimum order value (the "MOV") before an Order can be placed and delivered to you. Where an applicable Order fails to meet the MOV, you will have the option of paying the difference to meet the MOV or to add more goods or products to your Order.</p>
                  <p className="text-sm lg:text-base">When placing an Order on our Site, you shall follow the onscreen instructions provided. You may be required to provide additional details for us to complete your Order, and you shall review and confirm that all the information you provide, including the amounts, delivery details, personal details, payment information, and voucher codes (if applicable) is true, accurate and complete before you place your Order.</p>
                  <p className="text-sm lg:text-base">An Order is successfully placed when you receive an email confirmation containing your Order receipt from us.</p>
                </div>
              </div>

              {/* Payments and Prices */}
              <div className="mb-6 lg:mb-8">
                <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4">Payments and Prices</h3>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="text-sm lg:text-base">Prices quoted on the Site shall be displayed in the national currency of the United Arab Emirates, and subject to applicable tax. Prices on the Site may vary from the prices offered by our Vendors, and you accept that offers offered by our Vendors. The prices displayed on our Site may include or exclude VAT or such equivalent tax.</p>
                  <p className="text-sm lg:text-base">You can choose to pay for an Order using any of the different payment methods offered on the Site including:</p>
                  <ul className="list-disc pl-6 mt-3 lg:mt-4 space-y-1 lg:space-y-2 text-sm lg:text-base">
                    <li>Our payment partners, Visa, Mastercard, American Express, Google Pay, PayPal, Apple Pay;</li>
                    <li>Any other payment method we may offer from time to time.</li>
                  </ul>
                </div>
              </div>

              {/* Delivery of Goods */}
              <div className="mb-6 lg:mb-8">
                <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4">Delivery of Goods</h3>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="text-sm lg:text-base">As we are always seeking to bestow you with the best shopping experience, we shall provide you with professional delivery services in the United Arab Emirates.</p>
                  <p className="text-sm lg:text-base">Delivery of your goods shall be handled by a third-party delivery courier to the address information you provide us with.</p>
                  <p className="text-sm lg:text-base">An estimated delivery time will be provided to you via an email confirmation. However, you agree that due to major unforeseeable operational disruptions owing to without limitation to shortage of raw materials, workers, strikes, traffic, lockdowns, delay, official control measures and events of force majeure in delivery or non-delivery by the delivery carrier may occur, and we shall not bear any responsibility or liability thereof.</p>
                </div>
              </div>

              {/* Discounts and Promotions */}
              <div className="mb-6 lg:mb-8">
                <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4">Discounts and Promotions and Vouchers</h3>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="text-sm lg:text-base">We may run occasionally marketing and promotional campaigns where voucher codes, discounts, promotions may be offered to be used on our Site. Promotional offers or vouchers are subject to validity periods, periods, and in some they may only be used once.</p>
                  <p className="text-sm lg:text-base">When used in conjunction with other promotional means or offers, vouchers may not be valid, and unless otherwise stated, discounts and promotions and vouchers can only be used on our Site.</p>
                  <p className="text-sm lg:text-base">Vouchers cannot be replaced with cash, and we shall reserve the right to void, discontinue or reject the use of any Voucher without prior notice when deemed reasonably fit.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Legal Information */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
              <Globe className="h-6 w-6 text-primary" />
              <span>Governing Law and Jurisdiction</span>
            </h2>
            <div className="prose max-w-none text-muted-foreground">
              <p>These conditions are governed by and construed in accordance with the laws of Abu Dhabi, United Arab Emirates. If any dispute, claim, difference or controversy arising out of, relating to or having any connection with these conditions, including as it may relate in any way to your use of any Services, or to any products or services sold or distributed by the Company or through curate.ae, or the existence, validity, interpretation, performance, breach or termination and/or any dispute relating to any non-contractual obligations arising out of or in connection with them shall be settled by the exclusive jurisdiction of the courts of the Emirate of Abu Dhabi, United Arab Emirates.</p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4 flex items-center justify-center space-x-2">
              <Mail className="h-5 w-5 text-primary" />
              <span>Our Contact Details</span>
            </h3>
            <div className="prose max-w-none text-muted-foreground text-center">
              <p>This Site is owned and maintained by the Company. Our contact details are:</p>
              <p className="font-semibold">
                Reem Mall, First Floor, Management Office, behind Home Centre, Abu Dhabi, United Arab Emirates
              </p>
              <p>
                <a href="mailto:care@reemmall.ae" className="text-primary hover:underline">care@reemmall.ae</a>
              </p>
              <p>
                <a href="https://www.curate.ae" className="text-primary hover:underline">https://www.curate.ae</a>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="/faq"
                className="inline-flex items-center justify-center px-6 py-3 border border-input bg-background rounded-md hover:bg-muted transition-colors"
              >
                View FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 