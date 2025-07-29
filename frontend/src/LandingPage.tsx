import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { FaClinicMedical, FaHeartbeat, FaProcedures, FaBaby, FaStethoscope, FaShieldAlt } from 'react-icons/fa';
import { MdEmergency, MdPeople, MdMedicalServices, MdAccessibility } from 'react-icons/md';
import { GiMedicines } from 'react-icons/gi';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* Hero Section with Doctor Image */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-32 px-6 text-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Compassionate Care, <span className="text-blue-300">Advanced Medicine</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Monash Health provides world-class healthcare with personalized attention for you and your family.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/appointments')}
              className="bg-white text-blue-800 hover:bg-blue-100 px-8 py-4 rounded-lg text-lg font-semibold transition duration-300 shadow-lg"
            >
              Book an Appointment
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg text-lg font-semibold transition duration-300 shadow-lg"
            >
              Emergency Contacts
            </button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white py-12 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "200+", label: "Specialist Doctors" },
            { number: "24/7", label: "Emergency Care" },
            { number: "95%", label: "Patient Satisfaction" },
            { number: "50+", label: "Medical Departments" }
          ].map((stat, index) => (
            <div key={index} className="p-4">
              <p className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">{stat.number}</p>
              <p className="text-gray-600 text-sm uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 relative before:absolute before:-left-6 before:top-0 before:w-1 before:h-full before:bg-blue-600 pl-4">
              About Monash Health
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Founded in 1985, Monash Health has grown to become a leading healthcare provider in the region. 
              Our state-of-the-art facilities and team of dedicated professionals are committed to delivering 
              exceptional medical care with compassion and respect.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We combine cutting-edge technology with a patient-centered approach to ensure the best possible 
              outcomes for our community. Our accreditation by the National Healthcare Standards Board reflects 
              our commitment to excellence.
            </p>
            <button
              onClick={() => navigate('/about')}
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md text-lg transition duration-300"
            >
              Learn More About Us
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Hospital building" 
              className="rounded-lg shadow-md h-64 w-full object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Doctor with patient" 
              className="rounded-lg shadow-md h-64 w-full object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Medical equipment" 
              className="rounded-lg shadow-md h-64 w-full object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Nurse with patient" 
              className="rounded-lg shadow-md h-64 w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Medical Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive healthcare services designed to meet all your medical needs with excellence and compassion.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Primary Care",
                desc: "Comprehensive health services for all ages including preventive care, chronic disease management, and wellness exams.",
                icon: <FaStethoscope className="text-3xl text-blue-600" />,
                color: "bg-blue-100"
              },
              {
                title: "Emergency Medicine",
                desc: "24/7 emergency care with board-certified emergency physicians and advanced trauma care.",
                icon: <MdEmergency className="text-3xl text-red-600" />,
                color: "bg-red-100"
              },
              {
                title: "Cardiology",
                desc: "Advanced heart care including diagnostic testing, interventional procedures, and rehabilitation.",
                icon: <FaHeartbeat className="text-3xl text-purple-600" />,
                color: "bg-purple-100"
              },
              {
                title: "Pediatrics",
                desc: "Specialized care for infants, children, and adolescents in a child-friendly environment.",
                icon: <FaBaby className="text-3xl text-green-600" />,
                color: "bg-green-100"
              },
              {
                title: "Surgical Services",
                desc: "State-of-the-art surgical suites for minimally invasive and complex procedures across specialties.",
                icon: <FaProcedures className="text-3xl text-indigo-600" />,
                color: "bg-indigo-100"
              },
              {
                title: "Pharmacy Services",
                desc: "Full-service pharmacy with medication counseling and prescription management.",
                icon: <GiMedicines className="text-3xl text-yellow-600" />,
                color: "bg-yellow-100"
              },
            ].map((service, index) => (
              <div 
                key={index} 
                className={`${service.color} p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
                <button 
                  onClick={() => navigate('/services')}
                  className="mt-4 text-blue-700 hover:text-blue-900 font-medium flex items-center gap-1"
                >
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/services')}
              className="border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300"
            >
              View All Services
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Monash Health</h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              We combine medical excellence with compassionate care to provide the best possible outcomes for our patients.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { 
                title: "Expert Specialists", 
                desc: "Our physicians are leaders in their fields with advanced training and certifications.",
                icon: <MdPeople className="text-4xl mb-4" />
              },
              { 
                title: "Advanced Technology", 
                desc: "Cutting-edge diagnostic and treatment technologies for accurate care.",
                icon: <MdMedicalServices className="text-4xl mb-4" />
              },
              { 
                title: "Patient-Centered", 
                desc: "Personalized treatment plans tailored to your unique health needs.",
                icon: <MdAccessibility className="text-4xl mb-4" />
              },
              { 
                title: "Quality & Safety", 
                desc: "Rigorous safety protocols and quality standards for your peace of mind.",
                icon: <FaShieldAlt className="text-4xl mb-4" />
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition duration-300"
              >
                <div className="text-blue-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-blue-100">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Patient Testimonials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear what our patients have to say about their experiences at Monash Health.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote: "The care I received at Monash Health was exceptional. The doctors took time to listen and explain everything clearly.",
                name: "Sarah Johnson",
                role: "Cardiology Patient"
              },
              {
                quote: "From the moment I walked in, I felt cared for. The nursing staff was attentive and compassionate throughout my stay.",
                name: "Michael Chen",
                role: "Surgery Patient"
              },
              {
                quote: "The pediatric team made my daughter feel comfortable during her treatment. They're truly amazing with children.",
                name: "Emily Rodriguez",
                role: "Parent"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Exceptional Care?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Schedule your appointment today or contact us to learn more about our services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/appointments')}
              className="bg-white text-blue-800 hover:bg-blue-100 px-8 py-4 rounded-lg text-lg font-semibold transition duration-300 shadow-lg"
            >
              Book an Appointment
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg text-lg font-semibold transition duration-300 shadow-lg"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaClinicMedical className="text-2xl text-blue-400" />
                <span className="font-bold text-xl">Monash Health</span>
              </div>
              <p className="text-gray-400 mb-4">
                Providing compassionate, high-quality healthcare to our community since 1985.
              </p>
              <div className="flex gap-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="text-gray-400 hover:text-white transition"
                    aria-label={social}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={`M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z`} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'About Us', 'Services', 'Doctors', 'Appointments'].map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
              <ul className="space-y-2">
                {['Emergency Care', 'Primary Care', 'Cardiology', 'Pediatrics', 'Surgery'].map((service) => (
                  <li key={service}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
              <address className="not-italic text-gray-400 space-y-2">
                <p>123 Medical Center Drive</p>
                <p>Melbourne, VIC 3000</p>
                <p>Australia</p>
                <p>Phone: (03) 1234 5678</p>
                <p>Email: info@monashhealth.com</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Monash Health. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;