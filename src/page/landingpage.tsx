import  { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Star,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "School Principal",
    content:
      "The AI predictions have transformed how we approach student development. We've seen a 40% improvement in early intervention success rates.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Math Teacher",
    content:
      "This platform helped me find my dream teaching position. The school-teacher matching algorithm is incredibly accurate.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Parent",
    content:
      "Being able to track my child's progress and get AI-powered recommendations has made a huge difference in their academic journey.",
    rating: 5,
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "49",
    period: "per month",
    features: [
      "Up to 100 students",
      "Basic AI predictions",
      "Student management",
      "Basic analytics",
    ],
  },
  {
    name: "Professional",
    price: "149",
    period: "per month",
    features: [
      "Up to 500 students",
      "Advanced AI predictions",
      "Teacher matching",
      "Detailed analytics",
      "Parent portal",
      "24/7 support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "per month",
    features: [
      "Unlimited students",
      "Custom AI models",
      "API access",
      "Dedicated support",
      "Custom integrations",
      "Advanced security",
    ],
  },
];

const LandingPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const navigate = useNavigate();
  const isUser = localStorage.getItem("tokens") || null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 backdrop-blur-lg bg-black/50 fixed w-full z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-purple-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              Nuzion.AI
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {!isUser ? (
              <>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-black hover:text-purple-400"
                  onClick={() => navigate("/admin/auth/login")}
                >
                  Login
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Get Started
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => navigate("/admin/dashboard")}
                >
                  Dashboard
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto opacity-0 translate-y-4 animate-[fadeIn_1s_ease-out_forwards]">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
              Transform Education with AI-Powered Insights
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Empower schools, teachers, and students with predictive analytics
              and personalized learning paths
            </p>
            <div className="flex justify-center gap-4">
              <Button className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6">
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                className="text-lg px-8 py-6 border-purple-600 text-purple-400 hover:bg-purple-950"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-purple-900/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: "Schools", value: "500+" },
              { label: "Students", value: "50,000+" },
              { label: "Prediction Accuracy", value: "94%" },
              { label: "Teacher Placements", value: "1,000+" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center opacity-0 scale-95 animate-[fadeScale_0.5s_ease-out_forwards]"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-black via-purple-950/10 to-black overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            What Our Users Say
          </h2>
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${activeTestimonial * 100}%)`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="min-w-full px-4">
                    <Card className="bg-gray-900/50 border-gray-800">
                      <CardContent className="p-6">
                        <div className="flex mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 text-yellow-500 fill-yellow-500"
                            />
                          ))}
                        </div>
                        <p className="text-gray-300 mb-4">
                          {testimonial.content}
                        </p>
                        <div className="font-semibold text-purple-400">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {testimonial.role}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === activeTestimonial
                      ? "bg-purple-500"
                      : "bg-gray-700"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="opacity-0 translate-y-4 animate-[fadeIn_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <Card
                  className={`bg-gray-900/50 border-gray-800 relative ${
                    plan.popular ? "border-purple-500" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl text-white">
                      {plan.name}
                    </CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-purple-400">
                        ${plan.price}
                      </span>
                      <span className="text-gray-400 ml-2">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-purple-500" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full mt-6 ${
                        plan.popular
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "bg-gray-800 hover:bg-gray-700"
                      }`}
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-purple-900/20 via-purple-900/10 to-black">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto opacity-0 translate-y-4 animate-[fadeIn_1s_ease-out_forwards]">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              Ready to Transform Your School?
            </h2>
            <p className="text-gray-400 mb-8">
              Join hundreds of schools already using EduAI Hub to revolutionize
              their educational approach
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6">
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(1rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
