import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  Heart, 
  Moon, 
  Dumbbell, 
  Trophy,
  Activity,
  LogOut,
  User,
  Settings,
  Medal,
  Gift,
  Flame
} from 'lucide-react';
import { mockUser, formatNumber, triggerConfetti } from '@/lib/utils';

function App() {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const handleTaskComplete = () => {
    triggerConfetti();
    setShowReward(true);
    setTimeout(() => setShowReward(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-10 border-b bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={mockUser.avatar} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className="w-[280px] sm:w-[320px]"
            >
              <SheetHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={mockUser.avatar} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle>{mockUser.name}</SheetTitle>
                    <p className="text-sm text-muted-foreground">Level {mockUser.level}</p>
                  </div>
                </div>
              </SheetHeader>
              <div className="space-y-3 mt-4">
                <Button variant="ghost" className="w-full justify-start" onClick={() => console.log('Profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => console.log('Settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start text-destructive" onClick={() => console.log('Logout')}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setShowLeaderboard(false)}
          >
            <Activity className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">Don't Die Game</span>
          </div>

          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full"
            onClick={() => setShowLeaderboard(true)}
          >
            <Trophy className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 pt-20 pb-8">
        <AnimatePresence>
          {showReward && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Task Completed! +100 points</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showLeaderboard ? (
          <div className="space-y-4 pb-16">
            <Card>
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <h2 className="text-lg font-bold">Global Leaderboard</h2>
                </div>
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">Rank</TableHead>
                        <TableHead>Player</TableHead>
                        <TableHead className="text-right">Points</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { rank: 1, name: "Player 841", points: 187951 },
                        { rank: 2, name: "Player 453", points: 187616 },
                        { rank: 3, name: "Player 318", points: 178491 },
                        { rank: 4, name: "Player 108", points: 178362 },
                        { rank: 5, name: "Player 99", points: 174278 },
                        { rank: 6, name: "Player 362", points: 173312 },
                        { rank: 7, name: "Player 695", points: 171633 },
                        { rank: 8, name: "Player 189", points: 169025 },
                        { rank: 9, name: "Player 301", points: 166672 },
                        { rank: 10, name: "Player 51", points: 165792 },
                      ].map((player) => (
                        <TableRow key={player.rank}>
                          <TableCell className="font-medium">#{player.rank}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}`} />
                                <AvatarFallback>{player.name[0]}</AvatarFallback>
                              </Avatar>
                              <span>{player.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{formatNumber(player.points)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </Card>

            {/* Current User Ranking - Fixed at Bottom */}
            <div className="fixed bottom-0 left-0 right-0 bg-card border-t">
              <div className="max-w-lg mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">#42</span>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={mockUser.avatar} />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span>{mockUser.name}</span>
                  </div>
                  <span className="font-medium">{formatNumber(mockUser.points)}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Daily Rewards */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Gift className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Daily Rewards</h3>
                  </div>
                  <span className="text-sm text-muted-foreground">{mockUser.streak} day streak!</span>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-full flex items-center justify-center text-xs ${
                        i < mockUser.streak ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tasks */}
            <div className="space-y-4">
              {/* Sleep Duration Card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Moon className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Sleep Duration</h3>
                    </div>
                    <span className="text-xl font-bold">0/7h</span>
                  </div>
                  <Progress value={0} className="h-2 mb-4" />
                  <Button className="w-full" onClick={handleTaskComplete}>Complete</Button>
                </CardContent>
              </Card>

              {/* Heart Rate Card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Heart Rate</h3>
                    </div>
                    <span className="text-xl font-bold">0/30m</span>
                  </div>
                  <Progress value={0} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground mb-4">Target: 106-159 bpm</p>
                  <Button className="w-full" onClick={handleTaskComplete}>Complete</Button>
                </CardContent>
              </Card>

              {/* Workout Duration Card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Dumbbell className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Workout Duration</h3>
                    </div>
                    <span className="text-xl font-bold">0/30m</span>
                  </div>
                  <Progress value={0} className="h-2 mb-4" />
                  <Button className="w-full" onClick={handleTaskComplete}>Complete</Button>
                </CardContent>
              </Card>
            </div>

            {/* Activity Streak */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Flame className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Activity Streak</h3>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      className="aspect-square rounded-sm bg-muted hover:bg-muted-foreground/20 cursor-pointer transition-colors"
                    />
                  ))}
                </div>
                <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                  <span>4 weeks ago</span>
                  <span>Today</span>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Medal className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Achievements</h3>
                </div>
                <div className="space-y-4">
                  {mockUser.achievements.map((achievement) => (
                    <div key={achievement.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{achievement.name}</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;