// import { useState, useEffect } from 'react';
// import { 
//   Trophy, 
//   Users, 
//   Clock, 
//   Play, 
//   Plus,
//   Crown,
//   Zap,
//   Star,
//   Calendar,
//   Sparkles,
//   Target,
//   Award,
//   TrendingUp
// } from 'lucide-react';
// import { useTheme } from '../contexts/ThemeContext';

// export default function Contest() {
//   const [activeTab, setActiveTab] = useState('active');
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const { theme } = useTheme();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const mockContests = [
//     {
//       id: 1,
//       name: 'Weekly Coding Challenge',
//       participants: 156,
//       duration: 60,
//       status: 'active',
//       startTime: new Date(),
//       difficulty: 'medium',
//       prize: 'Premium Subscription',
//       description: 'Test your skills against developers worldwide in this weekly challenge featuring dynamic programming and system design problems.',
//       registered: true
//     },
//     {
//       id: 2,
//       name: 'Algorithm Masters',
//       participants: 89,
//       duration: 90,
//       status: 'upcoming',
//       startTime: new Date(Date.now() + 3600000),
//       difficulty: 'hard',
//       prize: '$100 Gift Card',
//       description: 'Advanced algorithm competition for experienced programmers. Features complex graph theory and optimization problems.',
//       registered: false
//     },
//     {
//       id: 3,
//       name: 'Beginner Friendly',
//       participants: 234,
//       duration: 45,
//       status: 'completed',
//       startTime: new Date(Date.now() - 7200000),
//       difficulty: 'easy',
//       prize: 'Certificate',
//       description: 'Perfect for newcomers to competitive programming. Learn the basics while competing for fun!',
//       registered: true
//     },
//     {
//       id: 4,
//       name: 'Data Structures Showdown',
//       participants: 312,
//       duration: 75,
//       status: 'upcoming',
//       startTime: new Date(Date.now() + 86400000),
//       difficulty: 'medium',
//       prize: 'Tech Gadgets',
//       description: 'Focus on data structure implementation and optimization. Trees, graphs, and advanced data structures.',
//       registered: true
//     }
//   ];

//   // Theme-based styles
//   const backgroundStyles = theme === 'dark' 
//     ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
//     : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50';

//   const cardBackground = theme === 'dark'
//     ? 'bg-slate-800/40 backdrop-blur-sm border border-slate-700'
//     : 'bg-white/80 backdrop-blur-sm border border-slate-200';

//   const textColor = theme === 'dark' ? 'text-white' : 'text-slate-900';
//   const textMuted = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';
//   const hoverBackground = theme === 'dark' ? 'hover:bg-slate-700/50' : 'hover:bg-slate-100';

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'active':
//         return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
//       case 'upcoming':
//         return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
//       case 'completed':
//         return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
//       default:
//         return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
//     }
//   };

//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case 'easy':
//         return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
//       case 'medium':
//         return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
//       case 'hard':
//         return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
//       default:
//         return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
//     }
//   };

//   const getButtonVariant = (status, registered) => {
//     if (status === 'active') {
//       return 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg hover:shadow-emerald-500/25';
//     }
//     if (status === 'upcoming') {
//       if (registered) {
//         return 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-blue-500/25';
//       }
//       return theme === 'dark' 
//         ? 'bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 text-slate-300 hover:text-white'
//         : 'bg-white/50 border border-slate-300 hover:border-blue-500/50 text-slate-600 hover:text-slate-900';
//     }
//     return theme === 'dark'
//       ? 'bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 text-slate-300 hover:text-white'
//       : 'bg-white/50 border border-slate-300 hover:border-purple-500/50 text-slate-600 hover:text-slate-900';
//   };

//   const filteredContests = mockContests.filter(contest => contest.status === activeTab);

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${backgroundStyles} ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Enhanced Header */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
//           <div className="relative mb-6 lg:mb-0">
//             <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
//             <h1 className={`text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent`}>
//               Coding Contests
//             </h1>
//             <p className={`${textMuted} mt-3 text-lg flex items-center`}>
//               <Sparkles className="h-5 w-5 mr-2 text-amber-400 animate-pulse" />
//               Compete with developers worldwide in real-time coding challenges
//             </p>
//           </div>
//           <button
//             onClick={() => setShowCreateModal(true)}
//             className="group relative bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 inline-flex items-center"
//           >
//             <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
//             <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300 relative z-10" />
//             <span className="relative z-10">Create Contest</span>
//           </button>
//         </div>

//         {/* Enhanced Tabs */}
//         <div className={`${theme === 'dark' ? 'bg-slate-800/30' : 'bg-white/60'} backdrop-blur-sm rounded-2xl border ${theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200'} p-2 mb-8`}>
//           <div className="flex space-x-2">
//             {[
//               { id: 'active', name: 'Active', count: mockContests.filter(c => c.status === 'active').length, icon: Zap },
//               { id: 'upcoming', name: 'Upcoming', count: mockContests.filter(c => c.status === 'upcoming').length, icon: Clock },
//               { id: 'completed', name: 'Completed', count: mockContests.filter(c => c.status === 'completed').length, icon: Trophy }
//             ].map((tab) => {
//               const Icon = tab.icon;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 flex-1 justify-center group ${
//                     activeTab === tab.id
//                       ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30 shadow-lg shadow-amber-500/10'
//                       : `${textMuted} ${hoverBackground}`
//                   }`}
//                 >
//                   <Icon className={`h-5 w-5 mr-2 ${activeTab === tab.id ? 'text-amber-400' : theme === 'dark' ? 'text-slate-500 group-hover:text-slate-300' : 'text-slate-400 group-hover:text-slate-600'}`} />
//                   <span>{tab.name}</span>
//                   <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
//                     activeTab === tab.id 
//                       ? 'bg-amber-500/20 text-amber-400' 
//                       : theme === 'dark' ? 'bg-slate-700/50 text-slate-500 group-hover:text-slate-300' : 'bg-slate-200/50 text-slate-400 group-hover:text-slate-600'
//                   }`}>
//                     {tab.count}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Enhanced Contest List */}
//         <div className="space-y-6">
//           {filteredContests.length > 0 ? (
//             filteredContests.map((contest, index) => (
//               <div 
//                 key={contest.id} 
//                 className={`group ${cardBackground} p-8 rounded-2xl ${theme === 'dark' ? 'hover:border-slate-600' : 'hover:border-slate-300'} hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 animate-fade-in-up`}
//                 style={{ animationDelay: `${index * 150}ms` }}
//               >
//                 <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
//                   <div className="flex-1">
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex items-center space-x-3">
//                         <div className="relative">
//                           <Trophy className="h-8 w-8 text-amber-400" />
//                           {contest.status === 'active' && (
//                             <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
//                           )}
//                         </div>
//                         <div>
//                           <h3 className={`text-2xl font-bold ${textColor} group-hover:${theme === 'dark' ? 'text-white' : 'text-slate-900'} transition-colors`}>
//                             {contest.name}
//                           </h3>
//                           <p className={`${textMuted} mt-1`}>{contest.description}</p>
//                         </div>
//                       </div>
//                       <div className="flex space-x-2">
//                         <span className={`px-3 py-1.5 text-sm font-semibold rounded-full border ${getStatusColor(contest.status)}`}>
//                           {contest.status}
//                         </span>
//                         <span className={`px-3 py-1.5 text-sm font-semibold rounded-full border ${getDifficultyColor(contest.difficulty)}`}>
//                           {contest.difficulty}
//                         </span>
//                       </div>
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                       <div className={`flex items-center space-x-3 p-3 ${theme === 'dark' ? 'bg-slate-700/30' : 'bg-slate-100/50'} rounded-lg`}>
//                         <Users className="h-5 w-5 text-blue-400" />
//                         <div>
//                           <p className={`${textMuted} text-sm`}>Participants</p>
//                           <p className={`${textColor} font-semibold`}>{contest.participants.toLocaleString()}</p>
//                         </div>
//                       </div>
//                       <div className={`flex items-center space-x-3 p-3 ${theme === 'dark' ? 'bg-slate-700/30' : 'bg-slate-100/50'} rounded-lg`}>
//                         <Clock className="h-5 w-5 text-purple-400" />
//                         <div>
//                           <p className={`${textMuted} text-sm`}>Duration</p>
//                           <p className={`${textColor} font-semibold`}>{contest.duration} minutes</p>
//                         </div>
//                       </div>
//                       <div className={`flex items-center space-x-3 p-3 ${theme === 'dark' ? 'bg-slate-700/30' : 'bg-slate-100/50'} rounded-lg`}>
//                         <Award className="h-5 w-5 text-amber-400" />
//                         <div>
//                           <p className={`${textMuted} text-sm`}>Prize</p>
//                           <p className={`${textColor} font-semibold`}>{contest.prize}</p>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center space-x-4 text-sm text-slate-400">
//                       <Calendar className="h-4 w-4 text-slate-500" />
//                       <span>Starts: {contest.startTime.toLocaleString()}</span>
//                       {contest.registered && contest.status === 'upcoming' && (
//                         <span className="flex items-center space-x-1 text-emerald-400">
//                           <Target className="h-4 w-4" />
//                           <span>Registered</span>
//                         </span>
//                       )}
//                     </div>
//                   </div>
                  
//                   <div className="mt-4 lg:mt-0 lg:ml-6 flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
//                     {contest.status === 'active' && (
//                       <button className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center ${getButtonVariant(contest.status, contest.registered)}`}>
//                         <Play className="h-4 w-4 mr-2" />
//                         Join Now
//                       </button>
//                     )}
//                     {contest.status === 'upcoming' && (
//                       <button className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${getButtonVariant(contest.status, contest.registered)}`}>
//                         {contest.registered ? 'Registered' : 'Register Now'}
//                       </button>
//                     )}
//                     {contest.status === 'completed' && (
//                       <button className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${getButtonVariant(contest.status, contest.registered)}`}>
//                         View Results
//                       </button>
//                     )}
//                     <button className={`px-4 py-3 ${textMuted} hover:${textColor} ${hoverBackground} rounded-xl transition-all duration-300`}>
//                       <Star className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             /* Enhanced Empty State */
//             <div className="text-center py-16 animate-fade-in">
//               <div className="relative inline-block mb-6">
//                 <Trophy className={`h-20 w-20 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'} mx-auto`} />
//                 <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-slate-600/20' : 'bg-slate-400/20'} rounded-full animate-ping`}></div>
//               </div>
//               <h3 className={`text-2xl font-bold ${textColor} mb-3`}>
//                 No {activeTab} contests found
//               </h3>
//               <p className={`${textMuted} mb-6 max-w-md mx-auto text-lg`}>
//                 {activeTab === 'active' 
//                   ? 'No contests are currently running. Check back later for new challenges!'
//                   : activeTab === 'upcoming'
//                   ? 'No upcoming contests scheduled. Be the first to create an exciting competition!'
//                   : 'You haven\'t participated in any contests yet. Join one to start your journey!'
//                 }
//               </p>
//               {activeTab !== 'completed' && (
//                 <button
//                   onClick={() => setShowCreateModal(true)}
//                   className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 inline-flex items-center"
//                 >
//                   <Plus className="h-5 w-5 mr-2" />
//                   Create Contest
//                 </button>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Enhanced Create Contest Modal */}
//         {showCreateModal && (
//           <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
//             <div className={`${theme === 'dark' ? 'bg-slate-800/90' : 'bg-white/90'} backdrop-blur-sm p-8 rounded-3xl border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'} w-full max-w-2xl mx-4 shadow-2xl animate-scale-in`}>
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                   Create New Contest
//                 </h3>
//                 <button
//                   onClick={() => setShowCreateModal(false)}
//                   className={`${textMuted} hover:${textColor} transition-colors p-2 ${hoverBackground} rounded-xl`}
//                 >
//                   <Plus className="h-5 w-5 rotate-45" />
//                 </button>
//               </div>
              
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <label className={`block text-sm font-semibold ${textColor}`}>
//                       Contest Name
//                     </label>
//                     <input
//                       type="text"
//                       className={`w-full px-4 py-3 ${theme === 'dark' ? 'bg-slate-900/80' : 'bg-white/60'} border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'} rounded-xl ${textColor} placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300`}
//                       placeholder="Enter contest name"
//                     />
//                   </div>
                  
//                   <div className="space-y-2">
//                     <label className={`block text-sm font-semibold ${textColor}`}>
//                       Duration (minutes)
//                     </label>
//                     <input
//                       type="number"
//                       className={`w-full px-4 py-3 ${theme === 'dark' ? 'bg-slate-900/80' : 'bg-white/60'} border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'} rounded-xl ${textColor} placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300`}
//                       placeholder="60"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className={`block text-sm font-semibold ${textColor}`}>
//                       Difficulty
//                     </label>
//                     <select className={`w-full px-4 py-3 ${theme === 'dark' ? 'bg-slate-900/80' : 'bg-white/60'} border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'} rounded-xl ${textColor} focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300`}>
//                       <option value="easy" className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} text-emerald-400`}>Easy</option>
//                       <option value="medium" className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} text-amber-400`}>Medium</option>
//                       <option value="hard" className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} text-rose-400`}>Hard</option>
//                     </select>
//                   </div>

//                   <div className="space-y-2">
//                     <label className={`block text-sm font-semibold ${textColor}`}>
//                       Prize
//                     </label>
//                     <input
//                       type="text"
//                       className={`w-full px-4 py-3 ${theme === 'dark' ? 'bg-slate-900/80' : 'bg-white/60'} border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'} rounded-xl ${textColor} placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300`}
//                       placeholder="e.g., $100 Gift Card"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className={`block text-sm font-semibold ${textColor}`}>
//                     Description
//                   </label>
//                   <textarea
//                     rows={3}
//                     className={`w-full px-4 py-3 ${theme === 'dark' ? 'bg-slate-900/80' : 'bg-white/60'} border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'} rounded-xl ${textColor} placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 resize-none`}
//                     placeholder="Describe your contest..."
//                   />
//                 </div>
//               </div>
              
//               <div className="flex justify-end space-x-3 mt-8">
//                 <button
//                   onClick={() => setShowCreateModal(false)}
//                   className={`px-6 py-3 ${textMuted} hover:${textColor} ${hoverBackground} rounded-xl transition-all duration-300 font-semibold`}
//                 >
//                   Cancel
//                 </button>
//                 <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
//                   Create Contest
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ContestPlaceholder() {
  const { theme } = useTheme();

  const textColor = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textMuted = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
      <div className={`${theme === 'dark' ? 'bg-slate-900/90 border-slate-700' : 'bg-white/90 border-slate-200'} border rounded-3xl p-8 max-w-lg w-full mx-4 text-center shadow-2xl animate-fade-in`}>
        <div className="mb-4">
          <Sparkles className={`h-12 w-12 mx-auto ${theme === 'dark' ? 'text-amber-400' : 'text-amber-500'}`} />
        </div>
        <h2 className={`text-3xl font-bold mb-2 ${textColor}`}>Context Mode — Coming Soon</h2>
        <p className={`${textMuted} mb-6 text-lg`}>
          This functionality is currently unavailable. We’re working hard to bring interactive contest sessions with real-time challenges, collaboration, and live scoring.
        </p>
        <button
          className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
