import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import Footer from './shared/Footer';
import {
    Briefcase,
    Users,
    TrendingUp,
    Shield,
    Star,
    Award,
    CheckCircle,
    ArrowRight,
    Building,
    Search,
    UserCheck,
    Zap,
    Linkedin,
    Github
} from 'lucide-react';

const LandingPage = () => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    // Refs for scroll animations
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const aboutRef = useRef(null);
    const developerRef = useRef(null);
    const ctaRef = useRef(null);

    // Animation states
    const [heroVisible, setHeroVisible] = useState(false);
    const [featuresVisible, setFeaturesVisible] = useState(false);
    const [aboutVisible, setAboutVisible] = useState(false);
    const [developerVisible, setDeveloperVisible] = useState(false);
    const [ctaVisible, setCtaVisible] = useState(false);

    useEffect(() => {
        if (user) {
            if (user.role === 'student') {
                navigate('/home');
            } else if (user.role === 'recruiter') {
                navigate('/admin/companies');
            }
        }
    }, [user, navigate]);

    useEffect(() => {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (entry.target === heroRef.current) {
                        setHeroVisible(true);
                    } else if (entry.target === featuresRef.current) {
                        setFeaturesVisible(true);
                    } else if (entry.target === aboutRef.current) {
                        setAboutVisible(true);
                    } else if (entry.target === developerRef.current) {
                        setDeveloperVisible(true);
                    } else if (entry.target === ctaRef.current) {
                        setCtaVisible(true);
                    }
                }
            });
        }, observerOptions);

        // Observe all sections
        if (heroRef.current) observer.observe(heroRef.current);
        if (featuresRef.current) observer.observe(featuresRef.current);
        if (aboutRef.current) observer.observe(aboutRef.current);
        if (developerRef.current) observer.observe(developerRef.current);
        if (ctaRef.current) observer.observe(ctaRef.current);

        return () => observer.disconnect();
    }, []);

    // If user is logged in, don't render the landing page (they'll be redirected)
    if (user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section ref={heroRef} className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 lg:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="text-center">
                        {/* Animated JobVerse Title */}
                        <div className={`mb-12 transition-all duration-800 delay-100 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-4 animate-pulse">
                                JobVerse
                            </h1>
                            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
                        </div>

                        <div className={`inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8 transition-all duration-700 delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <Star className="w-4 h-4 mr-2" />
                            Connecting Talent with Opportunity
                        </div>

                        <p className={`text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-600 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            The ultimate job portal that connects talented professionals with leading companies.
                            Discover opportunities, showcase your skills, and take your career to new heights.
                        </p>

                        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 delay-800 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <Link to="/signup">
                                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                    Get Started Free
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold border-2 border-blue-200 text-blue-600 hover:bg-blue-50 transition-all duration-300">
                                    Sign In
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                                <div className="text-gray-600">Active Jobs</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">5K+</div>
                                <div className="text-gray-600">Companies</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                                <div className="text-gray-600">Users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                                <div className="text-gray-600">Success Rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section ref={featuresRef} className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-16 transition-all duration-800 delay-300 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose JobVerse?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Experience the future of job searching with our innovative platform designed for modern career growth.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Search,
                                title: "Smart Job Matching",
                                description: "Our AI-powered algorithm matches you with the perfect job opportunities based on your skills, experience, and preferences.",
                                color: "blue"
                            },
                            {
                                icon: Building,
                                title: "Verified Companies",
                                description: "All companies on our platform are verified, ensuring you apply to legitimate opportunities from trusted employers.",
                                color: "green"
                            },
                            {
                                icon: UserCheck,
                                title: "Easy Application Process",
                                description: "Apply to multiple jobs with a single click using your comprehensive profile. Track applications in real-time.",
                                color: "purple"
                            },
                            {
                                icon: Zap,
                                title: "Instant Notifications",
                                description: "Get instant notifications about new job matches, application status updates, and interview invitations.",
                                color: "orange"
                            },
                            {
                                icon: Shield,
                                title: "Secure & Private",
                                description: "Your personal information is protected with enterprise-grade security. We never share your data without permission.",
                                color: "red"
                            },
                            {
                                icon: TrendingUp,
                                title: "Career Growth",
                                description: "Access career resources, skill assessments, and professional development tools to advance your career.",
                                color: "teal"
                            }
                        ].map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className={`bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105`}
                                    style={{
                                        animationDelay: `${400 + index * 100}ms`,
                                        opacity: featuresVisible ? 1 : 0,
                                        transform: featuresVisible ? 'translateY(0)' : 'translateY(30px)'
                                    }}
                                >
                                    <div className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110`}>
                                        <IconComponent className={`w-6 h-6 text-${feature.color}-600`} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                                    <p className="text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* About JobVerse Section */}
            <section ref={aboutRef} className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-800 delay-200 ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                        <div>
                            <h2 className={`text-3xl lg:text-4xl font-bold text-gray-900 mb-6 transition-all duration-700 delay-300 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                                About JobVerse
                            </h2>
                            <p className={`text-lg text-gray-600 mb-6 transition-all duration-700 delay-400 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                                JobVerse is a cutting-edge job portal revolutionizing how professionals connect with opportunities.
                                Founded with the vision of creating a seamless bridge between talent and employers, we leverage
                                advanced technology to make job searching and hiring more efficient and effective.
                            </p>
                            <p className={`text-lg text-gray-600 mb-8 transition-all duration-700 delay-500 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                                Our platform combines intelligent job matching, comprehensive company profiles, and a user-friendly
                                interface to create the ultimate job search experience. Whether you're a fresh graduate or a seasoned
                                professional, JobVerse helps you find the perfect career opportunity.
                            </p>

                            <div className={`grid grid-cols-2 gap-6 transition-all duration-700 delay-600 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span className="text-gray-700">AI-Powered Matching</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span className="text-gray-700">Verified Opportunities</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span className="text-gray-700">Real-time Updates</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span className="text-gray-700">Mobile Optimized</span>
                                </div>
                            </div>
                        </div>

                        <div className={`relative transition-all duration-800 delay-400 ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                                <div className="text-center">
                                    <Briefcase className="w-16 h-16 mx-auto mb-6 opacity-90" />
                                    <h3 className="text-2xl font-bold mb-4">Join the JobVerse Community</h3>
                                    <p className="mb-6 opacity-90">
                                        Connect with thousands of professionals and hundreds of companies in our growing ecosystem.
                                    </p>
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <div className="text-2xl font-bold">50K+</div>
                                            <div className="text-sm opacity-80">Active Users</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold">5K+</div>
                                            <div className="text-sm opacity-80">Companies</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold">10K+</div>
                                            <div className="text-sm opacity-80">Jobs Posted</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Developer Section */}
            <section ref={developerRef} className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-16 transition-all duration-800 delay-300 ${developerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Meet the Developer
                        </h2>
                        <p className="text-xl text-gray-600">
                            Behind JobVerse is a passionate developer dedicated to transforming the job search experience.
                        </p>
                    </div>

                    <div className={`max-w-4xl mx-auto transition-all duration-800 delay-400 ${developerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12">
                            <div className="text-center">
                                <div className={`w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden shadow-lg transition-all duration-500 delay-500 ${developerVisible ? 'scale-100' : 'scale-90'}`}>
                                    <img
                                        src="/public/images/ketan.jpg"
                                        alt="Ketan - Full-Stack Developer & Founder"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentNode.innerHTML = '<span class="text-3xl font-bold text-white">K</span>';
                                        }}
                                    />
                                </div>

                                <h3 className={`text-2xl font-bold text-gray-900 mb-4 transition-all duration-600 delay-600 ${developerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Ketan</h3>
                                <p className={`text-lg text-blue-600 mb-6 font-medium transition-all duration-600 delay-700 ${developerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Full-Stack Developer & Founder</p>

                                <p className={`text-gray-700 text-lg leading-relaxed mb-8 transition-all duration-600 delay-800 ${developerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                    Hi, I'm Ketan — a passionate Full-Stack Developer dedicated to building scalable, user-centric digital solutions.
                                    With expertise in modern technologies like Node.js, Express, React, MongoDB
                                    I founded JobVerse to bridge the gap between exceptional talent and meaningful career opportunities.
                                    Combining technical innovation with a deep focus on user experience,
                                    I strive to create products that drive real-world impact and redefine the hiring landscape.
                                </p>

                                {/* Social Media Links */}
                                <div className={`flex justify-center gap-4 mb-8 transition-all duration-600 delay-900 ${developerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                    <a
                                        href="https://www.linkedin.com/in/ketan-kumar-521249279/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                        LinkedIn
                                    </a>
                                    <a
                                        href="https://github.com/ksingla1885"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
                                    >
                                        <Github className="w-5 h-5" />
                                        GitHub
                                    </a>
                                </div>

                                <div className={`grid md:grid-cols-3 gap-6 mb-8 transition-all duration-600 delay-1000 ${developerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                    <div className="text-center">
                                        <Award className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                                        <h4 className="font-semibold text-gray-900 mb-2">Expertise</h4>
                                        <p className="text-sm text-gray-600">Full-stack development with modern technologies</p>
                                    </div>
                                    <div className="text-center">
                                        <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                                        <h4 className="font-semibold text-gray-900 mb-2">Vision</h4>
                                        <p className="text-sm text-gray-600">Connecting talent with opportunity</p>
                                    </div>
                                    <div className="text-center">
                                        <Star className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                                        <h4 className="font-semibold text-gray-900 mb-2">Innovation</h4>
                                        <p className="text-sm text-gray-600">Building the future of job portals</p>
                                    </div>
                                </div>

                                <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-600 delay-1100 ${developerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                    <Link to="/signup">
                                        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 transition-all duration-300 transform hover:scale-105">
                                            Start Your Journey
                                        </Button>
                                    </Link>
                                    <Link to="/jobs">
                                        <Button variant="outline" className="px-8 transition-all duration-300 transform hover:scale-105">
                                            Browse Jobs
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section ref={ctaRef} className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
                <div className={`max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 transition-all duration-800 delay-300 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className={`text-3xl lg:text-4xl font-bold text-white mb-6 transition-all duration-700 delay-400 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        Ready to Transform Your Career?
                    </h2>
                    <p className={`text-xl text-blue-100 mb-8 transition-all duration-700 delay-500 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        Join thousands of professionals who have found their dream jobs through JobVerse.
                    </p>
                    <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-600 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <Link to="/signup">
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                                Create Your Account
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                                Sign In
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default LandingPage;
