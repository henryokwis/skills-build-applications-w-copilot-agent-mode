import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      {
        username: 'alex-runner',
        email: 'alex@example.com',
        displayName: 'Alex Rivera',
        avatarUrl: 'https://i.pravatar.cc/150?u=alex-runner',
      },
      {
        username: 'sam-cyclist',
        email: 'sam@example.com',
        displayName: 'Sam Chen',
        avatarUrl: 'https://i.pravatar.cc/150?u=sam-cyclist',
      },
      {
        username: 'jordan-lifts',
        email: 'jordan@example.com',
        displayName: 'Jordan Brooks',
        avatarUrl: 'https://i.pravatar.cc/150?u=jordan-lifts',
      },
    ]);

    await Team.create([
      {
        name: 'Morning Movers',
        description: 'Start the day with a focused, friendly workout.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Strength Squad',
        description: 'Build consistency and strength together.',
        members: [users[1]._id, users[2]._id],
      },
    ]);

    await Activity.create([
      {
        userId: users[0]._id,
        type: 'running',
        durationMinutes: 32,
        distance: 5.2,
        notes: 'Steady neighborhood run',
        completedAt: new Date('2026-09-01T07:30:00Z'),
      },
      {
        userId: users[1]._id,
        type: 'cycling',
        durationMinutes: 48,
        distance: 16.4,
        notes: 'Riverside loop',
        completedAt: new Date('2026-09-02T17:45:00Z'),
      },
      {
        userId: users[2]._id,
        type: 'strength',
        durationMinutes: 40,
        notes: 'Full-body circuit',
        completedAt: new Date('2026-09-03T18:00:00Z'),
      },
    ]);

    await Leaderboard.create([
      { userId: users[0]._id, points: 320, activitiesCompleted: 12 },
      { userId: users[1]._id, points: 285, activitiesCompleted: 10 },
      { userId: users[2]._id, points: 240, activitiesCompleted: 8 },
    ]);

    await Workout.create([
      {
        title: 'Easy 5K Builder',
        description: 'A relaxed run with short pacing intervals.',
        difficulty: 'beginner',
        durationMinutes: 30,
        activityType: 'running',
      },
      {
        title: 'Power Ride',
        description: 'Build cycling stamina with controlled effort blocks.',
        difficulty: 'intermediate',
        durationMinutes: 45,
        activityType: 'cycling',
      },
      {
        title: 'Total Body Strength',
        description: 'A challenging compound movement circuit.',
        difficulty: 'advanced',
        durationMinutes: 50,
        activityType: 'strength',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
