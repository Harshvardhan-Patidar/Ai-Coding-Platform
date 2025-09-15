import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Code, 
  Mic, 
  Trophy, 
  Users, 
  Brain, 
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export default function Home() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Code,
      title: 'AI-Powered Coding Practice',
      description: 'Practice with intelligent hints, debugging assistance, and personalized feedback.',
    },
    {
      icon: Mic,
      title: 'Voice-Based Interviews',
      description: 'Simulate real interview experiences with AI-powered voice interactions.',
    },
    {
      icon: Trophy,
      title: 'Contest Mode',
      description: 'Compete with friends in real-time coding contests and tournaments.',
    },
    {
      icon: Brain,
      title: 'Smart Learning Path',
      description: 'AI creates personalized study plans based on your strengths and weaknesses.',
    },
    {
      icon: Users,
      title: 'Community & Leaderboards',
      description: 'Track your progress and compete with developers worldwide.',
    },
    {
      icon: Zap,
      title: 'Real-time Feedback',
      description: 'Get instant feedback on your code with detailed explanations.',
    },
  ];

  const stats = [
    { label: 'Coding Problems', value: '1000+' },
    { label: 'Active Users', value: '10K+' },
    { label: 'Companies', value: '50+' },
    { label: 'Success Rate', value: '95%' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-foreground">AI Code Platform</h1>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Master Coding with
            <span className="text-primary block">AI-Powered Learning</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            The next-generation platform that combines AI intelligence with hands-on coding practice. 
            Prepare for interviews, improve your skills, and become industry-ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={isAuthenticated ? '/dashboard' : '/register'}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center justify-center"
            >
              Start Learning Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/questions"
              className="border border-border text-foreground px-8 py-3 rounded-lg text-lg font-semibold hover:bg-accent transition-colors inline-flex items-center justify-center"
            >
              Browse Problems
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We combine cutting-edge AI technology with proven learning methodologies 
              to create the most effective coding practice experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Level Up Your Coding Skills?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of developers who are already improving their skills with our AI-powered platform.
          </p>
          <Link
            to={isAuthenticated ? '/dashboard' : '/register'}
            className="bg-background text-foreground px-8 py-3 rounded-lg text-lg font-semibold hover:bg-background/90 transition-colors inline-flex items-center"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 AI Code Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
