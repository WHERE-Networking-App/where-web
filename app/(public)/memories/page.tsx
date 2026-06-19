import { MemoryCard } from "@/components/memory/MemoryCard";
import { FeedContainer } from "@/components/shared/FeedContainer";
import { mockMemoryPosts } from "@/data/mockup_data";

export default function MemoryPage () {
    return (
       <main className="min-h-screen bg-gray-50">
            <FeedContainer>
                {
                    mockMemoryPosts.map((post) => (
                        <MemoryCard 
                            key={post.meetup_id}
                            caption={post.caption}
                            photoUrls={post.photo_urls}
                        />
                    ))
                }
            </FeedContainer>
       </main>
    )
}