export const INTERESTS_OPTIONS = [
   {category: "Social & Hangouts", interest: "Coffee"}, {category: "Social & Hangouts", interest: "Street Food"}, {category: "Social & Hangouts", interest: "Beer"}, {category: "Social & Hangouts", interest: "Night Markets"},
    {category: "Entertainment", interest: "Anime"}, {category: "Entertainment", interest: "K-drama"}, {category: "Entertainment", interest: "Film"}, {category: "Entertainment", interest: "Games"},
    {category: "Music", interest: "Indie"}, {category: "Music", interest: "Hip-hop"}, {category: "Music", interest: "Rock"}, {category: "Music", interest: "K-pop"},
    {category: "Creative", interest: "Photography"}, {category: "Creative", interest: "Drawing"}, {category: "Creative", interest: "Content-creation"}, {category: "Technology", interest: "Tech"}]

export const mockEvents = [
    {
        id: '1',
        title: 'Coffee Meetup',
        scheduled_time: new Date('2026-02-28T19:00:00').toISOString(),
        location_name: 'Downtown Coffee House',
        reveal_status: false,
        participants: 4,
        participant_aliases: [{'name': 'Purple Phoenix', 'status': 'I\m going'}, {'name': 'Golden Dragon', 'status': 'I \m not going'}, {'name': 'Silver Wolf', 'status': 'I\'m not going'}, {'name': 'Crimson Tiger', 'status': 'I\'m going'}]
    },
    {
        id: '2',
        title: 'Tech Meetup',
        scheduled_time: new Date('2026-02-25T14:30:00').toISOString(),
        location_name: 'Central Park - North Entrance',
        reveal_status: true,
        participants: 3,
        participant_aliases: [{'name': 'Midnight Owl', 'status': 'I\m going'}, {'name': 'Sunset Ranger', 'status': 'I \m not going'}, {'name': 'Ocean Breeze', 'status': 'I\'m going'}]
    },
    {
        id: '3',
        title: 'Street Food Gathering',
        scheduled_time: new Date('2026-03-05T18:00:00').toISOString(),
        location_name: 'The Mystic Tavern',
        reveal_status: false,
        participants: 5,
        participant_aliases: [{'name': 'Blue Falcon', 'status': 'I\m going'}, {'name': 'Green Panther', 'status': 'I \m not going'}, {'name': 'White Eagle', 'status': 'I\'m not going'}, {'name': 'Black Bear', 'status': 'I\'m going'}, {'name': 'Red Fox', 'status': 'I\'m going'}]
    }
];

export const mockMemoryPosts = [
  {
    id: 1,
    meetup_id: 101,
    caption: "Incredible hike up the mountain with the team!",
    photo_urls: ["https://www.grisport.co.uk/blog/wp-content/uploads/2021/07/hiking-1024x684.jpeg", "https://www.sportscoverdirect.com/wp-content/uploads/2024/04/Hiking-health-benefits-1.jpg"],
    tags: [5, 12, 18],
    is_public: true,
  },
  {
    id: 2,
    meetup_id: 102,
    caption: "Deep dive into TypeScript architecture.",
    photo_urls: ["https://www.codemotion.com/magazine/wp-content/uploads/2020/04/35344608_1932760713412894_8299069717268660224_o-1024x683.jpg"],
    tags: [1, 2],
    is_public: false,
  },
  {
    id: 3,
    meetup_id: 103,
    caption: "Friday pizza night at the office!",
    photo_urls: ["https://static1.squarespace.com/static/5f717b5dc793233e049557ee/634048fde11ec458f29ea660/6340492990bd5e54dc318e10/1740357627520/Pizza%2BNight%2BCover.jpg?format=1500w", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcbd2aRjZKN2K2Qkejrp-VCKl1r24BRVudgg&s"],
    tags: [9, 10, 11, 15],
    is_public: true,
  },
  {
    meetup_id: 104,
    caption: "Weekend networking workshop.",
    photo_urls: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGAR1vbI-yc75bpfqVRzo-dv1ANuoWDw7GQ&s"],
    tags: [3, 7],
    is_public: true,
  },
  {
    meetup_id: 105,
    caption: "Quick coffee catch-up.",
    photo_urls: [],
    tags: [8],
    is_public: false,
  },
];

export const timeSlots = ['Morning', 'Noon', 'Evening', 'Night'];
export const vibes = [{label: 'Coffee', value: 'Coffee'}, {label: 'Beer', value: 'Beer'}, {label: 'Coworking', value: 'Coworking'}];
export const cities = [{'label': 'Yangon', 'value': 'yangon'}, {'label': 'Mandalay', 'value': 'mandalay'}, {'label': 'Naypyidaw', 'value': 'naypyidaw'}, {'label': 'Mawlamyine', 'value': 'mawlamyine'}, {'label': 'Bago', 'value': 'bago'}];
export const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];