import { useState, useEffect, useRef } from 'react';

// Hook for intersection observer animations
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-midnight/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-sage to-success flex items-center justify-center">
              <img
  src="/logo.png"
  alt="THE48HOUR Logo"
  className="h-6 sm:h-8 w-auto"
/>

            </div>
            <span className="text-cloud font-semibold text-lg sm:text-xl tracking-tight">the48hours</span>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-stone hover:text-cloud transition-colors duration-300 text-sm font-medium">How it Works</a>
            <a href="#services" className="text-stone hover:text-cloud transition-colors duration-300 text-sm font-medium">Services</a>
            <a href="#pricing" className="text-stone hover:text-cloud transition-colors duration-300 text-sm font-medium">Pricing</a>
            <a href="#contact" className="px-5 py-2.5 bg-sage hover:bg-success text-white rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-sage/20">
              Start Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-cloud p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-charcoal/95 backdrop-blur-md rounded-lg mb-4 p-4 animate-scale-in">
            <div className="flex flex-col gap-4">
              <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-stone hover:text-cloud transition-colors duration-300 text-sm font-medium">How it Works</a>
              <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-stone hover:text-cloud transition-colors duration-300 text-sm font-medium">Services</a>
              <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-stone hover:text-cloud transition-colors duration-300 text-sm font-medium">Pricing</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="px-5 py-2.5 bg-sage hover:bg-success text-white rounded-lg font-medium text-sm transition-all duration-300 text-center">
                Start Now
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const timelineSteps = ['Idea', 'Build', 'Launch', 'Success'];
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % timelineSteps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-midnight overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-sage/10 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-success/10 rounded-full blur-3xl animate-pulse-soft delay-500"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-gradient-radial from-charcoal/50 to-transparent rounded-full"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#F8FAFC 1px, transparent 1px), linear-gradient(90deg, #F8FAFC 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-charcoal/50 border border-stone/20 mb-6 sm:mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
            <span className="text-stone text-xs sm:text-sm font-medium">Launching ideas since 2024</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-cloud leading-tight mb-4 sm:mb-6 animate-fade-in-up delay-100">
            Your idea deserves to exist.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage to-success">We launch it in 48 hours.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg lg:text-xl text-stone max-w-3xl mx-auto mb-8 sm:mb-12 animate-fade-in-up delay-200 px-4">
            Most ideas fail because execution takes too long. We remove delays, confusion, and uncertainty — and turn your idea into a real website or web app in just 48 hours.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-20 animate-fade-in-up delay-300">
            <a href="#contact" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-sage hover:bg-success text-white rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-xl hover:shadow-sage/30 hover:-translate-y-1">
              Start My 48-Hour Launch
            </a>
            <a href="#how-it-works" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-stone/30 text-cloud rounded-xl font-medium text-base sm:text-lg hover:bg-charcoal/50 transition-all duration-300 flex items-center justify-center gap-2">
              See how it works
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Timeline Animation */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 animate-fade-in-up delay-400">
            {timelineSteps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`flex flex-col items-center transition-all duration-500 ${
                  index === activeStep ? 'scale-110' : 'scale-100 opacity-50'
                }`}>
                  <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-2 transition-all duration-500 ${
                    index === activeStep 
                      ? 'bg-sage text-white shadow-lg shadow-sage/40' 
                      : index < activeStep 
                        ? 'bg-success/20 text-success' 
                        : 'bg-charcoal text-stone'
                  }`}>
                    {index < activeStep ? (
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-sm sm:text-base font-semibold">{index + 1}</span>
                    )}
                  </div>
                  <span className={`text-xs sm:text-sm font-medium transition-colors duration-500 ${
                    index === activeStep ? 'text-cloud' : 'text-stone'
                  }`}>{step}</span>
                </div>
                {index < timelineSteps.length - 1 && (
                  <div className={`w-8 sm:w-16 h-0.5 mx-1 sm:mx-2 transition-colors duration-500 ${
                    index < activeStep ? 'bg-success' : 'bg-charcoal'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-stone/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-2.5 bg-sage rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorksSection() {
  const { ref, isInView } = useInView(0.2);
  
  const steps = [
    { title: 'You bring the idea', description: 'Share your vision. No tech knowledge required.', icon: '💡' },
    { title: 'We design and build instantly', description: 'Our team starts crafting your website immediately.', icon: '⚡' },
    { title: 'You review and refine', description: 'Quick feedback loop ensures it\'s exactly right.', icon: '✨' },
    { title: 'You launch in 48 hours', description: 'Go live and start growing your business.', icon: '🚀' },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 lg:py-32 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, #F8FAFC 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-bold text-cloud mb-4 sm:mb-6 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Four steps. 48 hours. <span className="text-sage">Done.</span>
          </h2>
          <p className={`text-base sm:text-lg lg:text-xl text-stone max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            While others deliberate, you'll already be live.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.title}
              className={`group relative bg-midnight/50 rounded-2xl p-6 sm:p-8 border border-stone/10 hover:border-sage/30 transition-all duration-500 hover:-translate-y-2 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 sm:w-10 sm:h-10 bg-sage rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg shadow-sage/30">
                {index + 1}
              </div>
              <div className="text-3xl sm:text-4xl mb-4 sm:mb-6">{step.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-cloud mb-2 sm:mb-3">{step.title}</h3>
              <p className="text-sm sm:text-base text-stone">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why 48 Hours Section
function Why48HoursSection() {
  const { ref, isInView } = useInView(0.2);
  
  const painPoints = [
    { pain: 'Execution delays', solution: 'We start building the moment you say yes.' },
    { pain: 'Overthinking', solution: 'Clear process. No paralysis.' },
    { pain: 'Slow agencies', solution: 'We move in hours, not months.' },
    { pain: 'Missed opportunities', solution: 'Your competitors wait. You launch.' },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-midnight relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sage to-transparent opacity-30"></div>
      
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-bold text-cloud mb-4 sm:mb-6 transition-all duration-700 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              Every extra day costs <span className="text-sage">momentum.</span>
            </h2>
            <p className={`text-base sm:text-lg lg:text-xl text-stone mb-6 sm:mb-8 transition-all duration-700 delay-100 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              Speed wins markets. While you're waiting for "the right time," someone else is already live. We exist to protect your time and transform your ideas into reality — fast.
            </p>
            <div className={`inline-flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-charcoal rounded-xl border border-sage/20 transition-all duration-700 delay-200 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sage/20 rounded-lg flex items-center justify-center">
                <span className="text-sage text-xl sm:text-2xl font-bold">48</span>
              </div>
              <div>
                <p className="text-cloud font-semibold text-sm sm:text-base">Hours to launch</p>
                <p className="text-stone text-xs sm:text-sm">Not weeks. Not months.</p>
              </div>
            </div>
          </div>

          {/* Right Content - Pain Points */}
          <div className="space-y-4 sm:space-y-6">
            {painPoints.map((item, index) => (
              <div 
                key={item.pain}
                className={`flex items-start gap-4 p-4 sm:p-5 bg-charcoal/50 rounded-xl border border-stone/10 hover:border-sage/20 transition-all duration-500 ${
                  isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-stone text-sm sm:text-base line-through mb-1">{item.pain}</p>
                  <p className="text-cloud text-sm sm:text-base font-medium flex items-center gap-2">
                    <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const { ref, isInView } = useInView(0.2);
  
  const services = [
    { name: 'Landing Pages', desc: 'Convert visitors into customers', icon: '📄' },
    { name: 'Business Websites', desc: 'Professional online presence', icon: '🏢' },
    { name: 'Startup MVPs', desc: 'Test your idea fast', icon: '🚀' },
    { name: 'Advanced Web Apps', desc: 'Complex functionality made simple', icon: '⚙️' },
    { name: 'Admin Dashboards', desc: 'Manage your business efficiently', icon: '📊' },
    { name: 'Booking Systems', desc: 'Automate appointments', icon: '📅' },
    { name: 'Custom Requirements', desc: 'We build what you imagine', icon: '✨' },
  ];

  return (
    <section id="services" className="py-16 sm:py-24 lg:py-32 bg-charcoal relative overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className={`inline-block px-4 py-1.5 bg-sage/10 text-sage rounded-full text-xs sm:text-sm font-medium mb-4 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Delivered in 48 hours (scope-based)
          </span>
          <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-bold text-cloud mb-4 sm:mb-6 transition-all duration-700 delay-100 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            What we build
          </h2>
          <p className={`text-base sm:text-lg lg:text-xl text-stone max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            From simple landing pages to complex web applications — all delivered with the same commitment to speed and quality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <div
              key={service.name}
              className={`group p-5 sm:p-6 bg-midnight/50 rounded-2xl border border-stone/10 hover:border-sage/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-sage/5 cursor-pointer ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${300 + index * 50}ms` }}
            >
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
              <h3 className="text-base sm:text-lg font-semibold text-cloud mb-1 sm:mb-2">{service.name}</h3>
              <p className="text-xs sm:text-sm text-stone">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing Section
function PricingSection() {
  const { ref, isInView } = useInView(0.2);
  
  const plans = [
    { 
      name: 'Starter', 
      price: '₹1000+', 
      description: 'Landing page with fast launch',
      features: ['Single page design', 'Mobile responsive', 'Fast loading', '48-hour delivery'],
      popular: false
    },
    { 
      name: 'Growth', 
      price: 'Custom', 
      description: 'Business website with integrations',
      features: ['Multi-page website', 'Contact forms', 'SEO optimized', 'Analytics setup'],
      popular: true
    },
    { 
      name: 'Scale', 
      price: 'Requirement-based', 
      description: 'Advanced web applications',
      features: ['Complex functionality', 'User authentication', 'Database integration', 'Admin panel'],
      popular: false
    },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 lg:py-32 bg-midnight relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 to-transparent opacity-50"></div>
      
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-bold text-cloud mb-4 sm:mb-6 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Transparent pricing
          </h2>
          <p className={`text-base sm:text-lg lg:text-xl text-stone max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            No hidden costs. Clear scope. Fast delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative p-6 sm:p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-2 ${
                plan.popular 
                  ? 'bg-gradient-to-b from-sage/10 to-midnight border-sage/30 shadow-xl shadow-sage/10' 
                  : 'bg-charcoal/50 border-stone/10 hover:border-sage/20'
              } ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-sage text-white text-xs sm:text-sm font-medium rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-lg sm:text-xl font-semibold text-cloud mb-2">{plan.name}</h3>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sage mb-2">{plan.price}</div>
              <p className="text-sm sm:text-base text-stone mb-6 sm:mb-8">{plan.description}</p>
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-stone text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <a 
                href="#contact" 
                className={`block w-full py-3 sm:py-4 rounded-xl font-semibold text-center transition-all duration-300 text-sm sm:text-base ${
                  plan.popular 
                    ? 'bg-sage hover:bg-success text-white hover:shadow-lg hover:shadow-sage/30' 
                    : 'border border-stone/30 text-cloud hover:bg-charcoal'
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Success Story Section
function SuccessStorySection() {
  const { ref, isInView } = useInView(0.2);
  
  const storySteps = [
    { icon: '💭', title: 'Idea in the mind', desc: 'You have a vision that keeps you up at night.' },
    { icon: '🌐', title: 'Website goes live', desc: '48 hours later, your idea exists on the internet.' },
    { icon: '📈', title: 'Confidence builds', desc: 'Real visitors. Real feedback. Real traction.' },
    { icon: '🎯', title: 'Business grows', desc: 'What started as an idea becomes your reality.' },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-charcoal relative overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-bold text-cloud mb-4 sm:mb-6 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            From idea to <span className="text-sage">success</span>
          </h2>
          <p className={`text-base sm:text-lg lg:text-xl text-stone max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            This is the journey we help you take.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-sage/30 to-transparent -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {storySteps.map((step, index) => (
              <div
                key={step.title}
                className={`relative text-center p-6 sm:p-8 bg-midnight/50 rounded-2xl border border-stone/10 transition-all duration-500 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">{step.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-cloud mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-sm sm:text-base text-stone">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 bg-midnight relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-sage/5 rounded-full blur-3xl"></div>
      </div>
      
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center bg-charcoal/50 rounded-3xl p-8 sm:p-12 lg:p-16 border border-stone/10">
          <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-bold text-cloud mb-4 sm:mb-6 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Ready to launch your idea?
          </h2>
          <p className={`text-base sm:text-lg lg:text-xl text-stone max-w-2xl mx-auto mb-8 sm:mb-10 transition-all duration-700 delay-100 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Don't let another day pass without taking action. Your competition isn't waiting, and neither should you.
          </p>

          <div className={`mb-8 sm:mb-12 transition-all duration-700 delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <p className="text-stone mb-2 text-sm sm:text-base">Speak directly with</p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-cloud">Mr. Lucky Varandani</p>
            <a href="tel:8401635015" className="inline-flex items-center gap-2 text-sage hover:text-success text-lg sm:text-xl lg:text-2xl font-semibold mt-2 transition-colors duration-300">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              8401635015
            </a>
          </div>

          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <a 
              href="https://wa.me/918401635015?text=Hi%2C%20I%20want%20to%20launch%20my%20idea%20in%2048%20hours!" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#25D366]/30 hover:-translate-y-1"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Launch my idea in 48 hours
            </a>
            <a 
              href="tel:8401635015" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border border-stone/30 text-cloud hover:bg-charcoal rounded-xl font-semibold text-base sm:text-lg transition-all duration-300"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-8 sm:py-12 bg-charcoal border-t border-stone/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sage to-success flex items-center justify-center">
              <span className="text-white font-bold text-sm">48</span>
            </div>
            <span className="text-cloud font-semibold text-lg">the48hours</span>
          </div>
          <p className="text-stone text-sm sm:text-base">Built fast. Built right.</p>
          <p className="text-stone/60 text-xs sm:text-sm">© 2024 the48hours. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Floating WhatsApp Button
function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918401635015?text=Hi%2C%20I%20want%20to%20launch%20my%20idea%20in%2048%20hours!"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 whatsapp-pulse"
      aria-label="Contact on WhatsApp"
    >
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

// Main App Component
export function App() {
  return (
    <div className="min-h-screen bg-midnight font-inter">
      <Navigation />
      <HeroSection />
      <HowItWorksSection />
      <Why48HoursSection />
      <ServicesSection />
      <PricingSection />
      <SuccessStorySection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
