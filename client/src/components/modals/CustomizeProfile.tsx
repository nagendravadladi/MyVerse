import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, User, Quote, Link, Sparkles } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { User as UserType } from "@shared/schema";

interface CustomizeProfileProps {
  user: UserType;
  open: boolean;
  onClose: () => void;
}

const inspirationalQuotes = [
  "The future belongs to those who believe in the beauty of their dreams.",
  "Innovation distinguishes between a leader and a follower.",
  "The only way to do great work is to love what you do.",
  "Stay hungry, stay foolish.",
  "Code is poetry written in logic.",
  "Every expert was once a beginner.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "Your limitation—it's only your imagination.",
  "Dream it. Wish it. Do it.",
  "Success doesn't just find you. You have to go out and get it."
];

export default function CustomizeProfile({ user, open, onClose }: CustomizeProfileProps) {
  const [name, setName] = useState(user.name || "");
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || "");
  const [dailyQuote, setDailyQuote] = useState(user.dailyQuote || "");
  const [portfolioLink, setPortfolioLink] = useState(user.portfolioLink || "");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { setUser } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: async (updates: Partial<UserType>) => {
      const response = await apiRequest("PATCH", `/api/user/${user.id}`, updates);
      return response.json();
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: [`/api/user/${user.id}`] });
      toast({
        title: "Profile updated!",
        description: "Your profile has been successfully updated.",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name.",
        variant: "destructive",
      });
      return;
    }

    updateProfileMutation.mutate({
      name: name.trim(),
      profilePicture: previewImage || profilePicture || null,
      dailyQuote: dailyQuote.trim() || null,
      portfolioLink: portfolioLink.trim() || null,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateRandomQuote = () => {
    const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
    setDailyQuote(randomQuote);
  };

  const handleReset = () => {
    setName(user.name || "");
    setProfilePicture(user.profilePicture || "");
    setDailyQuote(user.dailyQuote || "");
    setPortfolioLink(user.portfolioLink || "");
    setPreviewImage(null);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="text-primary" />
            Customize Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Picture */}
          <div className="text-center space-y-3">
            <div className="relative inline-block">
              <Avatar className="w-24 h-24 border-4 border-primary/20">
                <AvatarImage src={previewImage || profilePicture || undefined} />
                <AvatarFallback className="text-2xl">
                  {name ? name.charAt(0).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
              <label className="absolute bottom-0 right-0 p-2 bg-primary rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                <Camera className="w-4 h-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Click camera icon to upload new photo
            </p>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Daily Quote */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="quote">Daily Quote</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={generateRandomQuote}
                className="text-xs h-6"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Random
              </Button>
            </div>
            <Textarea
              id="quote"
              value={dailyQuote}
              onChange={(e) => setDailyQuote(e.target.value)}
              placeholder="Enter an inspirational quote..."
              rows={3}
              maxLength={200}
            />
            <p className="text-xs text-gray-500">
              {dailyQuote.length}/200 characters
            </p>
          </div>

          {/* Portfolio Link */}
          <div className="space-y-2">
            <Label htmlFor="portfolio" className="flex items-center gap-2">
              <Link className="w-4 h-4" />
              Portfolio Link
            </Label>
            <Input
              id="portfolio"
              type="url"
              value={portfolioLink}
              onChange={(e) => setPortfolioLink(e.target.value)}
              placeholder="https://your-portfolio.com"
            />
            <p className="text-xs text-gray-500">
              Share your work with others
            </p>
          </div>

          {/* Profile URL Preview */}
          {portfolioLink && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <Quote className="w-4 h-4 inline mr-1" />
                Portfolio preview will be available in shared dashboard
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              disabled={updateProfileMutation.isPending}
              className="flex-1"
            >
              {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>

        {/* Tips */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 space-y-2">
          <h4 className="font-medium text-sm">💡 Profile Tips:</h4>
          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Use a clear, professional photo</li>
            <li>• Choose an inspiring daily quote</li>
            <li>• Add your portfolio to showcase your work</li>
            <li>• Your profile reflects in the shared dashboard</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
