"use client"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";

interface MemoryCardProps {
  caption: string;
  photoUrls: string[];
}

function PhotoGallery({ photos }: { photos: string[] }) {
  if (photos.length === 0) return null;

  // Layout logic based on count
  const getGridClass = () => {
    switch (photos.length) {
      case 1: return "grid-cols-1";
      case 2: return "grid-cols-2";
      case 3: return "grid-cols-2"; // 3 images: 1 large on top, 2 small below
      default: return "grid-cols-2"; // 4+ images: 2x2 grid
    }
  };

  return (
    <div className={`grid gap-1 overflow-hidden rounded-md ${getGridClass()}`}>
      {photos.map((url, i) => (
        <div 
          key={i} 
          className={`relative h-64 w-full ${
            photos.length === 3 && i === 0 ? "col-span-2" : "" 
          }`}
        >
          <Image 
            src={url} 
            fill
            alt={`Post content ${i + 1}`} 
            className="object-cover" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}

export function MemoryCard({ caption, photoUrls }: MemoryCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center gap-3">
        <Avatar>
          <AvatarImage src="/avatar-placeholder.png" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="font-semibold">User Name</div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-800">{caption}</p>
        <PhotoGallery photos={photoUrls} />
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="ghost" className="flex gap-2">
          <Heart className="w-5 h-5" /> Like
        </Button>
        <Button variant="ghost" className="flex gap-2">
          <MessageCircle className="w-5 h-5" /> Comment
        </Button>
        <Button variant="ghost" className="flex gap-2">
          <Share2 className="w-5 h-5" /> Share
        </Button>
      </CardFooter>
    </Card>
  );
}