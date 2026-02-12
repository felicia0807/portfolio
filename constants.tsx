
import { TourData } from './types';

export const TOUR_DATA: TourData = {
  name: "PPC Pro Tour",
  tagline: "The Zenith of Professional Pickleball",
  description: "Witness the speed, precision, and passion of the world's fastest-growing professional sport. Join thousands of fans across the nation for elite paddle action.",
  email: "info@ppctour.com",
  tournaments: [
    {
      id: "t1",
      name: "Arizona Grand Slam",
      date: "Oct 12-15, 2025",
      location: "Phoenix, AZ",
      status: "Upcoming",
      image: "https://images.unsplash.com/photo-1610410499268-98e826b010f3?q=80&w=800&auto=format&fit=crop" 
    },
    {
      id: "t2",
      name: "Coastal Open",
      date: "Nov 02-05, 2025",
      location: "Newport Beach, CA",
      status: "Upcoming",
      image: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "t3",
      name: "Indoor Nationals",
      date: "Dec 10-14, 2025",
      location: "Dallas, TX",
      status: "Upcoming",
      image: "https://images.unsplash.com/photo-1613941433280-927977464019?q=80&w=800&auto=format&fit=crop"
    }
  ],
  rankings: [
    {
      category: "Men's Singles",
      players: [
        { 
          rank: 1, 
          name: "Ben Johns", 
          points: 14200, 
          country: "USA", 
          image: "https://i.pravatar.cc/300?u=ben",
          bio: "Widely regarded as the greatest of all time, Ben Johns dominated the triple crown circuit for over three years. Known for his tactical precision and unmatched court coverage.",
          highlights: ["3x Triple Crown Winner", "50+ Career Titles", "PPC Tour Player of the Year 2024"],
          videos: [
            "https://assets.mixkit.co/videos/preview/mixkit-man-playing-tennis-on-a-sunny-day-34351-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-professional-tennis-player-hitting-a-ball-40082-large.mp4"
          ]
        },
        { 
          rank: 2, 
          name: "Federico Staksrud", 
          points: 12150, 
          country: "ARG", 
          image: "https://i.pravatar.cc/300?u=fed",
          bio: "The 'Argentine Sensation' brings a high-octane aggressive style to the court. His powerful two-handed backhand has redefined the singles meta.",
          highlights: ["2025 Phoenix Open Champion", "Fastest serve recorded in PPC history", "Pan-American Gold Medalist"],
          videos: [
            "https://assets.mixkit.co/videos/preview/mixkit-athlete-playing-tennis-on-a-court-40083-large.mp4"
          ]
        },
        { 
          rank: 3, 
          name: "Connor Garnett", 
          points: 9800, 
          country: "USA", 
          image: "https://i.pravatar.cc/300?u=con",
          bio: "A former D1 tennis standout who transitioned to pickleball with explosive speed. Connor is known for his incredible lateral movement and deep third-shot drops.",
          highlights: ["Top 3 Singles Debut 2024", "Most Improved Player 2024", "National Championship Finalist"],
          videos: [
            "https://assets.mixkit.co/videos/preview/mixkit-tennis-player-waiting-for-the-ball-40081-large.mp4"
          ]
        }
      ]
    },
    {
      category: "Women's Singles",
      players: [
        { 
          rank: 1, 
          name: "Anna Leigh Waters", 
          points: 15600, 
          country: "USA", 
          image: "https://i.pravatar.cc/300?u=alw",
          bio: "A prodigy turned superstar. At just 18, Anna Leigh has rewritten the record books, combining teenage agility with the strategic depth of a veteran.",
          highlights: ["Youngest #1 in history", "Undefeated in 2024 Singles", "World Pickleball Icon Award"],
          videos: [
            "https://assets.mixkit.co/videos/preview/mixkit-female-tennis-player-ready-to-hit-the-ball-40086-large.mp4"
          ]
        },
        { 
          rank: 2, 
          name: "Catherine Parenteau", 
          points: 11200, 
          country: "CAN", 
          image: "https://i.pravatar.cc/300?u=cat",
          bio: "Canada's top pro is a model of consistency. Her ability to reset the point from any position makes her the most difficult player to put away on tour.",
          highlights: ["Canadian National Champion", "Master of the Reset", "PPC Sportsmanship Award Winner"],
          videos: [
            "https://assets.mixkit.co/videos/preview/mixkit-female-athlete-playing-tennis-40085-large.mp4"
          ]
        },
        { 
          rank: 3, 
          name: "Lea Jansen", 
          points: 8900, 
          country: "USA", 
          image: "https://i.pravatar.cc/300?u=lea",
          bio: "The fiercest competitor on the circuit. Lea's fire and passion are matched only by her technical mastery of the dink game.",
          highlights: ["2024 Masters Series Finalist", "Ranked #1 in Mixed Doubles 2023", "Lead Pro Instructor for PPC Academy"],
          videos: [
            "https://assets.mixkit.co/videos/preview/mixkit-young-woman-playing-tennis-40084-large.mp4"
          ]
        }
      ]
    }
  ]
};
