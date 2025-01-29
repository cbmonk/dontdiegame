import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import confetti from 'canvas-confetti';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

export const mockUser = {
  name: "John Doe",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  level: 42,
  streak: 7,
  points: 187951,
  achievements: [
    { id: 1, name: "Early Bird", description: "Complete all tasks before 9 AM", progress: 80 },
    { id: 2, name: "Workout Warrior", description: "Complete 10 workouts", progress: 60 },
    { id: 3, name: "Sleep Master", description: "Get 8 hours of sleep for 7 days", progress: 40 }
  ]
};