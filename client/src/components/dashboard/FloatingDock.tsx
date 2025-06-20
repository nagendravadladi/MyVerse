import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Home, Plus, Star } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { Shortcut } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface FloatingDockProps {
  userId: number;
}

export default function FloatingDock({ userId }: FloatingDockProps) {
  const [showPinModal, setShowPinModal] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: shortcuts = [] } = useQuery<Shortcut[]>({
    queryKey: [`/api/shortcuts/${userId}`],
  });

  const updateShortcutMutation = useMutation({
    mutationFn: async ({ id, isPinned }: { id: number; isPinned: boolean }) => {
      await apiRequest("PATCH", `/api/shortcuts/${id}`, { isPinned });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/shortcuts/${userId}`] });
    },
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const pinnedShortcuts = shortcuts.filter(s => s.isPinned).slice(0, 14);
  const unpinnedShortcuts = shortcuts.filter(s => !s.isPinned);

  const togglePin = (id: number, currentPinned: boolean) => {
    if (!currentPinned && pinnedShortcuts.length >= 14) {
      toast({
        title: "Dock Full",
        description: "You can only pin up to 14 shortcuts. Unpin some first.",
        variant: "destructive",
      });
      return;
    }
    
    updateShortcutMutation.mutate({ id, isPinned: !currentPinned });
    
    toast({
      title: currentPinned ? "Unpinned" : "Pinned to dock",
      description: currentPinned ? "Shortcut removed from dock" : "Shortcut added to dock",
    });
  };

  const getShortcutIcon = (name: string, icon: string) => {
    if (icon) return icon;
    
    const lowerName = name.toLowerCase();
    if (lowerName.includes('youtube')) return '📺';
    if (lowerName.includes('spotify')) return '🎵';
    if (lowerName.includes('github')) return '🐙';
    if (lowerName.includes('linkedin')) return '💼';
    if (lowerName.includes('twitter')) return '🐦';
    if (lowerName.includes('instagram')) return '📷';
    if (lowerName.includes('gmail')) return '📧';
    if (lowerName.includes('calendar')) return '📅';
    return '🔗';
  };

  const getShortcutColor = (index: number) => {
    const colors = [
      'bg-red-500',
      'bg-green-500', 
      'bg-blue-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
      'bg-orange-500',
      'bg-cyan-500',
      'bg-lime-500',
      'bg-amber-500',
      'bg-emerald-500',
      'bg-violet-500',
    ];
    return colors[index % colors.length];
  };

  return (
    <>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-3">
          <div className="flex items-center gap-3">
            {/* Home Button */}
            <Button
              variant="ghost"
              size="sm"
              className="w-12 h-12 bg-primary rounded-xl hover:scale-110 transition-transform p-0"
              onClick={scrollToTop}
              title="Scroll to top"
            >
              <Home className="text-white w-5 h-5" />
            </Button>
            
            {/* Pinned Shortcuts */}
            {pinnedShortcuts.map((shortcut, index) => (
              <Button
                key={shortcut.id}
                variant="ghost"
                size="sm"
                className={`w-12 h-12 ${getShortcutColor(index)} rounded-xl hover:scale-110 transition-transform p-0`}
                onClick={() => window.open(shortcut.url, '_blank')}
                title={shortcut.name}
              >
                <span className="text-white text-xl">
                  {getShortcutIcon(shortcut.name, shortcut.icon || '')}
                </span>
              </Button>
            ))}

            {/* Fill empty slots with placeholders */}
            {Array.from({ length: Math.max(0, 3 - pinnedShortcuts.length) }, (_, index) => (
              <div
                key={`placeholder-${index}`}
                className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-xl flex items-center justify-center opacity-50"
              >
                <Star className="w-4 h-4 text-gray-400" />
              </div>
            ))}
            
            {/* Add to Dock Button */}
            {pinnedShortcuts.length < 14 && (
              <Button
                variant="ghost"
                size="sm"
                className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-xl hover:scale-110 transition-transform border-2 border-dashed border-gray-400 p-0"
                onClick={() => setShowPinModal(true)}
                title="Pin shortcuts to dock"
              >
                <Plus className="text-gray-600 dark:text-gray-400 w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <Dialog open={showPinModal} onOpenChange={setShowPinModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Dock Shortcuts</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>Pin your favorite shortcuts to the floating dock for quick access.</p>
              <p className="mt-1">
                <strong>{pinnedShortcuts.length}/14</strong> slots used
              </p>
            </div>

            {/* Currently Pinned */}
            {pinnedShortcuts.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2">Currently Pinned</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {pinnedShortcuts.map((shortcut) => (
                    <div key={shortcut.id} className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getShortcutIcon(shortcut.name, shortcut.icon || '')}</span>
                        <span className="text-sm font-medium">{shortcut.name}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => shortcut.id && togglePin(shortcut.id, true)}
                        className="text-xs"
                      >
                        Unpin
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available to Pin */}
            {unpinnedShortcuts.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2">Available Shortcuts</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {unpinnedShortcuts.map((shortcut) => (
                    <div key={shortcut.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getShortcutIcon(shortcut.name, shortcut.icon || '')}</span>
                        <span className="text-sm font-medium">{shortcut.name}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => shortcut.id && togglePin(shortcut.id, false)}
                        disabled={pinnedShortcuts.length >= 14}
                        className="text-xs"
                      >
                        Pin
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {unpinnedShortcuts.length === 0 && pinnedShortcuts.length === 0 && (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                <Star className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No shortcuts available</p>
                <p className="text-xs mt-1">Add shortcuts in the Quick Shortcuts section first</p>
              </div>
            )}

            <Button onClick={() => setShowPinModal(false)} className="w-full">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
