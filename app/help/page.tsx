import Header from '@/components/header';
import Footer from '@/components/footer';
import { HelpCircle, BookOpen, MessageSquare, Mail, Phone, Search } from 'lucide-react';

export const metadata = {
  title: 'Help | Venture',
  description: 'Get support and find answers to your questions.',
};

export default function HelpPage() {
  const helpCategories = [
    {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Comprehensive guides and API documentation.',
      color: 'from-primary to-secondary',
      topics: ['Getting Started', 'API Reference', 'Best Practices', 'Migration Guide'],
    },
    {
      icon: HelpCircle,
      title: 'FAQ',
      description: 'Answers to frequently asked questions.',
      color: 'from-secondary to-accent',
      topics: ['Billing', 'Security', 'Features', 'Account'],
    },
    {
      icon: MessageSquare,
      title: 'Community Support',
      description: 'Get help from our community.',
      color: 'from-accent to-primary',
      topics: ['Forums', 'Discord', 'Community Posts', 'Share Ideas'],
    },
    {
      icon: Mail,
      title: 'Contact Support',
      description: 'Reach our support team directly.',
      color: 'from-primary to-accent',
      topics: ['Email Support', 'Chat', 'Phone', 'Ticket System'],
    },
  ];

  return (
    <main className="min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="w-full bg-linear-to-b from-accent/10 to-transparent py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground">
              How Can We <span className="bg-linear-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">Help You?</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers, get support, and learn how to make the most of our platform.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  placeholder="Search help articles..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-border bg-card text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {helpCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-xl transition-all cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-lg bg-linear-to-br ${category.color} p-2.5 mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{category.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{category.description}</p>

                <div className="space-y-2">
                  {category.topics.map((topic, i) => (
                    <p key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full bg-linear-to-r ${category.color}`}></span>
                      {topic}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Popular Topics */}
        <div className="bg-linear-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 lg:p-12 border border-border">
          <h2 className="text-3xl font-bold text-foreground mb-8">Popular Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Getting Started with Venture',
                views: '12.5K views',
              },
              {
                title: 'API Authentication Guide',
                views: '8.3K views',
              },
              {
                title: 'Billing and Subscription',
                views: '7.1K views',
              },
              {
                title: 'Integrations and Webhooks',
                views: '6.8K views',
              },
              {
                title: 'Security Best Practices',
                views: '5.9K views',
              },
              {
                title: 'Troubleshooting Common Issues',
                views: '5.2K views',
              },
            ].map((topic, index) => (
              <button
                key={index}
                className="p-4 rounded-lg bg-card border border-border hover:border-primary hover:bg-muted transition-all text-left"
              >
                <p className="font-semibold text-foreground mb-1">{topic.title}</p>
                <p className="text-xs text-muted-foreground">{topic.views}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="w-full bg-linear-to-b from-primary/5 to-transparent py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground text-center mb-16">Get in Touch</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: MessageSquare,
                title: 'Live Chat',
                description: 'Chat with our support team in real-time.',
                color: 'from-primary to-secondary',
                action: 'Start Chat',
                time: 'Available 24/7',
              },
              {
                icon: Mail,
                title: 'Email Support',
                description: 'Send us an email and we&apos;ll respond within 24 hours.',
                color: 'from-secondary to-accent',
                action: 'Send Email',
                time: 'support@venture.io',
              },
              {
                icon: Phone,
                title: 'Phone Support',
                description: 'Call our support team for urgent issues.',
                color: 'from-accent to-primary',
                action: 'Call Now',
                time: '+1 (800) 123-4567',
              },
            ].map((option, index) => {
              const Icon = option.icon;
              return (
                <div key={index} className="p-8 rounded-2xl bg-card border border-border hover:shadow-xl transition-all">
                  <div className={`w-14 h-14 rounded-lg bg-linear-to-br ${option.color} p-3 mb-6`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{option.title}</h3>
                  <p className="text-muted-foreground mb-6">{option.description}</p>
                  <div className="space-y-3">
                    <button className={`w-full px-4 py-2 rounded-lg bg-linear-to-r ${option.color} text-white font-semibold hover:shadow-lg transition-all`}>
                      {option.action}
                    </button>
                    <p className="text-xs text-muted-foreground text-center">{option.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Status Page */}
      <section className="w-full py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-8 lg:p-12 border border-green-500/30">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">System Status</h3>
                <p className="text-muted-foreground mb-4">All systems operational. No incidents reported.</p>
                <p className="text-sm text-green-600 font-semibold">Last updated 5 minutes ago</p>
              </div>
              <button className="px-6 py-2 rounded-lg border border-green-500/50 text-green-600 font-semibold hover:bg-green-500/10 transition-all">
                View Status
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
