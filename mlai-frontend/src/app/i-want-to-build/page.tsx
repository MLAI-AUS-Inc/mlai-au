'use client'
import { useState, useEffect } from 'react';
import CTA from "@/components/CTA";
import { CodeBracketIcon, WrenchIcon, UsersIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog } from '@headlessui/react'
import Image from 'next/image';
// import Events from "@/components/events";

export default function IWantToBuild() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>({
    hero: true,
    features: false,
    newsletter: false,
    connect: false,
    events: false,
    about: false
  });
  const [constructionProgress, setConstructionProgress] = useState(0);
  const [floatingTools, setFloatingTools] = useState<Array<{
    id: number;
    tool: string;
    x: number;
    y: number;
    rotation: number;
    scale: number;
  }>>([]);
  const [codeLines, setCodeLines] = useState([
    '> import mlai from "future"',
    '> const builder = new MLAIBuilder()',
    '> builder.connect()',
    '> builder.innovate()',
    '> builder.collaborate()',
    '> builder.build("amazing_project")',
    '> Deploying to the future...',
    '> Success! 🚀',
  ]);
  const [currentLine, setCurrentLine] = useState(0);

  // Initialize page load
  useEffect(() => {
    setIsPageLoaded(true);
    
    // Start animations only after initial render
    const timer = setTimeout(() => {
      setSectionVisibility(prev => ({
        ...prev,
        features: true,
        newsletter: true,
        connect: true,
        events: true,
        about: true
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Separate useEffect for code animation
  useEffect(() => {
    const codeInterval = setInterval(() => {
      setCurrentLine(prev => (prev + 1) % codeLines.length);
    }, 2000);

    return () => clearInterval(codeInterval);
  }, []);

  // Optimize animation effects by combining them
  useEffect(() => {
    if (!isPageLoaded) return;

    // Reduce animation frequency
    const animationInterval = setInterval(() => {
      // Update construction progress
      setConstructionProgress(prev => (prev >= 100 ? 0 : prev + 1));
      
      // Update floating tools more frequently
      setFloatingTools(prev => {
        const tools = ['🔨', '🔧', '🛠️', '📐', '🔩', '⚙️', '🏗️', '🚧', '🔌', '💡', '🎯', '🎮', '🎨', '🖥️', '📱', '🤖', '🎓', '💻', '📊', '🔬', '🧮', '🎪', '🏢', '🌟'];
        const newTools = [...prev];
        
        if (newTools.length < 15) {
          newTools.push({
            id: Date.now(),
            tool: tools[Math.floor(Math.random() * tools.length)],
            x: Math.random() * 100,
            y: 110,
            rotation: Math.random() * 360,
            scale: 0.9 + Math.random() * 0.4
          });
        }
        
        return newTools
          .map(tool => ({
            ...tool,
            y: tool.y - 0.35,  // Increased speed from 0.15 to 0.35
            rotation: tool.rotation + 0.5,  // Slightly faster rotation
            scale: tool.scale * 0.999
          }))
          .filter(tool => tool.y > -20);
      });
    }, 60);  // Faster updates (from 100ms to 60ms)

    return () => {
      clearInterval(animationInterval);
    };
  }, [isPageLoaded]);

  // Fetch events data with loading state
  useEffect(() => {
    if (!isPageLoaded) return;

    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/getEvents');
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [isPageLoaded]);

  // Carousel navigation functions
  const handleNext = () => {
    setCurrentPage((prevPage) => 
      prevPage < Math.ceil(events.length / 4) - 1 ? prevPage + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => 
      prevPage > 0 ? prevPage - 1 : Math.ceil(events.length / 4) - 1
    );
  };

  const posts = [
    {
      id: 1,
      title: 'Boost your conversion rate',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      imageUrl:
        'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: { title: 'Marketing', href: '#' },
      author: {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        href: '#',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 2,
      title: 'How to use search engine optimization to drive traffic',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      imageUrl:
        'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
      date: 'Mar 10, 2020',
      datetime: '2020-03-10',
      category: { title: 'SEO', href: '#' },
      author: {
        name: 'Sarah Chen',
        role: 'Marketing Director',
        href: '#',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 3,
      title: 'Improve your customer experience',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      imageUrl:
        'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
      date: 'Mar 5, 2020',
      datetime: '2020-03-05',
      category: { title: 'Customer Experience', href: '#' },
      author: {
        name: 'David Wilson',
        role: 'Customer Success Manager',
        href: '#',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    // More posts...
  ];

  const features = [
    {
        name: 'Meetups',
        description:
            'Community is everything, and most online events are simply not that great. We\'re organising monthly in-person events with talks about tech, research and startups. And then we have some drinks and make friends, wan\'t to join us? We will never monetise our community.',
        href: '#',
        icon: UsersIcon,
    },
    {
        name: 'Hackathons',
        description:
            'Getting together with other smart people and building a prototype is an awesome adventure and a great way to meet co-founders for your next unicorn. That\'s why we\'re hosting several larger hackathons per year. Check out aihackmelb23 - 99 hackers and over 300 pitch night attendees.',
        href: '#',
        icon: WrenchIcon,
    },
    {
        name: 'Codecamp',
        description:
            'We\'re all still learning, AI just moves too fast! If you\'re keen to get hands-on with coding and build you own AI systems, say no more and head straight to our codecamp. Run in collaboration with the Melbourne Hackerspace we\'re delivering ongoing build sessions.',
        href: '#',
        icon: CodeBracketIcon,
    },
  ]

  const event = [
    {
        id: 1,
        title: 'MLAI Green Battery Hack 2024 (Melbourne)',
        href: '/hackathon',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        imageUrl:
            'photos/gbh_melbourne.webp',
        date: 'April 6 - May 8, 2024',
        datetime: '2024-04-06',
        author: {
            name: 'Melbourne',
            imageUrl:
                ''
            ,
        },
    },

    {
        id: 2,
        title: 'MLAI Green Battery Hack 2024 (Sydney)',
        href: '/hackathon',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        imageUrl:
            'photos/gbh_sydney.webp',
        date: 'April 6 - May 8, 2024',
        datetime: '2024-04-06',
        author: {
            name: 'Sydney',
            imageUrl:
                ''
            ,
        },
    },

    {
        id: 3,
        title: 'ML and AI Meetups',
        href: 'https://www.meetup.com/machine-learning-ai-meetup/',
        description:
            'regular ai and machine learning meetups in Sydney and Melbourne',
        imageUrl:
            'photos/lightning_talks.png',
        date: 'Fortnightly Events, afterhours',
        datetime: '2024-04-06',
        author: {
            name: 'Melbourne',
            imageUrl:
                ''
            ,
        },
    },

    {
        id: 4,
        title: 'AI Hack Melb 23',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7136124006742560769',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        imageUrl:
            'photos/aihackmelb23.png',
        date: 'November 30, 2023',
        datetime: '2024-04-06',
        author: {
            name: 'NAB Arena, Melbourne',
            imageUrl:
                ''
            ,
        },
    },
    // More posts...
  ]

  const navigation = [
    {
      name: 'Product', href: '#' },
      {
        name: 'Features', href: '#' },
      {
        name: 'Marketplace', href: '#' },
      {
        name: 'Company', href: '#' },
    
  ]

  return (
    <div className={`relative bg-gradient-to-b from-blue-100 to-blue-200 min-h-screen overflow-hidden transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Construction Theme Background Elements */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Sky with clouds */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-300 to-blue-200"></div>
        
        {/* Ground with grass */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-green-600 to-green-500"></div>
        
        {/* Clouds */}
        <div className="absolute top-10 left-10 w-32 h-16 bg-white rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-40 h-20 bg-white rounded-full animate-float-delayed"></div>
        <div className="absolute top-40 left-1/4 w-36 h-18 bg-white rounded-full animate-float"></div>
        
        {/* Building blocks */}
        <div className="absolute bottom-1/3 left-20 w-24 h-24 bg-red-500 rounded-md shadow-lg transform transition-transform duration-1000" 
             style={{ transform: sectionVisibility.hero ? 'translateY(-10px)' : 'translateY(0)' }}></div>
        <div className="absolute bottom-1/3 left-44 w-24 h-24 bg-yellow-400 rounded-md shadow-lg transform transition-transform duration-1000" 
             style={{ transform: sectionVisibility.features ? 'translateY(-5px)' : 'translateY(0)' }}></div>
        <div className="absolute bottom-1/3 left-68 w-24 h-24 bg-blue-500 rounded-md shadow-lg transform transition-transform duration-1000" 
             style={{ transform: sectionVisibility.newsletter ? 'translateY(-15px)' : 'translateY(0)' }}></div>
        
        {/* Mario-style pipes */}
        <div className="absolute bottom-1/3 right-1/4 w-16 h-32 bg-green-600 rounded-t-lg"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 h-8 bg-green-700 rounded-t-lg transform -translate-y-2"></div>
        
        {/* Construction signs */}
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-black font-bold text-xl">!</span>
        </div>
        
        {/* Floating construction tools */}
        {floatingTools.map(tool => (
          <div 
            key={tool.id}
            className="absolute text-5xl transition-all duration-300 ease-out"  // Reduced duration from 500ms to 300ms
            style={{ 
              left: `${tool.x}%`, 
              top: `${tool.y}%`, 
              transform: `rotate(${tool.rotation}deg) scale(${tool.scale})`,
              opacity: tool.y < 20 ? (tool.y + 20) / 40 : 0.8,
              filter: `blur(${tool.y < 20 ? (20 - tool.y) * 0.1 : 0}px)`,
              zIndex: 0
            }}
          >
            {tool.tool}
          </div>
        ))}
        
        {/* Construction progress bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
          <div 
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${constructionProgress}%` }}
          ></div>
        </div>
        
        {/* Construction tape */}
        <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400 bg-opacity-70"></div>
        <div className="absolute top-0 left-0 w-2 h-full bg-yellow-400 bg-opacity-70"></div>
        <div className="absolute top-0 right-0 w-2 h-full bg-yellow-400 bg-opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-yellow-400 bg-opacity-70"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative" style={{ zIndex: 10 }}>
        {/* Hero Section */}
        <div className={`mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 pt-10 transition-all duration-1000 ${sectionVisibility.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-48 lg:pt-40 xl:col-span-6">
            <div className="mx-auto max-w-lg lg:mx-0">
              <div className="flex items-center space-x-4 mb-8">
                <img
                  alt="MLAI Logo"
                  src="/MLAI-Logo.png"
                  className="h-16 w-auto animate-pulse"
                />
                <div className="h-12 w-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <WrenchIcon className="h-6 w-6 text-black" />
                </div>
              </div>
              <h1 className="mt-8 text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
                <span className="block">Let's Build</span>
                <span className="block text-indigo-600">Something Amazing</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Join our community of builders, creators, and innovators. Together, we can construct the future of AI and machine learning in Australia.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="#features"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>
                <a href="#about" className="text-sm font-semibold leading-6 text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
              <div className="mt-10 flex items-center justify-center -mb-24 lg:-mb-48">
                <Image 
                  src="/Crane.png" 
                  alt="Construction Crane"
                  width={1200}
                  height={900}
                  priority
                  className="w-full h-auto max-w-none -mx-8 lg:-mx-12 transform scale-110"
                />
              </div>
            </div>
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
            <div className="relative h-96 lg:h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-xl transform rotate-3"></div>
              <div className="absolute inset-0 bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <div className="h-10 w-10 bg-yellow-400 rounded-full flex items-center justify-center">
                    <CodeBracketIcon className="h-6 w-6 text-black" />
                  </div>
                  <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <UsersIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">Join Our Builders</h3>
                  <p className="mt-2 text-gray-600">Be part of something bigger</p>
                  <div className="mt-4 bg-gray-900 rounded-lg p-6 text-left overflow-hidden h-[400px] flex items-center">
                    <div className="font-mono text-base lg:text-lg space-y-3 w-full">
                      {codeLines.map((line, index) => (
                        <div
                          key={index}
                          className={`transition-all duration-300 ${
                            index === currentLine
                              ? 'text-green-400 font-bold transform scale-105'
                              : index < currentLine
                              ? 'text-gray-500'
                              : 'text-gray-700'
                          }`}
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div className="h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💡</span>
                  </div>
                  <div className="h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🔧</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className={`bg-white py-24 sm:py-32 transition-all duration-1000 ${sectionVisibility.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Building Blocks</h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                The foundation of our community
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {features.map((feature, index) => (
                <div 
                  key={feature.name} 
                  className="flex flex-col bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                  style={{ 
                    animationDelay: `${index * 0.2}s`,
                    animation: 'buildIn 0.5s ease-out forwards',
                    opacity: 0,
                    transform: 'translateY(20px)'
                  }}
                >
                  <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                    <div className="h-10 w-10 flex-none rounded-full bg-indigo-600 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                    <p className="mt-6">
                      <a href={feature.href} className="text-sm font-semibold leading-6 text-indigo-600">
                        Learn more <span aria-hidden="true">→</span>
                      </a>
                    </p>
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stay up to date with MLAI section */}
        <div id="newsletter" className={`bg-gradient-to-b from-white to-blue-50 py-16 sm:py-24 lg:py-32 transition-all duration-1000 ${sectionVisibility.newsletter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Stay up to date with MLAI
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Get the latest updates on events, hackathons, and community news
              </p>
            </div>
            
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Email Subscription Form */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transform transition-all duration-500 hover:scale-105">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Subscribe to our newsletter</h3>
                <form className="w-full">
                  <div className="flex flex-col gap-y-4">
                    <label htmlFor="email-address" className="text-base font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      required
                      placeholder="Enter your email"
                      autoComplete="email"
                      className="min-w-0 flex-auto rounded-md bg-white px-4 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    />
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Subscribe
                    </button>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">
                    We care about your data. Read our{' '}
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      privacy&nbsp;policy
                    </a>
                    .
                  </p>
                </form>
              </div>
              
              {/* Slack Community */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 flex flex-col justify-center items-center transform transition-all duration-500 hover:scale-105">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Join our Slack Community</h3>
                <p className="text-base text-gray-600 mb-6 text-center">
                  Connect with fellow builders and innovators in real-time
                </p>
                <a
                  href="https://join.slack.com/t/mlai-au/shared_invite/zt-2br01q4n9-PiiT9mgEOPMEG__8SOWQ8g"
                  target="_blank"
                  className="inline-flex items-center gap-x-3 rounded-xl bg-indigo-600 px-6 py-4 text-lg font-bold text-white shadow-lg hover:bg-indigo-500 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300 animate-pulse"
                >
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                    <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                  </svg>
                  <span className="text-xl">Join our Slack Community</span>
                  <span className="text-2xl">→</span>
                </a>
                <div className="mt-6 text-sm text-gray-500 flex items-center">
                  <span className="inline-block animate-bounce mr-2">↓</span> 
                  <span>Real-time collaboration and networking</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* We are changing the way people connect section */}
        <div id="connect" className={`bg-white transition-all duration-1000 ${sectionVisibility.connect ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
            />
            <div className="mx-auto max-w-7xl px-6 pb-0 pt-14 sm:pb-0 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                <h1 className="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">
                  We're changing the way people connect
                </h1>
                <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                  <p className="text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                    fugiat veniam occaecat fugiat aliqua. Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                    lorem cupidatat commodo.
                  </p>
                  <div className="mt-8 relative w-full h-96 rounded-2xl overflow-hidden shadow-xl">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src="/animation.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
          </div>
        </div>

        {/* Events Section */}
        <div id="events" className={`bg-gradient-to-b from-blue-50 to-white py-24 sm:py-32 transition-all duration-1000 ${sectionVisibility.events ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Event Highlights</h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                Can't wait to see you for the next one!
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
              {event.map((event, index) => (
                <article
                  key={event.id}
                  className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-60 hover:opacity-90 transition duration-150"
                  style={{ 
                    animationDelay: `${index * 0.2}s`,
                    animation: 'buildIn 0.5s ease-out forwards',
                    opacity: 0,
                    transform: 'translateY(20px)'
                  }}
                >
                  <img src={event.imageUrl} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                  <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                  <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                    <time dateTime={event.datetime} className="mr-8">
                      {event.date}
                    </time>
                    <div className="-ml-4 flex items-center gap-x-4">
                      <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                        <circle cx={1} cy={1} r={1} />
                      </svg>
                      <div className="flex gap-x-2.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        {event.author.name}
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                    <a href={event.href} target="_blank">
                      <span className="absolute inset-0" />
                      {event.title}
                    </a>
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className={`bg-white py-24 sm:py-32 transition-all duration-1000 ${sectionVisibility.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <div className="flex justify-center mb-8">
                <img
                  className="h-24 w-auto hover:scale-105 transition duration-150 ease-in-out"
                  src="/MLAI-Logo.png"
                  alt="MLAI Logo"
                />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">We are MLAI Aus</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our vision is to make Australia an amazing home for AI and machine learning entrepreneurs. Let's get on it. <a href="mailto:hi@mlai.au" className="font-semibold text-teal-500 hover:text-teal-500 transition duration-200 ease-in-out">Love letters: hi@mlai.au</a>
              </p>
              <div className="mt-10 flex justify-center items-center space-x-4">
                <a href="https://www.linkedin.com/company/mlai-aus-inc" target="_blank" className="text-gray-600 hover:text-teal-500 transform hover:scale-105 transition duration-100 ease-in-out">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path>
                  </svg>
                </a>
                <a href="https://www.instagram.com/mlai_aus" target="_blank" className="text-gray-600 hover:text-teal-500 transform hover:scale-105 transition duration-100 ease-in-out">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="h-7 w-7">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v .08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="https://join.slack.com/t/mlai-au/shared_invite/zt-2br01q4n9-PiiT9mgEOPMEG__8SOWQ8g" target="_blank" className="text-gray-600 hover:text-teal-500 transform hover:scale-105 transition duration-100 ease-in-out">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                    <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Join Section */}
        <div id="join" className="bg-black relative isolate px-6 py-24 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Keen to jump aboard the pirate ship?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Wait no longer, click the button sailor.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="https://forms.gle/egJRbMhnuvJ7QPVT8"
                className="rounded-md bg-teal-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
              >
                I want to volunteer
              </a>
              <a
                href="/i-want-to-build"
                className="rounded-md bg-teal-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                I want to build
              </a>
              <a
                href="/contact"
                className="text-sm font-semibold leading-6 text-white hover:text-teal-300 transition duration-150"
              >
                I want to sponsor <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes float-delayed {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes buildIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes hammer {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-20deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(20deg); }
          100% { transform: rotate(0deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-hammer {
          animation: hammer 0.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}