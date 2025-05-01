
import Sidebar from "@/components/layout/Sidebar";

const Achievements = () => {
  // Dummy achievements data
  const unlockedAchievements = [
    {
      id: 1,
      name: "First Project Completed",
      description: "Finished your first project. Great start!",
      icon: "🏆",
      date: "April 15, 2025",
      color: "bg-lovable-purple-light"
    },
    {
      id: 2,
      name: "7-Day Streak",
      description: "Coded for 7 consecutive days. Consistency is key!",
      icon: "🔥",
      date: "April 22, 2025",
      color: "bg-lovable-peach"
    },
    {
      id: 3,
      name: "Code Explorer",
      description: "Tried 5 different programming languages",
      icon: "🧭",
      date: "April 25, 2025",
      color: "bg-lovable-blue"
    },
    {
      id: 4,
      name: "Bug Slayer",
      description: "Fixed 10 challenging bugs",
      icon: "🐛",
      date: "April 27, 2025",
      color: "bg-green-100"
    }
  ];
  
  const lockedAchievements = [
    {
      id: 5,
      name: "30-Day Streak",
      description: "Code for 30 consecutive days",
      icon: "🔒",
      hint: "Keep up your daily coding habit"
    },
    {
      id: 6,
      name: "Code Mentor",
      description: "Help 5 other developers with their projects",
      icon: "🔒",
      hint: "Contribute to the community"
    },
    {
      id: 7,
      name: "API Master",
      description: "Build 3 projects that use external APIs",
      icon: "🔒",
      hint: "Integrate with third-party services"
    }
  ];

  return (
    <div className="min-h-screen bg-lovable-gray-light/50">
      <Sidebar />
      <div className="pl-20 lg:pl-64 pt-6">
        <div className="p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Your Achievements</h1>
          
          {/* Stats Summary */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-lovable-purple-light rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-lovable-purple mb-2">4</div>
                <div className="text-lovable-purple-dark">Badges Earned</div>
              </div>
              <div className="bg-lovable-peach rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-lovable-purple-dark mb-2">7</div>
                <div className="text-lovable-purple-dark">Day Streak</div>
              </div>
              <div className="bg-lovable-blue rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-lovable-purple-dark mb-2">350</div>
                <div className="text-lovable-purple-dark">Points</div>
              </div>
            </div>
          </div>
          
          {/* Unlocked Badges */}
          <h2 className="text-xl font-bold mb-4">Unlocked Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {unlockedAchievements.map((achievement) => (
              <div key={achievement.id} className="bg-white rounded-xl shadow-md overflow-hidden card-hover">
                <div className={`h-2 ${achievement.color}`}></div>
                <div className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className={`w-16 h-16 ${achievement.color} rounded-full flex items-center justify-center text-3xl`}>
                      {achievement.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-center mb-2">{achievement.name}</h3>
                  <p className="text-gray-600 text-sm text-center mb-4">{achievement.description}</p>
                  <div className="text-xs text-center text-gray-500">Earned on {achievement.date}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Locked Badges */}
          <h2 className="text-xl font-bold mb-4">Badges to Unlock</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lockedAchievements.map((achievement) => (
              <div key={achievement.id} className="bg-white rounded-xl shadow-md overflow-hidden opacity-75 card-hover">
                <div className="h-2 bg-gray-200"></div>
                <div className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-3xl">
                      {achievement.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-center mb-2">{achievement.name}</h3>
                  <p className="text-gray-600 text-sm text-center mb-4">{achievement.description}</p>
                  <div className="text-xs text-center text-gray-500">Hint: {achievement.hint}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Leaderboard Section */}
          <div className="mt-10 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Community Leaderboard</h2>
            <p className="text-gray-500 mb-6">Compare your progress with fellow developers</p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Rank</th>
                    <th className="px-4 py-2 text-left">Developer</th>
                    <th className="px-4 py-2 text-left">Streak</th>
                    <th className="px-4 py-2 text-left">Badges</th>
                    <th className="px-4 py-2 text-left">Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-3">1</td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-lovable-purple flex items-center justify-center">
                        <span className="text-white text-sm">D</span>
                      </div>
                      <span>DevMaster</span>
                    </td>
                    <td className="px-4 py-3">42</td>
                    <td className="px-4 py-3">12</td>
                    <td className="px-4 py-3">980</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3">2</td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-lovable-peach flex items-center justify-center">
                        <span className="text-lovable-purple-dark text-sm">C</span>
                      </div>
                      <span>CodeNinja</span>
                    </td>
                    <td className="px-4 py-3">35</td>
                    <td className="px-4 py-3">10</td>
                    <td className="px-4 py-3">875</td>
                  </tr>
                  <tr className="border-t bg-lovable-purple-light/20">
                    <td className="px-4 py-3">3</td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-lovable-blue flex items-center justify-center">
                        <span className="text-lovable-purple-dark text-sm">Y</span>
                      </div>
                      <span>You</span>
                    </td>
                    <td className="px-4 py-3">7</td>
                    <td className="px-4 py-3">4</td>
                    <td className="px-4 py-3">350</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3">4</td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 text-sm">A</span>
                      </div>
                      <span>AppWizard</span>
                    </td>
                    <td className="px-4 py-3">5</td>
                    <td className="px-4 py-3">3</td>
                    <td className="px-4 py-3">290</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
