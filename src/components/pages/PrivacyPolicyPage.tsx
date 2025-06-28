import React from "react";
import { Shield, Eye, Lock, Users, Globe, Mail, Database, FileText } from "lucide-react";

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We are committed to protecting your privacy and ensuring the security of your personal information.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Overview Section */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-3">
              <Shield className="h-7 w-7 text-primary" />
              <span>Overview</span>
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                At curate.ae, we are strongly committed to respecting and protecting your privacy and complying with your choices. The personal information you provide (directly or through third parties), or which is automatically generated and collected by us, is safeguarded according to the highest privacy standards developed internationally through our compliance with the terms and conditions of this Privacy Policy, which is part of and incorporated into the General Terms and Conditions of the website. This Privacy Policy is in line with the provisions of the UAE Federal Decree-Law No. 45 of 2021 regarding the Protection of Personal Data (PDPL).
              </p>
              <p className="mt-4">
                By accessing or using our website, you expressly consent and agree to the collection, transfer, processing, use and storage in accordance with this Privacy Policy of any personal information which may be obtained as a result of your accessing or us of the website, any of which may occur either or both inside and outside of the United Arab Emirates. If you do not agree with the provisions of this policy, please do not access the website.
              </p>
              <p className="mt-4 font-semibold">
                Please read this Privacy Policy carefully to understand our practices regarding the collection, use, protection, and disclosure of your personal information.
              </p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <a
              href="#personal-information"
              className="bg-muted/50 rounded-lg p-6 hover:bg-muted/70 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Personal Information</h3>
              </div>
            </a>
            <a
              href="#how-we-use"
              className="bg-muted/50 rounded-lg p-6 hover:bg-muted/70 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">How We Use It</h3>
              </div>
            </a>
            <a
              href="#third-party"
              className="bg-muted/50 rounded-lg p-6 hover:bg-muted/70 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Third-Party Services</h3>
              </div>
            </a>
            <a
              href="#protection"
              className="bg-muted/50 rounded-lg p-6 hover:bg-muted/70 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Data Protection</h3>
              </div>
            </a>
            <a
              href="#children"
              className="bg-muted/50 rounded-lg p-6 hover:bg-muted/70 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Children's Privacy</h3>
              </div>
            </a>
            <a
              href="#contact"
              className="bg-muted/50 rounded-lg p-6 hover:bg-muted/70 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Contact Us</h3>
              </div>
            </a>
          </div>

          {/* Personal Information */}
          <section id="personal-information" className="mb-16">
            <div className="bg-muted/50 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-8 flex items-center space-x-3">
                <Database className="h-8 w-8 text-primary" />
                <span>Personal Information</span>
              </h2>

              {/* Information We Collect */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Information We Collect When You Register</h3>
                <div className="prose max-w-none text-muted-foreground">
                  <p>When you register to benefit from our services rendered, you will need to register with curate.ae, and we may gather such information as, amongst others:</p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Your name, email address, demographic information</li>
                    <li>Postal and billing addresses</li>
                    <li>Date of birth, gender</li>
                    <li>Passport or ID number</li>
                    <li>Account login details, such as username and password (encrypted)</li>
                    <li>IP address, your interests, preferences, and other profiling information</li>
                  </ul>
                </div>
              </div>

              {/* Online Shopping Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Information We Collect When You Shop</h3>
                <div className="prose max-w-none text-muted-foreground">
                  <p>When you shop with us online, browse our website, we may collect:</p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Information about your online purchases and payment details</li>
                    <li>Your online browsing behavior</li>
                    <li>Your devices used to access the website</li>
                    <li>Your precise geolocation</li>
                  </ul>
                </div>
              </div>

              {/* Other Sources */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Other Sources of Personal Information</h3>
                <div className="prose max-w-none text-muted-foreground">
                  <p>We may also use personal information from other sources, such as specialist companies that supply information, online media channels, our partners and public registers. We may collect the following types of personal information about you from other sources:</p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Contact details</li>
                    <li>Credit history</li>
                    <li>Purchases</li>
                    <li>Interests, preferences</li>
                    <li>Other types of publicly available information</li>
                  </ul>
                  <p className="mt-4">We may be required by law to collect personal information about you or as a consequence of any contractual relationship we have with you.</p>
                </div>
              </div>

              {/* Cookies and Technologies */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Cookies and Other Technologies</h3>
                <div className="prose max-w-none text-muted-foreground">
                  <p>Information may be collected by "cookies" and other technologies. We use "cookies" and other technologies to collect information and support certain features of the website. For example, we may use these technologies to:</p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Collect information about the ways visitors use the website - which pages they visit, which links they use, and how long they stay on each page</li>
                    <li>Support the features and functionality of the website - for example, to save you the trouble of re-entering information already in our database or to prompt the settings you established on previous visits</li>
                    <li>Personalize your experience when you use the website</li>
                    <li>Improve our marketing efforts, including through use of targeted advertising</li>
                  </ul>
                  <p className="mt-4">The information we collect using cookies and similar technologies is not, in and of itself, personally identifiable, but we may link it to personal information that you provide. If you do not wish to receive cookies, you may set your browser to reject cookies or to alert you when a cookie is placed on your computer. Although you are not required to accept cookies when you visit the website, you may be unable to use all of the functionality of the website if your browser rejects our cookies.</p>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section id="how-we-use" className="mb-16">
            <div className="bg-muted/50 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-8 flex items-center space-x-3">
                <Eye className="h-8 w-8 text-primary" />
                <span>How Do We Use It?</span>
              </h2>

              <div className="prose max-w-none text-muted-foreground mb-6">
                <p>Our goal in collecting personal information is to provide you with an efficient and customized experience. This allows us to enhance your online shopping experience, by providing products and services that meet your needs and making your use of our website more satisfying.</p>
              </div>

              {/* Primary Uses */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">We use your information in several ways:</h3>
                <div className="prose max-w-none text-muted-foreground">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To provide the information, products and services you request</li>
                    <li>To better understand your needs and interests</li>
                    <li>To provide you with a personalized experience when you use this website</li>
                    <li>To conduct internal research on our user's demographics, interests, and site usage, to better understand and service you</li>
                    <li>To provide you with effective customer service</li>
                    <li>To improve the content, functionality and usability of this website</li>
                    <li>To contact you with information and notices related to your use of this website</li>
                    <li>To contact you with special offers and other information we believe will be of interest to you (in accordance with any preferences you have expressed to us)</li>
                    <li>To invite you to participate in surveys and provide feedback to us (in accordance with any preferences you have expressed to us)</li>
                    <li>To improve our products and services</li>
                    <li>To improve our marketing and promotional efforts</li>
                    <li>To respond to any queries made by you</li>
                    <li>To comply with legal requirements and exercise or defend legal claims</li>
                    <li>To process your payments and protect against fraudulent transactions</li>
                    <li>For any other purpose identified in any other agreement between you and us</li>
                  </ul>
                </div>
              </div>

              {/* Information Sharing */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Information Sharing</h3>
                <div className="prose max-w-none text-muted-foreground">
                  <p>We may share user information with businesses affiliated with curate.ae. By using our website, you hereby consent that the businesses affiliated they may use this information as we would, and you may occasionally receive product and service information from them.</p>
                  <p className="mt-4">If you would like to inquire about the information shared with our businesses affiliated, please let us know by sending an email to the following address: info@reemmall.ae.</p>
                  <p className="mt-4">We may also use your information to deliver information to you that, in some cases, is targeted to your interests. If you do not wish to receive email from us, please let us know by sending an email to info@reemmall.ae.</p>
                  <p className="mt-4">Finally, we may share user information with outside vendors and organizations that provide support services to us or that help us with our marketing programs. If you would like to inquire about the information shared with our businesses affiliated, please let us know by sending an email to the following address: info@reemmall.ae.</p>
                  <p className="mt-4 font-semibold">At no time will we share credit card (or payment details) or social security numbers in any fashion other than aggregate demographic information, or as required by law.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Third-Party Services */}
          <section id="third-party" className="mb-16">
            <div className="bg-muted/50 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-8 flex items-center space-x-3">
                <Globe className="h-8 w-8 text-primary" />
                <span>Third-Party Services</span>
              </h2>

              <div className="prose max-w-none text-muted-foreground">
                <p>We work with carefully selected third-party providers that carry out certain functions on our behalf. These include, for example, companies that help us with technology services, storing and combining data, processing payments, and delivering orders. We only share personal information that enables our third-party providers to provide their services or to perform the services they provide to us.</p>
                
                <p className="mt-4">Some of the third-party providers we work with operate online media channels, and they place relevant online advertising for our products and services, as well as those of our suppliers and our retail partners, on those online media channels on our behalf.</p>
                
                <p className="mt-4">However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions. For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.</p>
                
                <p className="mt-4">In particular, remember that certain providers may be located in or have facilities that are located a different jurisdiction than either you or us. So, if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.</p>
              </div>

              {/* Links */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Links to Third-Party Websites</h3>
                <div className="prose max-w-none text-muted-foreground">
                  <p>When you are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website's General Terms and Conditions.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Protection of Personal Information */}
          <section id="protection" className="mb-16">
            <div className="bg-muted/50 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-8 flex items-center space-x-3">
                <Lock className="h-8 w-8 text-primary" />
                <span>Protection of Personal Information</span>
              </h2>

              <div className="prose max-w-none text-muted-foreground">
                <p>To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed. Where a high-risk is imposed in processing your personal information, a sufficiently skilled and knowledgeable Data Protection Officer (DPO) may be appointed to ensure that all personal information or data processed are in compliance with the applicable data protection rules. However, you shall also understand that no internet-based site can be 100% secure and we cannot be held responsible for unauthorized or unintended access that is beyond our control.</p>
                
                <p className="mt-4">If you provide us with your credit card information, the information is encrypted using secure socket layer technology (SSL) and web sited with an AES-256 encryption. Although no method of transmission over the Internet or electronic storage is 100% secure, we follow all PCI-DSS requirements and implement additional generally accepted industry standards.</p>
              </div>
            </div>
          </section>

          {/* Children's Privacy */}
          <section id="children" className="mb-16">
            <div className="bg-muted/50 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-8 flex items-center space-x-3">
                <Users className="h-8 w-8 text-primary" />
                <span>Children under the Age of Thirteen</span>
              </h2>

              <div className="prose max-w-none text-muted-foreground">
                <p>The website is not intended for children or minors under the age of thirteen years. If you are providing personal information for an individual less than 13 years of age, you are providing us your affirmative parental consent as the legal parent or guardian to collect, use and process the information of the individual less than 13 years of age, consistent with this Privacy Policy.</p>
              </div>
            </div>
          </section>

          {/* Changes to Privacy Policy */}
          <section className="mb-16">
            <div className="bg-muted/50 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-8 flex items-center space-x-3">
                <FileText className="h-8 w-8 text-primary" />
                <span>Changes to this Privacy Policy</span>
              </h2>

              <div className="prose max-w-none text-muted-foreground">
                <p>We reserve the right to modify this Privacy Policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this Privacy Policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.</p>
                
                <p className="mt-4">If our website is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.</p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section id="contact" className="mb-16">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-8 flex items-center space-x-3">
                <Mail className="h-8 w-8 text-primary" />
                <span>Questions and Contact Information</span>
              </h2>

              <div className="prose max-w-none text-muted-foreground">
                <p>If you would like to:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Access, correct, amend, or delete any personal information we have about you</li>
                  <li>Register a complaint</li>
                  <li>Simply want more information about this privacy policy or your personal information</li>
                </ul>
                <p className="mt-4">Contact our Privacy Compliance Officer at <a href="mailto:info@reemmall.ae" className="text-primary hover:underline font-semibold">info@reemmall.ae</a>.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}