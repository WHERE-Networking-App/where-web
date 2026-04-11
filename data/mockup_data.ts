export const INTERESTS_OPTIONS = [
    "Coffee", "Street Food", "Beer", "Night Markets",
    "Anime", "K-drama", "Drama", "Games",
    "Indie", "Hip-hop", "Rock", "K-pop",
    "Photography", "Drawing", "Content-creation", "Tech",]

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