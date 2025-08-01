import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Panel, Lecturer } from "../../utils/types"
import PanelCard from './PanelCard'; // or a lighter version if needed

type Props = {
  open: boolean;
  onClose: () => void;
  shuffledPanels: Panel[];
  onSave: () => void;
};

const ShufflePreviewModal: React.FC<Props> = ({ open, onClose, shuffledPanels, onSave }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Shuffled Lecturer Preview</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shuffledPanels.map((panel) => (
            <PanelCard panel={panel} previewMode />
          ))}
        </div>

        <DialogFooter className="pt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save Assignments</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShufflePreviewModal;
